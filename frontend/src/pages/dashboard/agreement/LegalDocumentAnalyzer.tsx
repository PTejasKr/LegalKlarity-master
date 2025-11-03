import React, { useState, useRef } from "react";
import { Upload, FileText, Loader2, Key, ClipboardList, AlertTriangle, Lightbulb, Users, Gavel, Calendar, FileQuestion, ShieldCheck, Rocket, Download, Printer, Share2 } from "lucide-react";
import { motion } from "framer-motion";
import api from "../../../utils/baseApi";
import { useAppSelector } from "../../../hooks/redux";

const LegalDocumentAnalyzer = () => {
  const [file, setFile] = useState<File | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [dragActive, setDragActive] = useState(false);
  const [activeTab, setActiveTab] = useState("summary");
  const [targetGroup, setTargetGroup] = useState("individual");
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Get authenticated user from Redux store
  const { user } = useAppSelector((state) => state.auth);

  const handleFiles = (files: FileList) => {
    if (files && files[0]) {
      const selectedFile = files[0];
      const fileType = selectedFile.type;
      const fileSize = selectedFile.size;

      // Validate file type
      if (!fileType.match("application/pdf") && 
          !fileType.match("application/vnd.openxmlformats-officedocument.wordprocessingml.document")) {
        alert("Invalid file type: Please upload a PDF or DOCX file.");
        return;
      }

      // Validate file size (limit to 200MB)
      if (fileSize > 200 * 1024 * 1024) {
        alert("File too large: Please upload a file smaller than 200MB.");
        return;
      }

      setFile(selectedFile);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const onButtonClick = () => {
    fileInputRef.current?.click();
  };

  const handleAnalyze = async () => {
    if (!file) return;

    setIsAnalyzing(true);
    
    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('file', file);
      formData.append('uid', user?.uid || 'test-user-id'); // Use actual user ID or fallback to test ID
      formData.append('targetGroup', targetGroup);
      formData.append('language', 'en');

      // Call the backend API for enhanced agreement analysis
      const response = await api.post('/api/v1/agreements/enhanced-analysis', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log("API Response:", response.data);

      setAnalysis({
        analysis: response.data.data.analysis,
        filename: response.data.data.filename,
        timestamp: new Date().toISOString()
      });
      
      console.log("Analysis complete!");
      setIsAnalyzing(false);
    } catch (error: any) {
      console.error("Analysis error:", error);
      alert("Analysis failed: " + (error.message || "Failed to analyze the document. Please try again."));
      setIsAnalyzing(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setAnalysis(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  // Helper function to render key terms
  const renderKeyTerms = (terms: string[] | undefined) => {
    if (!terms || terms.length === 0) {
      return <p className="text-muted-foreground">No key terms defined.</p>;
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {terms.map((term: string, index: number) => {
          // Split the term into key and definition
          const [key, definition] = term.includes(": ") ? term.split(": ") : [term, ""];
          return (
            <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 dark:bg-slate-800 dark:border-slate-700">
              <h4 className="font-semibold text-blue-600 dark:text-blue-400">{key}</h4>
              <p className="text-sm text-gray-500 mt-1 dark:text-slate-400">{definition}</p>
            </div>
          );
        })}
      </div>
    );
  };

  // Helper function to render clauses (for enterprise target group)
  const renderClauses = (clauses: any[] | undefined) => {
    if (!clauses || clauses.length === 0) {
      return <p className="text-muted-foreground">No clauses available.</p>;
    }

    return (
      <div className="space-y-4">
        {clauses.map((clause: any, index: number) => (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 dark:bg-slate-800 dark:border-slate-700">
            <h4 className="font-semibold text-blue-600 dark:text-blue-400">{clause.title}</h4>
            {clause.explanation && <p className="text-sm text-gray-500 mt-1 dark:text-slate-400">{clause.explanation}</p>}
            {clause.risk && clause.risk !== "N/A" && (
              <div className="mt-2 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                <span className="text-sm"><strong>Risk:</strong> {clause.risk}</span>
              </div>
            )}
            {clause.improvement && clause.improvement !== "N/A" && (
              <div className="mt-2 flex items-start gap-2">
                <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5" />
                <span className="text-sm"><strong>Improvement:</strong> {clause.improvement}</span>
              </div>
            )}
          </div>
        ))}
      </div>
    );
  };

  // Helper function to render list items
  const renderListItems = (items: string[] | undefined, icon?: React.ReactNode) => {
    if (!items || items.length === 0) {
      return <p className="text-muted-foreground">No information available.</p>;
    }

    return (
      <ul className="space-y-2">
        {items.map((item: string, index: number) => (
          <li key={index} className="flex items-start gap-2">
            {icon && <span className="mt-1 flex-shrink-0">{icon}</span>}
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  };

  // Download report function
  const downloadReport = () => {
    if (!analysis) return;
    
    const reportContent = `
LEGAL DOCUMENT ANALYSIS REPORT
==============================

Document: ${analysis.filename}
Analyzed on: ${new Date(analysis.timestamp).toLocaleString()}

SUMMARY
-------
${analysis.analysis.summary || "No summary available"}

KEY TERMS
---------
${analysis.analysis.key_terms ? analysis.analysis.key_terms.join("\n") : "No key terms defined"}

MAIN CLAUSES
------------
${analysis.analysis.main_clauses ? analysis.analysis.main_clauses.join("\n") : "No main clauses defined"}

RISKS
-----
${analysis.analysis.risks ? analysis.analysis.risks.join("\n") : "No risks identified"}

RECOMMENDATIONS
---------------
${analysis.analysis.recommendations ? analysis.analysis.recommendations.join("\n") : "No recommendations provided"}

PARTIES
-------
${analysis.analysis.parties ? analysis.analysis.parties.join("\n") : "No parties identified"}

JURISDICTION
------------
${analysis.analysis.jurisdiction || "Not specified"}

OBLIGATIONS
-----------
${analysis.analysis.obligations ? analysis.analysis.obligations.join("\n") : "No obligations defined"}

CRITICAL DATES
--------------
${analysis.analysis.critical_dates ? analysis.analysis.critical_dates.join("\n") : "No critical dates identified"}

MISSING OR UNUSUAL CLAUSES
--------------------------
${analysis.analysis.missing_or_unusual ? analysis.analysis.missing_or_unusual.join("\n") : "No missing or unusual clauses identified"}

COMPLIANCE ISSUES
-----------------
${analysis.analysis.compliance_issues ? analysis.analysis.compliance_issues.join("\n") : "No compliance issues identified"}

NEXT STEPS
----------
${analysis.analysis.next_steps ? analysis.analysis.next_steps.join("\n") : "No next steps provided"}
    `.trim();

    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `legal-analysis-${analysis.filename.replace(/\.[^/.]+$/, "")}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Print summary function
  const printSummary = () => {
    if (!analysis) return;
    
    const printContent = `
<html>
<head>
  <title>Legal Document Analysis - ${analysis.filename}</title>
  <style>
    body { font-family: Arial, sans-serif; margin: 20px; }
    h1, h2, h3 { color: #333; }
    .section { margin-bottom: 20px; }
    .section-title { border-bottom: 2px solid #333; padding-bottom: 5px; margin-bottom: 10px; }
  </style>
</head>
<body>
  <h1>Legal Document Analysis Report</h1>
  <p><strong>Document:</strong> ${analysis.filename}</p>
  <p><strong>Analyzed on:</strong> ${new Date(analysis.timestamp).toLocaleString()}</p>
  
  <div class="section">
    <h2 class="section-title">Summary</h2>
    <p>${analysis.analysis.summary || "No summary available"}</p>
  </div>
  
  <div class="section">
    <h2 class="section-title">Key Terms</h2>
    <ul>
      ${(analysis.analysis.key_terms || []).map((term: string) => `<li>${term}</li>`).join('')}
    </ul>
  </div>
  
  <div class="section">
    <h2 class="section-title">Main Risks</h2>
    <ul>
      ${(analysis.analysis.risks || []).map((risk: string) => `<li>${risk}</li>`).join('')}
    </ul>
  </div>
  
  <div class="section">
    <h2 class="section-title">Recommendations</h2>
    <ul>
      ${(analysis.analysis.recommendations || []).map((rec: string) => `<li>${rec}</li>`).join('')}
    </ul>
  </div>
</body>
</html>
    `.trim();

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write(printContent);
      printWindow.document.close();
      printWindow.print();
    }
  };

  // Share analysis function
  const shareAnalysis = async () => {
    if (!analysis) return;
    
    const shareData = {
      title: 'Legal Document Analysis',
      text: `Check out this legal document analysis for ${analysis.filename}: ${analysis.analysis.summary || 'No summary available'}`,
      url: window.location.href
    };
    
    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        const textToCopy = `Legal Document Analysis for ${analysis.filename}

Summary: ${analysis.analysis.summary || 'No summary available'}

View full analysis: ${window.location.href}`;
        await navigator.clipboard.writeText(textToCopy);
        alert('Analysis link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
      alert('Failed to share. Link copied to clipboard instead.');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  // Tab definitions
  const tabs = [
    { id: "summary", label: "Summary", icon: <FileText className="h-4 w-4" /> },
    { id: "key-terms", label: "Key Terms", icon: <Key className="h-4 w-4" /> },
    { id: "main-clauses", label: "Main Clauses", icon: <ClipboardList className="h-4 w-4" /> },
    { id: "risks", label: "Risks", icon: <AlertTriangle className="h-4 w-4" /> },
    { id: "recommendations", label: "Recommendations", icon: <Lightbulb className="h-4 w-4" /> },
    { id: "parties", label: "Parties", icon: <Users className="h-4 w-4" /> },
    { id: "more", label: "More", icon: <Gavel className="h-4 w-4" /> }
  ];

  // Target group options
  const targetGroupOptions = [
    { value: "individual", label: "Individual" },
    { value: "enterprise", label: "Enterprise" },
    { value: "institutional", label: "Institutional" }
  ];

  return (
    <motion.div
      className="min-h-screen max-w-7xl mx-auto p-6 space-y-6 mt-24 dark:bg-slate-900"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      {/* Header */}
      <header className="mb-8 text-center">
        <h1 className="text-4xl font-bold text-black flex items-center justify-center gap-2 tracking-tight dark:text-white">
          ⚖️ Legal Document Analyzer
        </h1>
        <p className="text-gray-800 text-lg mt-2 dark:text-slate-300">
          Simplify Complex Legal Documents with AI
        </p>
      </header>

      {!analysis ? (
        <div className="space-y-6">
          {/* Target Group Selection */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 dark:bg-slate-800 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <Users className="h-5 w-5" />
              <h2 className="text-xl font-semibold">👤 Select Target Group</h2>
            </div>
            <p className="text-gray-500 mb-4 dark:text-slate-400">
              Choose the target group for analysis to get tailored insights
            </p>
            
            <div className="flex flex-wrap gap-4">
              {targetGroupOptions.map((option) => (
                <button
                  key={option.value}
                  className={`px-6 py-3 rounded-lg border transition-colors ${
                    targetGroup === option.value
                      ? "bg-blue-600 text-white border-blue-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600"
                  }`}
                  onClick={() => setTargetGroup(option.value)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* File Upload Card */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 dark:bg-slate-800 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5" />
              <h2 className="text-xl font-semibold">📄 Upload Your Legal Document</h2>
            </div>
            <p className="text-gray-500 mb-4 dark:text-slate-400">
              Choose a document to analyze. Supported formats: PDF, DOCX
            </p>
            
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
                dragActive 
                  ? "border-blue-500 bg-blue-50 dark:bg-slate-700" 
                  : "border-gray-300 hover:border-blue-500 dark:border-slate-600"
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
              onClick={onButtonClick}
            >
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept=".pdf,.docx"
                onChange={handleChange}
              />
              
              {file ? (
                <div className="space-y-4">
                  <FileText className="mx-auto h-12 w-12 text-gray-400" />
                  <div>
                    <p className="font-medium">{file.name}</p>
                    <p className="text-sm text-gray-500 dark:text-slate-400">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                  <div className="flex gap-2 justify-center">
                    <button 
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeFile();
                      }}
                    >
                      Remove
                    </button>
                    <button 
                      className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                        isAnalyzing ? "opacity-75 cursor-not-allowed" : ""
                      }`}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAnalyze();
                      }}
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin inline" />
                          Analyzing...
                        </>
                      ) : (
                        "Analyze Document"
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  <Upload className="mx-auto h-12 w-12 text-gray-400" />
                  <div>
                    <p className="font-medium">Drag and drop file here</p>
                    <p className="text-sm text-gray-500 dark:text-slate-400">
                      Limit 200MB per file • PDF, DOCX
                    </p>
                  </div>
                  <button className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Choose File
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 dark:bg-slate-800 dark:border-slate-700">
            <h2 className="text-xl font-semibold mb-4">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="text-center p-4">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 dark:bg-slate-700">
                  <span className="text-blue-600 font-bold">1</span>
                </div>
                <h3 className="font-semibold">Upload Document</h3>
                <p className="text-sm text-gray-500 mt-1 dark:text-slate-400">
                  Choose any legal document in PDF or DOCX format
                </p>
              </div>
              <div className="text-center p-4">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 dark:bg-slate-700">
                  <span className="text-blue-600 font-bold">2</span>
                </div>
                <h3 className="font-semibold">AI Analysis</h3>
                <p className="text-sm text-gray-500 mt-1 dark:text-slate-400">
                  Our AI breaks down complex legal jargon
                </p>
              </div>
              <div className="text-center p-4">
                <div className="bg-blue-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-2 dark:bg-slate-700">
                  <span className="text-blue-600 font-bold">3</span>
                </div>
                <h3 className="font-semibold">Get Insights</h3>
                <p className="text-sm text-gray-500 mt-1 dark:text-slate-400">
                  Understand risks, obligations, and next steps
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Analysis Results */
        <div className="space-y-6">
          {/* Document Summary */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 dark:bg-slate-800 dark:border-slate-700">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="h-5 w-5" />
              <h2 className="text-xl font-semibold">📝 Document Summary</h2>
            </div>
            <p className="text-gray-500 dark:text-slate-400">
              {analysis.analysis.summary || analysis.analysis.about || "No summary available."}
            </p>
          </div>

          {/* Tab Navigation - Simple button approach since we don't have Tabs component */}
          <div className="flex flex-wrap gap-2 mb-4">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`px-4 py-2 text-sm font-medium rounded-md flex items-center gap-2 ${
                  activeTab === tab.id
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.icon}
                <span className="hidden sm:inline">{tab.label}</span>
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 dark:bg-slate-800 dark:border-slate-700">
            <div className="p-6">
              {activeTab === "summary" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">📝 Document Summary</h3>
                  <p className="text-gray-500 dark:text-slate-400">{analysis.analysis.summary || analysis.analysis.about}</p>
                </div>
              )}

              {activeTab === "key-terms" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">🔑 Key Terms</h3>
                  {analysis.analysis.key_terms ? (
                    renderKeyTerms(analysis.analysis.key_terms)
                  ) : analysis.analysis.clauses ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {analysis.analysis.clauses.map((clause: any, index: number) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 dark:bg-slate-800 dark:border-slate-700">
                          <h4 className="font-semibold text-blue-600 dark:text-blue-400">{clause.title}</h4>
                          <p className="text-sm text-gray-500 mt-1 dark:text-slate-400">{clause.explanation}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No key terms defined.</p>
                  )}
                </div>
              )}

              {activeTab === "main-clauses" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">📋 Main Clauses</h3>
                  {analysis.analysis.clauses ? (
                    renderClauses(analysis.analysis.clauses)
                  ) : analysis.analysis.main_clauses ? (
                    renderListItems(analysis.analysis.main_clauses, <ClipboardList className="h-4 w-4" />)
                  ) : (
                    <p className="text-muted-foreground">No main clauses defined.</p>
                  )}
                </div>
              )}

              {activeTab === "risks" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">⚠️ Potential Risks</h3>
                  {analysis.analysis.risks ? (
                    renderListItems(analysis.analysis.risks, <AlertTriangle className="h-4 w-4" />)
                  ) : analysis.analysis.clauses ? (
                    <div className="space-y-4">
                      {analysis.analysis.clauses.filter((clause: any) => clause.risk && clause.risk !== "N/A").map((clause: any, index: number) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 dark:bg-slate-800 dark:border-slate-700">
                          <h4 className="font-semibold text-blue-600 dark:text-blue-400">{clause.title}</h4>
                          <div className="mt-2 flex items-start gap-2">
                            <AlertTriangle className="h-4 w-4 text-yellow-500 mt-0.5" />
                            <span className="text-sm"><strong>Risk:</strong> {clause.risk}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-muted-foreground">No risks identified.</p>
                  )}
                </div>
              )}

              {activeTab === "recommendations" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">💡 Recommendations</h3>
                  {analysis.analysis.recommendations ? (
                    renderListItems(analysis.analysis.recommendations, <Lightbulb className="h-4 w-4" />)
                  ) : analysis.analysis.clauses ? (
                    <div className="space-y-4">
                      {analysis.analysis.clauses.filter((clause: any) => clause.improvement && clause.improvement !== "N/A").map((clause: any, index: number) => (
                        <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 dark:bg-slate-800 dark:border-slate-700">
                          <h4 className="font-semibold text-blue-600 dark:text-blue-400">{clause.title}</h4>
                          <div className="mt-2 flex items-start gap-2">
                            <Lightbulb className="h-4 w-4 text-blue-500 mt-0.5" />
                            <span className="text-sm"><strong>Improvement:</strong> {clause.improvement}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : analysis.analysis.finalAssessment ? (
                    renderListItems(analysis.analysis.finalAssessment.recommendations, <Lightbulb className="h-4 w-4" />)
                  ) : analysis.analysis.finalTips ? (
                    renderListItems(analysis.analysis.finalTips, <Lightbulb className="h-4 w-4" />)
                  ) : (
                    <p className="text-muted-foreground">No recommendations provided.</p>
                  )}
                </div>
              )}

              {activeTab === "parties" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">👥 Parties</h3>
                  {renderListItems(analysis.analysis.parties, <Users className="h-4 w-4" />)}
                  
                  <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">📌 Obligations</h4>
                      {renderListItems(analysis.analysis.obligations, <ClipboardList className="h-4 w-4" />)}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">⚖️ Jurisdiction</h4>
                      <p>{analysis.analysis.jurisdiction || "Not specified"}</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "more" && (
                <div>
                  <h3 className="text-lg font-semibold mb-4">More Analysis</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold mb-2">📅 Critical Dates</h4>
                      {renderListItems(analysis.analysis.critical_dates, <Calendar className="h-4 w-4" />)}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">❗ Missing/Unusual</h4>
                      {renderListItems(analysis.analysis.missing_or_unusual, <FileQuestion className="h-4 w-4" />)}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">🛑 Compliance Issues</h4>
                      {analysis.analysis.keyComplianceNotes ? (
                        renderListItems(analysis.analysis.keyComplianceNotes, <ShieldCheck className="h-4 w-4" />)
                      ) : (
                        renderListItems(analysis.analysis.compliance_issues, <ShieldCheck className="h-4 w-4" />)
                      )}
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">➡️ Next Steps</h4>
                      {analysis.analysis.next_steps ? (
                        renderListItems(analysis.analysis.next_steps, <Rocket className="h-4 w-4" />)
                      ) : analysis.analysis.finalAssessment ? (
                        renderListItems(analysis.analysis.finalAssessment.recommendations, <Rocket className="h-4 w-4" />)
                      ) : analysis.analysis.finalTips ? (
                        renderListItems(analysis.analysis.finalTips, <Rocket className="h-4 w-4" />)
                      ) : (
                        <p className="text-muted-foreground">No next steps provided.</p>
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-4 justify-center">
            <button 
              className="px-6 py-3 bg-blue-600 text-white rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
              onClick={downloadReport}
            >
              <Download className="h-5 w-5" />
              Download Report
            </button>
            <button 
              className="px-6 py-3 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 transition-colors"
              onClick={printSummary}
            >
              <Printer className="h-5 w-5" />
              Print Summary
            </button>
            <button 
              className="px-6 py-3 bg-purple-600 text-white rounded-lg flex items-center gap-2 hover:bg-purple-700 transition-colors"
              onClick={shareAnalysis}
            >
              <Share2 className="h-5 w-5" />
              Share Analysis
            </button>
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default LegalDocumentAnalyzer;