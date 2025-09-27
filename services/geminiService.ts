import { GoogleGenAI, Type } from "@google/genai";
import { Gender, AnalysisResult, RecommendationResult } from '../types';

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const responseSchema = {
    type: Type.OBJECT,
    properties: {
        clothing: {
            type: Type.OBJECT,
            properties: {
                colors: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'List of 3-5 flattering color HEX codes (e.g., "#RRGGBB").'
                },
                styles: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'List of 2-3 clothing style suggestions (e.g., "V-neck shirts").'
                },
                notes: {
                    type: Type.STRING,
                    description: 'A single, concise sentence summarizing the clothing advice.'
                }
            },
            required: ['colors', 'styles', 'notes']
        },
        makeup: {
            type: Type.OBJECT,
            properties: {
                foundation: { type: Type.STRING, description: 'Brief tip for foundation (e.g., "Warm undertones").' },
                blush: { type: Type.STRING, description: 'Brief tip for blush (e.g., "Rose or berry tones").' },
                eyes: { type: Type.STRING, description: 'Brief tip for eye makeup (e.g., "Smoky eye with warm browns").' },
                lips: { type: Type.STRING, description: 'Brief tip for lip color (e.g., "Bold reds or deep pinks").' },
                notes: { type: Type.STRING, description: 'A single, concise sentence summarizing makeup advice, or "N/A" if not applicable.' }
            },
            required: ['foundation', 'blush', 'eyes', 'lips', 'notes']
        },
        beard: {
            type: Type.OBJECT,
            properties: {
                styles: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'List of 2-3 suitable beard styles (e.g., "Goatee", "Full beard").'
                },
                notes: {
                    type: Type.STRING,
                    description: 'A single, concise sentence summarizing beard advice, or "N/A" if not applicable.'
                }
            },
            required: ['styles', 'notes']
        }
    },
    required: ['clothing', 'makeup', 'beard']
};


export const getStyleRecommendations = async (gender: Gender, analysisResult: AnalysisResult): Promise<RecommendationResult> => {
    const prompt = `
You are "TrueShade", an expert AI style assistant.
Your goal is to provide personalized, actionable, and encouraging style advice in a structured, concise format.

User's Details:
- Gender: ${gender}
- Detected Skin Tone: ${analysisResult.skinTone}
- Detected Face Shape: ${analysisResult.faceShape}

Based on this, generate brief, bullet-point-style recommendations.

1.  **Clothing:**
    -   Suggest 3-5 flattering color HEX codes.
    -   Recommend 2-3 styles of collars or necklines.
    -   Provide a one-sentence summary.
2.  **Makeup:** (If 'Female' or 'Non-binary')
    -   Provide a brief tip for foundation, blush, eyes, and lips.
    -   Provide a one-sentence summary. If not applicable, use "N/A" in the notes.
3.  **Beard Style:** (If 'Male' or 'Non-binary')
    -   Suggest 2-3 specific beard styles.
    -   Provide a one-sentence summary. If not applicable, use "N/A" in the notes.

Return the response as a JSON object adhering to the provided schema. Each point should be short and precise.
`;
    
    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: responseSchema,
            },
        });

        const jsonText = response.text.trim();
        const parsedResult = JSON.parse(jsonText);

        const result: RecommendationResult = {
            clothing: parsedResult.clothing,
        };

        if (parsedResult.makeup && parsedResult.makeup.notes.toLowerCase() !== 'n/a') {
            result.makeup = parsedResult.makeup;
        }
        if (parsedResult.beard && parsedResult.beard.notes.toLowerCase() !== 'n/a') {
            result.beard = parsedResult.beard;
        }

        return result;

    } catch (error) {
        console.error("Error fetching recommendations from Gemini API:", error);
        throw new Error("Failed to get style recommendations from AI.");
    }
};
