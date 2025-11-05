import React from 'react';
import { useTranslation } from '../hooks/useTranslation';
import { LanguageIcon } from './icons/LanguageIcon';

const LanguageSwitcher: React.FC = () => {
  const { language, setLanguage } = useTranslation();

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'ko' : 'en');
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-600 bg-slate-100 rounded-md hover:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      aria-label="Change language"
    >
      <LanguageIcon className="h-5 w-5" />
      <span>{language === 'en' ? 'KO' : 'EN'}</span>
    </button>
  );
};

export default LanguageSwitcher;