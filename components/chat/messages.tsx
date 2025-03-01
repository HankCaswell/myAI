import { DisplayMessage } from "@/types";
import { motion } from "framer-motion";


export default function ChatMessages({ messages }: { messages: DisplayMessage[] }) {
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 0.5 }}
      className="flex flex-col flex-1 px-6 py-4 space-y-4 overflow-y-auto h-full bg-background text-foreground"
    >
      {messages.length === 0 ? (
        <p className="text-gray-500 text-center">Ask a question to start the conversation</p>
      ) : (
        messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`message-container ${
              message.role === "user" ? "message-user" : "message-assistant"
            } max-w-[80%]`}
          >
            {message.content}
          </motion.div>
        ))
      )}
      <div className="h-32"></div> {/* Padding at bottom */}
    </motion.div>
  );
}
