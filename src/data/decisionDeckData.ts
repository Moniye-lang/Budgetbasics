export interface DecisionOption {
  text: string;
  type: 'smart' | 'want';
  impact: number;
}

export interface DecisionChallenge {
  id: number;
  category: 'survival' | 'inflow' | 'peer' | 'tools';
  tag: string;
  title: string;
  scenario: string;
  bg: string;
  badge: string;
  options: [DecisionOption, DecisionOption];
  smartFeedback: string;
  wantFeedback: string;
}

export const allChallenges: DecisionChallenge[] = [
  {
    id: 1,
    category: "survival",
    tag: "IMPULSE CONTROL",
    title: "Your shoes are still working.",
    scenario: "You see trending sneakers heavily discounted online. Your current shoes have zero damage. Monthly cash is limited.",
    bg: "bg-[#0B1E3A] text-white border-transparent",
    badge: "text-[#8CA0FF]",
    options: [
      { text: "Buy immediately (₦18,000)", type: "want", impact: -18000 },
      { text: "Wait 24h & keep current pair", type: "smart", impact: 0 }
    ],
    smartFeedback: "You preserved capital by refusing to upgrade a functional asset. Delaying gratification protects your survival runway.",
    wantFeedback: "Upgrading working footwear depletes tight monthly reserves for novelty instead of necessity."
  },
  {
    id: 2,
    category: "survival",
    tag: "ACADEMIC PRIORITY",
    title: "School project is due tomorrow.",
    scenario: "You need printing and project binding materials, but coursemates invite you to an evening cinema outing.",
    bg: "bg-white text-[#0B1E3A] border-slate-200",
    badge: "text-[#0eb02c]",
    options: [
      { text: "Print & bind school project", type: "smart", impact: -3500 },
      { text: "Cinema ticket & popcorn", type: "want", impact: -6000 }
    ],
    smartFeedback: "Putting essential academic obligations ahead of leisure protects your long-term academic standing and tuition investment.",
    wantFeedback: "Missing a project deadline carries irreversible grade penalties. Leisure must come after responsibilities."
  },
  {
    id: 3,
    category: "inflow",
    tag: "WINDFALL DISTRIBUTION",
    title: "You receive ₦10,000 unexpectedly.",
    scenario: "An uncle sends you an unexpected ₦10,000 allowance gift. You currently have no critical bills due this week.",
    bg: "bg-white text-[#0B1E3A] border-slate-200",
    badge: "text-[#0922b0]",
    options: [
      { text: "Save 60% into reserve vault", type: "smart", impact: 6000 },
      { text: "Spend it all on treats today", type: "want", impact: -10000 }
    ],
    smartFeedback: "Treating windfalls intentionally builds wealth without feeling pinched. You grew your reserve buffer.",
    wantFeedback: "Treating unexpected windfalls as instant play money reinforces lifestyle creep and leaves you with zero buffer."
  },
  {
    id: 4,
    category: "peer",
    tag: "PEER BOUNDARIES",
    title: "A friend asks to borrow transport funds.",
    scenario: "Lending the cash will leave you with insufficient bus fare to reach campus lectures next week.",
    bg: "bg-[#F0F3FF] text-[#0B1E3A] border-blue-200",
    badge: "text-[#0922b0]",
    options: [
      { text: "Politely protect your bus fare", type: "smart", impact: 0 },
      { text: "Lend funds and walk to campus", type: "want", impact: -5000 }
    ],
    smartFeedback: "Never compromise your core educational logistics for uncollateralized peer loans.",
    wantFeedback: "You cannot pour from an empty cup. Always secure your survival transport funds first."
  },
  {
    id: 5,
    category: "tools",
    tag: "SUBSCRIPTION LEAK",
    title: "Music streaming free trial expiring.",
    scenario: "A 30-day free trial ends tomorrow. You only listened twice all month. Auto-renewal will charge ₦2,800.",
    bg: "bg-white text-[#0B1E3A] border-slate-200",
    badge: "text-[#0922b0]",
    options: [
      { text: "Cancel the trial today", type: "smart", impact: 0 },
      { text: "Let it renew silently", type: "want", impact: -2800 }
    ],
    smartFeedback: "Canceling unused subscriptions plugs quiet financial leaks that drain student allowances.",
    wantFeedback: "Unused auto-renewals quietly siphon money each month without providing value."
  },
  {
    id: 6,
    category: "survival",
    tag: "GROCERY STRATEGY",
    title: "Shopping for food on an empty stomach.",
    scenario: "You enter the market hungry without a written shopping list, surrounded by snack vendors and takeaways.",
    bg: "bg-[#0B1E3A] text-white border-transparent",
    badge: "text-[#8CA0FF]",
    options: [
      { text: "Eat quick snack & write list first", type: "smart", impact: -300 },
      { text: "Shop hungry and browse freely", type: "want", impact: -4500 }
    ],
    smartFeedback: "Shopping with a list while full reduces impulse supermarket spending by up to 40%.",
    wantFeedback: "Shopping hungry triggers emotional cravings that override careful food budgeting."
  },
  {
    id: 7,
    category: "tools",
    tag: "TECH UPGRADES",
    title: "New phone model launched on credit.",
    scenario: "Your current smartphone works smoothly with good battery life, but a vendor offers new installment debt.",
    bg: "bg-white text-[#0B1E3A] border-slate-200",
    badge: "text-[#0eb02c]",
    options: [
      { text: "Keep current functional device", type: "smart", impact: 0 },
      { text: "Take monthly installment debt", type: "want", impact: -14000 }
    ],
    smartFeedback: "Extending device lifespans to 3–4 years saves massive capital over your academic career.",
    wantFeedback: "Borrowing for marginal camera and screen upgrades traps students in recurring debt."
  },
  {
    id: 8,
    category: "survival",
    tag: "BULK PROCUREMENT",
    title: "Bulk rice sack vs daily sachets.",
    scenario: "A 5kg staple bag costs ₦8,000. Daily 1kg mini-packets cost ₦2,200 (₦11,000 total). You have cash in reserve.",
    bg: "bg-[#F0F3FF] text-[#0B1E3A] border-blue-200",
    badge: "text-[#0eb02c]",
    options: [
      { text: "Buy the 5kg bulk unit (Save ₦3,000)", type: "smart", impact: -8000 },
      { text: "Keep buying daily mini-packets", type: "want", impact: -11000 }
    ],
    smartFeedback: "Unit pricing analysis proves that buying non-perishable staples in bulk eliminates the retail markup penalty.",
    wantFeedback: "Micro-buying daily packages adds an invisible tax to your essential grocery budget."
  },
  {
    id: 9,
    category: "inflow",
    tag: "DISCOUNT ILLUSION",
    title: "70% flash sale on winter coat.",
    scenario: "An online banner advertises a designer winter coat marked down from ₦40,000 to ₦12,000 in a hot, tropical climate.",
    bg: "bg-white text-[#0B1E3A] border-slate-200",
    badge: "text-[#0922b0]",
    options: [
      { text: "Ignore: zero utility in this climate", type: "smart", impact: 0 },
      { text: "Buy to 'save' ₦28,000", type: "want", impact: -12000 }
    ],
    smartFeedback: "You didn't save ₦28,000—you kept ₦12,000 by refusing to purchase something you didn't need.",
    wantFeedback: "The sale discount illusion tricks consumers into spending real cash on unusable clearance inventory."
  },
  {
    id: 10,
    category: "survival",
    tag: "DATA LOGISTICS",
    title: "Midnight-only bundle vs study sleep.",
    scenario: "A cheaper midnight data bundle promises 20GB, but only works 1am–5am before your 8am lecture.",
    bg: "bg-[#0B1E3A] text-white border-transparent",
    badge: "text-[#8CA0FF]",
    options: [
      { text: "Buy standard daytime study bundle", type: "smart", impact: -2000 },
      { text: "Stay awake 1am–5am to save ₦700", type: "want", impact: -700 }
    ],
    smartFeedback: "Sacrificing sleep and cognitive clarity for slight telecom discounts harms academic performance.",
    wantFeedback: "Distorting sleep patterns to save small change costs far more in health and comprehension."
  },
  {
    id: 11,
    category: "peer",
    tag: "GROUP BILL SPLIT",
    title: "Splitting an unequal restaurant bill.",
    scenario: "You drank water and ate a ₦1,200 rice plate. Classmates ordered expensive cocktails and want an even split.",
    bg: "bg-white text-[#0B1E3A] border-slate-200",
    badge: "text-[#0922b0]",
    options: [
      { text: "Politely settle your own ₦1,200 order", type: "smart", impact: -1200 },
      { text: "Pay ₦5,500 split to avoid talking", type: "want", impact: -5500 }
    ],
    smartFeedback: "Polite, clear financial boundaries protect your budget without creating friction.",
    wantFeedback: "Subsidizing others' luxury meals out of awkwardness quickly empties a student wallet."
  },
  {
    id: 12,
    category: "survival",
    tag: "PREVENTIVE HEALTH",
    title: "Early dental ache checkup.",
    scenario: "Your tooth twinges when eating. Clinic checkup is ₦2,500 now. Root canal therapy later costs ₦35,000.",
    bg: "bg-[#F0F3FF] text-[#0B1E3A] border-blue-200",
    badge: "text-[#0eb02c]",
    options: [
      { text: "Get checked early at campus clinic", type: "smart", impact: -2500 },
      { text: "Ignore and hope it disappears", type: "want", impact: 0 }
    ],
    smartFeedback: "Preventive health maintenance is always cheaper than emergency dental surgery.",
    wantFeedback: "Delaying medical care turns small, treatable symptoms into expensive health crises."
  },
  {
    id: 13,
    category: "survival",
    tag: "SURGE TIMING",
    title: "Sudden rain storm rideshare surge.",
    scenario: "Cab apps surge 300% due to rain. The covered campus shuttle runs every 15 minutes for ₦200.",
    bg: "bg-white text-[#0B1E3A] border-slate-200",
    badge: "text-[#0922b0]",
    options: [
      { text: "Wait 15 mins for the campus shuttle", type: "smart", impact: -200 },
      { text: "Book private ₦4,500 surge ride", type: "want", impact: -4500 }
    ],
    smartFeedback: "Patience during brief weather spikes prevents days of food budget from washing away.",
    wantFeedback: "Impulse spending during surge spikes takes a heavy toll on limited weekly funds."
  },
  {
    id: 14,
    category: "peer",
    tag: "SUNK COST FALLACY",
    title: "Unused gym term ticket refund.",
    scenario: "You bought a gym pass, but class lab schedules conflict. Management offers an 80% refund if claimed this week.",
    bg: "bg-[#0B1E3A] text-white border-transparent",
    badge: "text-[#8CA0FF]",
    options: [
      { text: "Claim the 80% refund now", type: "smart", impact: 10000 },
      { text: "Keep ticket and pretend you'll go", type: "want", impact: 0 }
    ],
    smartFeedback: "Recovering 80% of your funds beats losing 100% to the sunk cost fallacy.",
    wantFeedback: "Holding onto an unused subscription out of pride guarantees a total financial loss."
  },
  {
    id: 15,
    category: "survival",
    tag: "USED COURSEWARE",
    title: "Textbook: Sealed bookstore vs clean senior copy.",
    scenario: "Campus store charges ₦13,000 for a sealed textbook. A senior offers a clean copy with identical text for ₦4,000.",
    bg: "bg-white text-[#0B1E3A] border-slate-200",
    badge: "text-[#0eb02c]",
    options: [
      { text: "Buy verified clean senior copy", type: "smart", impact: -4000 },
      { text: "Pay ₦13,000 for the new wrapper", type: "want", impact: -13000 }
    ],
    smartFeedback: "The course information is identical. You protected ₦9,000 for living essentials.",
    wantFeedback: "Paying steep premiums for fresh paper smell provides zero academic advantage."
  },
  {
    id: 16,
    category: "inflow",
    tag: "GAMBLING ILLUSION",
    title: "'Sure odds' weekend sports betting slip.",
    scenario: "A peer claims betting ₦2,000 on an 8-match ticket is '95% guaranteed' to return ₦75,000 this weekend.",
    bg: "bg-[#F0F3FF] text-[#0B1E3A] border-blue-200",
    badge: "text-[#0922b0]",
    options: [
      { text: "Keep your ₦2,000 in your pocket", type: "smart", impact: 0 },
      { text: "Stake the ₦2,000 accumulator", type: "want", impact: -2000 }
    ],
    smartFeedback: "Betting platforms are mathematically structured so the house always wins. Capital defense is real winning.",
    wantFeedback: "Treating gambling as an investment strategy is a fast route to student debt."
  },
  {
    id: 17,
    category: "survival",
    tag: "UTILITY BUFFER",
    title: "Hostel power meter Friday warning.",
    scenario: "Your electricity meter shows 4 kWh left on Friday before recharge vendor kiosks close for the weekend.",
    bg: "bg-white text-[#0B1E3A] border-slate-200",
    badge: "text-[#0eb02c]",
    options: [
      { text: "Recharge token before Friday close", type: "smart", impact: -3000 },
      { text: "Wait until power trips off", type: "want", impact: 0 }
    ],
    smartFeedback: "Keeping power running preserves fridge food and study devices through the weekend.",
    wantFeedback: "Running utilities to empty causes spoiled food and emergency vendor surcharges."
  },
  {
    id: 18,
    category: "tools",
    tag: "PRODUCTIVE CAPITAL",
    title: "Laptop battery fix for freelance design gigs.",
    scenario: "A ₦6,000 battery repair restores your laptop, allowing you to deliver graphic jobs paying ₦15,000/mo.",
    bg: "bg-[#0B1E3A] text-white border-transparent",
    badge: "text-[#8CA0FF]",
    options: [
      { text: "Invest in laptop battery repair", type: "smart", impact: -6000 },
      { text: "Spend the money on dinner outings", type: "want", impact: -6000 }
    ],
    smartFeedback: "Reinvesting capital into income-generating tools produces ongoing financial returns.",
    wantFeedback: "Spending income on leisure while tools stay broken stunts your earning potential."
  },
  {
    id: 19,
    category: "survival",
    tag: "REUSABLE DISCIPLINE",
    title: "Daily bottled water vs refill flask.",
    scenario: "Buying two bottled waters daily costs ₦600 (₦18,000/mo). A stainless filter flask costs ₦4,000 once.",
    bg: "bg-white text-[#0B1E3A] border-slate-200",
    badge: "text-[#0eb02c]",
    options: [
      { text: "Buy flask & use campus refill points", type: "smart", impact: -4000 },
      { text: "Keep buying disposable plastic bottles", type: "want", impact: -18000 }
    ],
    smartFeedback: "The reusable flask pays for itself within 7 days, eliminating an ongoing cash leak.",
    wantFeedback: "Daily convenience buys quietly consume a sizable share of a student's monthly budget."
  },
  {
    id: 20,
    category: "peer",
    tag: "ONE-NIGHT FASHION",
    title: "Single-evening faculty gala dress code.",
    scenario: "An end-of-year faculty party sets an 'all-burgundy' dress code. You have clean, neat clothes, but no burgundy.",
    bg: "bg-[#F0F3FF] text-[#0B1E3A] border-blue-200",
    badge: "text-[#0922b0]",
    options: [
      { text: "Borrow from a friend or wear neat fit", type: "smart", impact: 0 },
      { text: "Buy brand new burgundy outfit", type: "want", impact: -16000 }
    ],
    smartFeedback: "The cost-per-wear on single-night event clothes is poor value. Borrowing is the smarter move.",
    wantFeedback: "Spending a large portion of your monthly allowance for one evening's photos creates unnecessary financial strain."
  },
  {
    id: 21,
    category: "inflow",
    tag: "PAY YOURSELF FIRST",
    title: "Allowance disbursement arrival day.",
    scenario: "Your monthly allowance of ₦40,000 hits your bank account today. Spending urges kick in.",
    bg: "bg-[#0B1E3A] text-white border-transparent",
    badge: "text-[#8CA0FF]",
    options: [
      { text: "Move savings to buffer reserve first", type: "smart", impact: 8000 },
      { text: "Head out to treat yourself first", type: "want", impact: -8000 }
    ],
    smartFeedback: "'Pay yourself first' locks in stability before discretionary expenses can chip away at your balance.",
    wantFeedback: "Spending first and saving 'whatever is left' usually leaves you with zero savings by month-end."
  },
  {
    id: 22,
    category: "tools",
    tag: "SECURITY HYGIENE",
    title: "Course software educational license.",
    scenario: "Engineering software offers a student educational tier for ₦2,500. A peer shares a cracked download link.",
    bg: "bg-white text-[#0B1E3A] border-slate-200",
    badge: "text-[#0eb02c]",
    options: [
      { text: "Claim the official student license", type: "smart", impact: -2500 },
      { text: "Download the cracked file", type: "want", impact: 0 }
    ],
    smartFeedback: "Official licenses protect study machines from ransomware and keyloggers that compromise student bank accounts.",
    wantFeedback: "Cracked executables frequently bundle malware that risks compromised accounts and lost work."
  },
  {
    id: 23,
    category: "survival",
    tag: "BATCH MEAL LOGISTICS",
    title: "Sunday batch meal prep vs daily cafeteria bowls.",
    scenario: "Batch cooking stews on Sunday costs ₦4,500 and takes 2 hours. Buying every dinner at stalls costs ₦11,500/wk.",
    bg: "bg-white text-[#0B1E3A] border-slate-200",
    badge: "text-[#0eb02c]",
    options: [
      { text: "Dedicate 2 hours to Sunday prep", type: "smart", impact: -4500 },
      { text: "Buy commercial dinner bowls nightly", type: "want", impact: -11500 }
    ],
    smartFeedback: "Preparing staples ahead saves time during busy weekdays and cuts food expenses significantly.",
    wantFeedback: "Outsourcing every meal to vendors doubles your basic living expenses."
  },
  {
    id: 24,
    category: "tools",
    tag: "PREDATORY LOANS",
    title: "Digital instant loan app notification.",
    scenario: "An unsolicited SMS offers: 'Unlock ₦15,000 in 2 minutes for the weekend! (35% interest in 14 days)'.",
    bg: "bg-[#F0F3FF] text-[#0B1E3A] border-blue-200",
    badge: "text-[#0922b0]",
    options: [
      { text: "Block the number and delete app", type: "smart", impact: 0 },
      { text: "Accept loan for weekend outings", type: "want", impact: -6000 }
    ],
    smartFeedback: "Short-term loan apps charging 35% every two weeks translate to predatory debt traps.",
    wantFeedback: "Borrowing money at steep interest for leisure is a fast route to financial stress."
  },
  {
    id: 25,
    category: "survival",
    tag: "COGNITIVE REST",
    title: "Finals week energy drink bender.",
    scenario: "During finals week, friends suggest buying 4 energy cans daily (₦3,600/day) instead of structured sleep and water.",
    bg: "bg-white text-[#0B1E3A] border-slate-200",
    badge: "text-[#0eb02c]",
    options: [
      { text: "Keep regular sleep & hydration", type: "smart", impact: -400 },
      { text: "Spend ₦18,000 on energy drinks", type: "want", impact: -18000 }
    ],
    smartFeedback: "Sleep supports clear memory recall. Excessive caffeine can lead to energy crashes during exams.",
    wantFeedback: "Heavy stimulant spending burns cash while often leading to fatigue on exam day."
  },
  {
    id: 26,
    category: "peer",
    tag: "SHARED EXPENSES",
    title: "Hostel cooking gas cylinder refill.",
    scenario: "Your flatmate asks you to cover the full ₦8,000 gas refill, but hasn't settled their share of last month's utilities.",
    bg: "bg-[#0B1E3A] text-white border-transparent",
    badge: "text-[#8CA0FF]",
    options: [
      { text: "Collect their 50% split upfront", type: "smart", impact: -4000 },
      { text: "Pay 100% and hope they repay", type: "want", impact: -8000 }
    ],
    smartFeedback: "Settling shared household utilities promptly and clearly prevents tension and unpaid balances.",
    wantFeedback: "Covering shared utility bills on trust alone often leaves you short on your own budget."
  },
  {
    id: 27,
    category: "inflow",
    tag: "CASH YIELD",
    title: "Zero-interest bank vs interest savings vault.",
    scenario: "You hold a ₦25,000 reserve in a checking account that charges debit maintenance fees every month.",
    bg: "bg-white text-[#0B1E3A] border-slate-200",
    badge: "text-[#0eb02c]",
    options: [
      { text: "Move reserve to verified yield vault", type: "smart", impact: 300 },
      { text: "Leave in checking account bleeding fees", type: "want", impact: -150 }
    ],
    smartFeedback: "Verified fintech savings vaults earn interest while keeping funds shielded from maintenance fees.",
    wantFeedback: "Letting reserves sit idle in fee-charging accounts slowly chips away at your savings."
  },
  {
    id: 28,
    category: "tools",
    tag: "EQUIPMENT SAFETY",
    title: "Original laptop adapter vs roadside copy.",
    scenario: "Your laptop charger died. Roadside unbranded adapter is ₦3,000; certified voltage-regulated replacement is ₦8,500.",
    bg: "bg-[#F0F3FF] text-[#0B1E3A] border-blue-200",
    badge: "text-[#0922b0]",
    options: [
      { text: "Buy certified regulated adapter", type: "smart", impact: -8500 },
      { text: "Buy unbranded cheap adapter", type: "want", impact: -3000 }
    ],
    smartFeedback: "Voltage surges from unverified knockoff chargers can damage laptop motherboards, leading to costly repairs.",
    wantFeedback: "Cutting corners on electrical accessories risks damaging your primary workstation."
  },
  {
    id: 29,
    category: "tools",
    tag: "SKILL INVESTMENT",
    title: "Technical workshop vs cafe brunch.",
    scenario: "A certified 4-hour Python data analytics bootcamp costs ₦5,000. A trendy cafe brunch outing costs ₦5,000.",
    bg: "bg-[#0B1E3A] text-white border-transparent",
    badge: "text-[#8CA0FF]",
    options: [
      { text: "Enroll in data bootcamp", type: "smart", impact: -5000 },
      { text: "Spend money on brunch outing", type: "want", impact: -5000 }
    ],
    smartFeedback: "Investing in practical skills builds capabilities that can boost your future earning power.",
    wantFeedback: "Prioritizing transient brunch outings over career-ready skills leaves little to show for the expense."
  },
  {
    id: 30,
    category: "inflow",
    tag: "FINANCIAL REVIEW",
    title: "End-of-term spending audit.",
    scenario: "It is the final week of semester. You have 2 hours of free time before packing your bags for the break.",
    bg: "bg-white text-[#0B1E3A] border-slate-200",
    badge: "text-[#0eb02c]",
    options: [
      { text: "Audit expenses & set next budget", type: "smart", impact: 0 },
      { text: "Pack and leave without reviewing", type: "want", impact: 0 }
    ],
    smartFeedback: "Reviewing past spending patterns helps you make smarter cash flow adjustments for the next term.",
    wantFeedback: "Skipping reflection often leads to repeating the same budgeting mistakes term after term."
  }
];

