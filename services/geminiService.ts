import { BusinessInfo, GeneratedContentData } from "../types";

export async function generateMissionAndValues(businessInfo: BusinessInfo): Promise<GeneratedContentData> {
  try {
    const response = await fetch('/.netlify/functions/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(businessInfo),
    });

    const responseData = await response.json();

    if (!response.ok) {
      // Use the error message from the serverless function, or a default
      throw new Error(responseData.error || `Request failed with status: ${response.status}`);
    }

    const parsedData: GeneratedContentData = responseData;
    
    // Basic validation on the received data
    if (!parsedData.missionStatement || !Array.isArray(parsedData.coreValues)) {
        throw new Error("Invalid data structure received from the server.");
    }
    
    return parsedData;

  } catch (error) {
    console.error("Error calling backend function:", error);
    // Re-throw a user-friendly error for the UI to catch
    const message = error instanceof Error ? error.message : "An unknown error occurred.";
    throw new Error(`Failed to generate content: ${message}`);
  }
}
