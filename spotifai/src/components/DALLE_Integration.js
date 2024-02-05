import OpenAI from "openai";

const openai = new OpenAI("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");

async function generate_cover(prompt) {
    const response = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });
      const image_url = response.data.url;
      return image_url;
}