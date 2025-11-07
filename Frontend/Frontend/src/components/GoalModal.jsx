import React, { useState } from 'react'
import { X } from 'lucide-react'
import { useFinance } from '../context/FinanceContext'

function GoalModal({ goal, onClose }) {
  const { dispatch } = useFinance()
  const [formData, setFormData] = useState({
    name: goal?.name || '',
    description: goal?.description || '',
    targetAmount: goal?.targetAmount || '',
    currentAmount: goal?.currentAmount || 0,
    targetDate: goal?.targetDate || ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.targetAmount) {
      alert('Please fill in required fields')
      return
    }

    if (goal) {
      dispatch({
        type: 'UPDATE_GOAL',
        payload: {
          ...goal,
          ...formData,
          targetAmount: parseFloat(formData.targetAmount),
          currentAmount: parseFloat(formData.currentAmount)
        }
      })
    } else {
      dispatch({
        type: 'ADD_GOAL',
        payload: {
          ...formData,
          targetAmount: parseFloat(formData.targetAmount),
          currentAmount: parseFloat(formData.currentAmount)
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
            {goal ? 'Edit Goal' : 'Create Goal'}
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
            <label className="form-label">Goal Name *</label>
            <input 
              type="text"
              name="name"
              className="form-input"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g., Emergency Fund, New Laptop"
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
              placeholder="Optional description"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Target Amount ($) *</label>
            <input 
              type="number"
              name="targetAmount"
              className="form-input"
              value={formData.targetAmount}
              onChange={handleChange}
              step="0.01"
              min="0"
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Current Amount ($)</label>
            <input 
              type="number"
              name="currentAmount"
              className="form-input"
              value={formData.currentAmount}
              onChange={handleChange}
              step="0.01"
              min="0"
            />
          </div>

          <div className="form-group">
            <label className="form-label">Target Date</label>
            <input 
              type="date"
              name="targetDate"
              className="form-input"
              value={formData.targetDate}
              onChange={handleChange}
            />
          </div>

          <div className="flex gap-4 mt-4">
            <button type="submit" className="btn btn-primary w-full">
              {goal ? 'Update Goal' : 'Create Goal'}
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

export default GoalModal
