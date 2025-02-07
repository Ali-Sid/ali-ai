import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

async function ask(prompt) {
  try {
    const marketingContext =
      "(Note: Display content in less than 2000 characters! as I'm using this from my discord server) ";
    const modifiedPrompt = marketingContext + prompt;
    const result = await model.generateContent(modifiedPrompt);
    const answer = result.response.candidates[0].content;
    if (!result.response || !result.response.candidates[0].content) {
      console.error("Unexpected response:", result);
      return "An error occurred while generating a response.";
    }

    return answer;
  } catch (error) {
    console.error("Error:", error);
    return "An error occurred.";
  }
}

// Export the "ask" function
export { ask };
