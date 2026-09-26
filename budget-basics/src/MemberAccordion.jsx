import { useState } from "react";
import "./MemberAccordion.css";
import members from "./members.json";

export default function MemberAccordion() {
  const [expandedId, setExpandedId] = useState(null); // nothing open by default

  const handleToggle = (id) => {
    setExpandedId((current) => (current === id ? null : id));
  };

  return (
    <div className="member-dropdown">
      {members.map((item) => {
        const isOpen = expandedId === item.id;
        return (
          <div
            className={`member-panel ${isOpen ? "open" : ""}`}
            key={item.id}
            onMouseEnter={() => setExpandedId(item.id)}
            onMouseLeave={() => setExpandedId((current) => current === item.id ? null : current)}
          >
            <div className="member-image-row">
              {item.image ? (
                <img
                  src={item.image}
                  alt={`Team member ${item.id}`}
                  className="team-member-image"
                />
              ) : (
                <div className="image-placeholder" aria-hidden="true" />
              )}
            </div>
            <button
              className="member-summary"
              onClick={() => handleToggle(item.id)}
              aria-expanded={isOpen}
              aria-controls={`${item.id}-content`}
              id={`${item.id}-header`}
            >
              What did they work on?{" "}
              <span className={`member-icon ${isOpen ? "open" : ""}`}>›</span>
            </button>
            <div
              className={`member-details ${isOpen ? "open" : ""}`}
              id={`${item.id}-content`}
              role="region"
              aria-labelledby={`${item.id}-header`}
            >
              <p>{item.work}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
