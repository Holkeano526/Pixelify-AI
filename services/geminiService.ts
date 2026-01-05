
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { PixelBitDepth, PixelArtStyle } from "../types";

const BIT_DEPTH_PROMPTS: Record<PixelBitDepth, string> = {
  '8-bit': "ULTRA-LOW RESOLUTION. Massive chunky pixels. 8-color palette limit. Very blocky edges.",
  '16-bit': "CLASSIC RETRO RESOLUTION. Clearly visible 1px-scale pixels. 16-32 color palette. Sharp aliased lines.",
  '32-bit': "ADVANCED ARCADE RESOLUTION. Detailed but strictly pixelated. 64 color palette. Vibrant with clean shading.",
  '64-bit': "MODERN HD PIXEL ART. High detail while maintaining a visible pixel grid. Rich color depth but strictly aliased."
};

export const transformToPixelArt = async (
  base64Image: string,
  depth: PixelBitDepth,
  style: PixelArtStyle
): Promise<string> => {
  try {
    // Fix: Create a new GoogleGenAI instance right before making an API call 
    // to ensure it always uses the most up-to-date API key.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

    let styleInstruction = "";

    if (style === 'chibi') {
      styleInstruction = `
        STYLE: JRPG Chibi Anime Sprite.
        INSTRUCTION: Transform the subject into a stylized anime character with large expressive eyes and simplified proportions (Super Deformed/Chibi). 
        Use clean dark outlines and flat cell-shading. Refer to the aesthetic of classic 2D JRPGs.
      `;
    } else {
      // User-requested specific Neutral/RPG Character prompt
      styleInstruction = `
        INSTRUCTION: Create a pixel art RPG-style character based on the person in the attached picture. 
        Reconfigure the same outfits and poses as the person in the picture. 
        Render the character with neat contours, soft pastel tones, and retro 8-bit aesthetics. 
        Keep the background white to maintain a clear sense of isolation.
      `;
    }

    const prompt = `ACT AS A PROFESSIONAL PIXEL ARTIST.
    
    TASK: Transform the input image into PIXEL ART.
    
    ${styleInstruction}
    
    TECHNICAL SPECS AND BIT-DEPTH: ${BIT_DEPTH_PROMPTS[depth]}
    
    CORE RULES:
    1. THE PIXEL GRID MUST BE PERFECTLY SHARP. NO BLUR OR ANTI-ALIASING.
    2. NO SEMI-TRANSPARENCY.
    3. NO SOFT GRADIENTS. Use dithered blocks or solid areas.
    4. MUST look like hand-placed pixels, not a simple mosaic filter.
    
    Respond with the image data only.`;

    const cleanBase64 = base64Image.replace(/^data:image\/(png|jpeg|webp);base64,/, "");

    const response: GenerateContentResponse = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: 'image/jpeg',
              data: cleanBase64,
            },
          },
          {
            text: prompt,
          },
        ],
      },
      config: {
        imageConfig: {
          aspectRatio: "1:1"
        }
      }
    });

    let generatedImageUrl = "";
    if (response.candidates && response.candidates[0].content.parts) {
      // Correct: Iterate through parts to find the image part, as it might not be the first part.
      for (const part of response.candidates[0].content.parts) {
        if (part.inlineData) {
          generatedImageUrl = `data:${part.inlineData.mimeType};base64,${part.inlineData.data}`;
          break;
        }
      }
    }

    if (!generatedImageUrl) {
      throw new Error("Generation failed. Please try again.");
    }

    return generatedImageUrl;
  } catch (error: any) {
    console.error("Gemini API Error:", error);
    throw new Error(error.message || "Transformation failed.");
  }
};
