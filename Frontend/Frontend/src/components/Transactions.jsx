import React, { useState } from 'react'
import { Plus, Filter, Trash2 } from 'lucide-react'
import { useFinance } from '../context/FinanceContext'
import TransactionModal from './TransactionModal'

function Transactions() {
  const { state, dispatch } = useFinance()
  const [showModal, setShowModal] = useState(false)
  const [filters, setFilters] = useState({
    type: '',
    category: '',
    dateFrom: '',
    dateTo: ''
  })

  const userTransactions = state.transactions.filter(t => t.userId === state.currentUser.id)

  const filteredTransactions = userTransactions.filter(transaction => {
    if (filters.type && transaction.type !== filters.type) return false
    if (filters.category && transaction.category !== filters.category) return false
    if (filters.dateFrom && new Date(transaction.date) < new Date(filters.dateFrom)) return false
    if (filters.dateTo && new Date(transaction.date) > new Date(filters.dateTo)) return false
    return true
  })

  const handleDeleteTransaction = (id) => {
    if (window.confirm('Are you sure you want to delete this transaction?')) {
      dispatch({ type: 'DELETE_TRANSACTION', payload: id })
    }
  }

  const clearFilters = () => {
    setFilters({
      type: '',
      category: '',
      dateFrom: '',
      dateTo: ''
    })
  }

  return (
    <div>
      <div className="flex-between mb-6">
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Transactions</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <Plus size={16} />
          Add Transaction
        </button>
      </div>

      <div className="card mb-6">
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          <Filter size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
          Filters
        </h3>
        
        <div className="filter-bar">
          <div className="form-group">
            <label className="form-label">Type</label>
            <select 
              className="form-select"
              value={filters.type}
              onChange={(e) => setFilters({...filters, type: e.target.value})}
            >
              <option value="">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select 
              className="form-select"
              value={filters.category}
              onChange={(e) => setFilters({...filters, category: e.target.value})}
            >
              <option value="">All Categories</option>
              {state.categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">From Date</label>
            <input 
              type="date"
              className="form-input"
              value={filters.dateFrom}
              onChange={(e) => setFilters({...filters, dateFrom: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-label">To Date</label>
            <input 
              type="date"
              className="form-input"
              value={filters.dateTo}
              onChange={(e) => setFilters({...filters, dateTo: e.target.value})}
            />
          </div>
        </div>

        <button 
          className="btn btn-outline"
          onClick={clearFilters}
        >
          Clear Filters
        </button>
      </div>

      <div className="card">
        <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
          Transaction History ({filteredTransactions.length})
        </h3>

        {filteredTransactions.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
            <p>No transactions found</p>
            <button 
              className="btn btn-primary mt-4"
              onClick={() => setShowModal(true)}
            >
              Add Your First Transaction
            </button>
          </div>
        ) : (
          <div>
            {filteredTransactions.map(transaction => (
              <div key={transaction.id} className="transaction-item">
                <div className="transaction-details">
                  <div className="transaction-title">{transaction.description}</div>
                  <div className="transaction-meta">
                    {transaction.category} • {new Date(transaction.date).toLocaleDateString()} • {transaction.type}
                  </div>
                </div>
                <div className="flex" style={{ alignItems: 'center', gap: '1rem' }}>
                  <div className={`transaction-amount ${transaction.type === 'income' ? 'amount-positive' : 'amount-negative'}`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </div>
                  <button
                    onClick={() => handleDeleteTransaction(transaction.id)}
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
            ))}
          </div>
        )}
      </div>

      {showModal && (
        <TransactionModal 
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

export default Transactions
