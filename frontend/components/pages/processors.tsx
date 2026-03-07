import { useState } from 'react'
import { Plus, Settings, Zap, Flag } from 'lucide-react'

interface ProcessorsProps {
  onNavigate: (page: string) => void
  onSelectProcessor: (processor: string) => void
}

export default function Processors({ onNavigate, onSelectProcessor }: ProcessorsProps) {
  const [activeTab, setActiveTab] = useState('pretrained')

  const pretrainedProcessors = [
    {
      id: 'ktp',
      name: 'Standard KTP Processor',
      description: 'Indonesian ID Card extraction',
      icon: '🇮🇩',
      status: 'Active',
    },
    {
      id: 'invoice',
      name: 'Standard Invoice Processor',
      description: 'Universal invoice extraction',
      icon: '📄',
      status: 'Active',
    },
  ]

  const customProcessors = [
    {
      id: 'vendor-x',
      name: 'Vendor-X Invoice',
      description: 'Custom vendor invoice template',
      icon: '⚙️',
      status: 'Active',
    },
    {
      id: 'custom-2',
      name: 'Contract Parser',
      description: 'Legal document extraction',
      icon: '📋',
      status: 'Active',
    },
    {
      id: 'custom-3',
      name: 'Receipt Analyzer',
      description: 'Receipt and expense parsing',
      icon: '🧾',
      status: 'Active',
    },
  ]

  return (
    <div className="pl-64 min-h-screen">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-background/40 backdrop-blur-xl border-b border-border/30 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">My AI Processors</h1>
            <p className="text-sm text-foreground/60 mt-1">Manage your document extraction models</p>
          </div>
          <button
            onClick={() => {
              onSelectProcessor('new-processor')
              onNavigate('training-lab')
            }}
            className="flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-semibold hover:shadow-xl hover:shadow-primary/30 transition-all duration-300"
          >
            <Plus size={20} />
            Create Custom Extractor
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="pl-6 pr-6 pt-6 border-b border-border/30">
        <div className="flex gap-8">
          <button
            onClick={() => setActiveTab('pretrained')}
            className={`pb-4 px-4 font-medium transition-all duration-200 ${
              activeTab === 'pretrained'
                ? 'text-primary border-b-2 border-primary'
                : 'text-foreground/60 hover:text-foreground/80'
            }`}
          >
            Pre-trained ({pretrainedProcessors.length})
          </button>
          <button
            onClick={() => setActiveTab('custom')}
            className={`pb-4 px-4 font-medium transition-all duration-200 ${
              activeTab === 'custom'
                ? 'text-primary border-b-2 border-primary'
                : 'text-foreground/60 hover:text-foreground/80'
            }`}
          >
            Custom ({customProcessors.length})
          </button>
        </div>
      </div>

      {/* Processor Grid */}
      <div className="p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activeTab === 'pretrained'
            ? pretrainedProcessors.map((processor) => (
                <ProcessorCard
                  key={processor.id}
                  processor={processor}
                  isPretrained={true}
                  onNavigate={onNavigate}
                />
              ))
            : customProcessors.map((processor) => (
                <ProcessorCard
                  key={processor.id}
                  processor={processor}
                  isPretrained={false}
                  onNavigate={onNavigate}
                />
              ))}
        </div>
      </div>
    </div>
  )
}

interface ProcessorCardProps {
  processor: any
  isPretrained: boolean
  onNavigate: (page: string) => void
}

function ProcessorCard({ processor, isPretrained, onNavigate }: ProcessorCardProps) {
  return (
    <div className="stat-card space-y-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className="text-4xl">{processor.icon}</div>
          <div>
            <h3 className="font-semibold text-foreground">{processor.name}</h3>
            <p className="text-xs text-foreground/60 mt-1">{processor.description}</p>
          </div>
        </div>
        <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-500/20 text-green-400 text-xs font-bold">
          ✓
        </div>
      </div>

      <div className="flex gap-3 pt-2">
        {!isPretrained && (
          <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-secondary/20 text-secondary hover:bg-secondary/30 transition-colors text-sm font-medium">
            <Settings size={16} />
            Edit Template
          </button>
        )}
        <button className="flex-1 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-primary/20 text-primary hover:bg-primary/30 transition-colors text-sm font-medium">
          <Zap size={16} />
          Use API
        </button>
      </div>
    </div>
  )
}
