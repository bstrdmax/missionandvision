import { GoogleGenAI, Type } from "@google/genai";
import type { BusinessInfo, GeneratedContentData } from '../../src/types';

// This handler signature is compatible with Netlify Functions.
// It uses a basic object type to avoid needing extra dependencies.
export const handler = async (event: { httpMethod: string, body: string | null }) => {
  // Ensure the API key is set in your Netlify build environment variables
  const apiKey = process.env.VITE_API_KEY;
  if (!apiKey) {
    console.error("API_KEY environment variable is not set.");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server configuration error: Missing API key." }),
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  try {
    const businessInfo: BusinessInfo = JSON.parse(event.body || '{}');

    // Simple server-side validation
    if (!businessInfo.name || !businessInfo.industry || !businessInfo.audience) {
        return { statusCode: 400, body: JSON.stringify({ error: 'Invalid business information provided.' }) };
    }

    const ai = new GoogleGenAI({ apiKey });

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
              value: { type: Type.STRING, description: "The name of the core value (e.g., 'Innovation', 'Integrity')." },
              description: { type: Type.STRING, description: "A brief one-sentence explanation of what the core value means for the company in practice." },
            },
            required: ["value", "description"],
          },
        },
      },
      required: ["missionStatement", "coreValues"],
    };

    const prompt = `
      Based on the following business details, generate a mission statement and 3-5 core values.
      Company Name: ${businessInfo.name}
      Industry: ${businessInfo.industry}
      Target Audience: ${businessInfo.audience}
      Key Products/Services: ${businessInfo.services}
      Unique Selling Proposition: ${businessInfo.usp}
      Desired Company Culture: ${businessInfo.culture}
      The mission statement must be a single, inspiring sentence. Each core value needs a short name and a one-sentence description.
      Return the output in the specified JSON format.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: responseSchema,
        temperature: 0.7,
      },
    });

    const parsedData: GeneratedContentData = JSON.parse(response.text.trim());

    return {
      statusCode: 200,
      body: JSON.stringify(parsedData),
      headers: { 'Content-Type': 'application/json' },
    };
  } catch (error) {
    console.error("Error calling Gemini API in Netlify function:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Failed to generate content due to an internal error." }),
    };
  }
};
