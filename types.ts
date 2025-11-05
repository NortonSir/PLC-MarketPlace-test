import React from 'react';

export interface Category {
  id: string;
  nameKey: string;
  descriptionKey: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
  children?: Category[];
}

export type ModuleCondition = 'New' | 'Used - Like New' | 'Used - Good' | 'For Parts';

export interface PLCModule {
  id: string;
  name: string;
  manufacturer: string;
  price: number;
  condition: ModuleCondition;
  imageUrl: string;
  categoryId: string; // Should correspond to the ID of a leaf category
  description: string;
}