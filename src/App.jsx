import { useEffect, useMemo, useState } from 'react';
import './App.css';

const fmt = (n) => new Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN', maximumFractionDigits: 0 }).format(Math.round(Number(n) || 0));
const cards = [
  ['Impulse buying', 'Buying things just because they look good now.', 'Wait 24 hours before buying non-essential items.'],
  ['No emergency fund', 'Using your regular money when an unexpected expense appears.', 'Build a small emergency buffer before increasing wants.'],
  ['Lifestyle creep', 'Increasing spending every time your income increases.', 'Increase saving first, then upgrade your lifestyle with what remains.'],
  ['Ignoring small expenses', 'Small daily purchases quietly become a large monthly total.', 'Track your spending for one week and find the leaks.'],
  ['Saving without a goal', 'Putting money aside without knowing what it is for.', 'Give your savings a clear target, amount and deadline.'],
];

function Header() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const close = (e) => { if (!e.target.closest('.nav-dropdown')) setOpen(false); };
    document.addEventListener('click', close);
    return () => document.removeEventListener('click', close);
  }, []);
  return <header className="site-header">
    <div className="nav-inner">
      <a className="brand" href="#home"><span>₦</span> BudgetBasics</a>
      <nav>
        <a href="#home">Home</a>
        <div className="nav-dropdown">
          <button onClick={(e) => { e.stopPropagation(); setOpen(v => !v); }} className="nav-save-btn" aria-expanded={open}>◌ <b>Savings Goals</b> <small>{open ? '▴' : '▾'}</small></button>
          {open && <div className="nav-menu">
            <a href="#savings" onClick={() => setOpen(false)}>● <span>Goal Calculator<small>Plan a savings target</small></span></a>
            <a href="#expenses" onClick={() => setOpen(false)}>● <span>Expense Planner<small>Track monthly spending</small></span></a>
            <a href="#mistakes" onClick={() => setOpen(false)}>● <span>Money Mistakes<small>Common traps & fixes</small></span></a>
          </div>}
        </div>
      </nav>
    </div>
  </header>;
}

