import { FileVideo, UploadCloud, X } from 'lucide-react'
import { useRef, useState } from 'react'

export default function UploadZone({ file, onFile }) {
  const inputRef = useRef(null)
  const [dragging, setDragging] = useState(false)
  const acceptFile = (candidate) => {
    if (candidate?.type.startsWith('video/')) onFile(candidate)
  }

  if (file) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center rounded-2xl border border-cyan/25 bg-cyan/[.04] p-8 text-center">
        <div className="mb-4 rounded-2xl bg-cyan/10 p-4 text-cyan"><FileVideo className="h-8 w-8" /></div>
        <p className="max-w-full truncate font-semibold text-white">{file.name}</p>
        <p className="mt-1 text-sm text-slate-400">{(file.size / 1024 / 1024).toFixed(1)} MB · Ready for analysis</p>
        <button onClick={() => onFile(null)} className="mt-5 inline-flex items-center gap-2 text-sm text-slate-400 transition hover:text-white"><X className="h-4 w-4" /> Remove file</button>
      </div>
    )
  }

  return (
    <button
      type="button"
      onClick={() => inputRef.current?.click()}
      onDragEnter={(e) => { e.preventDefault(); setDragging(true) }}
      onDragOver={(e) => e.preventDefault()}
      onDragLeave={() => setDragging(false)}
      onDrop={(e) => { e.preventDefault(); setDragging(false); acceptFile(e.dataTransfer.files[0]) }}
      className={`group relative flex min-h-64 w-full flex-col items-center justify-center overflow-hidden rounded-2xl border border-dashed p-8 text-center transition duration-300 ${dragging ? 'border-cyan bg-cyan/10' : 'border-slate-600/70 bg-slate-950/25 hover:border-cyan/60 hover:bg-cyan/[.035]'}`}
    >
      <input ref={inputRef} type="file" accept="video/*" className="hidden" onChange={(e) => acceptFile(e.target.files[0])} />
      <span className="mb-5 rounded-2xl border border-cyan/20 bg-cyan/10 p-4 text-cyan transition group-hover:-translate-y-1 group-hover:bg-cyan/15"><UploadCloud className="h-8 w-8" /></span>
      <span className="font-semibold text-white">Drop a video here, or click to browse</span>
      <span className="mt-2 text-sm text-slate-400">MP4, MOV, AVI, or WebM · Up to 500 MB</span>
    </button>
  )
}
