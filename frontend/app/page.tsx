'use client'

import { useState } from 'react'
import Sidebar from '@/components/layout/sidebar'
import Dashboard from '@/components/pages/dashboard'
import Processors from '@/components/pages/processors'
import TrainingLab from '@/components/pages/training-lab'
import APIKeys from '@/components/pages/api-keys'
import UsageLogs from '@/components/pages/usage-logs'
import Billing from '@/components/pages/billing'

export default function Home() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  const [selectedProcessor, setSelectedProcessor] = useState<string | null>(null)

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onNavigate={setCurrentPage} />
      case 'processors':
        return <Processors onNavigate={setCurrentPage} onSelectProcessor={setSelectedProcessor} />
      case 'training-lab':
        return <TrainingLab onNavigate={setCurrentPage} processor={selectedProcessor} />
      case 'api-keys':
        return <APIKeys />
      case 'usage-logs':
        return <UsageLogs />
      case 'billing':
        return <Billing />
      default:
        return <Dashboard onNavigate={setCurrentPage} />
    }
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F9FAFB]">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="flex-1 overflow-auto relative">
        <div className="h-full w-full">
          {renderPage()}
        </div>
      </main>
    </div>
  )
}
