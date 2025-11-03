import { motion } from "framer-motion";
import { Building, User, Building2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const exampleAgreements: Record<string, string[]> = {
  enterprise: [
    "MoA / LLP Agreement",
    "Vendor / Client Contract",
    "Employment Agreement",
    "Service Agreement",
    "IP Assignment Agreement"
  ],
  individual: [
    "Rental / Lease Agreement",
    "Loan Agreement",
    "Sale Agreement (Property/Vehicle)",
    "Will / Inheritance Agreement",
    "Power of Attorney"
  ],
  institutional: [
    "Internship Agreement",
    "Offer Letter / Employment Contract",
    "Freelance Project Contract",
    "NDA (Non-Disclosure Agreement)"
  ],
};

const roles = [
  {
    id: "enterprise",
    title: "Enterprise",
    description: "For businesses, corporations, and commercial entities seeking legal solutions.",
    icon: <Building className="w-8 h-8" />,
    color: "bg-blue-50 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-800",
    hoverColor: "hover:bg-blue-100 dark:hover:bg-blue-900/50"
  },
  {
    id: "individual",
    title: "Individual",
    description: "For individuals managing personal legal documents and agreements.",
    icon: <User className="w-8 h-8" />,
    color: "bg-green-50 text-green-600 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800",
    hoverColor: "hover:bg-green-100 dark:hover:bg-green-900/50"
  },
  {
    id: "institutional",
    title: "Institutional",
    description: "For educational institutions, NGOs, and organizations managing multiple agreements.",
    icon: <Building2 className="w-8 h-8" />,
    color: "bg-purple-50 text-purple-600 border-purple-200 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800",
    hoverColor: "hover:bg-purple-100 dark:hover:bg-purple-900/50"
  }
];

const RoleSelection = () => {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [slideOut, setSlideOut] = useState<string | null>(null);
  const navigate = useNavigate();
  
  useEffect(() => {
    // Create style element for CSS
    const style = document.createElement('style');
    style.innerHTML = `
      .perspective-container {
        perspective: 1000px;
      }
      
      .flip-card-container {
        perspective: 1000px;
      }
      
      .flip-card {
        position: relative;
        width: 100%;
        height: 100%;
        transform-style: preserve-3d;
        transition: transform 0.6s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .flip-card.flipped {
        transform: rotateY(180deg);
      }
      
      .flip-card-front,
      .flip-card-back {
        position: absolute;
        width: 100%;
        height: 100%;
        backface-visibility: hidden;
        display: flex;
        flex-direction: column;
        border-radius: 0.5rem;
      }
      
      .flip-card-back {
        transform: rotateY(180deg);
      }
      
      .slide-out {
        transition: transform 0.3s ease-in-out;
      }
      
      @keyframes slideOut {
        to {
          transform: translateX(100vw);
        }
      }
      
      .slide-out {
        animation: slideOut 0.3s ease-in-out forwards;
      }
    `;
    document.head.appendChild(style);
    
    // Cleanup function to remove the style element
    return () => {
      document.head.removeChild(style);
    };
  }, []);
  
  const handleSelect = (roleId: string) => {
    setSlideOut(roleId);
    setTimeout(() => {
      // Redirect directly to the new Legal Document Analyzer
      navigate(`/dashboard/agreement/summary`);
    }, 300);
  };
  
  const handleFlip = (roleId: string) => {
    setFlippedCards(prev => ({
      ...prev,
      [roleId]: !prev[roleId]
    }));
  };
  
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Select Your User Type
            </h1>
            <p className="text-lg text-gray-600 dark:text-slate-300 max-w-3xl mx-auto">
              Choose the category that best represents you to access personalized legal tools and agreement templates.
            </p>
          </motion.div>
        </div>

        {/* Role Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 perspective-container">
          {roles.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className={`h-full transition-all duration-300 ${slideOut === role.id ? 'slide-out' : ''}`}
              style={{
                transform: slideOut === role.id ? 'translateX(100vw)' : 'none'
              }}
            >
              <div 
                className={`bg-white rounded-xl border-2 p-6 h-full flex flex-col transition-all duration-300 ${role.color.replace('text', 'border')} ${role.hoverColor} shadow-sm hover:shadow-md dark:bg-slate-800 dark:border-slate-700 dark:hover:shadow-slate-800/50`}
              >
                <div className="flex flex-col h-full">
                  <div className={`w-16 h-16 rounded-full ${role.color} flex items-center justify-center mb-6 mx-auto`}>
                    {role.icon}
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white text-center mb-3">
                    {role.title}
                  </h3>
                  
                  <p className="text-sm text-gray-600 dark:text-slate-400 text-center mb-6 flex-grow">
                    {role.description}
                  </p>
                  
                  {/* Flip Card Container for Examples */}
                  <div className="flip-card-container mb-6">
                    <div 
                      className={`flip-card ${flippedCards[role.id] ? 'flipped' : ''}`}
                      style={{ height: '180px' }}
                    >
                      {/* Front - Show Examples Button */}
                      <div className="flip-card-front flex flex-col items-center justify-center h-full cursor-pointer">
                        <button 
                          className="text-sm font-medium text-gray-700 hover:text-gray-900 dark:text-slate-300 dark:hover:text-white"
                          onClick={() => handleFlip(role.id)}
                        >
                          Show Examples
                        </button>
                      </div>
                      
                      {/* Back - Examples Content */}
                      <div className="flip-card-back bg-gray-50 rounded-lg p-4 h-full dark:bg-slate-700">
                        <div className="h-full flex flex-col">
                          <div className="flex-grow overflow-y-auto">
                            <ul className="space-y-2">
                              {exampleAgreements[role.id].map((doc, i) => (
                                <li key={i} className="text-sm text-gray-700 dark:text-slate-300 flex items-start">
                                  <span className="text-gray-400 dark:text-slate-400 mr-2">•</span>
                                  <span>{doc}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div className="mt-3 pt-2 border-t border-gray-200 dark:border-slate-600">
                            <button 
                              className="text-xs font-medium text-gray-600 hover:text-gray-900 dark:text-slate-400 dark:hover:text-white w-full text-center"
                              onClick={() => handleFlip(role.id)}
                            >
                              Click to hide
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button 
                    className={`w-full py-3 px-4 rounded-lg font-medium text-white bg-gradient-to-r from-primary-600 to-indigo-600 hover:from-primary-700 hover:to-indigo-700 transition-all duration-300 shadow-sm mt-auto dark:from-primary-700 dark:to-indigo-700 dark:hover:from-primary-600 dark:hover:to-indigo-600`}
                    onClick={() => handleSelect(role.id)}
                  >
                    Select {role.title}
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="bg-white rounded-xl shadow-sm p-8 border border-gray-200 dark:bg-slate-800 dark:border-slate-700"
        >
          <div className="text-center">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Not Sure Which Category Fits You?
            </h3>
            <p className="text-gray-600 dark:text-slate-400 mb-6 max-w-2xl mx-auto">
              Each category provides tailored legal tools and agreement templates. You can always change your selection later in your account settings.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="text-primary-600 font-medium hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                Learn more about user categories
              </button>
              <span className="hidden sm:block text-gray-300 dark:text-slate-600">|</span>
              <button className="text-primary-600 font-medium hover:text-primary-700 dark:text-primary-400 dark:hover:text-primary-300">
                Contact support for help
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RoleSelection;






// import { motion } from "framer-motion";
// import { GraduationCap, Building2, User, FileText } from "lucide-react";
// import Card from "../../../components/common/Card";
// import Button from "../../../components/common/Button";
// import { useNavigate } from "react-router-dom";
// import { useState } from "react";

// // Example agreements per role
// const exampleAgreements: Record<string, string[]> = {
//   student: [
//     "Internship Agreement",
//     "Offer Letter / Employment Contract",
//     "Freelance Project Contract",
//     "NDA (Non-Disclosure Agreement)"
//   ],
//   business: [
//     "MoA / LLP Agreement",
//     "Vendor / Client Contract",
//     "Employment Agreement",
//     "Service Agreement",
//     "IP Assignment Agreement"
//   ],
//   citizen: [
//     "Rental / Lease Agreement",
//     "Loan Agreement",
//     "Sale Agreement (Property/Vehicle)",
//     "Will / Inheritance Agreement",
//     "Power of Attorney"
//   ],
// };

// const roles = [
//   {
//     id: "student",
//     title: "Students & Young Professionals",
//     description:
//       "For internships, freelance projects, and first job contracts.",
//     icon: <GraduationCap className="w-10 h-10 text-[#CDA047]" />,
//   },
//   {
//     id: "business",
//     title: "Small Business Owners",
//     description:
//       "For entrepreneurs, startups, and SMEs handling vendor or client contracts.",
//     icon: <Building2 className="w-10 h-10 text-[#F6A507]" />,
//   },
//   {
//     id: "citizen",
//     title: "Citizens",
//     description:
//       "For everyday agreements like rental, loan, and property documents.",
//     icon: <User className="w-10 h-10 text-[#CDA047]" />,
//   },
// ];

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [expandedRole, setExpandedRole] = useState<string | null>(null);

//   const handleSelect = (roleId: string) => {
//     navigate(`/dashboard/agreement/summary?targetGroup=${roleId}`);
//   };

//   return (
//     <div className="min-h-screen flex flex-col items-center px-4 py-20">
//       {/* Header */}
//       <motion.div
//         initial={{ opacity: 0, y: -20 }}
//         animate={{ opacity: 1, y: 0 }}
//         transition={{ duration: 0.6 }}
//         className="text-center mb-12"
//       >
//         <h1 className="text-4xl font-bold text-gray-900">
//           Dashboard – Agreements & Services
//         </h1>
//         <p className="text-lg text-gray-600 mt-3">
//           Access Agreement Summaries, Process Agreements, Case Summaries, and Chatbot help – all in one place.
//         </p>
//       </motion.div>

//       {/* Features Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16 w-full max-w-6xl">
//         {["Agreement Summary", "Process Agreement", "Case Summary", "Chatbot"].map((feature, i) => (
//           <motion.div
//             key={feature}
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: i * 0.1 }}
//           >
//             <Card className="flex flex-col items-center text-center p-6 h-full shadow-md hover:shadow-lg transition rounded-2xl">
//               <FileText className="w-12 h-12 text-[#CDA047] mb-4" />
//               <h3 className="text-lg font-semibold">{feature}</h3>
//               <p className="text-sm text-gray-600 mt-2">
//                 Quick access to {feature.toLowerCase()} in one click.
//               </p>
//             </Card>
//           </motion.div>
//         ))}
//       </div>

//       {/* Role Selection */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">
//         {roles.map((role, index) => (
//           <motion.div
//             key={role.id}
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: index * 0.2 }}
//             className="h-full"
//           >
//             <Card className="h-full flex flex-col items-center text-center p-6">
//               <div className="flex flex-col items-center gap-4 h-full">
//                 <div className="bg-[#fffbe6] p-6 rounded-full border shadow-sm">
//                   {role.icon}
//                 </div>
//                 <h2 className="text-xl font-semibold">{role.title}</h2>
//                 <p className="text-sm text-gray-600">{role.description}</p>

//                 {/* Example agreements preview */}
//                 <Button
//                   className="mt-4 w-full bg-[#CDA047] hover:bg-[#b38a3e] text-white rounded-full py-2"
//                   onClick={() =>
//                     setExpandedRole(expandedRole === role.id ? null : role.id)
//                   }
//                 >
//                   {expandedRole === role.id ? "Hide Examples" : "Show Examples"}
//                 </Button>

//                 {expandedRole === role.id && (
//                   <ul className="mt-4 text-left text-sm text-gray-700 w-full list-disc pl-5">
//                     {exampleAgreements[role.id].map((doc, i) => (
//                       <li key={i}>{doc}</li>
//                     ))}
//                   </ul>
//                 )}

//                 <Button
//                   className="mt-6 w-full border-2 border-[#CDA047] text-[#CDA047] hover:bg-[#fff7db]"
//                   onClick={() => handleSelect(role.id)}
//                 >
//                   Continue as {role.title}
//                 </Button>
//               </div>
//             </Card>
//           </motion.div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Dashboard;
