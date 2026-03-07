import { Zap, FileDown } from 'lucide-react'

export default function Billing() {
  const creditPacks = [
    {
      name: 'Starter',
      credits: '1,000',
      price: 'Rp 200,000',
      priceUsd: '$12.50',
      discount: null,
      features: ['1,000 API requests', 'Email support', '30-day expiry'],
      recommended: false,
    },
    {
      name: 'Pro',
      credits: '5,000',
      price: 'Rp 900,000',
      priceUsd: '$56.25',
      discount: '10%',
      features: ['5,000 API requests', 'Priority support', '90-day expiry'],
      recommended: true,
    },
    {
      name: 'Enterprise',
      credits: '100,000+',
      price: 'Custom',
      priceUsd: 'Contact',
      discount: null,
      features: ['Unlimited API requests', 'Dedicated support', 'Custom integration'],
      recommended: false,
    },
  ]

  const paymentHistory = [
    {
      date: '2024-03-01',
      description: 'Credit Purchase - Pro Pack',
      amount: '900,000',
      status: 'Completed',
      invoice: 'INV-2024-001',
    },
    {
      date: '2024-01-15',
      description: 'Credit Purchase - Starter Pack',
      amount: '200,000',
      status: 'Completed',
      invoice: 'INV-2024-002',
    },
    {
      date: '2023-11-20',
      description: 'Credit Purchase - Pro Pack',
      amount: '900,000',
      status: 'Completed',
      invoice: 'INV-2023-001',
    },
  ]

  return (
    <div className="pl-64 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/40 backdrop-blur-xl border-b border-border/30 p-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Billing & Credits</h1>
          <p className="text-sm text-foreground/60 mt-1">Manage your account balance and payment methods</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-6 space-y-6">
        {/* Current Balance */}
        <div className="stat-card">
          <div className="grid grid-cols-2 gap-6">
            <div>
              <p className="text-sm text-foreground/60 uppercase font-semibold tracking-wide">Current Balance</p>
              <p className="text-5xl font-bold text-primary mt-2">1,250</p>
              <p className="text-sm text-foreground/60 mt-2">Credits available</p>
            </div>
            <div className="border-l border-border/30 pl-6 space-y-4">
              <div>
                <p className="text-xs text-foreground/60 uppercase font-semibold tracking-wide mb-2">Usage This Month</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-foreground/70">Documents processed</span>
                    <span className="font-semibold text-foreground">3,750 credits</span>
                  </div>
                  <div className="w-full h-2 bg-background rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Credit Packs */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Choose Your Credit Pack</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {creditPacks.map((pack) => (
              <div
                key={pack.name}
                className={`relative rounded-xl transition-all duration-300 ${
                  pack.recommended
                    ? 'stat-card glass-border scale-105 shadow-2xl shadow-primary/20'
                    : 'stat-card'
                }`}
              >
                {pack.recommended && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 px-4 py-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground text-xs font-bold rounded-full">
                    RECOMMENDED
                  </div>
                )}

                <div className="space-y-6 pt-4">
                  <div>
                    <p className="text-foreground/60 text-sm uppercase font-semibold tracking-wide">{pack.name}</p>
                    <p className="text-4xl font-bold text-primary mt-2">{pack.credits}</p>
                    <p className="text-sm text-foreground/60 mt-1">Credits</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-foreground">{pack.price}</p>
                    {pack.discount && (
                      <p className="text-xs text-primary font-semibold">
                        {pack.discount} DISCOUNT
                      </p>
                    )}
                    {pack.priceUsd !== 'Contact' && (
                      <p className="text-xs text-foreground/60">~{pack.priceUsd} USD</p>
                    )}
                  </div>

                  <ul className="space-y-2">
                    {pack.features.map((feature) => (
                      <li key={feature} className="flex items-center gap-2 text-sm text-foreground/70">
                        <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {pack.name === 'Enterprise' ? (
                    <button className="w-full px-4 py-3 rounded-lg border border-primary/30 text-primary font-semibold hover:bg-primary/10 transition-colors">
                      Contact Sales
                    </button>
                  ) : (
                    <button className="w-full px-4 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all duration-300">
                      Buy Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Payment History */}
        <div className="stat-card">
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-foreground">Payment History</h2>
            <p className="text-sm text-foreground/60 mt-1">Track your transactions</p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground/70 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground/70 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground/70 uppercase tracking-wider">Amount</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground/70 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground/70 uppercase tracking-wider">Invoice</th>
                </tr>
              </thead>
              <tbody>
                {paymentHistory.map((payment) => (
                  <tr
                    key={payment.invoice}
                    className="border-b border-border/30 hover:bg-card/30 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm text-foreground/70">{payment.date}</td>
                    <td className="px-6 py-4 text-sm text-foreground">{payment.description}</td>
                    <td className="px-6 py-4 text-sm font-semibold text-primary">{payment.amount}</td>
                    <td className="px-6 py-4">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-500/20 text-green-400">
                        ✓ {payment.status}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <button className="flex items-center gap-2 text-primary hover:text-primary/80 transition-colors font-medium text-sm">
                        {payment.invoice}
                        <FileDown size={14} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
