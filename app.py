from flask import Flask, render_template, request, jsonify
import requests
import os
import json
import re
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

# Groq API configuration
GROQ_API_KEY = os.getenv("GROQ_API_KEY")
GROQ_API_URL = "https://api.groq.com/openai/v1/chat/completions"

def check_grammar(text):
    """Send text to Groq API for grammar checking with detailed debugging"""
    
    # First, let's verify the API key is loaded
    if not GROQ_API_KEY:
        return {"error": "GROQ_API_KEY not found in .env file"}
    
    print(f"API Key (first 10 chars): {GROQ_API_KEY[:10]}...")  # Debug
    
    headers = {
        "Authorization": f"Bearer {GROQ_API_KEY}",
        "Content-Type": "application/json"
    }
    
    system_prompt = """You are a grammar checker. Correct the user's text and explain the errors.
You must respond ONLY in JSON format with the following exact structure:
{
  "corrected_text": "The fully corrected text.",
  "errors": [
    {
      "original": "The specific incorrect word or phrase",
      "correction": "The corrected word or phrase",
      "explanation": "Why this correction was made"
    }
  ],
  "summary": "A short summary of the corrections made."
}
If no errors are found, return the original text, an empty errors array, and a summary stating no errors were found."""

    payload = {
        "model": "llama-3.1-8b-instant",
        "response_format": {"type": "json_object"},
        "messages": [
            {
                "role": "system", 
                "content": system_prompt
            },
            {
                "role": "user", 
                "content": text
            }
        ],
        "temperature": 0.2,
        "max_tokens": 1000
    }
    
    try:
        print(f"Making request to: {GROQ_API_URL}")
        print(f"Headers: { {k:v[:20] + '...' if k == 'Authorization' else v for k,v in headers.items()} }")
        
        response = requests.post(
            GROQ_API_URL, 
            headers=headers, 
            json=payload, 
            timeout=10
        )
        
        print(f"Response Status Code: {response.status_code}")
        
        if response.status_code == 200:
            result = response.json()
            content = result['choices'][0]['message']['content']
            try:
                # Parse the JSON response from the LLM
                parsed_content = json.loads(content)
                return parsed_content
            except json.JSONDecodeError:
                print(f"Failed to parse JSON from LLM: {content}")
                return {
                    "corrected_text": content,
                    "errors": [{"original": "N/A", "correction": "N/A", "explanation": "Failed to parse detailed errors."}],
                    "summary": "Check completed, but failed to format errors."
                }
        else:
            return {
                "error": f"API Error {response.status_code}: {response.text}"
            }
            
    except requests.exceptions.RequestException as e:
        print(f"Request Exception: {str(e)}")
        return {"error": f"Request failed: {str(e)}"}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/check', methods=['POST'])
def check():
    data = request.json
    text = data.get('text', '')
    
    if not text:
        return jsonify({"error": "No text provided"}), 400
    
    result = check_grammar(text)
    return jsonify(result)

if __name__ == '__main__':
    app.run(debug=True)