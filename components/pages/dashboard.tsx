import { Bell, Search, Plus, Upload, Filter, Sparkles } from 'lucide-react'
import StatCard from '@/components/ui/stat-card'
import ActivityFeed from '@/components/ui/activity-feed'
import Chart from '@/components/ui/chart'
import RecentDocuments from '@/components/ui/recent-documents'

interface DashboardProps {
  onNavigate: (page: string) => void
}

export default function Dashboard({ onNavigate }: DashboardProps) {
  return (
    <div className="lg:pl-64 min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-100 p-6 px-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              Welcome back, Alex <span className="animate-bounce">👋</span>
            </h1>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">
              Dashboard &bull; {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
              <input
                type="text"
                placeholder="Search documents..."
                className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-medium focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all w-64"
              />
            </div>
            <button className="p-2.5 rounded-xl bg-slate-50 border border-slate-100 text-slate-500 hover:text-primary transition-colors">
              <Bell size={18} />
            </button>
            <button className="flex items-center gap-2 px-5 py-2.5 bg-primary text-white rounded-xl text-xs font-bold shadow-lg shadow-primary/25 hover:bg-primary/90 transition-all active:scale-95">
              <Upload size={16} />
              <span>Upload Document</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-8 space-y-10 max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
              <Sparkles size={14} className="text-primary" /> Key Performance Indicators
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <StatCard
              title="Extraction Credits"
              value="1,250"
              subtitle="of 5,000"
              icon={<Plus className="w-6 h-6" />}
              onClick={() => onNavigate('billing')}
              actionLabel="REFILL NOW"
              trend="-120 today"
              trendDirection="down"
            />
            <StatCard
              title="Total Documents"
              value="15,420"
              subtitle="Processed"
              icon={<Upload className="w-6 h-6" />}
              trend="+12.5% Month"
              trendDirection="up"
            />
            <StatCard
              title="Model Accuracy"
              value="99.2%"
              subtitle="Average"
              icon={<Sparkles className="w-6 h-6" />}
              trend="OPTIMAL"
              trendDirection="up"
            />
          </div>
        </div>

        {/* Analytics Section */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <div className="xl:col-span-2 space-y-4">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Extraction Volume</h2>
              <div className="flex items-center gap-2">
                <button className="text-[10px] font-bold text-primary bg-primary/5 px-2 py-1 rounded">30 DAYS</button>
                <button className="text-[10px] font-bold text-slate-400 px-2 py-1 hover:bg-slate-50 rounded">90 DAYS</button>
              </div>
            </div>
            <div className="premium-card p-8 h-[350px] flex items-center justify-center">
              <Chart />
            </div>
          </div>

          <div className="space-y-4">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Global Activity</h2>
            <div className="premium-card p-6 h-[350px]">
              <ActivityFeed />
            </div>
          </div>
        </div>

        {/* Recent Documents Section - Prototype Demo Feature */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">Active Extractions</h2>
            <button className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-wider hover:text-primary transition-colors">
              <Filter size={12} />
              <span>Filter Results</span>
            </button>
          </div>
          <RecentDocuments />
        </div>
      </main>
    </div>
  )
}

