import React from 'react'
import { TrendingUp, TrendingDown, Target, PiggyBank } from 'lucide-react'
import { useFinance } from '../context/FinanceContext'

function Dashboard() {
  const { state } = useFinance()

  const userTransactions = state.transactions.filter(t => t.userId === state.currentUser.id)
  const userBudgets = state.budgets.filter(b => b.userId === state.currentUser.id)
  const userGoals = state.goals.filter(g => g.userId === state.currentUser.id)

  const totalIncome = userTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = userTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const balance = totalIncome - totalExpenses

  const totalBudget = userBudgets.reduce((sum, b) => sum + b.amount, 0)
  const totalGoals = userGoals.reduce((sum, g) => sum + g.targetAmount, 0)
  const totalGoalProgress = userGoals.reduce((sum, g) => sum + g.currentAmount, 0)

  const recentTransactions = userTransactions.slice(0, 5)

  return (
    <div>
      <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
        Dashboard
      </h2>

      <div className="grid grid-4 mb-6">
        <div className="card stat-card" style={{ backgroundColor: 'var(--primary-blue)', color: 'var(--white)' }}>
          <div className="stat-value">${balance.toFixed(2)}</div>
          <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Current Balance</div>
        </div>

        <div className="card stat-card" style={{ backgroundColor: 'var(--accent-green)', color: 'var(--white)' }}>
          <div className="flex-center mb-4">
            <TrendingUp size={24} />
          </div>
          <div className="stat-value">${totalIncome.toFixed(2)}</div>
          <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Total Income</div>
        </div>

        <div className="card stat-card" style={{ backgroundColor: '#ef4444', color: 'var(--white)' }}>
          <div className="flex-center mb-4">
            <TrendingDown size={24} />
          </div>
          <div className="stat-value">${totalExpenses.toFixed(2)}</div>
          <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Total Expenses</div>
        </div>

        <div className="card stat-card" style={{ backgroundColor: 'var(--dark-gray)', color: 'var(--white)' }}>
          <div className="flex-center mb-4">
            <Target size={24} />
          </div>
          <div className="stat-value">{userGoals.length}</div>
          <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>Active Goals</div>
        </div>
      </div>

      <div className="grid grid-2 gap-4">
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Recent Transactions
          </h3>
          {recentTransactions.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
              No transactions yet
            </p>
          ) : (
            <div>
              {recentTransactions.map(transaction => (
                <div key={transaction.id} className="transaction-item">
                  <div className="transaction-details">
                    <div className="transaction-title">{transaction.description}</div>
                    <div className="transaction-meta">
                      {transaction.category} • {new Date(transaction.date).toLocaleDateString()}
                    </div>
                  </div>
                  <div className={`transaction-amount ${transaction.type === 'income' ? 'amount-positive' : 'amount-negative'}`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Goal Progress
          </h3>
          {userGoals.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
              No goals set yet
            </p>
          ) : (
            <div>
              {userGoals.slice(0, 3).map(goal => {
                const progress = (goal.currentAmount / goal.targetAmount) * 100
                return (
                  <div key={goal.id} style={{ marginBottom: '1.5rem' }}>
                    <div className="flex-between mb-4">
                      <span style={{ fontWeight: '500' }}>{goal.name}</span>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        ${goal.currentAmount.toFixed(2)} / ${goal.targetAmount.toFixed(2)}
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      ></div>
                    </div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                      {progress.toFixed(1)}% complete
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-2 gap-4 mt-4">
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Budget Overview
          </h3>
          {userBudgets.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
              No budgets created yet
            </p>
          ) : (
            <div>
              {userBudgets.slice(0, 3).map(budget => {
                const spent = userTransactions
                  .filter(t => t.type === 'expense' && t.category === budget.category)
                  .reduce((sum, t) => sum + t.amount, 0)
                const progress = (spent / budget.amount) * 100
                
                return (
                  <div key={budget.id} style={{ marginBottom: '1.5rem' }}>
                    <div className="flex-between mb-4">
                      <span style={{ fontWeight: '500' }}>{budget.category}</span>
                      <span style={{ 
                        fontSize: '0.875rem', 
                        color: progress > 100 ? '#ef4444' : 'var(--text-secondary)' 
                      }}>
                        ${spent.toFixed(2)} / ${budget.amount.toFixed(2)}
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: `${Math.min(progress, 100)}%`,
                          backgroundColor: progress > 100 ? '#ef4444' : 'var(--accent-green)'
                        }}
                      ></div>
                    </div>
                    <div style={{ 
                      fontSize: '0.75rem', 
                      color: progress > 100 ? '#ef4444' : 'var(--text-secondary)', 
                      marginTop: '0.25rem' 
                    }}>
                      {progress.toFixed(1)}% used
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Quick Stats
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="flex-between">
              <span>Total Budgets</span>
              <span style={{ fontWeight: 'bold' }}>${totalBudget.toFixed(2)}</span>
            </div>
            <div className="flex-between">
              <span>Goal Targets</span>
              <span style={{ fontWeight: 'bold' }}>${totalGoals.toFixed(2)}</span>
            </div>
            <div className="flex-between">
              <span>Goal Progress</span>
              <span style={{ fontWeight: 'bold', color: 'var(--accent-green)' }}>
                ${totalGoalProgress.toFixed(2)}
              </span>
            </div>
            <div className="flex-between">
              <span>Transactions</span>
              <span style={{ fontWeight: 'bold' }}>{userTransactions.length}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
