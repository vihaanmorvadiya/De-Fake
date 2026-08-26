import { Check, Circle, LoaderCircle } from 'lucide-react'

const channelNames = ['Spatial / Boundary', 'Frequency', 'Temporal Coherence', 'Identity Consistency']

function StatusIcon({ status }) {
  if (status === 'complete') return <span className="grid h-8 w-8 place-items-center rounded-full bg-emerald-400 text-ink shadow-[0_0_24px_rgba(52,211,153,.3)]"><Check className="h-4 w-4" strokeWidth={3} /></span>
  if (status === 'active') return <span className="pulse-soft grid h-8 w-8 place-items-center rounded-full border border-cyan/50 bg-cyan/10 text-cyan"><LoaderCircle className="h-4 w-4 animate-spin" /></span>
  return <span className="grid h-8 w-8 place-items-center rounded-full border border-slate-700 bg-slate-900 text-slate-600"><Circle className="h-3 w-3" /></span>
}

export default function PipelineStepper({ activeStep, activeChannel }) {
  const steps = [
    { title: 'Ingestion', note: 'Frame + Audio Extraction' },
    { title: 'Face Detection & Alignment', note: 'Locating and normalizing facial regions' },
    { title: 'Evidence Channel Analysis', note: 'Independent forensic signals', channels: true },
    { title: 'Weighted Fusion', note: 'Calibrating signals and confidence' },
    { title: 'Generating Forensic Report', note: 'Compiling evidence and findings' },
  ]
  return (
    <div className="space-y-0">
      {steps.map((step, index) => {
        const status = index < activeStep ? 'complete' : index === activeStep ? 'active' : 'pending'
        return (
          <div key={step.title} className="relative flex gap-5 pb-7 last:pb-0">
            {index < steps.length - 1 && <div className={`absolute left-[15px] top-9 h-[calc(100%-2rem)] w-px transition-colors duration-500 ${index < activeStep ? 'bg-emerald-400/60' : 'bg-slate-700'}`} />}
            <StatusIcon status={status} />
            <div className="min-w-0 flex-1 pt-1">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className={`font-semibold transition-colors ${status === 'pending' ? 'text-slate-500' : 'text-white'}`}>{step.title}</p>
                  <p className="mt-1 text-xs text-slate-500">{step.note}</p>
                </div>
                {status === 'active' && <span className="rounded-full bg-cyan/10 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-cyan">Running</span>}
                {status === 'complete' && <span className="text-xs font-medium text-emerald-400">Complete</span>}
              </div>
              {step.channels && (
                <div className="mt-4 grid grid-cols-2 gap-2 lg:grid-cols-4">
                  {channelNames.map((name, channelIndex) => {
                    const channelStatus = activeStep > 2 || (activeStep === 2 && channelIndex < activeChannel) ? 'complete' : activeStep === 2 && channelIndex === activeChannel ? 'active' : 'pending'
                    return <div key={name} className={`rounded-xl border px-3 py-3 text-xs transition-all duration-500 ${channelStatus === 'complete' ? 'border-emerald-400/20 bg-emerald-400/[.06] text-emerald-300' : channelStatus === 'active' ? 'border-cyan/30 bg-cyan/[.08] text-cyan' : 'border-white/[.06] bg-white/[.02] text-slate-600'}`}><div className="mb-2 h-1 overflow-hidden rounded-full bg-slate-800"><div className={`h-full rounded-full transition-all duration-700 ${channelStatus === 'complete' ? 'w-full bg-emerald-400' : channelStatus === 'active' ? 'w-2/3 animate-pulse bg-cyan' : 'w-0'}`} /></div>{name}</div>
                  })}
                </div>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
