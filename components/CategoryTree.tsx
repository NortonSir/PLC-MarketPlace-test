import React, { useState } from 'react';
import { Category } from '../types';
import { useTranslation } from '../hooks/useTranslation';
import { ChevronDownIcon } from './icons/ChevronDownIcon';
import { ChevronRightIcon } from './icons/ChevronRightIcon';
import { CpuIcon } from './icons/CpuIcon';
import { PowerSupplyIcon } from './icons/PowerSupplyIcon';
import { IoModuleIcon } from './icons/IoModuleIcon';
import { CommunicationIcon } from './icons/CommunicationIcon';
import { HmiIcon } from './icons/HmiIcon';
import { MiscIcon } from './icons/MiscIcon';

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

// Map icon string names to their corresponding React components
const IconComponents: { [key: string]: React.FC<React.SVGProps<SVGSVGElement>> } = {
  CpuIcon: CpuIcon,
  PowerSupplyIcon: PowerSupplyIcon,
  IoModuleIcon: IoModuleIcon,
  CommunicationIcon: CommunicationIcon,
  HmiIcon: HmiIcon,
  MiscIcon: MiscIcon,
};

const CategoryNode: React.FC<CategoryNodeProps> = ({ category, onSelectCategory, selectedCategoryPath, level, currentPath }) => {
    const { t } = useTranslation();
    const newPath = [...currentPath, category];
    const isSelected = selectedCategoryPath[selectedCategoryPath.length - 1]?.id === category.id;
    const isInPath = selectedCategoryPath.some(p => p.id === category.id);
    const [isOpen, setIsOpen] = useState(isInPath || level < 1);

    const hasChildren = category.children && category.children.length > 0;
    const Icon = category.icon ? IconComponents[category.icon] : null; // Get the component based on the string name

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
                className={`flex items-center p-2 rounded-md cursor-pointer transition-colors ${
                    isSelected ? 'bg-blue-100 text-blue-700 font-bold' : 'hover:bg-slate-200'
                }`}
                style={{ paddingLeft: `${level * 1 + 0.5}rem` }}
            >
                {Icon && <Icon className={`h-5 w-5 mr-2 ${isSelected ? 'text-blue-700' : 'text-slate-500'} flex-shrink-0`} />}
                <span className="flex-grow">{t(category.nameKey)}</span>
                {hasChildren && (
                    <button 
                        onClick={handleToggle} 
                        className={`p-1 rounded-full ${isSelected ? 'hover:bg-blue-200' : 'hover:bg-slate-300'} flex-shrink-0`}
                        aria-expanded={isOpen}
                        aria-controls={`category-children-${category.id}`}
                    >
                        {isOpen ? <ChevronDownIcon className="h-4 w-4" /> : <ChevronRightIcon className="h-4 w-4" />}
                    </button>
                )}
            </div>
            {hasChildren && isOpen && (
                <ul className="pl-2 border-l border-slate-200 ml-2" id={`category-children-${category.id}`}>
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
    <ul className="space-y-1" role="tree" aria-label="Product Categories">
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