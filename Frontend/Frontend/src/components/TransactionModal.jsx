import React, { useState } from 'react'
import { X } from 'lucide-react'
import { useFinance } from '../context/FinanceContext'

function TransactionModal({ onClose }) {
  const { state, dispatch } = useFinance()
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    description: '',
    category: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.amount || !formData.description || !formData.category) {
      alert('Please fill in all fields')
      return
    }

    dispatch({
      type: 'ADD_TRANSACTION',
      payload: {
        ...formData,
        amount: parseFloat(formData.amount)
      }
    })

    onClose()
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="flex-between mb-6">
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Add Transaction</h3>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Type</label>
            <select 
              name="type"
              className="form-select"
              value={formData.type}
              onChange={handleChange}
              required
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Amount ($)</label>
            <input 
              type="number"
              name="amount"
              className="form-input"
              value={formData.amount}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description</label>
            <input 
              type="text"
              name="description"
              className="form-input"
              value={formData.description}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select 
              name="category"
              className="form-select"
              value={formData.category}
              onChange={handleChange}
              required
            >
              <option value="">Select Category</option>
              {state.categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="flex gap-4 mt-4">
            <button type="submit" className="btn btn-primary w-full">
              Add Transaction
            </button>
            <button type="button" className="btn btn-secondary w-full" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TransactionModal
