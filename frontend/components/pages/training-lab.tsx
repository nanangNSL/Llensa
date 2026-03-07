import { useState } from 'react'
import { ArrowLeft, Plus, Save, X } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

interface TrainingLabProps {
  onNavigate: (page: string) => void
  processor: string | null
}

export default function TrainingLab({ onNavigate, processor }: TrainingLabProps) {
  const [selectedField, setSelectedField] = useState('total_amount')
  const [fields, setFields] = useState([
    { id: 'invoice_no', name: 'invoice_no', type: 'Number', confidence: 99 },
    { id: 'total_amount', name: 'total_amount', type: 'Currency', confidence: 98 },
  ])

  const confidenceData = [
    { name: 'Field 1', accuracy: 99 },
    { name: 'Field 2', accuracy: 98 },
    { name: 'Field 3', accuracy: 95 },
    { name: 'Field 4', accuracy: 96 },
  ]

  return (
    <div className="pl-64 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/40 backdrop-blur-xl border-b border-border/30 p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => onNavigate('processors')}
              className="p-2 hover:bg-card/60 rounded-lg transition-colors"
            >
              <ArrowLeft size={24} className="text-foreground" />
            </button>
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {processor === 'new-processor' ? 'Create New Template' : 'Edit Template'}
              </h1>
              <p className="text-sm text-foreground/60 mt-1">Training: New Vendor-Y Invoice Template</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button
              onClick={() => onNavigate('processors')}
              className="px-6 py-3 rounded-lg bg-card border border-border/30 text-foreground hover:bg-card/80 transition-colors font-semibold"
            >
              Cancel
            </button>
            <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all duration-300 flex items-center gap-2">
              <Save size={20} />
              Save Template
            </button>
          </div>
        </div>
      </div>

      {/* Main Content - Three Column Layout */}
      <div className="p-6">
        <div className="grid grid-cols-12 gap-6 h-[calc(100vh-160px)]">
          {/* Left Column - Field List */}
          <div className="col-span-3 space-y-4 overflow-y-auto">
            <div className="stat-card sticky top-0">
              <div className="space-y-4">
                <h3 className="font-semibold text-foreground text-lg">Defined Fields</h3>
                <div className="space-y-2">
                  {fields.map((field) => (
                    <button
                      key={field.id}
                      onClick={() => setSelectedField(field.id)}
                      className={`w-full p-3 rounded-lg text-left transition-all duration-200 ${
                        selectedField === field.id
                          ? 'bg-primary/20 border border-primary/50 shadow-lg shadow-primary/20'
                          : 'bg-card/40 border border-border/30 hover:border-primary/30'
                      }`}
                    >
                      <p className="font-medium text-sm text-foreground">{field.name}</p>
                      <p className="text-xs text-foreground/60 mt-1">
                        Type: <span className="text-primary">{field.type}</span>
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex-1 h-1.5 bg-background rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-primary to-secondary"
                            style={{ width: `${field.confidence}%` }}
                          ></div>
                        </div>
                        <span className="text-xs font-bold text-primary">{field.confidence}%</span>
                      </div>
                    </button>
                  ))}
                </div>

                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg border-2 border-dashed border-primary/50 text-primary hover:bg-primary/10 transition-colors font-medium mt-4">
                  <Plus size={18} />
                  Add New Field
                </button>
              </div>
            </div>
          </div>

          {/* Center Column - Document Canvas */}
          <div className="col-span-6 overflow-hidden">
            <div className="stat-card h-full flex flex-col">
              <h3 className="font-semibold text-foreground text-lg mb-4">Document Canvas</h3>
              <div className="flex-1 relative bg-gradient-to-br from-card/30 to-card/10 rounded-lg border border-border/20 overflow-auto flex items-center justify-center">
                {/* Invoice Image Placeholder */}
                <div className="relative w-96 h-full max-h-96 bg-gradient-to-br from-foreground/5 to-foreground/10 rounded-lg border border-border/30 flex items-center justify-center overflow-hidden group">
                  <div className="space-y-8 w-full h-full p-6 relative">
                    <div className="text-3xl font-bold text-foreground/20">INVOICE</div>
                    <div className="space-y-2">
                      <div className="w-48 h-3 bg-foreground/10 rounded"></div>
                      <div className="w-32 h-3 bg-foreground/10 rounded"></div>
                    </div>
                    <div className="mt-auto space-y-3">
                      <div className="w-24 h-3 bg-foreground/10 rounded"></div>
                      <div className="w-40 h-8 bg-primary/30 rounded border border-primary/50 relative group/field">
                        <div className="text-lg font-bold text-primary">$2,450.00</div>
                        {/* Highlight for selected field */}
                        {selectedField === 'total_amount' && (
                          <>
                            <div className="absolute inset-0 border-2 border-primary rounded group-hover/field:shadow-lg group-hover/field:shadow-primary/50"></div>
                            <div className="absolute -top-8 left-0 bg-primary/90 text-primary-foreground px-2 py-1 rounded text-xs font-semibold whitespace-nowrap">
                              Field: total_amount
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Field Properties */}
          <div className="col-span-3 overflow-y-auto">
            {selectedField && (
              <div className="stat-card space-y-4 sticky top-0">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-foreground text-lg">Field Properties</h3>
                  <button className="p-1 hover:bg-card/60 rounded transition-colors">
                    <X size={18} className="text-foreground/60" />
                  </button>
                </div>

                <div className="space-y-4 pt-4 border-t border-border/30">
                  <div>
                    <label className="block text-xs font-semibold text-foreground/70 uppercase mb-2">
                      Field Name
                    </label>
                    <input
                      type="text"
                      defaultValue={fields.find((f) => f.id === selectedField)?.name}
                      className="w-full px-3 py-2 rounded-lg bg-card border border-border/50 text-foreground text-sm focus:border-primary/50 focus:outline-none transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground/70 uppercase mb-2">
                      Data Type
                    </label>
                    <select className="w-full px-3 py-2 rounded-lg bg-card border border-border/50 text-foreground text-sm focus:border-primary/50 focus:outline-none transition-colors">
                      <option>String</option>
                      <option>Number</option>
                      <option>Currency</option>
                      <option>Date</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground/70 uppercase mb-2">
                      Confidence Score
                    </label>
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-background rounded-full overflow-hidden">
                        <div className="h-full w-4/5 bg-gradient-to-r from-primary to-secondary"></div>
                      </div>
                      <span className="text-sm font-bold text-primary">98%</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-foreground/70 uppercase mb-3">
                      Coordinate Anchoring
                    </label>
                    <div className="space-y-2">
                      <div className="flex gap-2">
                        <input
                          type="text"
                          placeholder="X: 0"
                          className="flex-1 px-3 py-2 rounded-lg bg-card border border-border/50 text-foreground text-sm focus:border-primary/50 focus:outline-none"
                        />
                        <input
                          type="text"
                          placeholder="Y: 0"
                          className="flex-1 px-3 py-2 rounded-lg bg-card border border-border/50 text-foreground text-sm focus:border-primary/50 focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Mini Confidence Chart */}
                  <div className="pt-4 border-t border-border/30">
                    <p className="text-xs font-semibold text-foreground/70 uppercase mb-3">Extraction Accuracy</p>
                    <div className="h-24">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={confidenceData}>
                          <CartesianGrid stroke="#2a2a35" strokeDasharray="3 3" />
                          <XAxis dataKey="name" tick={{ fontSize: 10, fill: '#8b8b9b' }} />
                          <YAxis tick={{ fontSize: 10, fill: '#8b8b9b' }} domain={[90, 100]} />
                          <Tooltip contentStyle={{ backgroundColor: '#1a1a22', border: '1px solid #2a2a35' }} />
                          <Line type="monotone" dataKey="accuracy" stroke="#00d9ff" dot={false} strokeWidth={2} />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
