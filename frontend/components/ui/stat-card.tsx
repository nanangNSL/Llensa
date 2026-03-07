import { ReactNode } from 'react'
import { TrendingUp, TrendingDown } from 'lucide-react'

interface StatCardProps {
  title: string
  value: string
  subtitle?: string
  icon?: ReactNode
  onClick?: () => void
  actionLabel?: string
  trend?: string
  trendDirection?: 'up' | 'down'
}

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
  onClick,
  actionLabel,
  trend,
  trendDirection,
}: StatCardProps) {
  return (
    <button
      onClick={onClick}
      className="premium-card p-6 w-full text-left group"
    >
      <div className="space-y-4">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">{title}</p>
            <div className="flex items-baseline gap-2 mt-1">
              <h3 className="text-3xl font-bold text-slate-900 tracking-tight">{value}</h3>
              {subtitle && <span className="text-[10px] text-slate-400 font-medium">{subtitle}</span>}
            </div>
          </div>
          {icon && (
            <div className="p-3 rounded-xl bg-slate-50 text-primary group-hover:scale-110 transition-transform duration-300">
              {icon}
            </div>
          )}
        </div>

        {(trend || actionLabel) && (
          <div className="flex items-center justify-between pt-4 border-t border-slate-50">
            {trend ? (
              <div className="flex items-center gap-1.5">
                {trendDirection === 'up' ? (
                  <div className="p-1 rounded-full bg-emerald-50 text-emerald-600">
                    <TrendingUp size={12} />
                  </div>
                ) : (
                  <div className="p-1 rounded-full bg-rose-50 text-rose-600">
                    <TrendingDown size={12} />
                  </div>
                )}
                <span className={`text-[10px] font-bold ${trendDirection === 'up' ? 'text-emerald-600' : 'text-rose-600'
                  }`}>
                  {trend}
                </span>
              </div>
            ) : <div />}

            {actionLabel && (
              <span className="text-[10px] font-bold text-primary uppercase tracking-wider">
                {actionLabel}
              </span>
            )}
          </div>
        )}
      </div>
    </button>
  )
}
