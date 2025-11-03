import { useState } from 'react';
import { Plus, Save, Download, Eye } from 'lucide-react';

interface Clause {
  id: string;
  title: string;
  content: string;
  type: 'standard' | 'custom';
}

interface Template {
  id: string;
  name: string;
  description: string;
}

const mockClauses: Clause[] = [
  { id: '1', title: 'Parties', content: 'This Agreement is made between [Party A] and [Party B].', type: 'standard' },
  { id: '2', title: 'Term', content: 'This Agreement shall commence on [Start Date] and continue for [Term].', type: 'standard' },
  { id: '3', title: 'Payment', content: 'Party B shall pay Party A the sum of [Amount] for the services rendered.', type: 'standard' },
  { id: '4', title: 'Confidentiality', content: 'Both parties agree to maintain the confidentiality of proprietary information.', type: 'standard' },
];

const mockTemplates: Template[] = [
  { id: '1', name: 'Rental Agreement', description: 'Standard template for residential rental agreements' },
  { id: '2', name: 'Employment Contract', description: 'Template for employer-employee contracts' },
  { id: '3', name: 'Service Agreement', description: 'Template for service provider agreements' },
];

export default function ContractBuilder() {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [clauses, setClauses] = useState<Clause[]>(mockClauses);
  const [newClause, setNewClause] = useState({ title: '', content: '' });
  const [contractName, setContractName] = useState('New Contract');

  const handleAddClause = () => {
    if (newClause.title && newClause.content) {
      const clause: Clause = {
        id: (clauses.length + 1).toString(),
        title: newClause.title,
        content: newClause.content,
        type: 'custom'
      };
      setClauses([...clauses, clause]);
      setNewClause({ title: '', content: '' });
    }
  };

  const handleRemoveClause = (id: string) => {
    setClauses(clauses.filter(clause => clause.id !== id));
  };

  const handleSaveContract = () => {
    alert(`Contract "${contractName}" saved!`);
    // In a real app, this would save the contract to a database or file
  };

  const handleDownloadContract = () => {
    alert(`Downloading contract "${contractName}"...`);
    // In a real app, this would generate and download a document file
  };

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full dark:bg-slate-800 dark:shadow-slate-800/50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 dark:text-white">Contract Builder</h2>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Panel - Templates and Clauses */}
        <div className="lg:w-1/3">
          {/* Contract Name */}
          <div className="mb-6">
            <label htmlFor="contractName" className="block text-sm font-medium text-gray-700 mb-1 dark:text-slate-300">
              Contract Name
            </label>
            <input
              type="text"
              id="contractName"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"
              value={contractName}
              onChange={(e) => setContractName(e.target.value)}
            />
          </div>
          
          {/* Template Selection */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 dark:text-white">Templates</h3>
            <div className="space-y-2">
              {mockTemplates.map(template => (
                <div
                  key={template.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedTemplate === template.id
                      ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/30 dark:border-blue-500'
                      : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600'
                  }`}
                  onClick={() => setSelectedTemplate(template.id)}
                >
                  <h4 className="font-medium text-gray-800 dark:text-white">{template.name}</h4>
                  <p className="text-sm text-gray-600 dark:text-slate-400">{template.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          {/* Add Custom Clause */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-3 dark:text-white">Add Custom Clause</h3>
            <div className="space-y-3">
              <input
                type="text"
                placeholder="Clause Title"
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"
                value={newClause.title}
                onChange={(e) => setNewClause({...newClause, title: e.target.value})}
              />
              <textarea
                placeholder="Clause Content"
                rows={3}
                className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"
                value={newClause.content}
                onChange={(e) => setNewClause({...newClause, content: e.target.value})}
              />
              <button
                onClick={handleAddClause}
                className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors dark:bg-blue-600 dark:hover:bg-blue-700"
              >
                <Plus size={20} />
                Add Clause
              </button>
            </div>
          </div>
          
          {/* Actions */}
          <div className="space-y-3">
            <button
              onClick={handleSaveContract}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors dark:bg-green-600 dark:hover:bg-green-700"
            >
              <Save size={20} />
              Save Contract
            </button>
            <button
              onClick={handleDownloadContract}
              className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors dark:bg-purple-600 dark:hover:bg-purple-700"
            >
              <Download size={20} />
              Download as PDF
            </button>
          </div>
        </div>
        
        {/* Right Panel - Contract Preview */}
        <div className="lg:w-2/3">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white">Contract Preview</h3>
            <button className="flex items-center gap-2 px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600">
              <Eye size={16} />
              Preview
            </button>
          </div>
          
          <div className="border rounded-lg overflow-hidden dark:border-slate-700">
            <div className="bg-gray-50 p-4 border-b dark:bg-slate-700 dark:border-slate-600">
              <h1 className="text-2xl font-bold text-center text-gray-800 dark:text-white">{contractName}</h1>
            </div>
            
            <div className="p-6 dark:bg-slate-800">
              {clauses.map(clause => (
                <div key={clause.id} className="mb-6 group">
                  <div className="flex justify-between items-start mb-2">
                    <h2 className="text-xl font-semibold text-gray-800 dark:text-white">{clause.title}</h2>
                    {clause.type === 'custom' && (
                      <button
                        onClick={() => handleRemoveClause(clause.id)}
                        className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 transition-opacity dark:text-red-400 dark:hover:text-red-300"
                      >
                        Remove
                      </button>
                    )}
                  </div>
                  <p className="text-gray-700 dark:text-slate-300">{clause.content}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}