#!/usr/bin/env python3
"""
Test script to verify content analyzer service
"""

import requests
import os

# Get the content analyzer URL from environment variables
CONTENT_ANALYZER_URL = os.environ.get('CONTENT_ANALYZER_URL', 'http://localhost:8000')

def test_content_analyzer():
    print(f"Testing content analyzer at: {CONTENT_ANALYZER_URL}")
    
    # Test the /active endpoint
    try:
        response = requests.get(f"{CONTENT_ANALYZER_URL}/active")
        print(f"Active endpoint status: {response.status_code}")
        print(f"Active endpoint response: {response.text}")
    except Exception as e:
        print(f"Error testing active endpoint: {e}")
        return
    
    # Test the enhanced_analysis endpoint with a simple text file
    try:
        # Create a simple test file
        with open('test.txt', 'w') as f:
            f.write('This is a test agreement document.')
        
        # Send the file to the enhanced analysis endpoint
        with open('test.txt', 'rb') as f:
            files = {'file': f}
            response = requests.post(f"{CONTENT_ANALYZER_URL}/enhanced_analysis", files=files)
        
        print(f"Enhanced analysis endpoint status: {response.status_code}")
        print(f"Enhanced analysis endpoint response: {response.text}")
        
        # Clean up the test file
        os.remove('test.txt')
    except Exception as e:
        print(f"Error testing enhanced analysis endpoint: {e}")

if __name__ == "__main__":
    test_content_analyzer()