export const classifierDatabase: Record<string, { cls: string; postpone: string; sub: string; act: string }> = {
  groceries: {
    cls: "ESSENTIAL NEED",
    postpone: "NON-DEFERRABLE",
    sub: "NONE (OUTLAY REQUIRED)",
    act: "FUND IN BATCH / STAPLE"
  },
  delivery: {
    cls: "OPTIONAL WANT",
    postpone: "24H+ DEFERRABLE",
    sub: "BATCH-COOKED MEAL (FREE)",
    act: "CANCEL / COOK AT HOME"
  },
  antibiotics: {
    cls: "ESSENTIAL NEED",
    postpone: "NON-DEFERRABLE",
    sub: "CAMPUS CLINIC SUBSIDY",
    act: "PURCHASE IMMEDIATELY"
  },
  sneakers: {
    cls: "OPTIONAL WANT",
    postpone: "INDEFINITELY DEFERRABLE",
    sub: "EXISTING WORKING SHOES",
    act: "WAIT 24 HOURS & CANCEL"
  }
};

export const rotatingTips = [
  "Write down your spending before the money disappears.",
  "Separate your needs from your wants before tapping buy.",
  "Try the 24-hour waiting rule before any non-essential purchase.",
  "Small savings compound into powerful financial cushions.",
  "Compare unit prices before spending on staple foods.",
  "Never lend money that leaves your survival budget exposed."
];
