import { useState } from 'react'

const tabs = [
  { id: 'spatial', label: 'Spatial', title: 'Grad-CAM Heatmap Overlay' },
  { id: 'frequency', label: 'Frequency', title: 'Frequency Spectrum (Flagged Frame vs. Clean Reference)' },
  { id: 'temporal', label: 'Temporal', title: 'Temporal Instability Over Time' },
  { id: 'identity', label: 'Identity', title: 'Identity Drift Trajectory' },
]

function EvidenceVisual({ type }) {
  if (type === 'spatial') return <div className="relative mx-auto h-52 max-w-md overflow-hidden rounded-xl bg-[radial-gradient(circle_at_52%_40%,rgba(244,63,94,.8),transparent_10%),radial-gradient(circle_at_42%_53%,rgba(249,115,22,.65),transparent_17%),radial-gradient(ellipse_at_center,rgba(34,211,238,.18),transparent_55%),linear-gradient(135deg,#111f32,#17293f)]"><div className="scan-line absolute inset-x-0 top-5 h-px bg-cyan shadow-[0_0_16px_#22d3ee]" /><div className="absolute bottom-3 left-3 rounded bg-black/50 px-2 py-1 text-[10px] text-slate-300">Frame 045 · face region</div></div>
  if (type === 'frequency') return <svg viewBox="0 0 600 190" className="h-52 w-full"><defs><linearGradient id="freq" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#8b5cf6" stopOpacity=".5"/><stop offset="1" stopColor="#8b5cf6" stopOpacity="0"/></linearGradient></defs>{[30,70,110,150].map(y=><line key={y} x1="20" y1={y} x2="580" y2={y} stroke="#334155" strokeDasharray="4 6"/>)}<path d="M20 160 C60 145 80 80 110 125 S170 65 205 112 S270 32 305 98 S365 58 395 105 S455 76 485 117 S545 93 580 108 V180 H20Z" fill="url(#freq)"/><path d="M20 160 C60 145 80 80 110 125 S170 65 205 112 S270 32 305 98 S365 58 395 105 S455 76 485 117 S545 93 580 108" fill="none" stroke="#a78bfa" strokeWidth="3"/><path d="M20 154 C80 139 120 143 170 120 S260 138 310 119 S400 130 460 121 S530 128 580 118" fill="none" stroke="#22d3ee" strokeWidth="2" strokeDasharray="6 5"/></svg>
  const identity = type === 'identity'
  return <svg viewBox="0 0 600 190" className="h-52 w-full">{[30,70,110,150].map(y=><line key={y} x1="20" y1={y} x2="580" y2={y} stroke="#334155" strokeDasharray="4 6"/>)}<path d={identity ? 'M20 150 C80 145 90 130 145 136 S210 110 260 121 S320 70 375 88 S430 58 475 69 S535 38 580 48' : 'M20 139 C55 125 75 146 110 130 S165 118 195 128 S245 72 280 91 S330 145 365 113 S415 56 450 86 S510 121 580 70'} fill="none" stroke={identity ? '#34d399' : '#60a5fa'} strokeWidth="3"/><circle cx={identity ? 475 : 415} cy={identity ? 69 : 56} r="6" fill="#07111f" stroke={identity ? '#34d399' : '#60a5fa'} strokeWidth="3"/></svg>
}

export default function ChannelTabs() {
  const [active, setActive] = useState('spatial')
  const current = tabs.find((tab) => tab.id === active)
  return (
    <div>
      <div className="flex gap-1 overflow-x-auto border-b border-white/[.08] pb-px">{tabs.map((tab) => <button key={tab.id} onClick={() => setActive(tab.id)} className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition ${active === tab.id ? 'border-cyan text-cyan' : 'border-transparent text-slate-500 hover:text-slate-300'}`}>{tab.label}</button>)}</div>
      <div className="fade-in mt-5" key={active}><div className="mb-4 flex items-center justify-between"><p className="text-sm font-semibold text-slate-200">{current.title}</p><span className="rounded-full bg-white/[.05] px-2 py-1 text-[10px] uppercase tracking-wider text-slate-500">Visualization</span></div><div className="rounded-2xl border border-white/[.07] bg-slate-950/35 p-4"><EvidenceVisual type={active} /></div></div>
    </div>
  )
}
