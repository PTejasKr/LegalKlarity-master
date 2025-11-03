import { motion } from "framer-motion";
import { HelpCircle, MessageSquare, FileText, ShieldCheck, Mail, ArrowRight } from "lucide-react";
import Card from "../../components/common/Card";
import Button from "../../components/common/Button";

const faqs = [
  {
    question: "What is this platform about?",
    answer:
      "Our platform uses generative AI to simplify complex legal documents, making them clear and accessible for everyone.",
    icon: <FileText className="w-10 h-10 text-yellow-500" />,
  },
  {
    question: "Is my data secure?",
    answer:
      "Yes. We prioritize your privacy and ensure that all uploaded documents are processed securely with industry-standard practices.",
    icon: <ShieldCheck className="w-10 h-10 text-yellow-500" />,
  },
  {
    question: "How can I get support?",
    answer:
      "You can reach out via our chatbot for instant help or contact our team directly through email.",
    icon: <MessageSquare className="w-10 h-10 text-yellow-500" />,
  },
  {
    question: "Can I upload my own documents?",
    answer:
      "Absolutely! Upload your documents and get instant AI-powered simplifications, summaries, and explanations.",
    icon: <HelpCircle className="w-10 h-10 text-yellow-500" />,
  },
  {
    question: "How can I contact you?",
    answer:
      "Feel free to email us at support@legalklarity.ai for any queries or feedback.",
    icon: <Mail className="w-10 h-10 text-yellow-500" />,
  },
];

const HelpPage = () => {
  return (
    <div className="min-h-screen bg-black py-28 px-4 md:px-20">
      {/* Intro Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-5xl mx-auto text-center mb-16"
      >
        <div className="mb-6">
          <div className="inline-block px-4 py-2 rounded-full bg-gray-900 border border-yellow-600 text-yellow-500 font-semibold text-xs tracking-wide uppercase shadow-sm">
            Help & Support Center
          </div>
        </div>
        <h1 className="text-4xl md:text-5xl font-heading font-bold text-yellow-500 mb-6">
          Need Assistance?
        </h1>
        <p className="text-lg font-body text-gray-300 leading-relaxed max-w-4xl mx-auto">
          We’re here to guide you through every step. Find answers to common questions, learn how to use the platform, and reach out if you need personalized help.
        </p>
      </motion.div>

      {/* FAQ Section */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
          >
            <Card className="p-6 h-full shadow-xl hover:shadow-2xl transition duration-300 bg-gray-900 border border-gray-700 rounded-2xl">
              <div className="flex flex-col items-center text-center">
                <div className="mb-4 bg-gray-800 p-4 rounded-full border border-yellow-600 shadow-sm">
                  {faq.icon}
                </div>
                <h3 className="text-xl font-heading font-semibold text-white mb-3">
                  {faq.question}
                </h3>
                <p className="text-gray-300 font-body text-sm leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Call to Action Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="max-w-4xl mx-auto mt-20 text-center bg-yellow-500 rounded-2xl p-8 shadow-xl"
      >
        <h2 className="text-3xl font-heading font-bold text-black mb-4">
          Still Need Help?
        </h2>
        <p className="text-black/90 font-body text-lg mb-8 leading-relaxed">
          If you couldn’t find the answer you’re looking for, our team is ready to assist you.
        </p>
        <Button className="bg-black text-yellow-500 hover:bg-gray-900 font-bold px-8 py-3 rounded-full shadow-lg transition text-lg tracking-wide border-2 border-black inline-flex items-center gap-2">
          <span className="text-yellow-500">Contact Support</span>
          <ArrowRight className="w-5 h-5 text-yellow-500" />
        </Button>
      </motion.div>
    </div>
  );
};

export default HelpPage;
