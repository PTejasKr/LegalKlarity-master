import { ApiError } from '../utility/ApiError';

// Mock responses for different target groups
const MOCK_RESPONSES = {
  individual: {
    "title": "Rental Agreement Summary",
    "about": "This is a rental agreement between a landlord and tenant for a residential property. The agreement outlines the terms and conditions of the tenancy including rent, duration, and responsibilities of both parties.",
    "benefits": [
      "Clear terms regarding rent payment schedule",
      "Defined maintenance responsibilities",
      "Specified notice period for termination"
    ],
    "risks": [
      "Potential disputes over property damage deposits",
      "Unclear pet policy may lead to conflicts",
      "Late fee structure not clearly defined"
    ],
    "clarity": {
      "score": 8,
      "comment": "The agreement is generally clear about key terms, but could benefit from more specific definitions."
    },
    "fairness": {
      "score": 7,
      "comment": "Most terms are balanced, but some clauses favor the landlord."
    },
    "repaymentDetails": {
      "emiAmount": "N/A",
      "totalRepayment": "N/A",
      "interestExtra": "N/A",
      "note": "This is a rental agreement, not a loan document."
    },
    "suggestions": [
      "Clarify the pet policy with specific restrictions and additional deposits",
      "Define the late fee structure with exact amounts and grace periods",
      "Include a detailed move-out inspection checklist"
    ],
    "analogy": "Think of this rental agreement like a rulebook for living in a rented house. It tells you what you can and cannot do, how much you'll pay, and what happens if you break the rules."
  },
  
  enterprise: {
    "title": "Vendor Service Agreement – IT Support",
    "about": "This is a service agreement between a company and an IT vendor for ongoing technical support services. The agreement defines the scope of services, response times, and payment terms.",
    "clauses": [
      {
        "title": "Service Scope",
        "explanation": "The vendor will provide 24/7 IT support for hardware and software issues. This includes remote assistance and on-site visits for critical problems.",
        "risk": "The definition of 'critical problems' is somewhat vague and could lead to disputes about response times.",
        "improvement": "Create a detailed classification system for issue severity with specific response time requirements for each level."
      },
      {
        "title": "Payment Terms",
        "explanation": "Payment is due within 30 days of invoice receipt. Late payments incur a 1.5% monthly interest charge.",
        "risk": "The interest rate may be considered high and could strain the business relationship.",
        "improvement": "Consider negotiating a lower late fee percentage or extending the payment period to 45 days."
      },
      {
        "title": "Confidentiality",
        "explanation": "Both parties agree to maintain confidentiality of sensitive business information encountered during the service period.",
        "risk": "The duration of confidentiality obligations after contract termination is not specified.",
        "improvement": "Add a specific timeframe (e.g., 3 years) for post-termination confidentiality obligations."
      }
    ],
    "financials": {
      "totalFee": "₹45,000/month",
      "paymentMilestones": [
        "Monthly invoice based on actual hours worked",
        "Annual retainer fee of ₹1,00,000 included"
      ],
      "lateFee": "1.5% monthly interest on overdue payments"
    },
    "keyComplianceNotes": [
      "Complies with Indian Contract Act, 1872",
      "Data protection requirements under IT Act, 2000",
      "GST implications for service providers"
    ],
    "finalAssessment": {
      "overallScore": 8,
      "comment": "This is a solid agreement with clear service definitions and fair payment terms. Some clauses need more specificity to prevent future disputes.",
      "recommendations": [
        "Define service level agreements (SLAs) with specific metrics",
        "Clarify the confidentiality duration post-termination",
        "Negotiate more favorable late payment terms"
      ]
    }
  },
  
  institutional: {
    "title": "Internship Agreement – Software Development",
    "about": "This is an internship agreement between an educational institution and a company for a software development internship program. The agreement outlines the internship duration, responsibilities, and learning objectives.",
    "clauses": [
      {
        "title": "Internship Duration",
        "explanation": "The internship will last for 6 months, starting from the agreed start date. Either party may terminate the internship with 2 weeks' written notice."
      },
      {
        "title": "Work Hours",
        "explanation": "The intern is expected to work 8 hours per day, 5 days a week. Flexible hours may be allowed with prior approval from the supervisor."
      },
      {
        "title": "Stipend",
        "explanation": "The intern will receive a monthly stipend of ₹15,000. The stipend will be paid on the last working day of each month."
      },
      {
        "title": "Confidentiality",
        "explanation": "The intern agrees not to disclose any confidential information related to the company's projects, processes, or clients during and after the internship."
      },
      {
        "title": "Intellectual Property",
        "explanation": "Any work product, code, or inventions created by the intern during the internship will be the property of the company."
      },
      {
        "title": "Certificate",
        "explanation": "Upon successful completion of the internship, the intern will receive a completion certificate detailing the skills learned and projects worked on."
      }
    ],
    "keyLegalNotes": [
      "Governed by the Indian Contract Act, 1872",
      "Subject to labor laws and regulations for interns",
      "IP rights governed by the Copyright Act, 1957"
    ],
    "finalTips": [
      "Keep a detailed log of your work and projects for future reference",
      "Ask for regular feedback to improve your skills during the internship",
      "Clarify the learning objectives and expected outcomes at the beginning",
      "Understand the company's policies on remote work and leave",
      "Network with employees to build professional relationships"
    ]
  }
};

export async function mockSummarizeAgreement(prompt: string, targetGroup: string): Promise<any> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return appropriate mock response based on target group
  if (MOCK_RESPONSES[targetGroup as keyof typeof MOCK_RESPONSES]) {
    return MOCK_RESPONSES[targetGroup as keyof typeof MOCK_RESPONSES];
  }
  
  // Default response if target group not found
  return MOCK_RESPONSES.individual;
}

export async function mockProcessWithGemini(task: string): Promise<any> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Return a mock response for process tasks
  return {
    "processSteps": [
      "Identify the type of agreement needed",
      "Gather all necessary information and documents",
      "Draft the agreement with clear terms and conditions",
      "Review the draft with all parties involved",
      "Sign the agreement and maintain copies for records"
    ],
    "requiredDocuments": [
      "Identification documents of all parties",
      "Property documents (if applicable)",
      "Business registration certificates (if applicable)",
      "Previous agreements or contracts (if any)"
    ],
    "creationLinks": [
      {
        "name": "LegalKlarity Document Builder",
        "url": "https://legalklarity.com/document-builder",
        "disclaimer": "Our platform offers customizable templates for various agreements."
      },
      {
        "name": "Nolo Legal Forms",
        "url": "https://www.nolo.com/legal-forms/",
        "disclaimer": "Paid service with comprehensive legal forms and guidance."
      }
    ],
    "priceInfo": [
      "Basic agreement templates: ₹1,000 - ₹5,000",
      "Customized agreements with lawyer review: ₹10,000 - ₹25,000",
      "Full legal service including registration: ₹30,000 - ₹50,000"
    ],
    "needExpert": [
      "When the agreement involves complex legal terms or high-value transactions",
      "If there are disputes or unclear clauses that need interpretation",
      "For agreements that require registration or special legal compliance",
      "When you need assurance that the agreement is legally binding and enforceable"
    ]
  };
}