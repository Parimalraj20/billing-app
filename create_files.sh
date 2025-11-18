#!/bin/bash

# Create AdminDashboard component
cat > src/components/AdminDashboard.js << 'EOF'
import React, { useState, useEffect } from 'react';
import BillingForm from './BillingForm';
import SalesReport from './SalesReport';
import '../styles/Dashboard.css';

const AdminDashboard = ({ user, onLogout }) => {
  const [activeTab, setActiveTab] = useState('billing');
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const savedSales = localStorage.getItem('sales');
    if (savedSales) {
      setSales(JSON.parse(savedSales));
    }
  }, []);

  const addSale = (sale) => {
    const newSales = [...sales, { ...sale, id: Date.now(), date: new Date().toISOString() }];
    setSales(newSales);
    localStorage.setItem('sales', JSON.stringify(newSales));
  };

  const deleteSale = (id) => {
    const newSales = sales.filter(s => s.id !== id);
    setSales(newSales);
    localStorage.setItem('sales', JSON.stringify(newSales));
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🧾 Billing App - Admin</h1>
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </header>
      <nav className="tab-nav">
        <button 
          className={activeTab === 'billing' ? 'active' : ''}
          onClick={() => setActiveTab('billing')}
        >
          💰 New Bill
        </button>
        <button 
          className={activeTab === 'reports' ? 'active' : ''}
          onClick={() => setActiveTab('reports')}
        >
          📊 Reports
        </button>
      </nav>
      <main className="dashboard-content">
        {activeTab === 'billing' && <BillingForm onSubmit={addSale} />}
        {activeTab === 'reports' && <SalesReport sales={sales} onDelete={deleteSale} />}
      </main>
    </div>
  );
};

export default AdminDashboard;
EOF

# Create EmployeeDashboard component
cat > src/components/EmployeeDashboard.js << 'EOF'
import React, { useState } from 'react';
import BillingForm from './BillingForm';
import '../styles/Dashboard.css';

const EmployeeDashboard = ({ user, onLogout }) => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const savedSales = localStorage.getItem('sales') || '[]';
    setSales(JSON.parse(savedSales));
  }, []);

  const addSale = (sale) => {
    const allSales = JSON.parse(localStorage.getItem('sales') || '[]');
    const newSales = [...allSales, { ...sale, id: Date.now(), date: new Date().toISOString(), employee: user.name }];
    localStorage.setItem('sales', JSON.stringify(newSales));
    alert('Bill created successfully!');
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>🧾 Billing App - Employee</h1>
        <div className="user-info">
          <span>Welcome, {user.name}</span>
          <button onClick={onLogout} className="logout-btn">Logout</button>
        </div>
      </header>
      <main className="dashboard-content">
        <BillingForm onSubmit={addSale} />
      </main>
    </div>
  );
};

export default EmployeeDashboard;
EOF

echo "Files created successfully!"
