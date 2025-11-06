import React, { useState, useCallback, useMemo } from 'react';
import { suggestCategory } from '../services/geminiService';
import { useTranslation } from '../hooks/useTranslation';
import { Category } from '../types';
import { listModule } from '../services/api';

interface SellModalProps {
  onClose: () => void;
  categories: Category[];
}

// Helper to flatten categories for the dropdown and AI prompt
const getLeafCategories = (categories: Category[]): Category[] => {
  const leaves: Category[] = [];
  const traverse = (category: Category) => {
    if (!category.children || category.children.length === 0) {
      leaves.push(category);
    } else {
      category.children.forEach(traverse);
    }
  };
  categories.forEach(traverse);
  return leaves;
};

const LoadingSpinner: React.FC = () => (
    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
    </svg>
);

const SellModal: React.FC<SellModalProps> = ({ onClose, categories }) => {
  const { t } = useTranslation();
  const [modelName, setModelName] = useState<string>('');
  const [manufacturer, setManufacturer] = useState<string>('');
  const [condition, setCondition] = useState<string>('Used - Good');
  const [price, setPrice] = useState<string>('');
  const [quantity, setQuantity] = useState<string>('1');
  const [purchaseYear, setPurchaseYear] = useState<string>('');
  const [specifications, setSpecifications] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string>('https://source.unsplash.com/random/400x300/?plc,module'); // Placeholder image

  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isLoadingAi, setIsLoadingAi] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const leafCategories = useMemo(() => getLeafCategories(categories), [categories]);
  
  const handleSuggestCategory = useCallback(async () => {
    if (!modelName.trim()) {
      setError(t('error_model_name_required'));
      return;
    }
    setIsLoadingAi(true);
    setError(null);
    setSelectedCategory('');

    const translatedCategories = leafCategories.map(c => ({key: c.id, name: t(c.nameKey)}));

    try {
      const suggestionKey = await suggestCategory(modelName, translatedCategories);
      setSelectedCategory(suggestionKey);
    } catch (err: any) {
      setError(err.message || t('error_suggestion_failed'));
    } finally {
      setIsLoadingAi(false);
    }
  }, [modelName, leafCategories, t]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (!modelName || !manufacturer || !price || !selectedCategory) {
      setError("Please fill in all required fields (Model Name, Manufacturer, Price, Category).");
      setIsSubmitting(false);
      return;
    }

    try {
      const newModule = await listModule({
        name: modelName,
        manufacturer,
        price: parseFloat(price),
        condition: condition as any, // Type assertion for now, ideally map to actual enum
        imageUrl,
        categoryId: selectedCategory,
        description: specifications, // Use specifications as description for now
      });
      console.log('Module listed successfully:', newModule);
      onClose(); // Close modal on success
      // Potentially refresh module list in App.tsx
    } catch (err: any) {
      setError(err.message || "Failed to list module.");
    } finally {
      setIsSubmitting(false);
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto" onClick={(e) => e.stopPropagation()}>
        <div className="flex justify-between items-center p-5 border-b sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-slate-800">{t('sell_modal_title')}</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-600 text-2xl leading-none">&times;</button>
        </div>

        <form className="p-6 space-y-4" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="manufacturer" className="block text-sm font-medium text-slate-700">{t('manufacturer')}</label>
              <input type="text" id="manufacturer" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} placeholder={t('manufacturer_placeholder')} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" required/>
            </div>
            <div>
                <label htmlFor="modelName" className="block text-sm font-medium text-slate-700">{t('model_name')}</label>
                <input type="text" id="modelName" value={modelName} onChange={(e) => setModelName(e.target.value)} placeholder={t('model_name_placeholder')} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500" required/>
            </div>
          </div>
          
          <div className="bg-slate-50 p-4 rounded-lg border border-slate-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div className="mb-2 sm:mb-0">
                <h4 className="font-semibold text-slate-800">{t('ai_suggestion_title')}</h4>
                <p className="text-xs text-slate-500">{t('ai_suggestion_desc')}</p>
              </div>
              <button type="button" onClick={handleSuggestCategory} disabled={isLoadingAi} className="inline-flex items-center justify-center w-full sm:w-auto px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                {isLoadingAi && <LoadingSpinner />}
                {isLoadingAi ? t('thinking') : t('suggest_category')}
              </button>
            </div>
            {error && !isSubmitting && <p className="mt-2 text-sm text-red-600">{error}</p>}
          </div>

           <div>
            <label htmlFor="category" className="block text-sm font-medium text-slate-700">{t('category')}</label>
            <select id="category" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" required>
                <option value="" disabled>{t('select_category')}</option>
                {leafCategories.map(cat => (
                    <option key={cat.id} value={cat.id}>{t(cat.nameKey)}</option>
                ))}
            </select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="condition" className="block text-sm font-medium text-slate-700">{t('condition')}</label>
              <select id="condition" value={condition} onChange={(e) => setCondition(e.target.value)} className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md" required>
                  <option>New</option>
                  <option>Used - Like New</option>
                  <option>Used - Good</option>
                  <option>For Parts</option>
              </select>
            </div>
            <div>
              <label htmlFor="purchaseYear" className="block text-sm font-medium text-slate-700">{t('purchase_year')}</label>
              <input type="number" id="purchaseYear" value={purchaseYear} onChange={(e) => setPurchaseYear(e.target.value)} placeholder="YYYY" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
          </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="price" className="block text-sm font-medium text-slate-700">{t('price')}</label>
              <div className="relative mt-1">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"><span className="text-gray-500 sm:text-sm">$</span></div>
                <input type="number" id="price" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="0.00" className="block w-full rounded-md border-slate-300 pl-7 pr-3 focus:border-blue-500 focus:ring-blue-500 sm:text-sm" required/>
              </div>
            </div>
            <div>
              <label htmlFor="quantity" className="block text-sm font-medium text-slate-700">{t('quantity')}</label>
              <input type="number" id="quantity" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="1" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
            </div>
          </div>

           <div>
            <label htmlFor="imageUrl" className="block text-sm font-medium text-slate-700">Image URL</label>
            <input type="text" id="imageUrl" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} placeholder="https://example.com/image.jpg" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"/>
           </div>
           
           <div>
            <label htmlFor="specifications" className="block text-sm font-medium text-slate-700">{t('specifications')}</label>
            <textarea id="specifications" rows={3} value={specifications} onChange={(e) => setSpecifications(e.target.value)} placeholder={t('specifications_placeholder')} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md text-sm shadow-sm placeholder-slate-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500"></textarea>
           </div>
        </form>
        
        <div className="flex justify-end items-center p-4 bg-slate-50 border-t space-x-2 sticky bottom-0">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-slate-300 text-sm font-medium rounded-md text-slate-700 bg-white hover:bg-slate-50 focus:outline-none">{t('cancel')}</button>
          <button type="submit" onClick={handleSubmit} disabled={isSubmitting} className="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 disabled:bg-green-300 focus:outline-none">
            {isSubmitting ? 'Listing...' : t('list_for_sale')}
          </button>
        </div>
      </div>
    </div>
  );
};

export default SellModal;