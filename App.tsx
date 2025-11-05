import React, { useState, useEffect } from 'react';
import { Category, PLCModule } from './types';
import Header from './components/Header';
import ModuleGrid from './components/ModuleGrid';
import Breadcrumbs from './components/Breadcrumbs';
import SellModal from './components/SellModal';
import CategoryTree from './components/CategoryTree';
import Footer from './components/Footer';
import { useTranslation } from './hooks/useTranslation';
import { fetchCategories, fetchModules } from './services/api';

const App: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [modules, setModules] = useState<PLCModule[]>([]);
  const [selectedCategoryPath, setSelectedCategoryPath] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [isLoadingModules, setIsLoadingModules] = useState<boolean>(true); 
  const [isLoadingCategories, setIsLoadingCategories] = useState<boolean>(true);
  
  const [categoryErrorMessage, setCategoryErrorMessage] = useState<string | null>(null);
  const [moduleErrorMessage, setModuleErrorMessage] = useState<string | null>(null);
  
  const { t } = useTranslation();

  // Fetch all categories on initial component mount
  useEffect(() => {
    const loadCategories = async () => {
      setIsLoadingCategories(true);
      setCategoryErrorMessage(null);
      try {
        const data = await fetchCategories();
        setCategories(data);
      } catch (error: any) {
        console.error("Failed to fetch categories:", error.message);
        setCategoryErrorMessage(error.message || t('unknown_error'));
      } finally {
        setIsLoadingCategories(false);
      }
    };
    loadCategories();
  }, [t]);
  
  // Fetch modules based on the selected category path
  useEffect(() => {
    const loadModules = async () => {
      setIsLoadingModules(true);
      setModuleErrorMessage(null);
      const lastCategory = selectedCategoryPath.length > 0 ? selectedCategoryPath[selectedCategoryPath.length - 1] : null;
      const categoryId = lastCategory ? lastCategory.id : undefined;
      
      try {
        const data = await fetchModules(categoryId);
        setModules(data);
      } catch (error: any) {
        console.error("Failed to fetch modules:", error.message);
        setModuleErrorMessage(error.message || t('unknown_error'));
      } finally {
        setIsLoadingModules(false);
      }
    };

    loadModules();
  }, [selectedCategoryPath, t]);


  const handleSelectCategory = (path: Category[]) => {
    setSelectedCategoryPath(path);
  };

  const handleGoHome = () => {
    setSelectedCategoryPath([]);
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 font-sans">
      <Header onSellClick={() => setIsModalOpen(true)} />
      
      <div className="container mx-auto flex flex-row items-start gap-8 p-4 sm:p-6 lg:p-8 flex-grow">
        <aside className="w-1/4 lg:w-1/5 hidden md:block">
           <div className="sticky top-24">
             <h2 className="text-lg font-bold text-slate-900 mb-4">{t('categories')}</h2>
             {categoryErrorMessage ? (
               <div className="p-4 bg-red-100 border border-red-200 text-red-800 rounded-md" role="alert">
                 {t('failed_to_load_prefix')} {t('categories')}: {categoryErrorMessage}
               </div>
             ) : isLoadingCategories ? (
                <p className="text-slate-500">{t('loading_categories')}</p>
             ) : categories.length === 0 ? (
                <div className="text-center py-4 text-slate-500">{t('no_categories_found')}</div>
             ) : (
                <CategoryTree 
                    categories={categories} 
                    onSelectCategory={handleSelectCategory}
                    selectedCategoryPath={selectedCategoryPath}
                />
             )}
           </div>
        </aside>

        <main className="w-full md:w-3/4 lg:w-4/5">
          <Breadcrumbs selectedCategoryPath={selectedCategoryPath} onHomeClick={handleGoHome} />

          {moduleErrorMessage ? (
            <div className="text-center py-16 p-4 bg-red-100 border border-red-200 text-red-800 rounded-md" role="alert">
              {t('failed_to_load_prefix')} {t('products')}: {moduleErrorMessage}
            </div>
          ) : isLoadingModules ? (
            <div className="text-center py-16">{t('loading_products')}</div>
          ) : (
            <ModuleGrid 
              modules={modules} 
            />
          )}
        </main>
      </div>
      
      {isModalOpen && (
        <SellModal
          categories={categories}
          onClose={() => setIsModalOpen(false)} 
        />
      )}
      <Footer />
    </div>
  );
};

export default App;