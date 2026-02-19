# 💰 FinTracker – College Finance Management Application

<div align="center">

![FinTracker](https://img.shields.io/badge/FinTracker-v1.0-blue)
![React](https://img.shields.io/badge/React-18.2.0-blue)
![Vite](https://img.shields.io/badge/Vite-4.4.0-green)
![License](https://img.shields.io/badge/License-MIT-yellow)
![Status](https://img.shields.io/badge/Status-Active-success)

**A comprehensive personal finance management application built for college students**

</div>

---

## 📚 Table of Contents

- [Overview](#overview)
- [Why FinTracker?](#why-fintracker)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Component Overview](#component-overview)
- [Installation](#installation)
- [Getting Started](#getting-started)
- [Usage Guide](#usage-guide)
- [Architecture](#architecture)
- [Data Management](#data-management)
- [Styling & Theme](#styling--theme)
- [Core Functionalities](#core-functionalities)
- [Use Cases](#use-cases)
- [Future Enhancements](#future-enhancements)
- [Contributing](#contributing)
- [License](#license)

---

## 📋 Overview

**FinTracker** is a modern, user-friendly personal finance management application designed specifically for **college students**.  
It allows users to track income and expenses, manage budgets, set financial goals, and analyze spending patterns through detailed reports.

The application is built using **React** and **Vite** for fast development and optimal performance.  
All data is stored locally using the browser’s **localStorage**, ensuring privacy and offline access without any backend dependency.

---

## 🎯 Why FinTracker?

- Simple and intuitive interface  
- Complete control over personal finances  
- Visual analytics and reports  
- Light and dark theme support  
- Privacy-first (no server, no data sharing)  
- Fully responsive across devices  

---

## ✨ Features

### 🏠 Dashboard
- Current balance overview
- Total income and expenses
- Active financial goals
- Recent transactions
- Budget and goal summaries

### 💳 Transactions Management
- Add income and expense transactions
- Category-based organization
- Filter by type, category, and date range
- Delete transactions
- View detailed transaction information

### 📊 Budget Tracker
- Create budgets per category
- Weekly / Monthly / Yearly budgets
- Visual budget indicators (under / near / over limit)
- Edit and delete budgets

### 🎯 Goal Tracker
- Create financial goals
- Set target amount and target date
- Track progress visually
- Add money incrementally
- Automatic goal completion detection

### 📈 Reports & Analytics
- Monthly and yearly reports
- Income vs expense comparison
- Category-wise expense breakdown
- Spending trends over time

### 👤 User Management
- Multiple pre-configured users
- User-wise data isolation
- Easy user switching

### 🌗 Theme Support
- Light and dark modes
- Persistent theme storage
- Smooth theme transitions

---

## 🛠 Tech Stack

### Frontend
- React 18.2.0
- Vite 4.4.0
- JavaScript (ES6+)

### UI & Icons
- Lucide React (SVG icons)

### Styling
- CSS3
- CSS Variables
- Flexbox & Grid
- Responsive Design

### State Management
- React Context API
- useReducer Hook
- Custom Hooks

### Data Storage
- Browser localStorage
- JSON-based persistence

---

## 📁 Project Structure

fintracker/
├── Frontend/
│ ├── src/
│ │ ├── components/
│ │ │ ├── Header.jsx
│ │ │ ├── Dashboard.jsx
│ │ │ ├── Transactions.jsx
│ │ │ ├── TransactionModal.jsx
│ │ │ ├── BudgetTracker.jsx
│ │ │ ├── BudgetModal.jsx
│ │ │ ├── GoalTracker.jsx
│ │ │ ├── GoalModal.jsx
│ │ │ ├── Reports.jsx
│ │ │ └── ...
│ │ ├── context/
│ │ │ └── FinanceContext.jsx
│ │ ├── App.jsx
│ │ ├── main.jsx
│ │ └── index.css
│ ├── package.json
│ └── README.md



---

## 🧩 Component Overview

### App.jsx
- Main application wrapper
- Page navigation
- Theme toggle handling

### FinanceContext.jsx
- Global state management
- CRUD operations
- localStorage synchronization
- User and category handling

### Key Components
- Dashboard
- Transactions
- BudgetTracker
- GoalTracker
- Reports

---

## ⚙️ Installation


git clone https://github.com/your-username/fintracker.git
cd fintracker/Frontend
npm install


📘 Usage Guide

Select a user profile

Add income and expenses

Create budgets for categories

Set financial goals

View analytics and reports

Toggle light/dark theme

🏗 Architecture

Frontend-only architecture

Component-based design

Centralized global state

Browser-based data persistence

No backend server required


{
  transactions: [],
  budgets: [],
  goals: [],
  categories: [],
  users: [],
  currentUser: {}
}


Key Features

Automatic persistence

User-wise data isolation

Real-time UI updates

🎨 Styling & Theme

CSS variables for consistent theming

Light and dark mode support

Responsive layouts

Clean and modern UI

Color Scheme

Primary Blue: #2563eb

Accent Green: #10b981

✨ Core Functionalities
Transaction Management

Add, filter, and delete transactions

Category-based tracking

Budget Planning

Set spending limits

Visual budget indicators

Goal Tracking

Savings targets

Progress visualization

Financial Analytics

Monthly and yearly reports

Category-wise analysis

Income vs expense trends

🎯 Use Cases

Ideal for:

College students

Monthly expense tracking

Budget planning

Savings goal management

Spending analysis

🚧 Future Enhancements

Backend integration

Authentication system

Export reports (PDF / Excel)

Advanced charts (Chart.js / Recharts)

Cloud data sync
