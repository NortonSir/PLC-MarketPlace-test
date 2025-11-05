export const suggestCategory = async (modelName: string, categories: {key: string, name: string}[]): Promise<string> => {
  try {
    const response = await fetch('/api/suggest-category.php', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ modelName, categories }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Server responded with status: ${response.status} - ${errorText}`);
    }

    const result = await response.json();

    if (result.error) {
      throw new Error(result.error);
    }

    if (!result.suggestionKey) {
        throw new Error("Invalid suggestion format from server.");
    }
    
    return result.suggestionKey;

  } catch (error) {
    console.error("Error calling backend for category suggestion:", error);
    throw new Error("Failed to get category suggestion.");
  }
};