import sys
import os

# Import the extraction functions directly
try:
    from app import extract_pdf, extract_docx, extract_image
    print("Extraction functions imported successfully!")
    
    # Try to open and process the test.pdf file from parent directory
    test_file_path = "../test.pdf"
    if os.path.exists(test_file_path):
        print(f"Found test file: {test_file_path}")
        
        # Just test if we can open the file
        with open(test_file_path, "rb") as f:
            file_content = f.read()
            print(f"File size: {len(file_content)} bytes")
            
        # Test the extract_pdf function with a real file object
        with open(test_file_path, "rb") as f:
            try:
                print("Attempting to extract text with pdfplumber...")
                # This is a simplified version of what extract_pdf does
                import pdfplumber
                with pdfplumber.open(f) as pdf:
                    text = "\n".join([p.extract_text() for p in pdf.pages])
                    print(f"Extracted text length: {len(text)}")
                    print(f"First 200 characters: {text[:200]}")
            except Exception as e:
                print(f"PDF extraction error: {e}")
                print("This is likely because tesseract is not installed")
    else:
        print(f"Test file not found: {test_file_path}")
        
except Exception as e:
    print(f"Error: {e}")
    import traceback
    traceback.print_exc()