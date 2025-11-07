import React from 'react'
import { Sun, Moon, User } from 'lucide-react'
import { useFinance } from '../context/FinanceContext'

function Header({ activeTab, setActiveTab, theme, toggleTheme }) {
  const { state } = useFinance()

  const navItems = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'transactions', label: 'Transactions' },
    { id: 'budget', label: 'Budget' },
    { id: 'goals', label: 'Goals' },
    { id: 'reports', label: 'Reports' }
  ]

  return (
    <header style={{
      backgroundColor: 'var(--white)',
      borderBottom: '1px solid var(--border-color)',
      boxShadow: 'var(--shadow)'
    }}>
      <div className="container">
        <div className="flex-between" style={{ padding: '1rem 0' }}>
          <div className="flex" style={{ alignItems: 'center', gap: '2rem' }}>
            <h1 style={{
              fontSize: '1.5rem',
              fontWeight: 'bold',
              color: 'var(--primary-blue)'
            }}>
              FinTrackr
            </h1>
            
            <nav>
              <ul style={{
                display: 'flex',
                listStyle: 'none',
                gap: '1rem'
              }}>
                {navItems.map(item => (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        padding: '0.5rem 1rem',
                        borderRadius: '0.375rem',
                        cursor: 'pointer',
                        fontWeight: '500',
                        color: activeTab === item.id ? 'var(--primary-blue)' : 'var(--text-secondary)',
                        backgroundColor: activeTab === item.id ? 'rgba(37, 99, 235, 0.1)' : 'transparent',
                        transition: 'all 0.2s ease'
                      }}
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          <div className="flex" style={{ alignItems: 'center', gap: '1rem' }}>
            <div className="flex" style={{ alignItems: 'center', gap: '0.5rem' }}>
              <User size={16} />
              <span style={{ fontSize: '0.875rem', fontWeight: '500' }}>
                {state.currentUser.name}
              </span>
            </div>
            
            <button
              onClick={toggleTheme}
              className="btn btn-outline"
              style={{ padding: '0.5rem' }}
            >
              {theme === 'light' ? <Moon size={16} /> : <Sun size={16} />}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
