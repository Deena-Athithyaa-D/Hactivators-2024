from flask import Flask, request, send_file
import os
import subprocess
import tempfile

app = Flask(__name__)

@app.route('/render', methods=['POST'])
def render_manim():
    try:
        # Get Manim code from request body
        manim_code = request.data.decode("utf-8")

        # Create a temporary directory to store files
        temp_dir = tempfile.mkdtemp()

        # Create a temporary Python file with the Manim code
        temp_file_path = os.path.join(temp_dir, "scene.py")
        with open(temp_file_path, "w") as temp_file:
            temp_file.write(manim_code)

        # Run the Manim render command to generate the video
        output_file_name = "PythagorasTheorem.mp4"
        output_path = os.path.join(temp_dir, output_file_name)
        
        # Call Manim using subprocess to render the video
        command = [
            "manim", 
            temp_file_path, 
            "PythagorasTheorem",
            "-o", 
            output_file_name
        ]

        # Execute the Manim command
        subprocess.run(command, check=True)

        # Send back the generated video
        return send_file(output_path, as_attachment=True)

    except Exception as e:
        return {"error": str(e)}, 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000,debug=True)
