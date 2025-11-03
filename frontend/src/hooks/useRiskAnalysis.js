import { useState, useEffect } from 'react';

// Mock risk data for demonstration
const mockRiskData = [
  { category: 'Financial', score: 8, description: 'High interest rates and unclear fee structure' },
  { category: 'Legal', score: 6, description: 'Ambiguous termination clauses' },
  { category: 'Operational', score: 4, description: 'Limited service level agreements' },
  { category: 'Reputational', score: 7, description: 'Data privacy concerns' },
];

const mockComplianceData = [
  { area: 'Consumer Protection', compliance: 85 },
  { area: 'Data Privacy', compliance: 70 },
  { area: 'Contract Law', compliance: 90 },
  { area: 'Industry Regulations', compliance: 75 },
];

export const useRiskAnalysis = () => {
  const [riskData, setRiskData] = useState([]);
  const [complianceData, setComplianceData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch risk and compliance data
    const fetchRiskData = async () => {
      try {
        // In a real app, you would fetch this data from your backend
        // const response = await fetch('/api/risk-analysis');
        // const data = await response.json();
        
        // For now, we'll use mock data
        setRiskData(mockRiskData);
        setComplianceData(mockComplianceData);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchRiskData();
  }, []);

  const getRiskLevel = (score) => {
    if (score >= 8) return 'High';
    if (score >= 5) return 'Medium';
    return 'Low';
  };

  const getComplianceLevel = (score) => {
    if (score >= 90) return 'Excellent';
    if (score >= 75) return 'Good';
    if (score >= 60) return 'Fair';
    return 'Poor';
  };

  const getOverallRiskScore = () => {
    if (riskData.length === 0) return 0;
    const total = riskData.reduce((sum, item) => sum + item.score, 0);
    return Math.round(total / riskData.length);
  };

  const getOverallComplianceScore = () => {
    if (complianceData.length === 0) return 0;
    const total = complianceData.reduce((sum, item) => sum + item.compliance, 0);
    return Math.round(total / complianceData.length);
  };

  return {
    riskData,
    complianceData,
    loading,
    error,
    getRiskLevel,
    getComplianceLevel,
    getOverallRiskScore,
    getOverallComplianceScore
  };
};