function GoalCalculator() {
  const [name, setName] = useState('');
  const [target, setTarget] = useState(50000);
  const [current, setCurrent] = useState(5000);
  const [monthly, setMonthly] = useState(5000);
  const [confetti, setConfetti] = useState(false);
  const targetSafe = Math.max(target, 1);
  const currentSafe = Math.min(current, targetSafe);
  const remaining = Math.max(targetSafe - currentSafe, 0);
  const pct = Math.min(100, Math.round((currentSafe / targetSafe) * 100));
  const months = remaining === 0 ? 0 : Math.ceil(remaining / Math.max(monthly, 1));
  const needed = months === 0 ? 0 : Math.ceil(remaining / months);
  const motivation = pct >= 100 ? ['🎉', 'Goal reached!', 'You did it. Celebrate the progress.'] : pct >= 75 ? ['🚀', 'Almost there!', 'Your goal is within reach.'] : pct >= 50 ? ['😊', 'Halfway there!', 'Keep your momentum going.'] : pct >= 25 ? ['🙂', 'Good progress!', 'Every deposit moves you forward.'] : ['😐', 'Just getting started', 'Keep dragging to see your goal move.'];
  useEffect(() => { if (pct >= 100) { setConfetti(true); const t = setTimeout(() => setConfetti(false), 1800); return () => clearTimeout(t); } }, [pct]);
  return <section id="savings" className="section reveal">
    <div className="section-heading"><div className="section-icon">◎</div><p className="green-label">SAVINGS GOALS — GOAL CALCULATOR</p><h2>Watch it fill up.</h2><p>Drag the sliders. Watch the ring draw. When it hits 100% — we celebrate.</p></div>
    <div className="gc-wrap">
      <label className="field-label">GOAL NAME</label>
      <input className={`goal-name ${name.length > 60 ? 'invalid' : ''}`} value={name} maxLength={70} onChange={e => setName(e.target.value)} placeholder="e.g. New laptop, school fees, emergency fund" />
      <p className="error">{name.length > 60 ? 'Goal name is too long (max 60 characters).' : ''}</p>
      <Slider label="TARGET AMOUNT" value={target} min={1000} max={500000} step={1000} onChange={setTarget} red />
      <Slider label="CURRENT SAVINGS" value={current} min={0} max={targetSafe} step={500} onChange={v => setCurrent(Math.min(v, targetSafe))} />
      <Slider label="MONTHLY CONTRIBUTION" value={monthly} min={500} max={100000} step={500} onChange={setMonthly} />
      <div className="gc-result">
        <div className={`ring-wrap ${pct >= 100 ? 'complete' : ''}`}><svg viewBox="0 0 200 200"><defs><linearGradient id="gcGradient"><stop offset="0%" stopColor="#16845b"/><stop offset="100%" stopColor="#22a56f"/></linearGradient></defs><circle className="ring-bg" cx="100" cy="100" r="80"/><circle className="ring-fg" cx="100" cy="100" r="80" style={{strokeDasharray:502.65, strokeDashoffset:502.65 * (1-pct/100)}}/></svg><div className="ring-center"><strong>{pct}%</strong><span>FUNDED</span></div></div>
        <div className="gc-stats"><Stat label="Remaining to fund" value={fmt(remaining)} red/><Stat label="Months to goal" value={months === 0 ? '0' : months}/><Stat label="Monthly needed" value={fmt(needed)} green/><div className="motivation"><span>{motivation[0]}</span><div><b>{motivation[1]}</b><small>{motivation[2]}</small><div className="mot-bar"><i style={{width:`${pct}%`}}/></div></div></div></div>
      </div>
      <div className="deduction"><span>Deduction from target (already saved)</span><b>{fmt(currentSafe)}</b></div>
      <div className="timeline"><div className="timeline-head"><b>Your path</b><span>{months === 0 ? 'Goal reached' : `~${months} ${months===1?'month':'months'}`}</span></div><div className="timeline-track"><div className="timeline-line"><i style={{width:`${pct}%`}}/></div><div className="milestones">{[0,25,50,75,100].map(cp => <div key={cp} className={`milestone ${pct>=cp?'done':''}`}><i/><b>{cp===0?'Now':cp===100?'Goal':`${Math.ceil(months*cp/100)}m`}</b><small>{fmt(targetSafe*cp/100)}</small></div>)}</div></div></div>
    </div>{confetti && <div className="confetti">{Array.from({length:32},(_,i)=><i key={i} style={{'--x':`${Math.random()*100}vw`,'--r':`${Math.random()*360}deg`}}/> )}</div>}
  </section>;
}
function Slider({label,value,min,max,step,onChange,red}) { const p=((value-min)/(max-min))*100; return <div className="slider-field"><div className="slider-head"><label>{label}</label><strong>{fmt(value)}</strong></div><div className="slider-wrap"><div className={`slider-fill ${red?'red':''}`} style={{width:`${p}%`}}/><input className={`slider ${red?'red':''}`} type="range" min={min} max={max} step={step} value={value} onChange={e=>onChange(Number(e.target.value))}/></div><div className="minmax"><span>{fmt(min)}</span><span>{fmt(max)}</span></div></div> }
function Stat({label,value,red,green}) { return <div className={`stat ${red?'red':''} ${green?'green':''}`}><span>{label}</span><b>{value}</b></div> }

