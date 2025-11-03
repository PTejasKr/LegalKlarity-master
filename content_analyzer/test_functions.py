import sys
import os

# Add the content_analyzer directory to the Python path
sys.path.append(os.path.join(os.path.dirname(__file__), '.'))

try:
    from app import extract_pdf, extract_docx, extract_image
    print("All extraction functions imported successfully!")
except ImportError as e:
    print(f"Import error: {e}")
    
    # Let's check what's in the app module
    import app
    print("Available functions in app module:")
    for name in dir(app):
        if name.startswith('extract'):
            print(f"  - {name}")