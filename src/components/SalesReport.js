import React from 'react';
import '../styles/SalesReport.css';

const SalesReport = ({ sales, onDelete }) => {
  const totalRevenue = sales.reduce((sum, sale) => sum + sale.total, 0);
  const totalItems = sales.reduce((sum, sale) => sum + sale.items.length, 0);

  const exportToCSV = () => {
    const headers = ['Date', 'Customer', 'Items', 'Total'];
    const rows = sales.map(sale => [
      new Date(sale.date).toLocaleString(),
      sale.customerName,
      sale.items.map(i => `${i.name} (${i.quantity})`).join('; '),
      sale.total.toFixed(2)
    ]);
    
    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sales-report.csv';
    a.click();
  };

  return (
    <div className="sales-report">
      <div className="report-header">
        <h2>📊 Sales Report</h2>
        <button onClick={exportToCSV} className="export-btn">📄 Export CSV</button>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <h3>💰 Total Revenue</h3>
          <p className="stat-value">₹{totalRevenue.toFixed(2)}</p>
        </div>
        <div className="stat-card">
          <h3>🧾 Total Bills</h3>
          <p className="stat-value">{sales.length}</p>
        </div>
        <div className="stat-card">
          <h3>📦 Total Items Sold</h3>
          <p className="stat-value">{totalItems}</p>
        </div>
      </div>

      <div className="sales-table">
        <h3>Recent Sales</h3>
        {sales.length === 0 ? (
          <p className="no-data">No sales data available</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id}>
                  <td>{new Date(sale.date).toLocaleDateString()}</td>
                  <td>{sale.customerName}</td>
                  <td>
                    {sale.items.map((item, i) => (
                      <div key={i}>{item.name} ({item.quantity}x)</div>
                    ))}
                  </td>
                  <td>₹{sale.total.toFixed(2)}</td>
                  <td>
                    <button onClick={() => onDelete(sale.id)} className="delete-btn">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default SalesReport;
