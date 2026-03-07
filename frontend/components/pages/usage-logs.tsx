import { useState } from 'react'
import { Calendar, Search, ChevronRight, Download } from 'lucide-react'

export default function UsageLogs() {
  const [showDetailPanel, setShowDetailPanel] = useState<number | null>(null)

  const transactions = [
    {
      id: 'txn_001',
      timestamp: '2024-03-07 14:32:15',
      processor: 'Standard Invoice Processor',
      apiKey: 'sk_live_...4a2b',
      duration: '234ms',
      status: '200',
      statusLabel: 'Success',
      credits: 15,
      imageUrl: '/placeholder-invoice.jpg',
      response: '{"invoice_number":"INV-2024-001","amount":2450.00,"date":"2024-03-01"}',
    },
    {
      id: 'txn_002',
      timestamp: '2024-03-07 13:45:22',
      processor: 'Standard KTP Processor',
      apiKey: 'sk_live_...4a2b',
      duration: '189ms',
      status: '200',
      statusLabel: 'Success',
      credits: 12,
      imageUrl: '/placeholder-ktp.jpg',
      response: '{"nik":"3172010101900001","name":"John Doe","birth_date":"1990-01-01"}',
    },
    {
      id: 'txn_003',
      timestamp: '2024-03-07 12:15:08',
      processor: 'Custom Invoice Processor',
      apiKey: 'sk_test_...1x2',
      duration: '156ms',
      status: '200',
      statusLabel: 'Success',
      credits: 18,
      imageUrl: '/placeholder-invoice.jpg',
      response: '{"vendor":"Vendor-X","po_number":"PO-2024-5421","total":5680.50}',
    },
    {
      id: 'txn_004',
      timestamp: '2024-03-07 10:22:45',
      processor: 'Standard Invoice Processor',
      apiKey: 'sk_live_...4a2b',
      duration: '412ms',
      status: '500',
      statusLabel: 'Error',
      credits: 0,
      imageUrl: '/placeholder-error.jpg',
      response: '{"error":"Invalid document format","code":"INVALID_FORMAT"}',
    },
    {
      id: 'txn_005',
      timestamp: '2024-03-06 16:58:30',
      processor: 'Standard Receipt Processor',
      apiKey: 'sk_live_...4a2b',
      duration: '201ms',
      status: '200',
      statusLabel: 'Success',
      credits: 10,
      imageUrl: '/placeholder-receipt.jpg',
      response: '{"receipt_number":"RCP-20240306","merchant":"Local Cafe","amount":12.50}',
    },
  ]

  const selectedTransaction = transactions.find((t) => t.id === (`txn_00${showDetailPanel}` as string))

  return (
    <div className="pl-64 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/40 backdrop-blur-xl border-b border-border/30 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Transaction Logs</h1>
            <p className="text-sm text-foreground/60 mt-1">Track all your API requests and credits</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-lg bg-card border border-border/30 text-foreground hover:bg-card/80 transition-colors font-semibold">
            <Download size={20} />
            Export Logs
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="sticky top-24 z-20 p-6 bg-background/40 backdrop-blur-xl border-b border-border/30 space-y-4">
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-4 flex items-center gap-2 px-4 py-2 rounded-lg glass glass-border">
            <Calendar size={18} className="text-foreground/60" />
            <input
              type="text"
              placeholder="Last 7 Days"
              className="flex-1 bg-transparent text-foreground text-sm focus:outline-none"
            />
          </div>
          <div className="col-span-8 flex items-center gap-2 px-4 py-2 rounded-lg glass glass-border">
            <Search size={18} className="text-foreground/60" />
            <input
              type="text"
              placeholder="Search by transaction ID or processor..."
              className="flex-1 bg-transparent text-foreground text-sm focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 grid grid-cols-3 gap-6">
        {/* Transaction List */}
        <div className="col-span-2 stat-card">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground/70 uppercase tracking-wider">Transaction ID</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground/70 uppercase tracking-wider">Timestamp</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground/70 uppercase tracking-wider">Processor</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground/70 uppercase tracking-wider">Duration</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground/70 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground/70 uppercase tracking-wider">Credits</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((txn) => (
                  <tr
                    key={txn.id}
                    className="border-b border-border/30 hover:bg-card/30 transition-colors cursor-pointer"
                    onClick={() => setShowDetailPanel(parseInt(txn.id.slice(-1)))}
                  >
                    <td className="px-6 py-4">
                      <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors">
                        <code className="text-xs font-mono">{txn.id}</code>
                        <ChevronRight size={14} />
                      </button>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground/70">{txn.timestamp}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{txn.processor}</td>
                    <td className="px-6 py-4 text-sm text-foreground/70 font-mono">{txn.duration}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          txn.status === '200'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {txn.status} {txn.statusLabel}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-primary">{txn.credits}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detail Panel */}
        {showDetailPanel && selectedTransaction && (
          <div className="col-span-1 stat-card space-y-4 h-fit sticky top-24">
            <div className="space-y-4">
              <h3 className="font-bold text-foreground text-lg">Transaction Details</h3>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-foreground/60 text-xs uppercase font-semibold">ID</p>
                  <p className="text-primary font-mono">{selectedTransaction.id}</p>
                </div>
                <div className="pt-2 border-t border-border/30">
                  <p className="text-foreground/60 text-xs uppercase font-semibold">Processor</p>
                  <p className="text-foreground">{selectedTransaction.processor}</p>
                </div>
                <div className="pt-2 border-t border-border/30">
                  <p className="text-foreground/60 text-xs uppercase font-semibold">Status</p>
                  <span
                    className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                      selectedTransaction.status === '200'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}
                  >
                    {selectedTransaction.status} {selectedTransaction.statusLabel}
                  </span>
                </div>
                <div className="pt-2 border-t border-border/30">
                  <p className="text-foreground/60 text-xs uppercase font-semibold">Response</p>
                  <code className="text-xs bg-card/60 p-2 rounded text-primary/80 block mt-2 overflow-auto max-h-32">
                    {selectedTransaction.response}
                  </code>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
