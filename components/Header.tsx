import React from 'react';
import { CpuIcon } from './icons/CpuIcon';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from '../hooks/useTranslation';

interface HeaderProps {
  onSellClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSellClick }) => {
  const { t } = useTranslation();

  return (
    <header className="bg-white shadow-md sticky top-0 z-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <CpuIcon className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-800">{t('app_title')}</span>
          </div>
          <div className="flex items-center space-x-4">
            <LanguageSwitcher />
            <button
              onClick={onSellClick}
              className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
            >
              {t('list_an_item')}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;