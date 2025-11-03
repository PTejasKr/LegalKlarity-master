import { useState } from "react";
import { Upload, AlertCircle } from "lucide-react";
import { motion } from "framer-motion";
import IndividualSummary from "../../../components/agreement/IndividualSummary";
import EnterpriseSummary from "../../../components/agreement/EnterpriseSummary";
import InstitutionalSummary from "../../../components/agreement/InstitutionalSummary";

type Props = {
  targetGroup: "individual" | "institutional" | "enterprise";
};

// Types for each summary output
interface Clause {
  title: string;
  explanation: string;
  example: string;
  questionsToAsk: string[];
}
interface StudentOutput {
  title: string;
  about: string;
  clauses: Clause[];
  keyLegalNotes: string[];
  finalTips: string[];
}
// Use shared types
import type { BusinessOutput } from "../../../types";
import { generateCitizenPDF } from "../../../components/pdf/individualPdf";
import { generateBusinessPDF } from "../../../components/pdf/enterprisePdf";
import { generateStudentPDF } from "../../../components/pdf/institutionalPdf";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { agreementSummaryAsync } from "../../../store/agreementSlice";
import { toast } from "react-toastify";
import Button from "../../../components/common/Button";
interface CitizenOutput {
  title: string;
  about: string;
  benefits: string[];
  risks: string[];
  clarity: { score: number; comment: string };
  fairness: { score: number; comment: string };
  repaymentDetails: {
    emiAmount: string;
    totalRepayment: string;
    interestExtra: string;
    note: string;
  };
  suggestions: string[];
  analogy: string;
}

type SummaryUnion =
  | ({ type: "individual" } & CitizenOutput)
  | ({ type: "institutional" } & StudentOutput)
  | ({ type: "enterprise" } & BusinessOutput);


