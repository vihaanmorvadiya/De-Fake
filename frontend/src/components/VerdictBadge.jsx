import { AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react'

const styles = {
  'Confirmed Manipulated': { wrap: 'border-red-400/30 bg-red-400/10 text-red-300', dot: 'bg-red-400', icon: ShieldAlert },
  'Likely Manipulated': { wrap: 'border-orange-400/30 bg-orange-400/10 text-orange-300', dot: 'bg-orange-400', icon: ShieldAlert },
  'Inconclusive - Manual Review': { wrap: 'border-yellow-400/30 bg-yellow-400/10 text-yellow-200', dot: 'bg-yellow-400', icon: AlertTriangle },
  'Likely Authentic': { wrap: 'border-lime-400/30 bg-lime-400/10 text-lime-300', dot: 'bg-lime-400', icon: CheckCircle2 },
  'No Manipulation Indicators Detected': { wrap: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300', dot: 'bg-emerald-400', icon: CheckCircle2 },
}

export default function VerdictBadge({ verdict }) {
  const style = styles[verdict] || styles['Inconclusive - Manual Review']
  const Icon = style.icon
  return <div className={`inline-flex items-center gap-3 rounded-full border px-5 py-3 text-sm font-bold sm:text-base ${style.wrap}`}><span className={`h-2.5 w-2.5 rounded-full ${style.dot}`} /><Icon className="h-5 w-5" />{verdict}</div>
}
