import React from "react";
import FaqAccordion from "./FaqAccordion";
import BudgetRule from "./BudgetRule";
import "./AboutPage.css";
import MemberAccordion from "./MemberAccordion";
import SavingsGoals from "./SavingsGoals";

export default function AboutPage() {
  return (
    <div>
      <BudgetRule />
      <SavingsGoals />

      <section className="stack-panel stack-panel-about-mission">
        <span className="eyebrow tag-chip">01 · ABOUT US</span>
        <div className="about-text accent-blue">
          <h1>About Budget Basics</h1>
          <p>
            BudgetBasics was built by students, for students. We know what it's
            like to get a monthly allowance, a scholarship stipend, or your
            first part-time paycheck and have absolutely no idea where it went
            by the end of the month. This site exists to change that — one small
            habit at a time.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is simple: make budgeting feel less like homework and
            more like common sense. We believe financial literacy shouldn't be
            locked behind confusing jargon or expensive courses. Through simple
            guides, visual breakdowns, and hands-on tools, BudgetBasics helps
            you understand where your money comes from, where it's going, and
            how small decisions today can add up to real savings tomorrow. This
            isn't a bank, and it won't judge your spending — it's a space to
            learn, experiment, and build habits that actually stick.
          </p>
        </div>
      </section>

      <section className="stack-panel stack-panel-meet-team">
        <span className="eyebrow tag-chip-green">02 · MEET THE TEAM</span>
        <div className="about-text accent-green">
          <h2>Meet The Team</h2>
          <p>
            We're a team of Aptech ADSE students who combined what we're
            learning in frontend development and UI/UX design to build something
            we'd actually want to use ourselves.
          </p>
          <div className="team-members">
            <MemberAccordion />
          </div>
        </div>
      </section>

      <section className="stack-panel stack-panel-faq">
        <span
          className="eyebrow tag-chip-rose"
          style={{ margin: "0 auto 16px" }}
        >
          03 · FAQ
        </span>
        <h2 style={{ textAlign: "center", paddingBottom: "26px" }}>
          Frequently Asked Questions
        </h2>
        <FaqAccordion />
      </section>
    </div>
  );
}
