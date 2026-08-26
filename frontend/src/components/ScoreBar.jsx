const colors = { spatial: 'from-sky-500 to-cyan', frequency: 'from-violet-500 to-violet-300', temporal: 'from-blue-500 to-blue-300', identity: 'from-emerald-500 to-emerald-300' }

export default function ScoreBar({ name, score, delay = 0 }) {
  const percent = Math.round(score * 100)
  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-sm"><span className="font-medium capitalize text-slate-300">{name}</span><span className="font-semibold tabular-nums text-white">{percent}%</span></div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-800"><div className={`bar-fill h-full rounded-full bg-gradient-to-r ${colors[name]}`} style={{ width: `${percent}%`, animationDelay: `${delay}ms` }} /></div>
    </div>
  )
}
