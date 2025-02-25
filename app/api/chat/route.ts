import { openai } from "@ai-sdk/openai";
import { streamText } from "ai";
import { Pinecone } from "@pinecone-database/pinecone";

// Pinecone setup
const pinecone = new Pinecone({ apiKey: process.env.PINECONE_API_KEY });
const index = pinecone.index("your-index-name"); // Change to your Pinecone index name

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  // Extract the latest user message
  const userMessage = messages[messages.length - 1].content;

  // Generate an embedding for the user's query
  const embeddingResponse = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: userMessage,
  });

  const userEmbedding = embeddingResponse.data[0].embedding;

  // Query Pinecone for relevant context
  const pineconeResponse = await index.query({
    vector: userEmbedding,
    topK: 5, // Adjust for more or fewer retrieved documents
    includeMetadata: true,
  });

  // Format retrieved documents as context
  const retrievedDocuments = pineconeResponse.matches
    .map((match) => match.metadata?.text)
    .join("\n\n");

  // Add retrieved context to the chat messages
  const augmentedMessages = [
    { role: "system", content: "Use the provided context to answer the user's question." },
    { role: "system", content: `Context: ${retrievedDocuments}` },
    ...messages, // User + assistant messages
  ];

  // Send query to OpenAI with the retrieved context
  const result = streamText({
    model: openai("gpt-4o-mini"),
    messages: augmentedMessages,
  });

  return result.toDataStreamResponse();
}
