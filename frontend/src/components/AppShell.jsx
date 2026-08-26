import { Activity, ShieldCheck } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../assets/logo.svg'

export default function AppShell({ children }) {
  const location = useLocation()
  return (
    <div className="app-bg min-h-screen overflow-hidden text-slate-100">
      <header className="relative z-20 border-b border-white/[.07] bg-ink/50 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-8">
          <Link to="/" className="flex items-center gap-3" aria-label="De-Fake home">
            <img src={logo} className="h-9 w-9" alt="" />
            <span className="text-lg font-bold tracking-tight text-white">De-Fake</span>
          </Link>
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            {location.pathname === '/processing' ? <Activity className="h-4 w-4 text-cyan" /> : <ShieldCheck className="h-4 w-4 text-emerald-400" />}
            <span className="hidden sm:inline">Forensic workspace</span>
            <span className="ml-2 rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[10px] uppercase tracking-wider text-emerald-300">Demo</span>
          </div>
        </div>
      </header>
      <main className="relative z-10">{children}</main>
    </div>
  )
}
