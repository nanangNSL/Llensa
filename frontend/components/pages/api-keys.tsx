import { useState } from 'react'
import { Plus, Copy, Eye, EyeOff, Trash2 } from 'lucide-react'

export default function APIKeys() {
  const [showNewKeyModal, setShowNewKeyModal] = useState(false)
  const [visibleKeys, setVisibleKeys] = useState<{ [key: string]: boolean }>({})
  const [copiedKey, setCopiedKey] = useState<string | null>(null)

  const apiKeys = [
    {
      id: 1,
      name: 'Production API Key',
      key: 'sk_live_51234567890abcdef4a2b',
      created: '2024-01-15',
      lastUsed: '2024-03-07',
      status: true,
    },
    {
      id: 2,
      name: 'Development API Key',
      key: 'sk_test_98765432100fedcba1x2',
      created: '2024-02-01',
      lastUsed: '2024-03-06',
      status: true,
    },
    {
      id: 3,
      name: 'Old Integration Key',
      key: 'sk_live_abcdefghijklmnopqrstu',
      created: '2023-06-20',
      lastUsed: '2024-01-10',
      status: false,
    },
  ]

  const toggleKeyVisibility = (id: number) => {
    setVisibleKeys((prev) => ({
      ...prev,
      [id]: !prev[id],
    }))
  }

  const copyToClipboard = (key: string, id: number) => {
    navigator.clipboard.writeText(key)
    setCopiedKey(id.toString())
    setTimeout(() => setCopiedKey(null), 2000)
  }

  return (
    <div className="pl-64 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/40 backdrop-blur-xl border-b border-border/30 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">API Management</h1>
            <p className="text-sm text-foreground/60 mt-1">Manage your API keys and integrations</p>
          </div>
          <button
            onClick={() => setShowNewKeyModal(true)}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
          >
            <Plus size={20} />
            Generate New Key
          </button>
        </div>
      </div>

      {/* API Keys Table */}
      <div className="p-6">
        <div className="stat-card overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border/30">
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground/70 uppercase tracking-wider">Key Name</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground/70 uppercase tracking-wider">API Key</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground/70 uppercase tracking-wider">Created</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground/70 uppercase tracking-wider">Last Used</th>
                  <th className="px-6 py-4 text-left text-xs font-bold text-foreground/70 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-4 text-center text-xs font-bold text-foreground/70 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((apiKey) => (
                  <tr
                    key={apiKey.id}
                    className="border-b border-border/30 hover:bg-card/30 transition-colors duration-200"
                  >
                    <td className="px-6 py-4">
                      <span className="font-medium text-foreground">{apiKey.name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <code className="text-sm text-primary font-mono">
                          {visibleKeys[apiKey.id]
                            ? apiKey.key
                            : apiKey.key.slice(0, 7) + '...' + apiKey.key.slice(-4)}
                        </code>
                        <button
                          onClick={() => toggleKeyVisibility(apiKey.id)}
                          className="p-1 hover:bg-card/60 rounded transition-colors"
                        >
                          {visibleKeys[apiKey.id] ? (
                            <EyeOff size={16} className="text-foreground/60" />
                          ) : (
                            <Eye size={16} className="text-foreground/60" />
                          )}
                        </button>
                        <button
                          onClick={() => copyToClipboard(apiKey.key, apiKey.id)}
                          className="p-1 hover:bg-card/60 rounded transition-colors"
                        >
                          <Copy
                            size={16}
                            className={`transition-colors ${
                              copiedKey === apiKey.id.toString() ? 'text-primary' : 'text-foreground/60'
                            }`}
                          />
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-foreground/70">{apiKey.created}</td>
                    <td className="px-6 py-4 text-sm text-foreground/70">{apiKey.lastUsed}</td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-2 h-2 rounded-full ${apiKey.status ? 'bg-green-500' : 'bg-red-500'}`}
                        ></div>
                        <span className="text-sm text-foreground/70">{apiKey.status ? 'Active' : 'Inactive'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button className="p-2 hover:bg-red-500/20 rounded transition-colors text-red-400">
                        <Trash2 size={16} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* New Key Modal */}
      {showNewKeyModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowNewKeyModal(false)}></div>
          <div className="relative stat-card max-w-md w-full space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-foreground">Generate New Key</h2>
              <button
                onClick={() => setShowNewKeyModal(false)}
                className="p-1 hover:bg-card/60 rounded transition-colors"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 pt-4 border-t border-border/30">
              <div>
                <label className="block text-sm font-semibold text-foreground/70 mb-2">Key Name</label>
                <input
                  type="text"
                  placeholder="e.g., My New API Key"
                  className="w-full px-4 py-2 rounded-lg bg-card border border-border/50 text-foreground focus:border-primary/50 focus:outline-none transition-colors"
                />
              </div>

              <div className="p-4 rounded-lg bg-primary/10 border border-primary/20 space-y-2">
                <p className="text-sm text-primary font-semibold">⚠️ Save your key</p>
                <p className="text-xs text-foreground/70">
                  Your API key will be shown only once. Make sure to save it in a secure location.
                </p>
              </div>

              <div className="flex gap-3 pt-4 border-t border-border/30">
                <button
                  onClick={() => setShowNewKeyModal(false)}
                  className="flex-1 px-4 py-2 rounded-lg bg-card border border-border/30 text-foreground hover:bg-card/80 transition-colors font-semibold"
                >
                  Cancel
                </button>
                <button className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:shadow-lg hover:shadow-primary/30 transition-all">
                  Generate Key
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
