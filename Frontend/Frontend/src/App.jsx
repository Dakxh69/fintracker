import React, { useState, useEffect } from 'react'
import Header from './components/Header'
import Dashboard from './components/Dashboard'
import Transactions from './components/Transactions'
import BudgetTracker from './components/BudgetTracker'
import GoalTracker from './components/GoalTracker'
import Reports from './components/Reports'
import { FinanceProvider } from './context/FinanceContext'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light'
    setTheme(savedTheme)
    document.documentElement.setAttribute('data-theme', savedTheme)
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />
      case 'transactions':
        return <Transactions />
      case 'budget':
        return <BudgetTracker />
      case 'goals':
        return <GoalTracker />
      case 'reports':
        return <Reports />
      default:
        return <Dashboard />
    }
  }

  return (
    <FinanceProvider>
      <div className="app">
        <Header 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          theme={theme}
          toggleTheme={toggleTheme}
        />
        <main className="container" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
          {renderContent()}
        </main>
      </div>
    </FinanceProvider>
  )
}

export default App
