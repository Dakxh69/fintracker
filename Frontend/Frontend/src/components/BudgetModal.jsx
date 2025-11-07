import React, { useState } from 'react'
import { X } from 'lucide-react'
import { useFinance } from '../context/FinanceContext'

function BudgetModal({ budget, onClose }) {
  const { state, dispatch } = useFinance()
  const [formData, setFormData] = useState({
    category: budget?.category || '',
    amount: budget?.amount || '',
    period: budget?.period || 'monthly'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.category || !formData.amount) {
      alert('Please fill in all fields')
      return
    }

    if (budget) {
      dispatch({
        type: 'UPDATE_BUDGET',
        payload: {
          ...budget,
          ...formData,
          amount: parseFloat(formData.amount)
        }
      })
    } else {
      dispatch({
        type: 'ADD_BUDGET',
        payload: {
          ...formData,
          amount: parseFloat(formData.amount)
        }
      })
    }

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
          <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
            {budget ? 'Edit Budget' : 'Create Budget'}
          </h3>
          <button 
            onClick={onClose}
            style={{ background: 'none', border: 'none', cursor: 'pointer' }}
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
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
              {state.categories.filter(cat => cat !== 'Income').map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Budget Amount ($)</label>
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
            <label className="form-label">Period</label>
            <select 
              name="period"
              className="form-select"
              value={formData.period}
              onChange={handleChange}
              required
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>
          </div>

          <div className="flex gap-4 mt-4">
            <button type="submit" className="btn btn-primary w-full">
              {budget ? 'Update Budget' : 'Create Budget'}
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

export default BudgetModal
