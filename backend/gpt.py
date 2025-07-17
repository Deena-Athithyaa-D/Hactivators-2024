import openai
import re

# Define the API key and client
client = openai.OpenAI(api_key="")

def chat_gpt(prompt):
    response = client.chat.completions.create(
        model="gpt-4o-mini",
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

# The prompt to be sent to the model
prompt="Explain me about fibonacci series"
prompt_1 = prompt + " using manim library in python, visualize it for 10 sec ONLY THE CODE IS ENOUGH"
output = chat_gpt(prompt_1)

# Extract the code part from the output
code_only = extract_code(output)

# Print the extracted code
print(code_only)
