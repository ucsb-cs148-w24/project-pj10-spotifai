import OpenAI from "openai";

async function generate_cover(prompt) {
    const openai = new OpenAI({
      apiKey: "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",
      dangerouslyAllowBrowser: true
    });
    try {
      const response = await openai.images.generate({
          model: "dall-e-3",
          prompt: prompt,
          n: 1,
          size: "1024x1024",
      });
      const image_url = response.data[0].url; 
      console.log(image_url); 
      return image_url;
      
    } catch (error) {
        console.error("Error generating cover:", error);
        return null; 
  }
}
export { generate_cover };