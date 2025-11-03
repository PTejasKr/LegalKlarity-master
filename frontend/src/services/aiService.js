// services/aiService.js
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

export const analyzeDocument = async (documentText, documentType) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/analyze-document`, {
      text: documentText,
      type: documentType
    });
    
    return response.data;
  } catch (error) {
    console.error('Error analyzing document:', error);
    throw error;
  }
};

export const getRiskAssessment = async (documentId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/risk-assessment/${documentId}`);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching risk assessment:', error);
    throw error;
  }
};

export const getComplianceScore = async (documentId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/v1/compliance-score/${documentId}`);
    
    return response.data;
  } catch (error) {
    console.error('Error fetching compliance score:', error);
    throw error;
  }
};

export const generateContract = async (contractData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/generate-contract`, contractData);
    
    return response.data;
  } catch (error) {
    console.error('Error generating contract:', error);
    throw error;
  }
};

export const compareDocuments = async (documentIds) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/api/v1/compare-documents`, {
      documentIds
    });
    
    return response.data;
  } catch (error) {
    console.error('Error comparing documents:', error);
    throw error;
  }
};