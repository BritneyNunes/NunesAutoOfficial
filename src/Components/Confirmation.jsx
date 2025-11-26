import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import "./Confirmation.css";

function Confirmation() {
    const user = JSON.parse(localStorage.getItem("user"));
      

  return (
    <div className="thankyou-container">
      <div className="thankyou-card">
        <h1 className="thankyou-title">Thank You for Your Purchase!</h1>

        <p className="thankyou-message">
          We appreciate your trust in <span className="brand">NunesAuto</span>.
          Your order has been received and is being prepared with care.
        </p>

        {/* <p className="thankyou-blessing">
          You will receive a confirmation email <span className="email"> {user.Email}</span>
        </p> */}

        <div className="no-items-in-cart">
            <Link to="/brand" className="continue-shopping-button">
              Continue Shopping
            </Link>
            <Link to="/orders" className="view-orders-button">
              View Orders
            </Link>
          </div>
      </div>
    </div>
  );
}

export default Confirmation;
