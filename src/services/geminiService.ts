import { GoogleGenAI, Type } from "@google/genai";
import { BusinessInfo, GeneratedContentData } from "../types";

// FIX: Initialize GoogleGenAI with API key from process.env as per guidelines.
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY! });

const responseSchema = {
  type: Type.OBJECT,
  properties: {
    missionStatement: {
      type: Type.STRING,
      description: "A concise and inspiring mission statement for the business, written as a single sentence.",
    },
    coreValues: {
      type: Type.ARRAY,
      description: "A list of 3-5 core values for the business.",
      items: {
        type: Type.OBJECT,
        properties: {
          value: {
            type: Type.STRING,
            description: "The name of the core value (e.g., 'Innovation', 'Integrity').",
          },
          description: {
            type: Type.STRING,
            description: "A brief one-sentence explanation of what the core value means for the company in practice.",
          },
        },
        required: ["value", "description"],
      },
    },
  },
  required: ["missionStatement", "coreValues"],
};

export async function generateMissionAndValues(businessInfo: BusinessInfo): Promise<GeneratedContentData> {
  const prompt = `
    Based on the following business details, please generate a mission statement and a set of 3-5 core values.

    Company Name: ${businessInfo.name}
    Industry: ${businessInfo.industry}
    Target Audience: ${businessInfo.audience}
    Key Products/Services: ${businessInfo.services}
    What makes the company unique: ${businessInfo.usp}
    Desired Company Culture (adjectives): ${businessInfo.culture}

    The mission statement should be a single, concise, and inspiring sentence that captures the company's purpose, avoiding corporate jargon.
    Each core value should be a short phrase (1-3 words) followed by a brief one-sentence explanation of what it means for the company.
    Return the output in the specified JSON format.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const jsonText = response.text.trim();
    const parsedData: GeneratedContentData = JSON.parse(jsonText);
    
    // Basic validation
    if (!parsedData.missionStatement || !Array.isArray(parsedData.coreValues)) {
        throw new Error("Invalid data structure received from API.");
    }
    
    return parsedData;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    // FIX: Corrected typo 'new new Error' to 'new Error'.
    throw new Error("Failed to generate content from AI. The model may be unavailable or the request could not be processed.");
  }
}