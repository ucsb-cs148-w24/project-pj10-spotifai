import openai

client = openai.OpenAI(api_key = "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")

response = client.completions.create(
  model="gpt-3.5-turbo-instruct",
  prompt="Say Hello"
)

print(response)