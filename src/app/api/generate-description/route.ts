export const runtime = "edge";

export async function POST(request: Request) {
  try {
    const HF_TOKEN = process.env.HF_TOKEN;
    if (!HF_TOKEN) {
      console.error("Hugging Face token not configured");
      return new Response(
        JSON.stringify({ error: "Server configuration error" }),
        { status: 500, headers: { "Content-Type": "application/json" } },
      );
    }

    const { prompt } = await request.json();
    const model = "mistralai/Mixtral-8x7B-Instruct-v0.1"; // Working model

    const response = await fetch(
      `https://api-inference.huggingface.co/models/${model}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${HF_TOKEN}`,
        },
        body: JSON.stringify({
          inputs:
            prompt ||
            "Generate a professional portfolio description for a software engineer:",
          parameters: {
            max_new_tokens: 200,
            temperature: 0.9,
            top_k: 50,
            top_p: 0.95,
            do_sample: true,
            return_full_text: false, // Only return the generated text
          },
        }),
      },
    );

    // Handle Hugging Face API errors
    if (!response.ok) {
      let errorMessage = "Failed to generate description";

      if (response.status === 503) {
        errorMessage = "Model is loading, please try again in 20 seconds";
      } else if (response.status === 429) {
        errorMessage = "Rate limit exceeded, please try again later";
      } else {
        const errorData = await response.json();
        errorMessage = errorData.error || errorMessage;
      }

      return new Response(JSON.stringify({ error: errorMessage }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    const result = await response.json();

    // Extract generated text from response

    const generatedText = result[0]?.generated_text || "";

    const cleanText = generatedText
      .replace(/\n+/g, " ") // remplace tous les sauts de ligne
      .replace(/\s+/g, " ") // compresse les espaces
      .trim();

    // Coupe après la première ou deuxième phrase
    const sentences = cleanText.match(/[^.!?]+[.!?]/g); // découpe en phrases
    const finalText = sentences ? sentences.slice(0, 3).join(" ") : cleanText;
    return new Response(JSON.stringify({ description: cleanText }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Server error:", error);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
