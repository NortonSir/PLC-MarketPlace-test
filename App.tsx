import React, { useState, useMemo } from 'react';
import { Category, PLCModule } from './types';
import { CATEGORIES, MOCK_MODULES } from './constants';
import Header from './components/Header';
import ModuleGrid from './components/ModuleGrid';
import Breadcrumbs from './components/Breadcrumbs';
import SellModal from './components/SellModal';
import CategoryTree from './components/CategoryTree';
import { useTranslation } from './hooks/useTranslation';

// Helper function to get all descendant category IDs
const getAllChildCategoryIds = (category: Category): string[] => {
  let ids = [category.id];
  if (category.children) {
    for (const child of category.children) {
      ids = [...ids, ...getAllChildCategoryIds(child)];
    }
  }
  return ids;
};

const App: React.FC = () => {
  const [selectedCategoryPath, setSelectedCategoryPath] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { t } = useTranslation();

  const handleSelectCategory = (path: Category[]) => {
    setSelectedCategoryPath(path);
  };

  const handleGoHome = () => {
    setSelectedCategoryPath([]);
  };

  const getModulesForCategoryPath = (path: Category[]): PLCModule[] => {
    if (path.length === 0) {
      return MOCK_MODULES; // Show all on home page or an empty array
    }
    const lastCategory = path[path.length - 1];
    const categoryIds = getAllChildCategoryIds(lastCategory);
    return MOCK_MODULES.filter(module => categoryIds.includes(module.categoryId));
  };
  
  const modulesToShow = useMemo(() => getModulesForCategoryPath(selectedCategoryPath), [selectedCategoryPath]);

  return (
    <div className="min-h-screen bg-slate-100 font-sans">
      <Header onSellClick={() => setIsModalOpen(true)} />
      
      <div className="container mx-auto flex flex-row items-start gap-8 p-4 sm:p-6 lg:p-8">
        <aside className="w-1/4 lg:w-1/5 hidden md:block">
           <div className="sticky top-24">
             <h2 className="text-lg font-bold text-slate-900 mb-4">{t('categories')}</h2>
             <CategoryTree 
                categories={CATEGORIES} 
                onSelectCategory={handleSelectCategory}
                selectedCategoryPath={selectedCategoryPath}
              />
           </div>
        </aside>

        <main className="w-full md:w-3/4 lg:w-4/5">
          <Breadcrumbs selectedCategoryPath={selectedCategoryPath} onHomeClick={handleGoHome} />

          <ModuleGrid 
            modules={modulesToShow} 
          />
        </main>
      </div>
      
      {isModalOpen && (
        <SellModal 
          onClose={() => setIsModalOpen(false)} 
        />
      )}
    </div>
  );
};

export default App;