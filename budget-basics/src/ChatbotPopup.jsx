import { useState, useRef, useEffect } from "react";
import chatbotData from "./chatbotData.json";
import "./ChatbotPopup.css";

function getBotResponse(userInput) {
  const normalized = userInput.toLowerCase().trim();

  const match = chatbotData.find((entry) =>
    entry.keywords.some((keyword) => normalized.includes(keyword)),
  );

  if (match) return match.answer;

  return "I'm not sure about that one — I can help with budgeting basics, needs vs wants, the 50/30/20 rule, savings goals, or common money mistakes. Try asking about one of those!";
}

const suggestedPrompts = [
  "What is a need?",
  "How much should I save?",
  "How do I avoid overspending?",
];

export default function ChatbotPopup({ onClose }) {
  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! I'm the BudgetBasics assistant. Ask me about needs vs wants, the 50/30/20 rule, savings, or common money mistakes.",
    },
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = (text) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage = { sender: "user", text: trimmed };
    const botMessage = { sender: "bot", text: getBotResponse(trimmed) };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    sendMessage(input);
  };

  return (
    <div className="chatbot-popup">
      <div className="chatbot-header">
        <span>BudgetBasics Assistant</span>
        <button
          className="chatbot-close"
          onClick={onClose}
          aria-label="Close chat assistant"
        >
          ×
        </button>
      </div>

      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={`chatbot-message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {messages.length === 1 && (
        <div className="chatbot-suggestions">
          {suggestedPrompts.map((prompt) => (
            <button
              key={prompt}
              className="chatbot-suggestion"
              onClick={() => sendMessage(prompt)}
            >
              {prompt}
            </button>
          ))}
        </div>
      )}

      <form className="chatbot-input-row" onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about budgeting..."
          aria-label="Type your question"
        />
        <button type="submit" aria-label="Send message">
          Ask
        </button>
      </form>

      <p className="chatbot-disclaimer">
        This assistant gives basic educational information, not professional
        financial advice.
      </p>
    </div>
  );
}
