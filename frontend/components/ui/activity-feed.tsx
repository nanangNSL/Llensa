import { Check, AlertCircle } from 'lucide-react'

export default function ActivityFeed() {
  const activities = [
    {
      id: 1,
      timestamp: '2024-03-07 14:32:15',
      processor: 'Standard Invoice Processor',
      status: 'success',
      credits: 15,
    },
    {
      id: 2,
      timestamp: '2024-03-07 13:45:22',
      processor: 'Standard KTP Processor',
      status: 'success',
      credits: 12,
    },
    {
      id: 3,
      timestamp: '2024-03-07 12:15:08',
      processor: 'Custom Invoice Processor',
      status: 'success',
      credits: 18,
    },
    {
      id: 4,
      timestamp: '2024-03-07 10:22:45',
      processor: 'Standard Invoice Processor',
      status: 'error',
      credits: 0,
    },
    {
      id: 5,
      timestamp: '2024-03-06 16:58:30',
      processor: 'Standard Receipt Processor',
      status: 'success',
      credits: 10,
    },
  ]

  return (
    <div className="space-y-1">
      {activities.map((activity, index) => (
        <div
          key={activity.id}
          className={`flex items-center justify-between p-4 rounded-xl transition-colors hover:bg-slate-50/50 ${index !== activities.length - 1 ? 'border-b border-slate-50' : ''
            }`}
        >
          <div className="flex items-center gap-4 flex-1 min-w-0">
            <div className={`p-2.5 rounded-xl shrink-0 ${activity.status === 'success'
              ? 'bg-emerald-50 text-emerald-600'
              : 'bg-rose-50 text-rose-600'
              }`}>
              {activity.status === 'success' ? (
                <Check size={18} strokeWidth={3} />
              ) : (
                <AlertCircle size={18} strokeWidth={3} />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-800 truncate">{activity.processor}</p>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">{activity.timestamp}</p>
            </div>
          </div>
          <div className="text-right ml-4">
            <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider ${activity.status === 'success'
              ? 'bg-emerald-100/50 text-emerald-700'
              : 'bg-rose-100/50 text-rose-700'
              }`}>
              {activity.status === 'success' ? 'Success' : 'Error'}
            </span>
            <p className="text-xs font-black text-primary mt-2">{activity.credits} CRT</p>
          </div>
        </div>
      ))}
    </div>
  )
}
