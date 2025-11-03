import { motion, AnimatePresence } from "framer-motion";
import { t } from "i18next";

const LanguageDropdown = ({ show, onEnter, onLeave, onChange }: {
    show: boolean;
    onEnter: () => void;
    onLeave: () => void;
    onChange: (lng: string) => void;
  }) => (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.95 }}
          transition={{ duration: 0.2 }}
          className="absolute top-full left-0 mt-2 w-32 max-h-72 overflow-y-auto bg-white border border-gray-200 rounded-lg shadow-lg dark:bg-slate-800 dark:border-slate-700"
          onMouseEnter={onEnter}
          onMouseLeave={onLeave}
        >
          {/* All Indian languages from i18n */}
          <button onClick={() => onChange("en")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >{("English")}</button>
          <button onClick={() => onChange("hi")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >{t("Hindi")}</button>
          <button onClick={() => onChange("bn")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >{t("Bengali")}</button>
          <button onClick={() => onChange("ta")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >{t("Tamil")}</button>
          <button onClick={() => onChange("te")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >{t("Telugu")}</button>
          <button onClick={() => onChange("mr")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >{t("Marathi")}</button>
          <button onClick={() => onChange("gu")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >{t("Gujarati")}</button>
          <button onClick={() => onChange("kn")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >{t("Kannada")}</button>
          <button onClick={() => onChange("ml")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >{t("Malayalam")}</button>
          <button onClick={() => onChange("pa")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >{t("Punjabi")}</button>
          <button onClick={() => onChange("or")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >{t("Odia")}</button>
          <button onClick={() => onChange("ur")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >{t("Urdu")}</button>
          <button onClick={() => onChange("as")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >{t("Assamese")}</button>
          <button onClick={() => onChange("mai")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >{t("Maithili")}</button>
          <button onClick={() => onChange("sat")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >{t("Santali")}</button>
          <button onClick={() => onChange("ks")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >{t("Kashmiri")}</button>
          <button onClick={() => onChange("ne")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >{t("Nepali")}</button>
          <button onClick={() => onChange("kok")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >{t("Konkani")}</button>
          <button onClick={() => onChange("sd")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >{t("Sindhi")}</button>
          <button onClick={() => onChange("doi")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >{t("Dogri")}</button>
          <button onClick={() => onChange("mni")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >{t("Manipuri")}</button>
          <button onClick={() => onChange("brx")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >{t("Bodo")}</button>
          <button onClick={() => onChange("sa")}
            className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900 dark:text-slate-300 dark:hover:bg-slate-700 dark:hover:text-white"
          >{t("Sanskrit")}</button>
        </motion.div>
      )}
    </AnimatePresence>
);
export { LanguageDropdown };