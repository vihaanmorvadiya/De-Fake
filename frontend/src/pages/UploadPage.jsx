import { ArrowRight, FlaskConical, LockKeyhole, ScanFace, Sparkles } from 'lucide-react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import UploadZone from '../components/UploadZone'

const assurances = [
  { icon: LockKeyhole, text: 'Private by design' },
  { icon: ScanFace, text: '4-channel analysis' },
  { icon: Sparkles, text: 'Explainable results' },
]

export default function UploadPage() {
  const [file, setFile] = useState(null)
  const navigate = useNavigate()
  const begin = (sample = false) => navigate('/processing', { state: { file: sample ? null : file, isSample: sample, samplePath: sample ? '/samples/sample-video.mp4' : null, filename: sample ? 'sample_interview.mp4' : file?.name } })

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8 sm:py-20">
      <section className="fade-up mx-auto max-w-4xl text-center">
        <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/[.07] px-3 py-1.5 text-xs font-semibold text-cyan"><span className="h-1.5 w-1.5 rounded-full bg-cyan" /> Multi-signal media forensics</div>
        <h1 className="text-4xl font-extrabold tracking-[-.04em] text-white sm:text-6xl">Evidence of reality.<br /><span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-teal-300 bg-clip-text text-transparent">Not artifacts of AI.</span></h1>
        <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-400 sm:text-lg">Detecting synthetic media by verifying evidence of reality, not memorizing today&apos;s AI artifacts.</p>
      </section>

      <section className="glass fade-up delay-1 mx-auto mt-12 max-w-3xl rounded-3xl p-3 sm:p-5">
        <UploadZone file={file} onFile={setFile} />
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <button disabled={!file} onClick={() => begin(false)} className="group inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-cyan px-5 py-3.5 text-sm font-bold text-ink transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:bg-slate-700 disabled:text-slate-500">Analyze video <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></button>
          <button onClick={() => begin(true)} className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[.04] px-5 py-3.5 text-sm font-semibold text-slate-200 transition hover:border-white/20 hover:bg-white/[.07]"><FlaskConical className="h-4 w-4 text-cyan" /> Try a sample video</button>
        </div>
      </section>

      <div className="fade-up delay-2 mx-auto mt-8 flex max-w-2xl flex-wrap justify-center gap-x-8 gap-y-3">{assurances.map(({ icon: Icon, text }) => <div key={text} className="flex items-center gap-2 text-xs text-slate-500"><Icon className="h-4 w-4 text-slate-600" />{text}</div>)}</div>
    </div>
  )
}
