import React from 'react';
import './registration.css';

const Registration = () => {
  return (
    <>
    <nav className="navbar1">
        <img src="images/bms_logo.png" alt="BMS Logo" className="logo" />
        <button className="btn-group_item1">Logout</button>
      </nav>
    <div className="navbar-container">
      <nav className="navbar">
        <div className="btn-group">
          <button className="btn-group_item">Approved</button>
          <button className="btn-group_item">Denied</button>
          <button className="btn-group_item">Yet to Approve</button>
        </div>
      </nav>
    </div>
    </>
  );
};

export default Registration;
