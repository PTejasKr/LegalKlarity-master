// services/geminiService.js
const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const analyzeDocumentWithGemini = async (documentText, documentType, userRole) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
      Analyze the following ${documentType} document for a ${userRole}.
      Provide a comprehensive analysis including:
      1. Summary of key points
      2. Potential risks
      3. Benefits
      4. Clarity score (1-10)
      5. Recommendations for improvement
      
      Document:
      ${documentText}
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error analyzing document with Gemini:', error);
    throw error;
  }
};

const generateContractWithGemini = async (contractType, partyA, partyB, terms) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
      Generate a ${contractType} contract between ${partyA} and ${partyB} with the following terms:
      ${JSON.stringify(terms, null, 2)}
      
      Please provide a complete, legally sound contract with appropriate clauses.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error generating contract with Gemini:', error);
    throw error;
  }
};

const getLegalAdviceFromGemini = async (question, context) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `
      Provide legal advice for the following question:
      ${question}
      
      Context:
      ${context}
      
      Please provide a detailed, accurate response based on Indian law.
    `;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error('Error getting legal advice from Gemini:', error);
    throw error;
  }
};

module.exports = {
  analyzeDocumentWithGemini,
  generateContractWithGemini,
  getLegalAdviceFromGemini
};