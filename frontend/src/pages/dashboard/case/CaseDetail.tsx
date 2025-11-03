
import { useState } from "react";
import { ChevronDown, ChevronUp, Printer, Share2 } from "lucide-react";

export default function CaseSummary({ caseItem }: { caseItem: any }) {
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    facts: true,
    issues: true,
    arguments: true,
    reasoning: true,
    decision: true,
    principles: true
  });

  if (!caseItem) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
        <p className="text-gray-600">Loading case details...</p>
      </div>
    );
  }

  // Helper functions to handle different data formats
  const formatListItems = (items: any): string[] => {
    if (Array.isArray(items)) {
      return items;
    } else if (typeof items === 'string') {
      return items.split('\n').filter(item => item.trim() !== '');
    } else if (items && typeof items === 'object') {
      return Object.values(items);
    }
    return [];
  };

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const renderSection = (title: string, content: any, sectionKey: string) => {
    const items = formatListItems(content);
    
    if ((!content || (Array.isArray(items) && items.length === 0)) && typeof content !== 'string') {
      return null;
    }

    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <button
          onClick={() => toggleSection(sectionKey)}
          className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          {expandedSections[sectionKey] ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>
        
        {expandedSections[sectionKey] && (
          <div className="p-4 border-t border-gray-200">
            {typeof content === 'string' ? (
              <p className="text-gray-700 whitespace-pre-line">{content}</p>
            ) : items.length > 0 ? (
              <ul className="space-y-2">
                {items.map((item: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <span className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-primary-500 mr-3"></span>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No information available</p>
            )}
          </div>
        )}
      </div>
    );
  };

  const renderArgumentsSection = () => {
    const petitionerArgs = formatListItems(caseItem.arguments?.petitioner || []);
    const respondentArgs = formatListItems(caseItem.arguments?.respondent || []);
    
    if (petitionerArgs.length === 0 && respondentArgs.length === 0) {
      return null;
    }

    return (
      <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
        <button
          onClick={() => toggleSection('arguments')}
          className="flex items-center justify-between w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors"
        >
          <h3 className="text-lg font-semibold text-gray-900">Arguments</h3>
          {expandedSections.arguments ? (
            <ChevronUp className="h-5 w-5 text-gray-500" />
          ) : (
            <ChevronDown className="h-5 w-5 text-gray-500" />
          )}
        </button>
        
        {expandedSections.arguments && (
          <div className="p-4 border-t border-gray-200 space-y-6">
            {petitionerArgs.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3 border-l-4 border-blue-500 pl-2">Petitioner's Arguments</h4>
                <ul className="space-y-2">
                  {petitionerArgs.map((arg: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-blue-500 mr-3"></span>
                      <span className="text-gray-700">{arg}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            
            {respondentArgs.length > 0 && (
              <div>
                <h4 className="font-medium text-gray-900 mb-3 border-l-4 border-red-500 pl-2">Respondent's Arguments</h4>
                <ul className="space-y-2">
                  {respondentArgs.map((arg: string, index: number) => (
                    <li key={index} className="flex items-start">
                      <span className="flex-shrink-0 h-2 w-2 mt-2 rounded-full bg-red-500 mr-3"></span>
                      <span className="text-gray-700">{arg}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Case Header */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              {caseItem.caseTitle || 'Case Title'}
            </h1>
            <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">{caseItem.court || 'Court'}</span>
              <span>•</span>
              <span>{caseItem.citation || 'Citation'}</span>
            </div>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <Printer className="h-4 w-4 mr-2" />
              Print
            </button>
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500">
              <Share2 className="h-4 w-4 mr-2" />
              Share
            </button>
          </div>
        </div>
        
        {caseItem.parties && (
          <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-100">
            <h3 className="font-medium text-blue-900 mb-2">Parties Involved</h3>
            <p className="text-blue-800">
              {typeof caseItem.parties === 'string' 
                ? caseItem.parties 
                : `${caseItem.parties?.petitioner || 'Petitioner'} vs. ${caseItem.parties?.respondent || 'Respondent'}`
              }
            </p>
          </div>
        )}
      </div>

      {/* Case Details Sections */}
      <div className="space-y-6">
        {renderSection("Facts of the Case", caseItem.facts, "facts")}
        {renderSection("Key Legal Issues", caseItem.issues, "issues")}
        {renderArgumentsSection()}
        {renderSection("Court's Reasoning", caseItem.reasoning, "reasoning")}
        {renderSection("Final Decision", caseItem.decision, "decision")}
        {renderSection("Legal Principles Established", caseItem.principles, "principles")}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>Case summary generated by LegalKlarity • Powered by IndianKanoon.org and AI analysis</p>
      </div>
    </div>
  );
}
