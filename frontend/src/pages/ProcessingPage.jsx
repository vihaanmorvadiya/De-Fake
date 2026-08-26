import { FileVideo } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PipelineStepper from '../components/PipelineStepper'

const FALLBACK_RESULT = {
  verdict: 'Likely Manipulated', confidence: 0.78,
  scores: { spatial: 0.82, frequency: 0.61, temporal: 0.70, identity: 0.55 },
  flagged_frames: [12, 45, 90], heatmap_urls: ['/static/frame12_heatmap.png'],
  report_text: 'The analysis identified elevated spatial boundary artifacts around the facial region and moderate temporal inconsistencies across adjacent frames. Frequency-domain signals show a weaker but notable synthetic signature. Identity embeddings drift beyond the expected intra-person variance at several points. Taken together, these signals indicate likely manipulation; review of flagged frames 12, 45, and 90 is recommended.',
}

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export default function ProcessingPage() {
  const location = useLocation()
  const navigate = useNavigate()
  const [activeStep, setActiveStep] = useState(0)
  const [activeChannel, setActiveChannel] = useState(0)
  const file = location.state?.file
  const filename = location.state?.filename || 'sample_interview.mp4'

  useEffect(() => {
    let cancelled = false
    async function run() {
      const resultPromise = file
        ? fetch('http://localhost:8000/analyze', { method: 'POST', body: (() => { const data = new FormData(); data.append('file', file); return data })() }).then((response) => { if (!response.ok) throw new Error('Analysis failed'); return response.json() }).catch(() => FALLBACK_RESULT)
        : Promise.resolve(FALLBACK_RESULT)
      await wait(1600); if (cancelled) return; setActiveStep(1)
      await wait(1700); if (cancelled) return; setActiveStep(2)
      for (let i = 0; i < 4; i += 1) { setActiveChannel(i); await wait(1350); if (cancelled) return }
      setActiveStep(3); await wait(1500); if (cancelled) return
      setActiveStep(4); await wait(1700); if (cancelled) return
      const result = await resultPromise
      navigate('/results', { replace: true, state: { result, filename } })
    }
    run()
    return () => { cancelled = true }
  }, [file, filename, navigate])

  const overallProgress = Math.min(96, Math.round(((activeStep + (activeStep === 2 ? activeChannel / 4 : 0)) / 5) * 100) + 8)
  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:px-8 sm:py-14">
      <div className="fade-up mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
        <div><p className="text-xs font-bold uppercase tracking-[.2em] text-cyan">Analysis in progress</p><h1 className="mt-2 text-3xl font-bold tracking-tight text-white">Building the evidence trail</h1><p className="mt-2 text-sm text-slate-400">Each signal is evaluated independently before fusion.</p></div>
        <div className="flex items-center gap-3 rounded-xl border border-white/[.08] bg-white/[.03] px-4 py-3"><FileVideo className="h-5 w-5 text-cyan" /><div className="max-w-52"><p className="truncate text-sm font-medium text-slate-200">{filename}</p><p className="text-[10px] uppercase tracking-wider text-slate-500">Secure workspace</p></div></div>
      </div>
      <section className="glass fade-up delay-1 rounded-3xl p-6 sm:p-9">
        <div className="mb-8"><div className="mb-2 flex items-center justify-between text-xs"><span className="font-medium text-slate-400">Overall progress</span><span className="font-bold tabular-nums text-cyan">{overallProgress}%</span></div><div className="h-1.5 overflow-hidden rounded-full bg-slate-800"><div className="h-full rounded-full bg-gradient-to-r from-sky-500 to-cyan transition-all duration-700" style={{ width: `${overallProgress}%` }} /></div></div>
        <PipelineStepper activeStep={activeStep} activeChannel={activeChannel} />
      </section>
      <p className="mt-5 text-center text-xs text-slate-600">Keep this window open. Analysis typically takes 10–15 seconds in this demo.</p>
    </div>
  )
}