export default function SummaryPage({ targetGroup }: Props) {
    const dispatch = useAppDispatch();
    const [file, setFile] = useState<File | null>(null);
    const [summary, setSummary] = useState<SummaryUnion | null>(null);
    const [loading, setLoading] = useState(false);
    const [showUpload, setShowUpload] = useState(true);
    const { user } = useAppSelector((state) => state.auth);
    const targetGroupLabel: Record<Props["targetGroup"], string> = {
        individual: "Individual Document Summary",
        institutional: "Institutional Summary",
        enterprise: "Enterprise Summary",
    };

    const language = "en";

    const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (!e.target.files || e.target.files.length === 0) {
            toast.error("Please select a file to upload.");
            return;
        }
        const selectedFile = e.target.files[0];
        setFile(selectedFile);

        if (!user || !user.uid) {
            toast.error("You must be logged in to upload and summarize a document.");
            return;
        }
        if (!targetGroup) {
            toast.error("Target group is missing. Please select your role again.");
            return;
        }

        setLoading(true);
        setSummary(null);
        setShowUpload(false);

        try {
            const response: any = await dispatch(agreementSummaryAsync({
                file: selectedFile,
                uid: user.uid,
                targetGroup: targetGroup,
                language: language,
            })).unwrap();
            if (response?.statusCode === 200 || response?.success === true) {
                setSummary({
                    type: targetGroup,
                    ...response.data
                });
                setLoading(false);
                toast.success(response.message || "Document summarized successfully!");
            } else {
                toast.error(response?.message || "Failed to generate summary");
                setLoading(false);
                setShowUpload(true);
            }
        } catch (error) {
            toast.error("Failed to summarize the document. Please try again later.");
            setLoading(false);
            setShowUpload(true);
        } finally {
            setLoading(false);
        }
    };

  // ✅ Render summary based on targetGroup
    const renderSummary = () => {
        if (!summary) return null;
        switch (targetGroup) {
        case "individual":
            return <IndividualSummary aiRawOutput={summary as CitizenOutput} />;
        case "institutional":
            return <InstitutionalSummary aiRawOutput={summary as StudentOutput} />;
        case "enterprise":
            return <EnterpriseSummary aiRawOutput={summary as BusinessOutput} />;
        default:
            return null;
        }
    };

    return (
        <motion.div
            className="min-h-screen max-w-7xl mx-auto p-6 space-y-6 mt-24 dark:bg-slate-900"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            {/* Header */}
            <header className="mb-8 text-center">
                <h1 className="text-4xl font-bold text-black flex items-center justify-center gap-2 tracking-tight dark:text-white">
                    📄 {targetGroupLabel[targetGroup]}
                </h1>
                <p className="text-gray-800 text-lg mt-2 dark:text-slate-300">
                    Upload a legal document to get a clear, AI-powered summary tailored for you.
                </p>
                <p className="text-sm text-gray-500 mt-1 dark:text-slate-400">
                    Powered by <span className="font-semibold text-[#F6A507]">LegalKlarity</span>
                </p>
                <div className="mt-4 w-16 border-b-2 border-[#CDA047] mx-auto"></div>
            </header>


            {/* Upload Box (show only if showUpload is true and not loading) */
            showUpload && !loading && (
                <>
                    <div className="max-w-6xl mx-auto border-2 border-dashed border-gray-300 rounded-2xl hover:border-gray-400 transition bg-white dark:bg-slate-800 dark:border-slate-700">
                        <div className="flex flex-col items-center justify-center p-10">
                            <Upload className="w-10 h-10 text-gray-500 mb-4 dark:text-slate-400" />
                            <p className="text-gray-700 mb-2 dark:text-slate-300">
                                {file ? file.name : "Drag & drop or click to upload a document"}
                            </p>
                            <p className="text-gray-700 mb-2 dark:text-slate-300">
                                Only PDF, DOC, and DOCX file formats are supported.
                            </p>
                            <input
                                type="file"
                                accept=".pdf,.doc,.docx"
                                onChange={handleFileUpload}
                                className="hidden"
                                id="file-upload"
                            />
                            <label
                                htmlFor="file-upload"
                                className="cursor-pointer px-4 py-2 mt-2 rounded-md bg-gradient-to-br from-[#e5e7eb] via-[#f3f4f6] to-[#f9fafb] text-gray-800 hover:bg-[#e0e7ef] focus:ring-[#b1b4b6] border border-[#b1b4b6] hover:from-[#e0e7ef] hover:via-[#f3f4f6] hover:to-[#f9fafb] dark:from-slate-700 dark:via-slate-800 dark:to-slate-900 dark:text-white dark:border-slate-600 dark:hover:from-slate-600 dark:hover:via-slate-700 dark:hover:to-slate-800"
                            >
                                Upload Document
                            </label>
                        </div>
                    </div>

                    {/* Example Uploaded Document based on role */}
                    <div className="max-w-6xl mx-auto mt-4">
                        <p className="text-gray-700 font-medium mb-1 dark:text-slate-300">Example documents you can upload:</p>
                        {targetGroup === "individual" && (
                            <ul className="text-gray-600 text-sm list-disc pl-5 dark:text-slate-400">
                                <li>Rental/Lease Agreement</li>
                                <li>Loan Agreement</li>
                                <li>Sale Agreement (Property/Vehicle)</li>
                                <li>Will/Inheritance Agreement</li>
                                <li>Power of Attorney</li>
                            </ul>
                        )}
                        {targetGroup === "institutional" && (
                            <ul className="text-gray-600 text-sm list-disc pl-5 dark:text-slate-400">
                                <li>Internship Agreement</li>
                                <li>Offer Letter / Employment Contract</li>
                                <li>Freelance Project Contract</li>
                                <li>NDA (Non-Disclosure Agreement)</li>
                            </ul>
                        )}
                        {targetGroup === "enterprise" && (
                            <ul className="text-gray-600 text-sm list-disc pl-5 dark:text-slate-400">
                                <li>MoA / LLP Agreement</li>
                                <li>Vendor / Client Contract</li>
                                <li>Employment Agreement</li>
                                <li>Service Agreement</li>
                                <li>IP Assignment Agreement</li>
                            </ul>
                        )}
                    </div>
                </>
            )}
            {/* Re-upload Button (show only if summary is present and not loading) */}
            {summary && !loading && !showUpload && (
                <div className="flex justify-center">
                    <Button
                        onClick={() => {
                            setShowUpload(true);
                            setSummary(null);
                            setFile(null);
                        }}
                    >
                        Re-upload Document
                    </Button>
                </div>
            )}

            {/* Loader Section */}
            {loading && (
                <div className="flex flex-col max-w-6xl mx-auto border border-gray-200 rounded-lg bg-white items-center justify-center py-10 dark:bg-slate-800 dark:border-slate-700">
                    <svg className="animate-spin h-10 w-10 text-gray-500 mb-4 dark:text-slate-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                    </svg>
                    <p className="text-gray-700 font-medium dark:text-slate-300">Analyzing your document... Please wait.</p>
                </div>
            )}

            {/* Warning / Invalid Doc */}
            {!file && !loading && (
                <div className="flex max-w-6xl mx-auto items-center text-yellow-600 bg-yellow-50 p-3 rounded-lg shadow-sm dark:text-yellow-300 dark:bg-yellow-900/30">
                    <AlertCircle className="w-5 h-5 mr-2" />
                    <p className="text-sm">
                        Please upload a document to see the summary.
                    </p>
                </div>
            )}

            {/* Summary Section */}
            {!loading && renderSummary()}

            {/* Action Buttons */}
            {summary && !loading && (
                <div className="flex max-w-6xl mx-auto gap-4 mt-6">
                    <button
                        onClick={() => {
                            if (summary.type === "enterprise") {
                                generateBusinessPDF(summary);
                            } else if (summary.type === "individual") {
                                generateCitizenPDF(summary);
                            } else if (summary.type === "institutional") {
                                generateStudentPDF(summary);
                            } else {
                                alert(
                                    "PDF export is only available for Individual and Enterprise summaries."
                                );
                            }
                        }}
                        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow transition-colors dark:bg-green-700 dark:hover:bg-green-600"
                    >
                        Download PDF
                    </button>
                    <button
                        onClick={() =>
                            navigator.share
                                ? navigator.share({
                                    title: "LegalKlarity - Summary",
                                    text: "Here's the contract summary I generated using LegalKlarity.",
                                    url: window.location.href,
                                })
                                : alert("Sharing not supported on this browser.")
                        }
                        className="border px-4 py-2 rounded-lg shadow hover:bg-gray-100 transition-colors dark:border-slate-600 dark:hover:bg-slate-800 dark:text-white"
                    >
                        Share
                    </button>
                </div>
            )}
        </motion.div>
    );
}
