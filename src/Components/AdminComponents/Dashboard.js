import React, { memo } from "react";
import "./css/dashboard.css";
const Dashboard = () => {
  return (
    <>
      <div className="dashboard">
        <h2>Welcome to the Dashboard</h2>
        <div className="stats-container">
          <div className="stat-card">
            {/* <img src="https://example.com/users-icon.png" alt="Users Icon" /> */}
            <h3>Total Users</h3>
            <p>500</p>
          </div>
          <div className="stat-card">
            {/* <img src="https://example.com/sales-icon.png" alt="Sales Icon" /> */}
            <h3>Total Sales</h3>
            <p>1000</p>
          </div>
          <div className="stat-card">
            {/* <img src="https://example.com/revenue-icon.png" alt="Revenue Icon" /> */}
            <h3>Total Revenue</h3>
            <p>$10,000</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Dashboard);
