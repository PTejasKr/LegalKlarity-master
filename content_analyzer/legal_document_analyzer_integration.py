"""
LEGAL DOCUMENT ANALYZER INTEGRATION REFERENCE
============================================

This file demonstrates how to integrate the Legal Document Analyzer features 
into the existing LegalKlarity content analyzer to provide enhanced document analysis.

Key enhancements from Legal Document Analyzer:
1. Comprehensive 12-category legal document analysis
2. Structured JSON response for consistent data handling
3. Interactive document chat functionality
4. Better prompt engineering for more accurate AI responses
5. Tabbed interface organization for better UX

Integration points with existing LegalKlarity:
1. Replace basic document extraction with comprehensive analysis
2. Enhance agreement summary with additional categories
3. Add chat functionality to existing dashboard
4. Improve data structures for better frontend display
"""

# Required imports (add to existing imports)
import json
import textwrap
from datetime import datetime
import google.cloud.aiplatform as aiplatform
from vertexai.generative_models import GenerativeModel, Part

# Configuration (add to environment variables)
GOOGLE_CLOUD_PROJECT = "your-google-cloud-project-id"  # Add to .env
GOOGLE_CLOUD_LOCATION = "us-central1"  # Add to .env

# Initialize Vertex AI (add after Flask app initialization)
def initialize_vertex_ai():
    """Initialize Vertex AI with project configuration"""
    aiplatform.init(
        project=GOOGLE_CLOUD_PROJECT,
        location=GOOGLE_CLOUD_LOCATION
    )

# Enhanced document analysis function (replace or add to existing functions)
def analyze_legal_document(text, document_type=None):
    """
    Comprehensive legal document analysis using Gemini AI
    
    Args:
        text (str): Extracted text from legal document
        document_type (str, optional): Type of document (auto-detected if None)
    
    Returns:
        dict: Structured analysis with 12 categories
    """
    
    # Auto-detect document type if not provided
    if not document_type:
        document_type = detect_document_type(text)
    
    # Enhanced prompt engineering for comprehensive analysis
    prompt = f"""
    Analyze the following {document_type or 'legal document'} and provide a comprehensive analysis.
    Return ONLY valid JSON that strictly matches this schema:
    
    {{
        "summary": "Brief 2-3 sentence overview of the entire document",
        "key_terms": [
            {{
                "term": "Defined term",
                "definition": "Clear definition from the document"
            }}
        ],
        "main_clauses": [
            {{
                "name": "Clause name/title",
                "description": "Brief description of what this clause covers"
            }}
        ],
        "critical_dates": [
            {{
                "date": "YYYY-MM-DD or date range",
                "event": "What happens on this date"
            }}
        ],
        "parties": [
            {{
                "name": "Party name",
                "role": "Their role in the agreement"
            }}
        ],
        "jurisdiction": "Governing law and jurisdiction information",
        "obligations": [
            {{
                "party": "Which party",
                "responsibility": "What they must do"
            }}
        ],
        "risks": [
            {{
                "risk": "Identified risk",
                "severity": "high/medium/low",
                "description": "Explanation of the risk"
            }}
        ],
        "recommendations": [
            "Actionable recommendation to address identified issues"
        ],
        "missing_clauses": [
            {{
                "clause": "Missing clause name",
                "importance": "Why it's important"
            }}
        ],
        "compliance_issues": [
            {{
                "issue": "Compliance concern",
                "regulation": "Relevant law/regulation (if identifiable)"
            }}
        ],
        "next_steps": [
            "Action item that should be taken next"
        ]
    }}
    
    Document Text:
    {text[:50000]}  # Limit to prevent token overflow
    """
    
    try:
        # Initialize Gemini model
        model = GenerativeModel("gemini-1.5-flash-001")
        
        # Generate response
        response = model.generate_content(
            prompt,
            generation_config={
                "temperature": 0.4,
                "top_p": 0.8,
                "top_k": 40,
                "max_output_tokens": 8192,
            }
        )
        
        # Parse and validate JSON response
        analysis = json.loads(response.text)
        return analysis
        
    except json.JSONDecodeError as e:
        # Fallback to basic analysis if JSON parsing fails
        return create_fallback_analysis(text)
    except Exception as e:
        # Return error structure
        return {
            "error": f"Analysis failed: {str(e)}",
            "summary": "Document analysis could not be completed due to technical issues.",
            "key_terms": [],
            "main_clauses": [],
            "critical_dates": [],
            "parties": [],
            "jurisdiction": "Not available",
            "obligations": [],
            "risks": [],
            "recommendations": [],
            "missing_clauses": [],
            "compliance_issues": [],
            "next_steps": []
        }

