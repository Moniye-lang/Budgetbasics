import { useState } from "react";
import "./FaqAccordion.css";
import faqData from "./faqData.json";

export default function FaqAccordion() {
  const [expandedId, setExpandedId] = useState(null); // nothing open by default

  const handleToggle = (id) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <div className="faq-accordion">
      {faqData.map((item) => {
        const isOpen = expandedId === item.id;
        return (
          <div className="faq-panel" key={item.id}>
            <button
              className="faq-summary"
              onClick={() => handleToggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`${item.id}-content`}
              id={`${item.id}-header`}
            >
              <span className="question">{item.question}</span>
              <span className={`faq-icon ${isOpen ? "open" : ""}`}>›</span>
            </button>
            <div
              className={`faq-details ${isOpen ? "open" : ""}`}
              id={`${item.id}-content`}
              role="region"
              aria-labelledby={`${item.id}-header`}
            >
              <p>{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
