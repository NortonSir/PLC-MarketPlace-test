import { Category, PLCModule } from '../types';

export const fetchCategories = async (): Promise<Category[]> => {
  const response = await fetch('/api/categories.php');
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch categories: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const responseText = await response.text();
  if (!responseText.trim()) {
    throw new Error('Failed to fetch categories: Empty response from server.');
  }

  try {
    return JSON.parse(responseText);
  } catch (parseError: any) {
    throw new Error(`Failed to fetch categories: Invalid JSON response - ${parseError.message}. Received text: ${responseText}`);
  }
};

export const fetchModules = async (categoryId?: string): Promise<PLCModule[]> => {
  const url = categoryId ? `/api/modules.php?categoryId=${categoryId}` : '/api/modules.php';
  const response = await fetch(url);
  
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to fetch modules: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const responseText = await response.text();
  if (!responseText.trim()) {
    throw new Error('Failed to fetch modules: Empty response from server.');
  }

  try {
    return JSON.parse(responseText);
  } catch (parseError: any) {
    throw new Error(`Failed to fetch modules: Invalid JSON response - ${parseError.message}. Received text: ${responseText}`);
  }
};

export const listModule = async (moduleData: Omit<PLCModule, 'id'>): Promise<PLCModule> => {
  const response = await fetch('/api/list-module.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(moduleData),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to list module: ${response.status} ${response.statusText} - ${errorText}`);
  }

  const responseText = await response.text();
  if (!responseText.trim()) {
    throw new Error('Failed to list module: Empty response from server.');
  }

  try {
    return JSON.parse(responseText);
  } catch (parseError: any) {
    throw new Error(`Failed to list module: Invalid JSON response - ${parseError.message}. Received text: ${responseText}`);
  }
};
