import React, { createContext, useContext, useReducer, useEffect } from 'react'

const FinanceContext = createContext()

const initialState = {
  transactions: [],
  budgets: [],
  goals: [],
  categories: [
    'Food & Dining',
    'Transportation',
    'Shopping',
    'Entertainment',
    'Bills & Utilities',
    'Healthcare',
    'Education',
    'Travel',
    'Income',
    'Other'
  ],
  users: [
    { id: 1, name: 'John Doe', email: 'john@college.edu' },
    { id: 2, name: 'Jane Smith', email: 'jane@college.edu' },
    { id: 3, name: 'Mike Johnson', email: 'mike@college.edu' }
  ],
  currentUser: { id: 1, name: 'John Doe', email: 'john@college.edu' }
}

function financeReducer(state, action) {
  switch (action.type) {
    case 'LOAD_DATA':
      return { ...state, ...action.payload }
    
    case 'ADD_TRANSACTION':
      const newTransaction = {
        id: Date.now(),
        ...action.payload,
        date: new Date().toISOString(),
        userId: state.currentUser.id
      }
      return {
        ...state,
        transactions: [newTransaction, ...state.transactions]
      }
    
    case 'DELETE_TRANSACTION':
      return {
        ...state,
        transactions: state.transactions.filter(t => t.id !== action.payload)
      }
    
    case 'ADD_BUDGET':
      const newBudget = {
        id: Date.now(),
        ...action.payload,
        userId: state.currentUser.id
      }
      return {
        ...state,
        budgets: [newBudget, ...state.budgets]
      }
    
    case 'UPDATE_BUDGET':
      return {
        ...state,
        budgets: state.budgets.map(budget =>
          budget.id === action.payload.id ? { ...budget, ...action.payload } : budget
        )
      }
    
    case 'DELETE_BUDGET':
      return {
        ...state,
        budgets: state.budgets.filter(b => b.id !== action.payload)
      }
    
    case 'ADD_GOAL':
      const newGoal = {
        id: Date.now(),
        ...action.payload,
        currentAmount: 0,
        userId: state.currentUser.id
      }
      return {
        ...state,
        goals: [newGoal, ...state.goals]
      }
    
    case 'UPDATE_GOAL':
      return {
        ...state,
        goals: state.goals.map(goal =>
          goal.id === action.payload.id ? { ...goal, ...action.payload } : goal
        )
      }
    
    case 'DELETE_GOAL':
      return {
        ...state,
        goals: state.goals.filter(g => g.id !== action.payload)
      }
    
    case 'SET_USER':
      return {
        ...state,
        currentUser: action.payload
      }
    
    default:
      return state
  }
}

export function FinanceProvider({ children }) {
  const [state, dispatch] = useReducer(financeReducer, initialState)

  useEffect(() => {
    const savedData = localStorage.getItem('financeData')
    if (savedData) {
      dispatch({ type: 'LOAD_DATA', payload: JSON.parse(savedData) })
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('financeData', JSON.stringify(state))
  }, [state])

  return (
    <FinanceContext.Provider value={{ state, dispatch }}>
      {children}
    </FinanceContext.Provider>
  )
}

export function useFinance() {
  const context = useContext(FinanceContext)
  if (!context) {
    throw new Error('useFinance must be used within a FinanceProvider')
  }
  return context
}
