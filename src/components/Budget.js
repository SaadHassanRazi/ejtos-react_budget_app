import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const Budget = () => {
  const { budget, expenses, currency, dispatch } = useContext(AppContext);
  const [newBudget, setNewBudget] = useState(budget);

  const handleBudgetChange = (event) => {
    const updatedBudget = parseInt(event.target.value);
    const totalSpent = expenses.reduce((total, item) => total + item.cost, 0);

    if (updatedBudget < totalSpent) {
      alert("Budget cannot be lower than the spending already allocated: " + currency + totalSpent);
      setNewBudget(budget); // Reset to the previous budget
      return;
    }

    if (updatedBudget > 20000) {
      alert("Budget value increased the limit");
      setNewBudget(budget); // Reset to the previous budget
      return;
    }

    dispatch({ type: 'SET_BUDGET', payload: updatedBudget });
    setNewBudget(updatedBudget);
  };

  const handleCurrencyChange = (event) => {
    dispatch({ type: 'CHG_CURRENCY', payload: event.target.value });
  };

  return (
    <div className="alert alert-secondary">
      <div>
        <label htmlFor="currencySelect" style={{ marginRight: "10px" }}>Currency:</label>
        <select
          id="currencySelect"
          value={currency}
          onChange={handleCurrencyChange}
          style={{
            padding: "5px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            marginBottom: "10px"
          }}
        >
          <option value="£">£ Pound</option>
          <option value="$">$ Dollar</option>
          <option value="€">€ Euro</option>
          <option value="₹">₹ Rupee</option>
        </select>
      </div>
      <span>Budget: {currency}{newBudget}</span>
      <input
        type="number"
        step="10"
        value={newBudget}
        onChange={handleBudgetChange}
        style={{ marginLeft: "10px", padding: "5px", borderRadius: "5px", border: "1px solid #ccc" }}
      ></input>
    </div>
  );
};

export default Budget;
