import React, { useState } from 'react'
import { Plus, Trash2, Edit, DollarSign } from 'lucide-react'
import { useFinance } from '../context/FinanceContext'
import GoalModal from './GoalModal'

function GoalTracker() {
  const { state, dispatch } = useFinance()
  const [showModal, setShowModal] = useState(false)
  const [editingGoal, setEditingGoal] = useState(null)

  const userGoals = state.goals.filter(g => g.userId === state.currentUser.id)

  const handleDeleteGoal = (id) => {
    if (window.confirm('Are you sure you want to delete this goal?')) {
      dispatch({ type: 'DELETE_GOAL', payload: id })
    }
  }

  const handleEditGoal = (goal) => {
    setEditingGoal(goal)
    setShowModal(true)
  }

  const handleAddMoney = (goalId) => {
    const amount = prompt('Enter amount to add to this goal:')
    if (amount && !isNaN(amount) && parseFloat(amount) > 0) {
      const goal = userGoals.find(g => g.id === goalId)
      const newAmount = goal.currentAmount + parseFloat(amount)
      
      dispatch({
        type: 'UPDATE_GOAL',
        payload: {
          ...goal,
          currentAmount: Math.min(newAmount, goal.targetAmount)
        }
      })
    }
  }

  const closeModal = () => {
    setShowModal(false)
    setEditingGoal(null)
  }

  return (
    <div>
      <div className="flex-between mb-6">
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Goal Tracker</h2>
        <button 
          className="btn btn-primary"
          onClick={() => setShowModal(true)}
        >
          <Plus size={16} />
          Create Goal
        </button>
      </div>

      {userGoals.length === 0 ? (
        <div className="card text-center" style={{ padding: '3rem' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-secondary)' }}>
            No Goals Created Yet
          </h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
            Set your first financial goal and start saving
          </p>
          <button 
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            Create Your First Goal
          </button>
        </div>
      ) : (
        <div className="grid grid-2 gap-4">
          {userGoals.map(goal => {
            const progress = (goal.currentAmount / goal.targetAmount) * 100
            const remaining = goal.targetAmount - goal.currentAmount
            const isCompleted = goal.currentAmount >= goal.targetAmount

            return (
              <div key={goal.id} className="card">
                <div className="flex-between mb-4">
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>
                    {goal.name}
                  </h3>
                  <div className="flex gap-4">
                    <button
                      onClick={() => handleAddMoney(goal.id)}
                      className="btn btn-success"
                      style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                      disabled={isCompleted}
                    >
                      <DollarSign size={14} />
                      Add
                    </button>
                    <button
                      onClick={() => handleEditGoal(goal)}
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
                      onClick={() => handleDeleteGoal(goal.id)}
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

                {goal.description && (
                  <p style={{ 
                    color: 'var(--text-secondary)', 
                    fontSize: '0.875rem', 
                    marginBottom: '1rem' 
                  }}>
                    {goal.description}
                  </p>
                )}

                <div className="mb-4">
                  <div className="flex-between mb-4">
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      Saved: ${goal.currentAmount.toFixed(2)}
                    </span>
                    <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                      Target: ${goal.targetAmount.toFixed(2)}
                    </span>
                  </div>
                  
                  <div className="progress-bar">
                    <div 
                      className="progress-fill" 
                      style={{ 
                        width: `${Math.min(progress, 100)}%`,
                        backgroundColor: isCompleted ? 'var(--accent-green)' : 'var(--primary-blue)'
                      }}
                    ></div>
                  </div>
                  
                  <div style={{ 
                    fontSize: '0.75rem', 
                    color: isCompleted ? 'var(--accent-green)' : 'var(--text-secondary)', 
                    marginTop: '0.5rem',
                    textAlign: 'center',
                    fontWeight: isCompleted ? 'bold' : 'normal'
                  }}>
                    {isCompleted ? (
                      'Goal Completed!'
                    ) : (
                      `$${remaining.toFixed(2)} remaining (${progress.toFixed(1)}% complete)`
                    )}
                  </div>
                </div>

                <div className="grid grid-3 gap-4" style={{ fontSize: '0.875rem' }}>
                  <div className="text-center">
                    <div style={{ fontWeight: 'bold', color: 'var(--primary-blue)' }}>
                      ${goal.targetAmount.toFixed(2)}
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>Target</div>
                  </div>
                  <div className="text-center">
                    <div style={{ fontWeight: 'bold', color: 'var(--accent-green)' }}>
                      ${goal.currentAmount.toFixed(2)}
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>Saved</div>
                  </div>
                  <div className="text-center">
                    <div style={{ 
                      fontWeight: 'bold', 
                      color: isCompleted ? 'var(--accent-green)' : 'var(--text-secondary)' 
                    }}>
                      {isCompleted ? '100%' : `${progress.toFixed(1)}%`}
                    </div>
                    <div style={{ color: 'var(--text-secondary)' }}>Progress</div>
                  </div>
                </div>

                {goal.targetDate && (
                  <div style={{ 
                    marginTop: '1rem', 
                    padding: '0.5rem', 
                    backgroundColor: 'var(--off-white)', 
                    borderRadius: '0.25rem',
                    fontSize: '0.875rem',
                    textAlign: 'center'
                  }}>
                    Target Date: {new Date(goal.targetDate).toLocaleDateString()}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      )}

      {showModal && (
        <GoalModal 
          goal={editingGoal}
          onClose={closeModal}
        />
      )}
    </div>
  )
}

export default GoalTracker
