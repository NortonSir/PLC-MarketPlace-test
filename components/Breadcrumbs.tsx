import React from 'react';
import { Category } from '../types';
import { useTranslation } from '../hooks/useTranslation';

const ChevronRightIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" {...props}>
    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
  </svg>
);


interface BreadcrumbsProps {
  selectedCategoryPath: Category[];
  onHomeClick: () => void;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ selectedCategoryPath, onHomeClick }) => {
  const { t } = useTranslation();
  const currentCategory = selectedCategoryPath.length > 0 ? selectedCategoryPath[selectedCategoryPath.length-1] : null;
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
    </div>
  );
};

export default Breadcrumbs;