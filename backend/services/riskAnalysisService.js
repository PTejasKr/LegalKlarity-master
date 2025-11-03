// services/riskAnalysisService.js

const calculateRiskScore = (documentAnalysis) => {
  // This is a simplified risk calculation algorithm.
  // In a real application, this would be much more complex and based on legal expertise.
  
  let riskScore = 0;
  const riskFactors = [];
  
  // Check for financial risks
  if (documentAnalysis.text.includes('interest') || documentAnalysis.text.includes('fee')) {
    riskScore += 3;
    riskFactors.push({ category: 'Financial', risk: 'High interest rates or unclear fee structure' });
  }
  
  // Check for legal risks
  if (documentAnalysis.text.includes('termination') && !documentAnalysis.text.includes('notice')) {
    riskScore += 2;
    riskFactors.push({ category: 'Legal', risk: 'Ambiguous termination clauses' });
  }
  
  // Check for operational risks
  if (documentAnalysis.text.includes('service level') || documentAnalysis.text.includes('SLA')) {
    riskScore += 1;
    riskFactors.push({ category: 'Operational', risk: 'Limited service level agreements' });
  }
  
  // Check for reputational risks
  if (documentAnalysis.text.includes('data') && documentAnalysis.text.includes('privacy')) {
    riskScore += 2;
    riskFactors.push({ category: 'Reputational', risk: 'Data privacy concerns' });
  }
  
  // Normalize risk score to 1-10 scale
  riskScore = Math.min(10, Math.max(1, riskScore));
  
  return {
    score: riskScore,
    factors: riskFactors,
  };
};

const generateRiskReport = (riskAnalysis) => {
  const report = {
    overallScore: riskAnalysis.score,
    level: getRiskLevel(riskAnalysis.score),
    factors: riskAnalysis.factors,
    recommendations: generateRecommendations(riskAnalysis.factors),
  };
  
  return report;
};

const getRiskLevel = (score) => {
  if (score >= 8) return 'High';
  if (score >= 5) return 'Medium';
  return 'Low';
};

const generateRecommendations = (factors) => {
  const recommendations = [];
  
  factors.forEach(factor => {
    switch (factor.category) {
      case 'Financial':
        recommendations.push('Clarify all fee structures and payment terms. Consider adding a cap on variable interest rates.');
        break;
      case 'Legal':
        recommendations.push('Define clear termination conditions and notice periods. Add dispute resolution clauses.');
        break;
      case 'Operational':
        recommendations.push('Establish detailed service level agreements (SLAs) with specific performance metrics.');
        break;
      case 'Reputational':
        recommendations.push('Implement stronger data protection measures and obtain explicit consent for data usage.');
        break;
      default:
        recommendations.push('Review this clause with a legal professional for potential risks.');
    }
  });
  
  return recommendations;
};

module.exports = {
  calculateRiskScore,
  generateRiskReport
};