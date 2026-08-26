import { ArrowLeft, Download, FileText, Flag, Gauge } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import ChannelTabs from '../components/ChannelTabs'
import ScoreBar from '../components/ScoreBar'
import VerdictBadge from '../components/VerdictBadge'

const DEFAULT_RESULT = {
  verdict: 'Likely Manipulated', confidence: 0.78,
  scores: { spatial: 0.82, frequency: 0.61, temporal: 0.70, identity: 0.55 },
  flagged_frames: [12, 45, 90], heatmap_urls: ['/static/frame12_heatmap.png'],
  report_text: 'The analysis identified elevated spatial boundary artifacts around the facial region and moderate temporal inconsistencies across adjacent frames. Frequency-domain signals show a weaker but notable synthetic signature. Identity embeddings drift beyond the expected intra-person variance at several points. Taken together, these signals indicate likely manipulation; review of flagged frames 12, 45, and 90 is recommended.',
}

export default function ResultsPage() {
  const { state } = useLocation()
  const result = state?.result || DEFAULT_RESULT
  const filename = state?.filename || 'sample_interview.mp4'
  const downloadReport = () => {
    const report = `DE-FAKE FORENSIC REPORT\n\nFile: ${filename}\nVerdict: ${result.verdict}\nConfidence: ${Math.round(result.confidence * 100)}%\n\n${result.report_text}\n\nFlagged frames: ${result.flagged_frames.join(', ')}`
    const link = document.createElement('a'); link.href = URL.createObjectURL(new Blob([report], { type: 'text/plain' })); link.download = 'de-fake-forensic-report.txt'; link.click(); URL.revokeObjectURL(link.href)
  }

  return (
    <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="fade-up mb-7 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-[.2em] text-cyan">Analysis complete</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-white">Forensic findings</h1></div><Link to="/" className="inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"><ArrowLeft className="h-4 w-4" /><span className="hidden sm:inline">Analyze another</span></Link></div>

      <section className="glass fade-up delay-1 rounded-3xl p-6 sm:p-8">
        <div className="flex flex-col justify-between gap-7 lg:flex-row lg:items-center">
          <div><p className="mb-3 text-xs font-semibold uppercase tracking-widest text-slate-500">Final verdict</p><VerdictBadge verdict={result.verdict} /><p className="mt-4 max-w-xl text-sm text-slate-400">Multiple independent signals exceeded the manipulation threshold. Human review is recommended for consequential decisions.</p></div>
          <div className="flex min-w-52 items-center gap-4 rounded-2xl border border-white/[.08] bg-white/[.03] p-5"><div className="grid h-12 w-12 place-items-center rounded-xl bg-cyan/10 text-cyan"><Gauge className="h-6 w-6" /></div><div><p className="text-3xl font-extrabold tabular-nums text-white">{Math.round(result.confidence * 100)}%</p><p className="text-xs text-slate-500">Overall confidence</p></div></div>
        </div>
        <div className="mt-7 flex flex-wrap gap-2 border-t border-white/[.07] pt-5"><span className="rounded-lg bg-slate-900/60 px-3 py-2 text-xs text-slate-400">File: <strong className="font-medium text-slate-200">{filename}</strong></span><span className="inline-flex items-center gap-1.5 rounded-lg bg-red-400/[.07] px-3 py-2 text-xs text-red-300"><Flag className="h-3.5 w-3.5" /> Flagged frames: {result.flagged_frames.join(', ')}</span></div>
      </section>

      <div className="mt-6 grid gap-6 lg:grid-cols-[.78fr_1.22fr]">
        <section className="glass fade-up delay-2 rounded-3xl p-6"><h2 className="text-base font-bold text-white">Evidence scores</h2><p className="mt-1 text-xs text-slate-500">Manipulation likelihood by channel</p><div className="mt-7 space-y-6">{Object.entries(result.scores).map(([name, score], index) => <ScoreBar key={name} name={name} score={score} delay={250 + index * 120} />)}</div><div className="mt-7 rounded-xl border border-white/[.06] bg-white/[.025] p-3 text-xs leading-5 text-slate-500">Scores represent channel-specific anomaly confidence, not the probability that every frame is manipulated.</div></section>
        <section className="glass fade-up delay-2 rounded-3xl p-6"><h2 className="text-base font-bold text-white">Evidence explorer</h2><p className="mt-1 text-xs text-slate-500">Inspect the signals behind the verdict</p><ChannelTabs /></section>
      </div>

      <section className="glass fade-up delay-3 mt-6 rounded-3xl p-6 sm:p-8"><div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-start"><div className="max-w-3xl"><div className="mb-4 flex items-center gap-3"><span className="rounded-xl bg-cyan/10 p-2.5 text-cyan"><FileText className="h-5 w-5" /></span><div><h2 className="font-bold text-white">Forensic summary</h2><p className="text-xs text-slate-500">Auto-generated from the analyzed evidence</p></div></div><p className="text-sm leading-7 text-slate-300">{result.report_text}</p></div><button onClick={downloadReport} className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-cyan px-4 py-3 text-sm font-bold text-ink transition hover:bg-cyan-300"><Download className="h-4 w-4" /> Download Forensic Report (PDF)</button></div></section>
      <p className="mt-6 text-center text-[11px] leading-5 text-slate-600">De-Fake provides decision-support evidence and should not be the sole basis for legal, employment, or safety-critical decisions.</p>
    </div>
  )
}
