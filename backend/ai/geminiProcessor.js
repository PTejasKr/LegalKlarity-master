// ai/geminiProcessor.js
const { analyzeDocumentWithGemini, generateContractWithGemini, getLegalAdviceFromGemini } = require('../services/geminiService.js');

const processDocumentWithGemini = async (documentText, documentType, userRole) => {
  try {
    const analysis = await analyzeDocumentWithGemini(documentText, documentType, userRole);
    return analysis;
  } catch (error) {
    console.error('Error processing document with Qwen:', error);
    throw error;
  }
};

const generateContractFromGemini = async (contractType, partyA, partyB, terms) => {
  try {
    const contract = await generateContractWithGemini(contractType, partyA, partyB, terms);
    return contract;
  } catch (error) {
    console.error('Error generating contract with Qwen:', error);
    throw error;
  }
};

const getLegalAdviceFromQwen = async (question, context) => {
  try {
    const advice = await getLegalAdviceFromGemini(question, context);
    return advice;
  } catch (error) {
    console.error('Error getting legal advice from Qwen:', error);
    throw error;
  }
};

module.exports = {
  processDocumentWithGemini,
  generateContractFromGemini,
  getLegalAdviceFromQwen
};