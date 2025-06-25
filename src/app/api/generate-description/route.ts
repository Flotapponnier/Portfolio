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

    // Create a ReadableStream for streaming response
    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Use chatCompletionStream for streaming
          const streamResponse = client.chatCompletionStream({
            model: "meta-llama/Llama-3.2-3B-Instruct",
            messages: [
              {
                role: "user",
                content:
                  prompt ||
                  "Generate a professional portfolio description for a software engineer.",
              },
            ],
            max_tokens: 500,
            temperature: 0.7,
          });

          for await (const chunk of streamResponse) {
            const content = chunk.choices?.[0]?.delta?.content;
            if (content) {
              const data = JSON.stringify({ token: content });
              controller.enqueue(new TextEncoder().encode(`data: ${data}\n\n`));
            }
          }

          controller.enqueue(
            new TextEncoder().encode(`data: {"done": true}\n\n`),
          );
          controller.close();
        } catch (error) {
          console.error("Streaming error:", error);
          const errorData = JSON.stringify({
            error: error instanceof Error ? error.message : "Streaming failed",
          });
          controller.enqueue(
            new TextEncoder().encode(`data: ${errorData}\n\n`),
          );
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
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
