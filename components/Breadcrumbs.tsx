import React from 'react';
import { Category } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface BreadcrumbsProps {
  selectedCategoryPath: Category[];
  onHomeClick: () => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ selectedCategoryPath, onHomeClick }) => {
  const { t } = useTranslation();
  const currentCategory = selectedCategoryPath.length > 0 ? selectedCategoryPath[selectedCategoryPath.length - 1] : null;
  const pageTitle = currentCategory ? t(currentCategory.nameKey) : t('all_products');

  return (
    <div className="mb-6">
      <nav className="flex w-full items-center text-[9pt] font-medium text-slate-500 overflow-hidden whitespace-nowrap" aria-label="Breadcrumb">
        <button onClick={onHomeClick} className="hover:text-blue-600 transition-colors flex-shrink-0">
          {t('home')}
        </button>
        {selectedCategoryPath.map((category) => (
           <div key={category.id} className="flex items-center min-w-0">
              <ChevronRightIcon className="ml-2 mr-2 text-slate-400 flex-shrink-0" />
              <span className="text-slate-500 truncate max-w-[40ch]">{t(category.nameKey)}</span>
          </div>
        ))}
      </nav>
      <h2 className="text-3xl font-bold text-slate-900 mt-2 tracking-tight">{pageTitle}</h2>
    </div>
  );
};

export default Breadcrumbs;