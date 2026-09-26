import { useState } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import AboutPage from "./AboutPage";
import ChatbotButton from "./ChatbotButton";
import ChatbotPopup from "./ChatbotPopup";

export default function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AboutPage />} />
      </Routes>
      <ChatbotButton
        onClick={() => setIsChatOpen((prev) => !prev)}
        isOpen={isChatOpen}
      />
      {isChatOpen && <ChatbotPopup onClose={() => setIsChatOpen(false)} />}
    </BrowserRouter>
  );
}
