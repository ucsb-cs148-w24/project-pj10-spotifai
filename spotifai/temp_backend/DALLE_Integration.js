import OpenAI from "openai";

const openai = new OpenAI(api_key = "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");

async function generate_cover(prompt) {
    const response = await openai.createImage({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: "1024x1024",
      });
      image_url = response.data.data[0].url;
      return image_url;
}
