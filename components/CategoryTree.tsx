import React, { useState } from 'react';
import { Category } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';

interface CategoryTreeProps {
  categories: Category[];
  onSelectCategory: (path: Category[]) => void;
  selectedCategoryPath: Category[];
}

interface CategoryNodeProps {
  category: Category;
  onSelectCategory: (path: Category[]) => void;
  selectedCategoryPath: Category[];
  level: number;
  currentPath: Category[];
}

const CategoryNode: React.FC<CategoryNodeProps> = ({ category, onSelectCategory, selectedCategoryPath, level, currentPath }) => {
    const { t } = useTranslation();
    const newPath = [...currentPath, category];
    const isSelected = selectedCategoryPath[selectedCategoryPath.length - 1]?.id === category.id;
    const isInPath = selectedCategoryPath.some(p => p.id === category.id);
    const [isOpen, setIsOpen] = useState(isInPath || level < 1);

    const hasChildren = category.children && category.children.length > 0;

    const handleToggle = (e: React.MouseEvent) => {
        e.stopPropagation();
        setIsOpen(!isOpen);
    }
    
    const handleSelect = () => {
        onSelectCategory(newPath);
    }

    return (
        <li className="my-1">
            <div 
                onClick={handleSelect}
                className={`flex items-center justify-between p-2 rounded-md cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-100 text-blue-700 font-bold' : 'hover:bg-slate-200'
                }`}
                style={{ paddingLeft: `${level * 1 + 0.5}rem` }}
            >
                <span className="flex-grow">{t(category.nameKey)}</span>
                {hasChildren && (
                    <button onClick={handleToggle} className="p-1 rounded-full hover:bg-slate-300">
                        {isOpen ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
                    </button>
                )}
            </div>
            {hasChildren && isOpen && (
                <ul className="pl-2 border-l border-slate-200 ml-2">
                    {category.children.map(child => (
                        <CategoryNode 
                            key={child.id} 
                            category={child} 
                            onSelectCategory={onSelectCategory}
                            selectedCategoryPath={selectedCategoryPath}
                            level={level + 1}
                            currentPath={newPath}
                        />
                    ))}
                </ul>
            )}
        </li>
    );
};


const CategoryTree: React.FC<CategoryTreeProps> = ({ categories, onSelectCategory, selectedCategoryPath }) => {
  return (
    <ul className="space-y-1">
      {categories.map(category => (
        <CategoryNode 
            key={category.id} 
            category={category} 
            onSelectCategory={onSelectCategory} 
            selectedCategoryPath={selectedCategoryPath}
            level={0}
            currentPath={[]}
        />
      ))}
    </ul>
  );
};

export default CategoryTree;