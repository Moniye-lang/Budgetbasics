import React from "react";
import FaqAccordion from "./FaqAccordion";
import BudgetRule from "./BudgetRule";
import MemberAccordion from "./MemberAccordion";

export default function AboutPage(): React.JSX.Element {
  return (
    <div className="w-full bg-[#f5f6f4] text-[#171717]">

      {/* =====================================================
          01 — LEARN BUDGETING
          BudgetRule keeps its own 300vh scroll animation
      ===================================================== */}
      <BudgetRule />

      {/* =====================================================
          02 — ABOUT
      ===================================================== */}
      <section
        className="
    sticky top-0 z-[1]
    flex min-h-screen w-full
    flex-col justify-center
    overflow-hidden
    bg-gradient-to-br
    from-[#f5f6f4]
    via-[#f7f8f6]
    to-[#eef3ef]
    px-6
    sm:px-10
    lg:px-16
    xl:px-24
  "
      >
        <div className="mx-auto flex w-full max-w-[1400px] flex-col">

          {/* Section label */}
          <span
            className="
        mb-7
        inline-flex w-fit
        items-center
        rounded-full
        border border-[#bfd2ff]
        bg-[#f0f5ff]
        px-4 py-2
        font-['Inter']
        text-[10px]
        font-semibold
        uppercase
        tracking-[0.14em]
        text-[#123cc7]
        sm:text-[11px]
      "
          >
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#123cc7]" />
            02 · ABOUT US
          </span>

          {/* Main content */}
          <div
            className="
        border-l-[3px]
        border-[#123cc7]
        pl-5
        sm:pl-7
        lg:pl-10
        xl:pl-12
      "
          >
            {/* About heading */}
            <h1
              className="
          max-w-[1050px]
          font-['Inter']
          text-[clamp(2.5rem,4.8vw,5.2rem)]
          font-bold
          leading-[0.94]
          tracking-[-0.055em]
          text-[#171717]
        "
            >
              About{" "}
              <span className="text-[#123cc7]">
                BudgetBasics.
              </span>
            </h1>

            {/* Intro */}
            <div className="mt-6 max-w-[900px] space-y-2">
              <p
                className="
            font-['Inter']
            text-[15px]
            font-normal
            leading-[1.65]
            text-[#303b48]
            sm:text-[16px]
            lg:text-[17px]
          "
              >
                BudgetBasics was built by students, for students. We know what it's
                like to get a monthly allowance, a scholarship stipend, or your first
                part-time paycheck and have absolutely no idea where it went by the
                end of the month.
              </p>

              <p
                className="
            font-['Inter']
            text-[15px]
            font-normal
            leading-[1.65]
            text-[#303b48]
            sm:text-[16px]
            lg:text-[17px]
          "
              >
                This site exists to change that — one small habit at a time.
              </p>
            </div>

            {/* Mission */}
            <div className="mt-8 max-w-[1000px] lg:mt-9">
              <h2
                className="
            font-['Inter']
            text-[clamp(2rem,3.4vw,3.6rem)]
            font-bold
            leading-[0.95]
            tracking-[-0.05em]
            text-[#171717]
          "
              >
                Our{" "}
                <span className="text-[#10a83a]">
                  Mission.
                </span>
              </h2>

              <div className="mt-4 space-y-2">
                <p
                  className="
              font-['Inter']
              text-[15px]
              font-normal
              leading-[1.6]
              text-[#46515c]
              sm:text-[16px]
              lg:text-[17px]
            "
                >
                  Our mission is simple: make budgeting feel less like homework and
                  more like common sense. We believe financial literacy shouldn't be
                  locked behind confusing jargon or expensive courses.
                </p>

                <p
                  className="
              font-['Inter']
              text-[15px]
              font-normal
              leading-[1.6]
              text-[#46515c]
              sm:text-[16px]
              lg:text-[17px]
            "
                >
                  Through simple guides, visual breakdowns, and hands-on tools,
                  BudgetBasics helps you understand where your money comes from, where
                  it's going, and how small decisions today can add up to real
                  savings tomorrow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          03 — TEAM
      ===================================================== */}
      <section
        className="
          sticky top-0 z-[2]
          flex h-screen w-full
          flex-col justify-center
          overflow-hidden
          bg-gradient-to-br
          from-[#f5f6f4]
          via-[#f6f8f5]
          to-[#edf5ef]
          px-6
          sm:px-10
          lg:px-16
          xl:px-24
        "
      >
        <div className="mx-auto flex w-full max-w-[1450px] flex-col">
          <span
            className="
              mb-8 inline-flex w-fit
              items-center
              rounded-full
              border border-green-200
              bg-[#e8f7eb]
              px-4 py-2
              font-mono text-[10px]
              font-bold uppercase
              tracking-[0.14em]
              text-[#10a83a]
              sm:text-[11px]
            "
          >
            <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#10a83a]" />
            03 · MEET THE TEAM
          </span>

          <div
            className="
              border-l-[3px]
              border-[#10a83a]
              pl-6
              sm:pl-8
              lg:pl-12
              xl:pl-16
            "
          >
            <h2
              className="
                text-[clamp(3rem,6vw,7rem)]
                font-black
                leading-[0.86]
                tracking-[-0.065em]
              "
            >
              Meet The{" "}
              <span className="text-[#10a83a]">
                Team.
              </span>
            </h2>

            <p
              className="
                mt-6
                max-w-[850px]
                text-[clamp(1rem,1.35vw,1.25rem)]
                leading-[1.55]
                text-[#46515c]
              "
            >
              We're a team of Aptech ADSE students who combined what we're
              learning in frontend development and UI/UX design to build
              something we'd actually want to use ourselves.
            </p>

            {/* Existing accordion animation untouched */}
            <div className="mt-8 w-full">
              <MemberAccordion />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          04 — FAQ
      ===================================================== */}
      <section
        className="
          sticky top-0 z-[3]
          flex h-screen w-full
          flex-col items-center justify-center
          overflow-hidden
          bg-gradient-to-br
          from-[#f5f6f4]
          via-[#f8f8f7]
          to-[#f3eeee]
          px-6
          sm:px-10
          lg:px-16
          xl:px-24
        "
      >
        <div className="w-full max-w-[1100px]">
          <div className="flex justify-center">
            <span
              className="
                inline-flex items-center
                rounded-full
                border border-red-200
                bg-[#fff0f0]
                px-4 py-2
                font-mono text-[10px]
                font-bold uppercase
                tracking-[0.14em]
                text-[#dc2929]
                sm:text-[11px]
              "
            >
              <span className="mr-2 h-1.5 w-1.5 rounded-full bg-[#dc2929]" />
              04 · FAQ
            </span>
          </div>

          <div className="mx-auto mt-7 max-w-[900px] text-center">
            <h2
              className="
                text-[clamp(2.8rem,5.5vw,6rem)]
                font-black
                leading-[0.88]
                tracking-[-0.065em]
              "
            >
              Frequently Asked{" "}
              <span className="text-[#dc2929]">
                Questions.
              </span>
            </h2>

            <p
              className="
                mx-auto
                mt-5
                max-w-[650px]
                text-[clamp(0.95rem,1.2vw,1.15rem)]
                leading-7
                text-[#555]
              "
            >
              Everything you need to know about BudgetBasics and how it helps
              you build better money habits.
            </p>
          </div>

          <div className="mt-8">
            <FaqAccordion />
          </div>
        </div>
      </section>
    </div>
  );
}