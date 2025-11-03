import { useState } from "react";
import { Search, FileText, AlertCircle, Loader2 } from "lucide-react";
import { agreementProcessAsync } from "../../../store/agreementSlice";
import { toast } from "react-toastify";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";

// Predefined common agreement types
const COMMON_AGREEMENTS = [
  "Rental Agreement",
  "Employment Contract",
  "Loan Agreement",
  "Marriage Contract",
  "Service Agreement",
  "Non-Disclosure Agreement",
  "Partnership Agreement",
  "Sales Agreement"
];

export default function AgreementProcess() {
    const dispatch = useAppDispatch();
    const { user } = useAppSelector((state) => state.auth);
    const [loading, setLoading] = useState(false);
    const [showDetails, setShowDetails] = useState<any>(false);
    const [query, setQuery] = useState("");

    const handleView = async (agreementType?: string) => {
        const typeToUse = agreementType || query;
        
        // Validate that the agreement type is in our predefined list
        if (!COMMON_AGREEMENTS.includes(typeToUse)) {
            toast.error("Please select a valid agreement type from the options provided.");
            return;
        }
        
        setLoading(true);
        setQuery(typeToUse);

        try {
            if (!user || !user.uid) {
                toast.error("You must be logged in to view agreement processes.");
                return;
            }
            
            const response: any = await dispatch(agreementProcessAsync({ uid: user.uid, processType: typeToUse })).unwrap();

            if (response?.statusCode === 200 || response?.success === true) {
                setShowDetails(response.data);
                toast.success("Process information loaded successfully!");
                setLoading(false);
            } else {
                toast.error(response?.message || "Failed to fetch process details");
                setLoading(false);
            }
        } catch (error) {
            toast.error("Error fetching process details. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleView();
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
            {/* Header */}
            <div className="bg-white shadow-sm dark:bg-slate-800 dark:shadow-slate-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="text-center">
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3 dark:text-white">
                            Document Process Guide
                        </h1>
                        <p className="text-lg text-gray-600 max-w-3xl mx-auto dark:text-slate-300">
                            Get step-by-step guidance for drafting, reviewing, and executing legal documents
                        </p>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search Section */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200 dark:bg-slate-800 dark:border-slate-700">
                    <div className="max-w-3xl mx-auto">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <Search className="h-5 w-5 text-gray-400 dark:text-slate-500" />
                            </div>
                            <input
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                onKeyPress={handleKeyPress}
                                placeholder="Or enter an agreement type (must be from the list above)"
                                className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 outline-none transition dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:placeholder-slate-400"
                            />
                        </div>
                        <div className="mt-4 flex justify-center">
                            <button
                                onClick={() => handleView()}
                                disabled={loading}
                                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 dark:from-primary-700 dark:to-indigo-700 dark:hover:from-primary-600 dark:hover:to-indigo-600 dark:focus:ring-offset-slate-900"
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                                        Searching...
                                    </>
                                ) : (
                                    <>
                                        <Search className="mr-2 h-5 w-5" />
                                        Find Process
                                    </>
                                )}
                            </button>
                        </div>
                        <div className="mt-4 text-center">
                            <p className="text-sm text-gray-500 dark:text-slate-400">
                                Select from the common agreement types above for best results
                            </p>
                        </div>
                    </div>
                </div>

                {/* Common Agreement Types */}
                <div className="bg-white rounded-xl shadow-sm p-6 mb-8 border border-gray-200 dark:bg-slate-800 dark:border-slate-700">
                    <h2 className="text-xl font-bold text-gray-900 mb-4 dark:text-white">Common Agreement Types</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                        {COMMON_AGREEMENTS.map((agreement) => (
                            <button
                                key={agreement}
                                onClick={() => handleView(agreement)}
                                disabled={loading}
                                className={`p-4 text-center rounded-lg border transition-all ${
                                    query === agreement
                                        ? "border-primary-500 bg-primary-50 text-primary-700 dark:bg-primary-900/30 dark:border-primary-500 dark:text-primary-300"
                                        : "border-gray-200 hover:bg-gray-50 dark:border-slate-600 dark:hover:bg-slate-700"
                                }`}
                            >
                                <FileText className="h-6 w-6 mx-auto mb-2 text-gray-500 dark:text-slate-400" />
                                <span className="text-sm font-medium text-gray-700 dark:text-slate-300">
                                    {agreement}
                                </span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Results */}
                {loading ? (
                    <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-200 flex flex-col items-center dark:bg-slate-800 dark:border-slate-700">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mb-4"></div>
                        <p className="text-gray-600 dark:text-slate-400">Analyzing agreement process details...</p>
                    </div>
                ) : showDetails ? (
                    <div className="space-y-6">
                        {/* Process Overview Card */}
                        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 dark:bg-slate-800 dark:border-slate-700">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-blue-100 text-blue-600 dark:bg-blue-900/30 dark:text-blue-400">
                                        <FileText className="h-6 w-6" />
                                    </div>
                                </div>
                                <div className="ml-4">
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {query ? `${query} Process` : 'Document Process'}
                                    </h2>
                                    <p className="mt-1 text-gray-600 dark:text-slate-400">
                                        Complete guide with steps, requirements, and resources
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Process Steps */}
                        {showDetails.processSteps && Array.isArray(showDetails.processSteps) && (
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 dark:bg-slate-800 dark:border-slate-700">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center dark:text-white">
                                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-800 mr-3 dark:bg-blue-900/30 dark:text-blue-400">
                                        1
                                    </span>
                                    Process Steps
                                </h3>
                                <div className="space-y-4">
                                    {showDetails.processSteps.map((step: string, index: number) => (
                                        <div key={index} className="flex">
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="flex items-center justify-center h-6 w-6 rounded-full bg-gray-200 text-gray-600 text-xs dark:bg-slate-700 dark:text-slate-300">
                                                    {index + 1}
                                                </div>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-gray-700 dark:text-slate-300">{step}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Required Documents */}
                        {showDetails.requiredDocuments && Array.isArray(showDetails.requiredDocuments) && (
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 dark:bg-slate-800 dark:border-slate-700">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center dark:text-white">
                                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-green-100 text-green-800 mr-3 dark:bg-green-900/30 dark:text-green-400">
                                        2
                                    </span>
                                    Required Documents
                                </h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {showDetails.requiredDocuments.map((doc: string, index: number) => (
                                        <div key={index} className="flex items-start p-4 bg-gray-50 rounded-lg dark:bg-slate-700">
                                            <div className="flex-shrink-0 mt-1">
                                                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                            </div>
                                            <div className="ml-3">
                                                <p className="text-gray-700 dark:text-slate-300">{doc}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Online Creation Resources */}
                        {showDetails.creationLinks && Array.isArray(showDetails.creationLinks) && (
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 dark:bg-slate-800 dark:border-slate-700">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center dark:text-white">
                                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-purple-100 text-purple-800 mr-3 dark:bg-purple-900/30 dark:text-purple-400">
                                        3
                                    </span>
                                    Create Agreement Online
                                </h3>
                                <div className="space-y-4">
                                    {showDetails.creationLinks.map((link: any, index: number) => (
                                        <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition dark:border-slate-600 dark:hover:bg-slate-700">
                                            {link.url && link.url !== 'N/A' ? (
                                                <a 
                                                    href={link.url} 
                                                    target="_blank" 
                                                    rel="noopener noreferrer"
                                                    className="flex items-center justify-between"
                                                >
                                                    <div>
                                                        <h4 className="font-medium text-gray-900 dark:text-white">{link.name || link.document}</h4>
                                                        {link.disclaimer && (
                                                            <p className="mt-1 text-sm text-gray-500 dark:text-slate-400">{link.disclaimer}</p>
                                                        )}
                                                    </div>
                                                    <span className="text-primary-600 text-sm font-medium dark:text-primary-400">Visit →</span>
                                                </a>
                                            ) : (
                                                <div>
                                                    <h4 className="font-medium text-gray-900 dark:text-white">{link.name || link.document}</h4>
                                                    {link.disclaimer && (
                                                        <p className="mt-1 text-sm text-gray-500 italic dark:text-slate-400">{link.disclaimer}</p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Pricing Information */}
                        {showDetails.priceInfo && Array.isArray(showDetails.priceInfo) && (
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 dark:bg-slate-800 dark:border-slate-700">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center dark:text-white">
                                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-amber-100 text-amber-800 mr-3 dark:bg-amber-900/30 dark:text-amber-400">
                                        4
                                    </span>
                                    Pricing Information
                                </h3>
                                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 dark:bg-amber-900/20 dark:border-amber-800">
                                    <ul className="space-y-2">
                                        {showDetails.priceInfo.map((priceItem: any, index: number) => (
                                            <li key={index} className="flex items-start">
                                                <span className="text-amber-500 mr-2">•</span>
                                                <span className="text-gray-700 dark:text-slate-300">
                                                    {typeof priceItem === 'string' ? priceItem : `${priceItem.document}: ${priceItem.price}`}
                                                </span>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        )}

                        {/* Expert Help */}
                        {showDetails.needExpert && (
                            <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200 dark:bg-slate-800 dark:border-slate-700">
                                <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center dark:text-white">
                                    <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-red-100 text-red-800 mr-3 dark:bg-red-900/30 dark:text-red-400">
                                        <AlertCircle className="h-4 w-4" />
                                    </span>
                                    When to Seek Legal Expertise
                                </h3>
                                <div className="bg-red-50 border border-red-200 rounded-lg p-4 dark:bg-red-900/20 dark:border-red-800">
                                    {Array.isArray(showDetails.needExpert) ? (
                                        <ul className="space-y-2">
                                            {showDetails.needExpert.map((item: string, index: number) => (
                                                <li key={index} className="flex items-start">
                                                    <span className="text-red-500 mr-2">•</span>
                                                    <span className="text-gray-700 dark:text-slate-300">{item}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    ) : (
                                        <p className="text-gray-700 whitespace-pre-line dark:text-slate-300">{showDetails.needExpert}</p>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row justify-center gap-4 py-6">
                            <button 
                                onClick={() => window.print()}
                                className="inline-flex items-center justify-center px-6 py-3 border border-gray-300 text-base font-medium rounded-lg text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:bg-slate-700 dark:border-slate-600 dark:text-white dark:hover:bg-slate-600 dark:focus:ring-offset-slate-900"
                            >
                                <FileText className="mr-2 h-5 w-5" />
                                Print Guide
                            </button>
                            <button 
                                onClick={() => {
                                    navigator.share ? 
                                    navigator.share({
                                        title: "LegalKlarity - Agreement Process",
                                        text: `Process guide for ${query}`,
                                        url: window.location.href,
                                    }) : 
                                    alert("Sharing not supported on this browser.");
                                }}
                                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-lg shadow-sm text-white bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 dark:from-primary-700 dark:to-indigo-700 dark:hover:from-primary-600 dark:hover:to-indigo-600 dark:focus:ring-offset-slate-900"
                            >
                                Share Guide
                            </button>
                        </div>
                    </div>
                ) : (
                    // Empty state
                    <div className="bg-white rounded-xl shadow-sm p-12 border border-gray-200 text-center dark:bg-slate-800 dark:border-slate-700">
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 dark:bg-blue-900/30">
                            <FileText className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                        </div>
                        <h3 className="mt-4 text-xl font-medium text-gray-900 dark:text-white">Find Agreement Processes</h3>
                        <p className="mt-2 text-gray-500 dark:text-slate-400">
                            Select an agreement type from the options above to get step-by-step guidance on how to create, review, and execute legal documents.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