function ExpensePlanner() {
  const [budget,setBudget]=useState(50000), [date,setDate]=useState(new Date().toISOString().slice(0,10)), [category,setCategory]=useState(''), [desc,setDesc]=useState(''), [amount,setAmount]=useState(''), [expenses,setExpenses]=useState([]), [edit,setEdit]=useState(null), [errors,setErrors]=useState({}), [toast,setToast]=useState('');
  const spent=expenses.reduce((s,e)=>s+e.amount,0), left=budget-spent, used=budget?spent/budget*100:0;
  const tip=expenses.length===0?"Start adding expenses and I'll show you how your budget is holding up.":left<0?`You're over budget by ${fmt(Math.abs(left))}. Review entries and see what can be trimmed or delayed.`:used>=80?`Careful — you've used ${Math.round(used)}% of your budget. Only ${fmt(left)} remains.`:used>=50?`Halfway there. You've spent ${Math.round(used)}% of your budget and have ${fmt(left)} left.`:`Looking good. You've spent ${fmt(spent)} so far and have ${fmt(left)} remaining.`;
  const submit=e=>{e.preventDefault(); const er={}; if(!date)er.date='Please pick a date.'; if(!category)er.category='Please choose a category.'; if(!desc.trim())er.desc='Please add a short description.'; else if(desc.trim().length>80)er.desc='Too long (max 80 characters).'; if(!amount||Number(amount)<=0)er.amount='Amount must be greater than zero.'; setErrors(er); if(Object.keys(er).length)return; const item={date,category,description:desc.trim(),amount:Number(amount)}; setExpenses(list=>edit===null?[...list,item]:list.map((x,i)=>i===edit?item:x)); setEdit(null); setDate(new Date().toISOString().slice(0,10));setCategory('');setDesc('');setAmount('');setToast(edit===null?'Expense added':'Expense updated');setTimeout(()=>setToast(''),2000)};
  const startEdit=i=>{const x=expenses[i];setDate(x.date);setCategory(x.category);setDesc(x.description);setAmount(x.amount);setEdit(i);document.getElementById('expense-form')?.scrollIntoView({behavior:'smooth',block:'start'})};
  return <section id="expenses" className="section reveal"><div className="section-heading"><div className="section-icon">₦</div><p className="green-label">SAVINGS GOALS — EXPENSE PLANNER</p><h2>Know where it goes.</h2><p>Add expenses, see your balance, and learn when your spending needs attention.</p></div>
    <div className="expense-wrap"><form id="expense-form" onSubmit={submit} className="expense-form"><Field label="DATE" error={errors.date}><input type="date" value={date} onChange={e=>setDate(e.target.value)}/></Field><Field label="CATEGORY" error={errors.category}><select value={category} onChange={e=>setCategory(e.target.value)}><option value="">Select category</option>{['food','transport','education','entertainment','shopping','utilities','miscellaneous'].map(x=><option key={x} value={x}>{x[0].toUpperCase()+x.slice(1)}</option>)}</select></Field><Field label="DESCRIPTION" error={errors.desc}><input value={desc} maxLength={80} onChange={e=>setDesc(e.target.value)} placeholder="e.g. Lunch at campus cafeteria"/></Field><Field label="AMOUNT (₦)" error={errors.amount}><input type="number" min="0" step="any" value={amount} onChange={e=>setAmount(e.target.value)} placeholder="1500"/></Field><Field label="MONTHLY BUDGET (₦)"><input type="number" min="0" step="any" value={budget} onChange={e=>setBudget(Number(e.target.value)||0)}/></Field><div className="form-actions"><button className="primary" type="submit">{edit===null?'+ Add expense':'✓ Update expense'}</button><button type="button" onClick={()=>{setExpenses([]);setEdit(null)}}>Clear all</button></div></form>
    <div className="balance"><div><span>MONTHLY BUDGET</span><b>{fmt(budget)}</b></div><div><span>SPENT</span><b className="red-text">{fmt(spent)}</b></div><div><span>REMAINING</span><b className={left<0?'red-text':''}>{fmt(left)}</b></div></div>
    <div className="table-wrap"><table><thead><tr><th>Date</th><th>Category</th><th>Description</th><th>Amount</th><th>Actions</th></tr></thead><tbody>{expenses.map((x,i)=><tr key={`${x.date}-${i}`}><td>{x.date}</td><td><span className="cat">{x.category}</span></td><td>{x.description}</td><td className="red-text">−{fmt(x.amount)}</td><td><button className="icon-btn" onClick={()=>startEdit(i)}>✎</button><button className="icon-btn danger" onClick={()=>setExpenses(list=>list.filter((_,j)=>j!==i))}>✕</button></td></tr>)}{expenses.length===0&&<tr><td colSpan="5" className="empty">📝<br/>No expenses yet. Add your first entry above.</td></tr>}</tbody></table></div>
    <div className={`tip ${left<0||used>=80?'bad':used>=50?'mid':''}`}><b>💡 Tip: </b>{tip}</div></div>{toast&&<div className="toast">{toast}</div>}</section>;
}
function Field({label,error,children}){return <div className="field"><label>{label}</label>{children}<small>{error||''}</small></div>}

