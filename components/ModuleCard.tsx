
import React from 'react';
import { PLCModule } from '../types';

interface ModuleCardProps {
  module: PLCModule;
}

const getConditionBadgeColor = (condition: string): string => {
  switch (condition) {
    case 'New':
      return 'bg-green-100 text-green-800';
    case 'Used - Like New':
      return 'bg-blue-100 text-blue-800';
    case 'Used - Good':
      return 'bg-yellow-100 text-yellow-800';
    case 'For Parts':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

const ModuleCard: React.FC<ModuleCardProps> = ({ module }) => {
  const formattedPrice = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(module.price);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col group">
      <div className="relative">
        <img 
          src={module.imageUrl} 
          alt={module.name} 
          className="w-full h-48 object-cover"
        />
        <div 
          className={`absolute top-2 right-2 px-2 py-1 text-xs font-semibold rounded-full ${getConditionBadgeColor(module.condition)}`}
        >
          {module.condition}
        </div>
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <p className="text-sm font-medium text-slate-500">{module.manufacturer}</p>
        <h3 className="text-md font-bold text-slate-900 mt-1 flex-grow group-hover:text-blue-600 transition-colors">{module.name}</h3>
        <p className="text-xs text-slate-600 mt-2">{module.description}</p>
      </div>
      <div className="p-4 border-t border-slate-200 mt-auto flex justify-between items-center">
        <span className="text-xl font-bold text-slate-900">{formattedPrice}</span>
        <button className="px-3 py-1.5 text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors">
          View Details
        </button>
      </div>
    </div>
  );
};

export default ModuleCard;
