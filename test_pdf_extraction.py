import sys
import os

# Add the parent directory to the Python path so we can import app
sys.path.append(os.path.join(os.path.dirname(__file__), '..'))

try:
    # Import the extraction functions
    from content_analyzer.app import extract_pdf, extract_docx, extract_image
    print("Extraction functions imported successfully!")
    
    # Try to open and process the test.pdf file
    test_file_path = "test.pdf"
    if os.path.exists(test_file_path):
        print(f"Found test file: {test_file_path}")
        
        # Open the file in binary mode
        with open(test_file_path, "rb") as f:
            # Create a file-like object that mimics Flask's file upload
            class MockFile:
                def __init__(self, file_obj):
                    self.file_obj = file_obj
                    
                def seek(self, pos):
                    self.file_obj.seek(pos)
                    
                def read(self, size=-1):
                    return self.file_obj.read(size)
            
            mock_file = MockFile(f)
            
            # Try to extract text
            print("Attempting to extract text...")
            text = extract_pdf(mock_file)
            print(f"Extracted text length: {len(text)}")
            print(f"First 200 characters: {text[:200]}")
    else:
        print(f"Test file not found: {test_file_path}")
        
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()