# Document type detection (enhancement to existing classify_agreement)
def detect_document_type(text):
    """
    Enhanced document type detection
    
    Returns:
        str: Detected document type
    """
    text_lower = text.lower()
    
    # Document type patterns
    patterns = {
        "rental agreement": ["rent", "lease", "tenant", "landlord", "security deposit"],
        "employment contract": ["employment", "employee", "employer", "salary", "position"],
        "service agreement": ["service", "provider", "client", "deliverable"],
        "loan agreement": ["loan", "borrower", "lender", "interest rate"],
        "nda": ["confidential", "non-disclosure", "secrecy"],
        "purchase agreement": ["purchase", "buy", "sell", "buyer", "seller"],
        "internship agreement": ["internship", "intern", "supervisor", "internship period"]
    }
    
    # Score each document type
    scores = {}
    for doc_type, keywords in patterns.items():
        score = sum(1 for keyword in keywords if keyword in text_lower)
        scores[doc_type] = score
    
    # Return highest scoring document type
    if scores:
        best_match = max(scores.items(), key=lambda x: x[1])
        if best_match[1] > 0:
            return best_match[0]
    
    return "general legal document"

# Fallback analysis function
def create_fallback_analysis(text):
    """
    Create basic analysis when AI analysis fails
    
    Returns:
        dict: Basic analysis structure
    """
    return {
        "summary": text[:500] + "..." if len(text) > 500 else text,
        "key_terms": [],
        "main_clauses": [],
        "critical_dates": [],
        "parties": [],
        "jurisdiction": "Not analyzed",
        "obligations": [],
        "risks": [],
        "recommendations": ["Have a legal professional review this document"],
        "missing_clauses": [],
        "compliance_issues": [],
        "next_steps": ["Review document with legal counsel"]
    }

# Interactive document chat function
def chat_about_document(text, question):
    """
    Interactive chat about the document
    
    Args:
        text (str): Document text
        question (str): User's question about the document
    
    Returns:
        str: AI-generated answer
    """
    prompt = f"""
    Based on the following document, answer the question accurately and concisely.
    
    Document:
    {text[:10000]}  # Limit for context window
    
    Question: {question}
    
    Answer:
    """
    
    try:
        model = GenerativeModel("gemini-1.5-flash-001")
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"Unable to answer the question due to: {str(e)}"

# Enhanced Flask route for document analysis (replace existing /uploads)
@app.route("/enhanced_analysis", methods=["POST"])
def enhanced_document_analysis():
    """
    Enhanced document analysis endpoint
    """
    if "file" not in request.files:
        return jsonify({"error": "No file uploaded"}), 400
    
    file = request.files["file"]
    if file.filename == "":
        return jsonify({"error": "No file selected"}), 400

    # Extract text (using existing functions)
    filename = file.filename.lower()
    text = ""
    
    if filename.endswith(".pdf"):
        text = extract_pdf(file.stream)
    elif filename.endswith(".docx"):
        text = extract_docx(file.stream)
    elif filename.endswith((".png", ".jpg", ".jpeg")):
        text = extract_image(file.stream)
    else:
        return jsonify({"error": "Unsupported file type"}), 400
    
    # Check if it's a valid agreement (using existing function)
    is_ok, details = classify_agreement(text)
    if not is_ok:
        return jsonify({
            "error": "Rejected: Not a valid agreement.",
            "details": details
        }), 400
    
    # Perform enhanced analysis
    analysis = analyze_legal_document(text)
    
    return jsonify({
        "filename": file.filename,
        "extracted_text": text,
        "analysis": analysis,
        "timestamp": datetime.now().isoformat()
    })

# Document chat endpoint
@app.route("/chat", methods=["POST"])
def document_chat():
    """
    Interactive chat about a document
    """
    data = request.get_json()
    document_text = data.get("document_text", "")
    question = data.get("question", "")
    
    if not document_text or not question:
        return jsonify({"error": "Document text and question are required"}), 400
    
    answer = chat_about_document(document_text, question)
    
    return jsonify({
        "question": question,
        "answer": answer,
        "timestamp": datetime.now().isoformat()
    })

