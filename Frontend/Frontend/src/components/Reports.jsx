import React, { useState } from 'react'
import { BarChart3, PieChart, TrendingUp, Calendar } from 'lucide-react'
import { useFinance } from '../context/FinanceContext'

function Reports() {
  const { state } = useFinance()
  const [reportType, setReportType] = useState('monthly')
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())

  const userTransactions = state.transactions.filter(t => t.userId === state.currentUser.id)

  const getFilteredTransactions = () => {
    return userTransactions.filter(transaction => {
      const transactionDate = new Date(transaction.date)
      
      if (reportType === 'monthly') {
        return transactionDate.getFullYear() === selectedYear && 
               transactionDate.getMonth() === selectedMonth
      } else if (reportType === 'yearly') {
        return transactionDate.getFullYear() === selectedYear
      }
      
      return true
    })
  }

  const filteredTransactions = getFilteredTransactions()

  const getCategoryData = () => {
    const categoryTotals = {}
    
    filteredTransactions
      .filter(t => t.type === 'expense')
      .forEach(transaction => {
        categoryTotals[transaction.category] = (categoryTotals[transaction.category] || 0) + transaction.amount
      })

    return Object.entries(categoryTotals)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount)
  }

  const getMonthlyData = () => {
    const monthlyData = {}
    
    for (let month = 0; month < 12; month++) {
      const monthTransactions = userTransactions.filter(t => {
        const date = new Date(t.date)
        return date.getFullYear() === selectedYear && date.getMonth() === month
      })
      
      const income = monthTransactions
        .filter(t => t.type === 'income')
        .reduce((sum, t) => sum + t.amount, 0)
      
      const expenses = monthTransactions
        .filter(t => t.type === 'expense')
        .reduce((sum, t) => sum + t.amount, 0)
      
      monthlyData[month] = { income, expenses, net: income - expenses }
    }
    
    return monthlyData
  }

  const totalIncome = filteredTransactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.amount, 0)

  const totalExpenses = filteredTransactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.amount, 0)

  const netIncome = totalIncome - totalExpenses
  const categoryData = getCategoryData()
  const monthlyData = getMonthlyData()

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const currentYear = new Date().getFullYear()
  const years = Array.from({ length: 5 }, (_, i) => currentYear - i)

  return (
    <div>
      <div className="flex-between mb-6">
        <h2 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Reports & Analytics</h2>
        <div className="flex gap-4">
          <select 
            className="form-select"
            value={reportType}
            onChange={(e) => setReportType(e.target.value)}
          >
            <option value="monthly">Monthly Report</option>
            <option value="yearly">Yearly Report</option>
          </select>
          
          <select 
            className="form-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          
          {reportType === 'monthly' && (
            <select 
              className="form-select"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            >
              {months.map((month, index) => (
                <option key={index} value={index}>{month}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      <div className="grid grid-4 mb-6">
        <div className="card stat-card" style={{ backgroundColor: 'var(--accent-green)', color: 'var(--white)' }}>
          <div className="flex-center mb-4">
            <TrendingUp size={24} />
          </div>
          <div className="stat-value">${totalIncome.toFixed(2)}</div>
          <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Total Income
          </div>
        </div>

        <div className="card stat-card" style={{ backgroundColor: '#ef4444', color: 'var(--white)' }}>
          <div className="flex-center mb-4">
            <BarChart3 size={24} />
          </div>
          <div className="stat-value">${totalExpenses.toFixed(2)}</div>
          <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Total Expenses
          </div>
        </div>

        <div className="card stat-card" style={{ 
          backgroundColor: netIncome >= 0 ? 'var(--primary-blue)' : '#ef4444', 
          color: 'var(--white)' 
        }}>
          <div className="stat-value">${netIncome.toFixed(2)}</div>
          <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Net Income
          </div>
        </div>

        <div className="card stat-card" style={{ backgroundColor: 'var(--dark-gray)', color: 'var(--white)' }}>
          <div className="flex-center mb-4">
            <Calendar size={24} />
          </div>
          <div className="stat-value">{filteredTransactions.length}</div>
          <div className="stat-label" style={{ color: 'rgba(255, 255, 255, 0.8)' }}>
            Transactions
          </div>
        </div>
      </div>

      <div className="grid grid-2 gap-4 mb-6">
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            <PieChart size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
            Expenses by Category
          </h3>
          
          {categoryData.length === 0 ? (
            <p style={{ color: 'var(--text-secondary)', textAlign: 'center', padding: '2rem' }}>
              No expense data for this period
            </p>
          ) : (
            <div>
              {categoryData.map((item, index) => {
                const percentage = totalExpenses > 0 ? (item.amount / totalExpenses) * 100 : 0
                return (
                  <div key={item.category} style={{ marginBottom: '1rem' }}>
                    <div className="flex-between mb-4">
                      <span style={{ fontWeight: '500' }}>{item.category}</span>
                      <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                        ${item.amount.toFixed(2)} ({percentage.toFixed(1)}%)
                      </span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ 
                          width: `${percentage}%`,
                          backgroundColor: `hsl(${index * 45}, 70%, 50%)`
                        }}
                      ></div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </div>

        <div className="card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            Summary Statistics
          </h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div className="flex-between">
              <span>Average Transaction</span>
              <span style={{ fontWeight: 'bold' }}>
                ${filteredTransactions.length > 0 ? 
                  ((totalIncome + totalExpenses) / filteredTransactions.length).toFixed(2) : 
                  '0.00'
                }
              </span>
            </div>
            
            <div className="flex-between">
              <span>Largest Expense</span>
              <span style={{ fontWeight: 'bold', color: '#ef4444' }}>
                ${filteredTransactions
                  .filter(t => t.type === 'expense')
                  .reduce((max, t) => Math.max(max, t.amount), 0)
                  .toFixed(2)
                }
              </span>
            </div>
            
            <div className="flex-between">
              <span>Largest Income</span>
              <span style={{ fontWeight: 'bold', color: 'var(--accent-green)' }}>
                ${filteredTransactions
                  .filter(t => t.type === 'income')
                  .reduce((max, t) => Math.max(max, t.amount), 0)
                  .toFixed(2)
                }
              </span>
            </div>
            
            <div className="flex-between">
              <span>Savings Rate</span>
              <span style={{ 
                fontWeight: 'bold', 
                color: netIncome >= 0 ? 'var(--accent-green)' : '#ef4444' 
              }}>
                {totalIncome > 0 ? ((netIncome / totalIncome) * 100).toFixed(1) : '0.0'}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {reportType === 'yearly' && (
        <div className="card">
          <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>
            <BarChart3 size={20} style={{ display: 'inline', marginRight: '0.5rem' }} />
            Monthly Breakdown for {selectedYear}
          </h3>
          
          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid var(--border-color)' }}>
                  <th style={{ padding: '0.75rem', textAlign: 'left' }}>Month</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right' }}>Income</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right' }}>Expenses</th>
                  <th style={{ padding: '0.75rem', textAlign: 'right' }}>Net</th>
                </tr>
              </thead>
              <tbody>
                {months.map((month, index) => {
                  const data = monthlyData[index]
                  return (
                    <tr key={month} style={{ borderBottom: '1px solid var(--border-color)' }}>
                      <td style={{ padding: '0.75rem', fontWeight: '500' }}>{month}</td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', color: 'var(--accent-green)' }}>
                        ${data.income.toFixed(2)}
                      </td>
                      <td style={{ padding: '0.75rem', textAlign: 'right', color: '#ef4444' }}>
                        ${data.expenses.toFixed(2)}
                      </td>
                      <td style={{ 
                        padding: '0.75rem', 
                        textAlign: 'right', 
                        fontWeight: 'bold',
                        color: data.net >= 0 ? 'var(--accent-green)' : '#ef4444'
                      }}>
                        ${data.net.toFixed(2)}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}

export default Reports
