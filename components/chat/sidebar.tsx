"use client";

import { useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area"
import { Button } from "@/components/ui/button";

const conversations = [
  { id: 1, title: "Applying to MBA programs" },
  { id: 2, title: "VA benefits explained" },
  { id: 3, title: "Finding a job after service" },
];

export default function Sidebar() {
  const [activeChat, setActiveChat] = useState<number | null>(null);

  return (
    <aside className="w-64 bg-gray-900 text-white p-5 flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-4">Conversations</h2>
      <ScrollArea className="flex-grow">
        <ul>
          {conversations.map((chat) => (
            <li
              key={chat.id}
              className={`p-2 rounded-md hover:bg-gray-700 cursor-pointer ${
                activeChat === chat.id ? "bg-gray-700" : ""
              }`}
              onClick={() => setActiveChat(chat.id)}
            >
              {chat.title}
            </li>
          ))}
        </ul>
      </ScrollArea>
      <Button className="mt-4 w-full">+ New Chat</Button>
    </aside>
  );
}
