import { LayoutGrid, Cpu, Key, ClipboardList, CreditCard, LogOut, ChevronRight } from 'lucide-react'

interface SidebarProps {
  currentPage: string
  onNavigate: (page: string) => void
}

export default function Sidebar({ currentPage, onNavigate }: SidebarProps) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutGrid },
    { id: 'processors', label: 'My Processors', icon: Cpu },
    { id: 'api-keys', label: 'API Keys', icon: Key },
    { id: 'usage-logs', label: 'Usage Logs', icon: ClipboardList },
    { id: 'billing', label: 'Billing', icon: CreditCard },
  ]

  return (
    <aside className="w-64 bg-sidebar border-r border-sidebar-border flex flex-col fixed left-0 top-0 h-screen z-40 shadow-sm">
      {/* Header */}
      <div className="p-8 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="text-white font-bold text-xl">D</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-sidebar-foreground tracking-tight">DocuMind<span className="text-primary">.AI</span></h1>
            <p className="text-[10px] text-sidebar-foreground/40 font-semibold uppercase tracking-widest -mt-1">Enterprise AI</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-8 space-y-1">
        {navItems.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => onNavigate(id)}
            className={`w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 group ${
              currentPage === id
                ? 'bg-sidebar-accent text-sidebar-accent-foreground shadow-sm'
                : 'text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent/50'
            }`}
          >
            <div className="flex items-center gap-3">
              <Icon size={18} className={`transition-colors duration-300 ${currentPage === id ? 'text-primary' : 'group-hover:text-sidebar-foreground'}`} />
              <span className="text-sm font-semibold">{label}</span>
            </div>
            {currentPage === id && <ChevronRight size={14} className="text-primary animate-in fade-in slide-in-from-left-1" />}
          </button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="p-6 space-y-6 border-t border-sidebar-border bg-sidebar-accent/30">
        {/* Credits Widget */}
        <div className="bg-white border border-sidebar-border p-5 rounded-2xl shadow-sm space-y-4">
          <p className="text-[10px] text-sidebar-foreground/50 font-bold uppercase tracking-widest">Usage Limit</p>
          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="text-2xl font-bold text-sidebar-foreground">1,250</span>
              <span className="text-[10px] text-sidebar-foreground/40 font-bold mb-1">/ 5,000 CREDITS</span>
            </div>
            <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all duration-1000 ease-out" 
                style={{ width: '25%' }}
              ></div>
            </div>
          </div>
          <button 
            onClick={() => onNavigate('billing')}
            className="w-full py-2 bg-primary/10 hover:bg-primary/20 text-primary text-xs font-bold rounded-lg transition-colors duration-200"
          >
            Upgrade Plan
          </button>
        </div>

        {/* User Profile */}
        <div className="flex items-center gap-3 px-1">
          <div className="w-10 h-10 rounded-full border-2 border-primary/20 p-0.5 shadow-sm">
            <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white font-bold text-xs">
              AJ
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-sidebar-foreground truncate">Alex Johnson</p>
            <p className="text-[10px] text-sidebar-foreground/40 font-bold uppercase">Pro Member</p>
          </div>
          <button className="p-2 text-sidebar-foreground/40 hover:text-destructive transition-colors duration-200">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </aside>
  )
}

