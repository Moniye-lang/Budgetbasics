import React from "react";
import { useState, useRef, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "framer-motion";
import "./BudgetRule.css";
import budgetRule from "./budgetRule.json";

const dotClasses = ["dot-needs", "dot-wants", "dot-savings"];
const borderClasses = [
  "act-border-needs",
  "act-border-wants",
  "act-border-savings",
];

export default function BudgetRule() {
  const targetRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });
  const [active, setActive] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [isCarouselPaused, setIsCarouselPaused] = useState(false);

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    const index = Math.min(
      budgetRule.length - 1,
      Math.max(0, Math.floor(value * budgetRule.length)),
    );
    setActive(index);
  });

  const act = budgetRule[active];
  const images =
    act.images ?? (act.img ? [{ src: act.img, alt: act.alt }] : []);
  const image = images[activeImage % Math.max(images.length, 1)];

  useEffect(() => {
    setActiveImage(0);
  }, [active]);

  useEffect(() => {
    if (images.length < 2 || isCarouselPaused) return undefined;

    const intervalId = window.setInterval(() => {
      setActiveImage((current) => (current + 1) % images.length);
    }, 2500);

    return () => window.clearInterval(intervalId);
  }, [active, images.length, isCarouselPaused]);

  const showNextImage = () => {
    if (images.length > 1) {
      setActiveImage((current) => (current + 1) % images.length);
    }
  };

  const showPreviousImage = () => {
    if (images.length > 1) {
      setActiveImage(
        (current) => (current - 1 + images.length) % images.length,
      );
    }
  };

  return (
    <section id="budget" ref={targetRef} className="budget-section">
      <div className="budget-stage">
        <div className="title-text">
          <span className={`eyebrow budget-eyebrow budget-eyebrow-${active}`}>
            {String(active + 1).padStart(2, "0")} · LEARN BUDGETING
          </span>
          <p className="head">
            The <span className="fifty">50</span>/
            <span className="thirty">30</span>/
            <span className="twenty">20</span> Budgeting Rule
          </p>
        </div>

        <div className="animation-container">
          <div className="animation-main">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -24 }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="act-content"
              >
                <p className="act-label">{act.label}</p>
                <h2 className="act-title">{act.title}</h2>
                <p className="act-text">{act.text}</p>
                <p className="act-tag">
                  <span className={`tag-dot ${dotClasses[active]}`} />
                  <span
                    className={`tag-chip budget-tag-chip-${active}`}
                  >
                    {act.tag}
                  </span>
                </p>
              </motion.div>
            </AnimatePresence>
          </div>

          <div
            className="budget-image card"
            aria-label={`${act.label} images`}
            onMouseEnter={() => setIsCarouselPaused(true)}
            onMouseLeave={() => setIsCarouselPaused(false)}
            onFocus={() => setIsCarouselPaused(true)}
            onBlur={(event) => {
              if (!event.currentTarget.contains(event.relatedTarget)) {
                setIsCarouselPaused(false);
              }
            }}
          >
            {image ? (
              <AnimatePresence mode="wait">
                <motion.img
                  key={`${active}-${activeImage}`}
                  src={image.src}
                  alt={image.alt}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="budget-carousel-image"
                  loading="lazy"
                />
              </AnimatePresence>
            ) : (
              <div className="budget-image-placeholder" aria-hidden="true" />
            )}
            {images.length > 1 && (
              <div className="carousel-controls">
                <button
                  type="button"
                  onClick={showPreviousImage}
                  aria-label="Previous image"
                >
                  ‹
                </button>
                <span>
                  {activeImage + 1} / {images.length}
                </span>
                <button
                  type="button"
                  onClick={showNextImage}
                  aria-label="Next image"
                >
                  ›
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="progress-bar">
          <div className="progress-track">
            <motion.div
              className="progress-fill"
              style={{ scaleX: scrollYProgress }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
