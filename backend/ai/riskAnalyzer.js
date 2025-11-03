// ai/riskAnalyzer.js
const { calculateRiskScore, generateRiskReport } = require('../services/riskAnalysisService.js');

const analyzeDocumentRisk = async (documentAnalysis) => {
  try {
    const riskScore = calculateRiskScore(documentAnalysis);
    const riskReport = generateRiskReport(riskScore);
    return riskReport;
  } catch (error) {
    console.error('Error analyzing document risk:', error);
    throw error;
  }
};

module.exports = {
  analyzeDocumentRisk
};