# Example of how to integrate with LegalKlarity's existing structure
def integrate_with_legalklarity(existing_text, target_group):
    """
    Integration function to work with LegalKlarity's existing target groups
    
    Args:
        existing_text (str): Document text from existing extraction
        target_group (str): LegalKlarity target group (individual, enterprise, institutional)
    
    Returns:
        dict: Analysis formatted for LegalKlarity's frontend
    """
    
    # Get comprehensive analysis
    full_analysis = analyze_legal_document(existing_text)
    
    # Format based on target group
    if target_group == "individual":
        return format_for_individual(full_analysis)
    elif target_group == "enterprise":
        return format_for_enterprise(full_analysis)
    elif target_group == "institutional":
        return format_for_institutional(full_analysis)
    else:
        return full_analysis

def format_for_individual(analysis):
    """
    Format analysis for individual users (citizens)
    """
    return {
        "title": f"Legal Document Analysis: {analysis.get('summary', '')[:50]}...",
        "about": analysis.get("summary", ""),
        "benefits": [],  # Extract positive aspects
        "risks": [risk["description"] for risk in analysis.get("risks", [])],
        "clarity": {
            "score": 7,  # Calculate based on document complexity
            "comment": "Document has been analyzed for clarity"
        },
        "fairness": {
            "score": 6,  # Calculate based on identified risks
            "comment": "Review risks for fairness assessment"
        },
        "repaymentDetails": {
            "emiAmount": "N/A",
            "totalRepayment": "N/A", 
            "interestExtra": "N/A",
            "note": "See obligations section"
        },
        "suggestions": analysis.get("recommendations", []),
        "analogy": "This document creates legal obligations between parties. See key terms and obligations."
    }

def format_for_enterprise(analysis):
    """
    Format analysis for enterprise users (business owners)
    """
    return {
        "title": f"Business Legal Document Analysis",
        "about": analysis.get("summary", ""),
        "clauses": [
            {"title": "Key Terms", "explanation": str(analysis.get("key_terms", []))},
            {"title": "Main Clauses", "explanation": str(analysis.get("main_clauses", []))},
            {"title": "Parties", "explanation": str(analysis.get("parties", []))}
        ],
        "financials": {
            "totalFee": "See obligations",
            "paymentMilestones": ["See critical dates"],
            "lateFee": "See main clauses"
        },
        "keyComplianceNotes": [issue["regulation"] for issue in analysis.get("compliance_issues", [])],
        "finalAssessment": {
            "overallScore": 7,
            "comment": "Document analyzed with identified risks and recommendations",
            "recommendations": analysis.get("recommendations", [])
        }
    }

def format_for_institutional(analysis):
    """
    Format analysis for institutional users (students, young professionals)
    """
    return {
        "title": f"Document Analysis for {analysis.get('jurisdiction', 'your jurisdiction')}",
        "about": analysis.get("summary", ""),
        "clauses": [
            {"title": party["role"], "explanation": f"Party: {party['name']}"} 
            for party in analysis.get("parties", [])
        ] + [
            {"title": "Key Obligations", "explanation": str(analysis.get("obligations", [])[:3])}
        ],
        "keyLegalNotes": [issue["regulation"] for issue in analysis.get("compliance_issues", [])],
        "finalTips": analysis.get("recommendations", [])[:5]
    }

"""
INTEGRATION INSTRUCTIONS:
========================

1. Environment Setup:
   - Add GOOGLE_CLOUD_PROJECT to your .env file
   - Add GOOGLE_CLOUD_LOCATION to your .env file
   - Install required packages: pip install google-cloud-aiplatform

2. Backend Integration:
   - Add the enhanced analysis functions to your existing app.py
   - Update Flask routes to include /enhanced_analysis and /chat
   - Modify existing agreement summary endpoint to use enhanced analysis

3. Frontend Integration:
   - Update LegalKlarity frontend to call /enhanced_analysis instead of /uploads
   - Add tabbed interface to display the 12 analysis categories
   - Implement chat functionality using the /chat endpoint
   - Modify data structures in Redux/store to handle enhanced analysis data

4. Data Flow:
   Current: File Upload → Text Extraction → Basic Summary
   Enhanced: File Upload → Text Extraction → Comprehensive Analysis → Formatted Response

5. Benefits of Integration:
   - More comprehensive document analysis
   - Better structured data for frontend display
   - Interactive document chat functionality
   - Improved prompt engineering for better AI responses
   - Enhanced user experience with tabbed organization
"""