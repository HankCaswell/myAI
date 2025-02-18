import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { NextResponse } from "next/server";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const body = await req.json();

    // Extract messages properly for assistant-ui
    const messages = body.messages.map((msg: any) => ({
      role: msg.role, // Ensure role is either "user" or "assistant"
      content: msg.content,
    }));

    // Generate response stream
    const result = streamText({
      model: openai("gpt-4o-mini"),
      messages,
    });

    return NextResponse.json({
      output: result.toDataStreamResponse(),
    });
  } catch (error) {
    console.error("Error handling chat request:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
