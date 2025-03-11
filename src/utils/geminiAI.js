async function listAvailableModels(apiKey) {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to list models: ${response.status}`);
    }

    const data = await response.json();
    console.log('Available models:', data);
    return data.models || [];
  } catch (error) {
    console.error('Error listing models:', error);
    return [];
  }
}

export async function generateFunFacts(locationDescription) {
  try {
    if (!process.env.REACT_APP_GEMINI_API_KEY) {
      throw new Error("Gemini API key not found. Please add REACT_APP_GEMINI_API_KEY to your .env file");
    }

    const apiKey = process.env.REACT_APP_GEMINI_API_KEY;
    
    // First, get the list of available models
    const models = await listAvailableModels(apiKey);
    console.log('Found models:', models);
    
    // Find a suitable text-only Gemini model
    const model = models.find(m => 
      m.name.includes('gemini') && 
      !m.name.includes('vision') && 
      !m.name.includes('embedding') &&
      m.supportedGenerationMethods?.includes('generateContent')
    );
    
    if (!model) {
      throw new Error('No suitable Gemini model found for text generation');
    }

    // Extract just the model name without the 'models/' prefix
    const modelName = model.name.replace('models/', '');
    console.log('Using model:', modelName);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${apiKey}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `Write a concise 4-5 sentence summary about this UMD location: "${locationDescription}". 
              Include its main purpose, location on campus, and 1-2 most important things students should know about it (like key services, resources, or unique features). 
              Keep the information practical and relevant for UMD students.`
            }]
          }]
        })
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: { message: 'Unknown error' } }));
      console.error('API Error Details:', {
        status: response.status,
        statusText: response.statusText,
        errorData
      });
      throw new Error(`API request failed: ${response.status} - ${errorData.error?.message || response.statusText}`);
    }

    const data = await response.json();
    if (!data.candidates?.[0]?.content?.parts?.[0]?.text) {
      console.error('Unexpected API response format:', data);
      throw new Error('Invalid response format from API');
    }
    return data.candidates[0].content.parts[0].text;
  } catch (error) {
    console.error("Error generating fun facts:", error);
    if (error.message.includes('API key not found')) {
      return "Error: API key not found. Please check your environment variables.";
    }
    return `Error: ${error.message}. Please make sure the API key is valid and has access to the Gemini API.`;
  }
}