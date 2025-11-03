import os
import sys
import google.generativeai as genai

# Set the API key directly for testing
api_key = "AIzaSyBIBuXap4-V3LIjvPYMyX0ggkHSB_rkTmc"
genai.configure(api_key=api_key)

print("Testing Gemini API connection...")

try:
    # Use the correct model name
    model = genai.GenerativeModel('gemini-1.5-flash')
    response = model.generate_content("Hello, this is a test. Please respond with 'Test successful'")
    print("API Response:", response.text)
    print("Gemini API is working correctly!")
except Exception as e:
    print(f"Error testing Gemini API: {e}")
    print("Please check your API key and internet connection")