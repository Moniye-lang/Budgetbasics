import { useRef, useState, useEffect } from "react";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import messageIcon from "./assets/messageIcon.json";
import "./ChatbotButton.css";

export default function ChatbotButton({ onClick, isOpen }) {
  const dotLottieRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);

  // Show the icon if either hovered OR the chat is open
  const showIcon = isHovered || isOpen;

  useEffect(() => {
    if (showIcon) {
      const timeout = setTimeout(() => {
        dotLottieRef.current?.setFrame(0);
        dotLottieRef.current?.play();
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [showIcon]);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button
      className="chatbot-fab"
      onClick={onClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      aria-label={isOpen ? "Close chat assistant" : "Open chat assistant"}
    >
      <span className={`chatbot-fab-label ${showIcon ? "fab-hidden" : ""}`}>
        Ask
      </span>
      <span className={`chatbot-fab-icon ${showIcon ? "fab-visible" : ""}`}>
        <DotLottieReact
          dotLottieRefCallback={(instance) => (dotLottieRef.current = instance)}
          data={messageIcon}
          loop={true}
          autoplay={false}
          speed={1.2}
          style={{ width: 28, height: 28 }}
        />
      </span>
    </button>
  );
}
