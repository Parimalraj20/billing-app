import React, { useState } from 'react';
import '../styles/BillingForm.css';

const BillingForm = ({ onSubmit }) => {
  const [items, setItems] = useState([{ name: '', quantity: 1, price: 0 }]);
  const [customerName, setCustomerName] = useState('');

  const addItem = () => {
    setItems([...items, { name: '', quantity: 1, price: 0 }]);
  };

  const removeItem = (index) => {
    setItems(items.filter((_, i) => i !== index));
  };

  const updateItem = (index, field, value) => {
    const newItems = [...items];
    newItems[index][field] = value;
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => total + (item.quantity * item.price), 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const bill = {
      customerName,
      items,
      total: calculateTotal()
    };
    onSubmit(bill);
    setCustomerName('');
    setItems([{ name: '', quantity: 1, price: 0 }]);
  };

  const printBill = () => {
    window.print();
  };

  return (
    <div className="billing-form">
      <h2>📝 New Bill</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Customer Name</label>
          <input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
            placeholder="Enter customer name"
          />
        </div>
        
        <h3>Items</h3>
        {items.map((item, index) => (
          <div key={index} className="item-row">
            <input
              type="text"
              placeholder="Item name"
              value={item.name}
              onChange={(e) => updateItem(index, 'name', e.target.value)}
              required
            />
            <input
              type="number"
              placeholder="Qty"
              value={item.quantity}
              onChange={(e) => updateItem(index, 'quantity', parseFloat(e.target.value))}
              min="1"
              required
            />
            <input
              type="number"
              placeholder="Price"
              value={item.price}
              onChange={(e) => updateItem(index, 'price', parseFloat(e.target.value))}
              min="0"
              step="0.01"
              required
            />
            <span className="item-total">₹{(item.quantity * item.price).toFixed(2)}</span>
            {items.length > 1 && (
              <button type="button" onClick={() => removeItem(index)} className="remove-btn">❌</button>
            )}
          </div>
        ))}
        
        <button type="button" onClick={addItem} className="add-item-btn">➕ Add Item</button>
        
        <div className="total-section">
          <h3>Total: ₹{calculateTotal().toFixed(2)}</h3>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="submit-btn">💾 Save Bill</button>
          <button type="button" onClick={printBill} className="print-btn">🖨️ Print</button>
        </div>
      </form>
    </div>
  );
};

export default BillingForm;
