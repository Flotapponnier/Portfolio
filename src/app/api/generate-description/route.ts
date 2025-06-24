import { InferenceClient } from "@huggingface/inference";

export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const HF_TOKEN = process.env.HF_TOKEN;

    if (!HF_TOKEN) {
      return new Response(
        JSON.stringify({ error: "Hugging Face token not configured" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const { prompt } = await request.json();
    const client = new InferenceClient(HF_TOKEN);

    const response = await client.chatCompletion({
      provider: "cohere",
      model: "CohereLabs/c4ai-command-r-plus",

      messages: [
        {
          role: "user",
          content:
            prompt ||
            "Generate a professional portfolio description for a software engineer.",
        },
      ],
    });

    const generatedText = response.choices?.[0]?.message?.content || "";
    const cleaned = cleanGeneratedText(generatedText);

    return new Response(JSON.stringify({ description: cleaned }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("Server error:", error);

    const errorMessage =
      error instanceof Error ? error.message : "Internal server error";

    return new Response(JSON.stringify({ error: errorMessage }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

function cleanGeneratedText(text: string): string {
  return text
    .replace(/\bundefined\b[\s.,;:!?]*/gi, "") // Remove "undefined"
    .replace(/\s+/g, " ") // Normalize spaces
    .trim();
}
