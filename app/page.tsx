"use client";

import { AssistantUIProvider, Chat } from "@assistant-ui/react";
import "@assistant-ui/react/styles.css";

export default function ChatPage() {
  return (
    <AssistantUIProvider
      config={{
        api: { baseUrl: "/api/chat" }, // Ensure this matches your API route
      }}
    >
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col max-w-screen-lg w-full h-full p-5">
          <Chat />
        </div>
      </div>
    </AssistantUIProvider>
  );
}
