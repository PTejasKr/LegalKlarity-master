import { useState } from 'react';
import { FileText, Upload, Search, Filter } from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: string;
  lastModified: string;
  size: string;
}

const mockDocuments: Document[] = [
  { id: '1', name: 'Rental Agreement.pdf', type: 'PDF', lastModified: '2023-10-25', size: '1.2 MB' },
  { id: '2', name: 'Employment Contract.docx', type: 'DOCX', lastModified: '2023-10-20', size: '0.8 MB' },
  { id: '3', name: 'Loan Agreement.pdf', type: 'PDF', lastModified: '2023-10-15', size: '2.1 MB' },
  { id: '4', name: 'Service Agreement.docx', type: 'DOCX', lastModified: '2023-10-10', size: '1.5 MB' },
  { id: '5', name: 'Non-Disclosure Agreement.pdf', type: 'PDF', lastModified: '2023-10-05', size: '0.9 MB' },
];

export default function DocumentComparison() {
  const [documents] = useState<Document[]>(mockDocuments);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

  const handleDocumentSelect = (id: string) => {
    setSelectedDocuments(prev => 
      prev.includes(id) 
        ? prev.filter(docId => docId !== id) 
        : [...prev, id]
    );
  };

  const filteredDocuments = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-white rounded-xl shadow-md p-6 w-full dark:bg-slate-800 dark:shadow-slate-800/50">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 dark:text-white">Document Comparison</h2>
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Document List */}
        <div className="lg:w-1/3">
          <div className="flex items-center gap-2 mb-4">
            <Search size={20} className="text-gray-500 dark:text-slate-400" />
            <input
              type="text"
              placeholder="Search documents..."
              className="flex-grow px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="p-2 text-gray-500 hover:text-gray-700 dark:text-slate-400 dark:hover:text-slate-300">
              <Filter size={20} />
            </button>
          </div>
          
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {filteredDocuments.map(doc => (
              <div 
                key={doc.id}
                className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors ${
                  selectedDocuments.includes(doc.id) 
                    ? 'bg-blue-50 border-blue-500 dark:bg-blue-900/30 dark:border-blue-500' 
                    : 'bg-gray-50 border-gray-200 hover:bg-gray-100 dark:bg-slate-700 dark:border-slate-600 dark:hover:bg-slate-600'
                }`}
                onClick={() => handleDocumentSelect(doc.id)}
              >
                <FileText size={24} className="text-blue-500 dark:text-blue-400" />
                <div className="flex-grow">
                  <h3 className="font-medium text-gray-800 dark:text-white">{doc.name}</h3>
                  <div className="flex text-xs text-gray-500 dark:text-slate-400">
                    <span>{doc.type}</span>
                    <span className="mx-2">•</span>
                    <span>{doc.size}</span>
                    <span className="mx-2">•</span>
                    <span>{doc.lastModified}</span>
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  selectedDocuments.includes(doc.id)
                    ? 'bg-blue-500 border-blue-500'
                    : 'border-gray-300 dark:border-slate-500'
                }`}>
                  {selectedDocuments.includes(doc.id) && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4">
            <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors dark:bg-slate-700 dark:text-white dark:hover:bg-slate-600">
              <Upload size={20} />
              Upload New Document
            </button>
          </div>
        </div>
        
        {/* Comparison View */}
        <div className="lg:w-2/3">
          {selectedDocuments.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-slate-400">
              <FileText size={48} className="mb-4" />
              <p className="text-lg mb-2">No documents selected</p>
              <p>Select two documents to compare their content</p>
            </div>
          ) : selectedDocuments.length === 1 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-500 dark:text-slate-400">
              <FileText size={48} className="mb-4" />
              <p className="text-lg mb-2">Select another document</p>
              <p>Choose a second document to start comparison</p>
            </div>
          ) : (
            <div className="h-full">
              <h3 className="text-xl font-semibold text-gray-800 mb-4 dark:text-white">
                Comparing: {
                  documents.find(d => d.id === selectedDocuments[0])?.name
                } vs {
                  documents.find(d => d.id === selectedDocuments[1])?.name
                }
              </h3>
              
              <div className="border rounded-lg overflow-hidden dark:border-slate-700">
                <div className="grid grid-cols-2 bg-gray-50 border-b dark:bg-slate-700 dark:border-slate-600">
                  <div className="p-3 font-medium text-gray-700 dark:text-white">
                    {documents.find(d => d.id === selectedDocuments[0])?.name}
                  </div>
                  <div className="p-3 font-medium text-gray-700 dark:text-white">
                    {documents.find(d => d.id === selectedDocuments[1])?.name}
                  </div>
                </div>
                
                <div className="grid grid-cols-2 max-h-96 overflow-y-auto">
                  <div className="p-3 border-r dark:border-slate-700">
                    <div className="space-y-2">
                      <div className="p-2 bg-green-50 rounded dark:bg-green-900/30 dark:text-green-300">Clause 1: Parties - Added in Document 2</div>
                      <div className="p-2 dark:text-slate-300">Clause 2: Term - No changes</div>
                      <div className="p-2 bg-yellow-50 rounded dark:bg-yellow-900/30 dark:text-yellow-300">Clause 3: Payment - Modified in Document 2</div>
                      <div className="p-2 dark:text-slate-300">Clause 4: Termination - No changes</div>
                      <div className="p-2 bg-red-50 rounded dark:bg-red-900/30 dark:text-red-300">Clause 5: Confidentiality - Removed in Document 2</div>
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="space-y-2">
                      <div className="p-2 bg-green-50 rounded dark:bg-green-900/30 dark:text-green-300">Clause 1: Parties - Added in Document 2</div>
                      <div className="p-2 dark:text-slate-300">Clause 2: Term - No changes</div>
                      <div className="p-2 bg-yellow-50 rounded dark:bg-yellow-900/30 dark:text-yellow-300">Clause 3: Payment - Modified in Document 2</div>
                      <div className="p-2 dark:text-slate-300">Clause 4: Termination - No changes</div>
                      <div className="p-2 bg-red-50 rounded dark:bg-red-900/30 dark:text-red-300">Clause 5: Confidentiality - Removed in Document 2</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <h4 className="font-medium text-gray-800 mb-2 dark:text-white">Comparison Summary</h4>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-slate-400">
                  <li>• 1 clause added</li>
                  <li>• 1 clause modified</li>
                  <li>• 1 clause removed</li>
                  <li>• 2 clauses unchanged</li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}