function Mistakes(){ const [index,setIndex]=useState(0),[flip,setFlip]=useState(false),[auto,setAuto]=useState(true); useEffect(()=>{if(!auto)return;const t=setInterval(()=>{setIndex(i=>(i+1)%cards.length);setFlip(false)},5000);return()=>clearInterval(t)},[auto]); const shuffle=()=>{setIndex(Math.floor(Math.random()*cards.length));setFlip(false)}; const c=cards[index]; return <section id="mistakes" className="section reveal"><div className="section-heading"><div className="section-icon red-icon">!</div><p className="red-label">SAVINGS GOALS — MONEY MISTAKES</p><h2>Flip. Learn. Avoid.</h2><p>A flashcard deck of common money traps. Tap the card to flip it and see the fix — or let it auto-shuffle.</p></div><div className="flash-area"><button className="card" onClick={()=>setFlip(v=>!v)} aria-label="Flip flashcard"><div className={`card-inner ${flip?'flipped':''}`}><div className="face front"><span>MONEY MISTAKE</span><h3>{c[0]}</h3><p>{c[1]}</p><small>Tap to flip ↻</small></div><div className="face back"><span>THE FIX</span><h3>{c[0]}</h3><p>{c[2]}</p><small>Tap to flip ↻</small></div></div></button><div className="flash-controls"><button onClick={shuffle}>🔀 Shuffle</button><div><b>{index+1} / {cards.length}</b><div className="flash-bar"><i style={{width:`${((index+1)/cards.length)*100}%`}}/></div><small>Auto: {auto?'ON':'OFF'}</small></div><button className="primary" onClick={()=>setAuto(v=>!v)}>{auto?'⏸ Pause':'▶ Resume'}</button></div></div></section> }

export default function App(){ const [scroll,setScroll]=useState(0); useEffect(()=>{const fn=()=>setScroll(window.scrollY/(document.documentElement.scrollHeight-window.innerHeight)*100);window.addEventListener('scroll',fn,{passive:true});fn();return()=>window.removeEventListener('scroll',fn)},[]); useEffect(()=>{const els=document.querySelectorAll('.reveal');const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add('visible')),{threshold:.12});els.forEach(e=>io.observe(e));return()=>io.disconnect()},[]); return <><div className="scroll-progress" style={{width:`${scroll}%`}}/><Header/><section id="home" className="hero reveal"><div><span className="pill">● SAVINGS GOALS</span><h1>Plan it.<br/><em>Then watch it grow.</em></h1><p>Set savings goals, plan your monthly expenses, and learn the money mistakes to avoid — all in one place.</p><div className="hero-actions"><a href="#savings" className="primary">Start with a goal →</a><a href="#mistakes">See money mistakes</a></div></div><div className="hero-card"><div className="hero-symbol">₦</div><b>SMALL STEPS. BIG RESULTS.</b></div></section><main><GoalCalculator/><ExpensePlanner/><Mistakes/><section className="final reveal"><div className="section-icon">✓</div><h2>Practice makes progress.</h2><p>Every goal you set, every expense you track, every mistake you avoid — it all compounds into better habits.</p></section></main><footer>© 2026 BudgetBasics <span>Savings Goals • Interactive Financial Education</span></footer></>}
