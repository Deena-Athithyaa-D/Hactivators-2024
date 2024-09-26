from openai import OpenAI
import os
client = OpenAI(
    api_key=""
)

def chat_gpt(prompt):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content.strip()

def GenManimCode(prompt):
    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content.strip()

# summary = chat_gpt("Summarize the history of the United States in 5 sentences.")

a = chat_gpt("Create a pythagoras explanation for 10 seconds using manim library in python")
print(a)