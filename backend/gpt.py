from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import os
import subprocess
import tempfile
import shutil  # Import shutil
import boto3
from botocore.exceptions import NoCredentialsError, PartialCredentialsError
import openai
import re
SAMPLE = """
from manim import *

class PythagorasTheorem(Scene):
    def construct(self):
        # Create the triangle
        triangle = Polygon(
            ORIGIN,
            RIGHT * 3,
            RIGHT * 3 + UP * 4,
            color=WHITE
        )

        # Labels for the sides
        a_label = MathTex("a").next_to(triangle, LEFT, buff=0.1)
        b_label = MathTex("b").next_to(triangle, DOWN, buff=0.1)
        c_label = MathTex("c").next_to(triangle, RIGHT + UP, buff=0.1)

        # Squares on each side
        square_a = Square(side_length=4, fill_opacity=0.5, color=BLUE).next_to(triangle, LEFT, buff=0)
        square_b = Square(side_length=3, fill_opacity=0.5, color=GREEN).next_to(triangle, DOWN, buff=0)
        square_c = Square(side_length=5, fill_opacity=0.5, color=YELLOW).move_to(triangle.get_vertices()[2])

        # Add elements to the scene
        self.play(Create(triangle))
        self.play(Write(a_label), Write(b_label), Write(c_label))
        self.wait(1)
        self.play(Create(square_a), Create(square_b))
        self.wait(1)
        self.play(Create(square_c))
        self.wait(2)

        # Display the formula
        formula = MathTex("a^2 + b^2 = c^2").to_edge(DOWN)
        self.play(Write(formula))
        self.wait(3)

#CODE FOR fibonacci series
from manim import *

class FibonacciSeries(Scene):
    def construct(self):
        # Title
        title = Text("Fibonacci Series", font_size=48)
        title.to_edge(UP)

        # Fibonacci Sequence (initial values)
        fib_sequence = [0, 1]

        # Display initial numbers
        first_num = MathTex("0")
        second_num = MathTex("1")

        # Arrange numbers on the screen
        first_num.to_edge(LEFT)
        second_num.next_to(first_num, RIGHT, buff=1)

        # Display title and first two numbers
        self.play(Write(title))
        self.play(Write(first_num), Write(second_num))

        # Add numbers to the screen sequentially
        for _ in range(8):  # Limit to keep animation within 20 seconds
            # Calculate next Fibonacci number
            next_fib = fib_sequence[-1] + fib_sequence[-2]
            fib_sequence.append(next_fib)

            # Create MathTex object for the new number
            next_num = MathTex(str(next_fib))

            # Position it to the right of the last number
            next_num.next_to(second_num, RIGHT, buff=1)

            # Update references
            self.play(Write(next_num))
            first_num = second_num
            second_num = next_num

        # Pause for a moment at the end of the animation
        self.wait(2)

# Command to render the animation:
# manim -pql fibonacci.py FibonacciSeries

"""

app = Flask(__name__)
# Initialize CORS with support for credentials
CORS(app, supports_credentials=True)  # Allow credentials in CORS

# Initialize S3 client
s3_client = boto3.client('s3')
BUCKET_NAME = 'myawsstestings3'  # Replace with your S3 bucket name

# Set OpenAI API key
client = openai.OpenAI(api_key="")

# ChatGPT function to get code
def chat_gpt(prompt):
    response = client.chat.completions.create(
        model="gpt-4o",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content.strip()

# Function to extract the code portion from the output
def extract_code(text):
    # Regular expression to match content between triple backticks
    code_match = re.search(r"```python(.*?)```", text, re.DOTALL)
    if code_match:
        return code_match.group(1).strip()  # Return the code part alone
    return "No code found."

@app.route('/v2/render', methods=['POST'])
def render_manimv1json():
    try:
        # Get the prompt from the request
        data = request.get_json()
        prompt = data.get('prompt')
        filename = data.get('filename')

        # Generate the Manim code using ChatGPT based on the prompt
        prompt_for_chatgpt = "create a " + prompt+ " for 10 seconds using manim library in python. Make sure to import all packages. I dont want any error in code. DONT USE PACKAGES like math and time. Use the following code as a sample " + SAMPLE
        output = chat_gpt(prompt_for_chatgpt)
        manim_code = extract_code(output)
        print("Prompt "+ prompt_for_chatgpt)
        print("output yoyo")
        print(output)
        print("extracted code")
        print(manim_code)
        if manim_code == "No code found.":
            return jsonify({"error": "Unable to extract code from GPT response."}), 500

        # Create a temporary directory to store files
        temp_dir = tempfile.mkdtemp()

        # Create a temporary Python file with the Manim code
        temp_file_path = os.path.join(temp_dir, "scene.py")
        with open(temp_file_path, "w") as temp_file:
            temp_file.write(manim_code)

        # Set the hardcoded output path
        output_path = "/home/ubuntu/Hactivators-2024/backend/media/videos/scene/1080p60/PythagorasTheorem.mp4"

        # Call Manim using subprocess to render the video
        command = [
            "manim",
            temp_file_path,
            "PythagorasTheorem",
            "-o",
            output_path
        ]

        # Execute the Manim command
        subprocess.run(command, check=True)

        # Upload the video file to S3
        s3_key = f"videos/{filename}"  # Set the path in S3 bucket
        s3_client.upload_file(output_path, BUCKET_NAME, s3_key)

        # Generate the URL for the uploaded video
        video_url = f"https://{BUCKET_NAME}.s3.amazonaws.com/{s3_key}"

        # Clean up temporary files
        os.remove(temp_file_path)
        shutil.rmtree(temp_dir)  # Use shutil.rmtree to remove the directory and its contents

        # Return the video URL
        return jsonify({"video_url": video_url})

    except (NoCredentialsError, PartialCredentialsError) as e:
        return jsonify({"error": "AWS credentials not found."}), 500
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)