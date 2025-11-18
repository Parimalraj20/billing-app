import React, { useState, useEffect } from 'react';
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
