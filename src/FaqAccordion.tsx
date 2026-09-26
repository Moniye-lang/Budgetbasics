import React, { useState } from "react";
import "./FaqAccordion.css";
import faqDataJson from "./faqData.json";

interface FaqItem {
  id: number | string;
  question: string;
  answer: string;
}

const faqData = faqDataJson as FaqItem[];

export default function FaqAccordion(): React.JSX.Element {
  const [expandedId, setExpandedId] = useState<number | string | null>(null);

  const handleToggle = (id: number | string) => {
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
              <span>{item.question}</span>
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
