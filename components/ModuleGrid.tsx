
import React from 'react';
import { PLCModule } from '../types';
import ModuleCard from './ModuleCard';

interface ModuleGridProps {
  modules: PLCModule[];
}

const ModuleGrid: React.FC<ModuleGridProps> = ({ modules }) => {
  return (
    <div>
      {modules.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modules.map(module => (
            <ModuleCard key={module.id} module={module} />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 px-6 bg-white rounded-lg shadow-md">
          <h3 className="text-xl font-semibold text-slate-800">No items found</h3>
          <p className="text-slate-500 mt-2">There are currently no listings in this category.</p>
        </div>
      )}
    </div>
  );
};

export default ModuleGrid;