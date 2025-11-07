import React, { useState } from 'react'
import { Plus, Trash2, Edit } from 'lucide-react'
import { useFinance } from '../context/FinanceContext'
import BudgetModal from './BudgetModal'

function BudgetTracker() {
  const { state, dispatch } = useFinance()
  const [showModal, setShowModal] = useState(false)
  const [editingBudget, setEditingBudget] = useState(null)

  const userBudgets = state.budgets.filter(b => b.userId === state.currentUser.id)
  const userTransactions = state.transactions.filter(t => t.userId === state.currentUser.id)

  const handleDeleteBudget = (id) => {
    if (window.confirm('Are you sure you want to delete this budget?')) {
      dispatch({ type: 'DELETE_BUDGET', payload: id })
    }
  }

  const handleEditBudget = (budget) => {
    setEditingBudget(budget)
    setShowModal(true)
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingBudget(null)
  }

  return (
    <div>
      <div className="flex-between mb-6">
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Budget Tracker</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <Plus size={16} />
          Create Budget
        </button>
      </div>

      {userBudgets.length === 0 ? (
        <div className="card text-center" style={{ padding: '3rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
            No Budgets Created Yet
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Create your first budget to start tracking your spending
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Create Your First Budget
          </button>
        </div>
      ) : (
        <div className="grid grid-2 gap-4">
          {userBudgets.map(budget => {
            const spent = userTransactions
              .filter(t => t.type === 'expense' && t.category === budget.category)
              .reduce((sum, t) => sum + t.amount, 0)
            
            const progress = (spent / budget.amount) * 100
            const remaining = budget.amount - spent
            const isOverBudget = spent > budget.amount

            return (
              <div key={budget.id} className="card">
                <div className="flex-between mb-4">
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                    {budget.category}
                  </h3>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleEditBudget(budget)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: 'var(--primary-blue)',
                        cursor: 'pointer',
                        padding: '0.25rem'
                      }}
                    >
                      <Edit size={16} />
                    </button>
                    <button
                      onClick={() => handleDeleteBudget(budget.id)}
                      style={{
                        background: 'none',
                        border: 'none',
                        color: '#ef4444',
                        cursor: 'pointer',
                        padding: '0.25rem'
                      }}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>

                <div className="mb-4">
                  <div className="flex-between mb-4">
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      Spent: ${spent.toFixed(2)}
                    </span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      Budget: ${budget.amount.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${Math.min(progress, 100)}%`,
                        backgroundColor: isOverBudget ? '#ef4444' : 'var(--accent-green)'
                      }}
                    ></div>
                  </div>
                  
                  <div style={{ 
                    fontSize: '0.75rem', 
                    color: isOverBudget ? '#ef4444' : 'var(--text-secondary)', 
                    marginTop: '0.5rem',
                    textAlign: 'center'
                  }}>
                    {isOverBudget ? (
                      `Over budget by $${Math.abs(remaining).toFixed(2)}`
                    ) : (
                      `$${remaining.toFixed(2)} remaining (${progress.toFixed(1)}% used)`
                    )}
                  </div>
                </div>

                <div className="grid grid-3 gap-4" style={{ fontSize: '0.875rem' }}>
                  <div className="text-center">
                    <div style={{ fontWeight: 'bold', color: 'var(--primary-blue)' }}>
                      ${budget.amount.toFixed(2)}
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>Budget</div>
                  </div>
                  <div className="text-center">
                    <div style={{ fontWeight: 'bold', color: '#ef4444' }}>
                      ${spent.toFixed(2)}
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>Spent</div>
                  </div>
                  <div className="text-center">
                    <div style={{ 
                      fontWeight: 'bold', 
                      color: isOverBudget ? '#ef4444' : 'var(--accent-green)' 
                    }}>
                      ${Math.abs(remaining).toFixed(2)}
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>
                      {isOverBudget ? 'Over' : 'Left'}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}

      {showModal && (
        <BudgetModal 
          budget={editingBudget}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

export default BudgetTracker
