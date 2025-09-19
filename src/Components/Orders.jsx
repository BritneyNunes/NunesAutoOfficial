import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import NavBar from './NavBar';
import './Orders.css';
const apiUrl = import.meta.env.VITE_API_URL;

function Order() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);


  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await fetch("http://localhost:3000/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders from the server.");
        }
        const data = await response.json();
        setOrders(data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setError("Could not load order history. Please try again later.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []); // The empty array ensures this effect runs only once when the component mounts

  if (isLoading) {
    return (
      <div className="order-container">
        <p>Loading your orders...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="order-container">
        <p className="error-message">{error}</p>
      </div>
    );
  }

  return (
    <div className="order-container">
      {/* Back button added here */}
      <Link to="/brand"  className="back-button">
        <KeyboardBackspaceIcon />
      </Link>
      <h1>Your Order History</h1>
      {orders.length === 0 ? (
        <div className="no-orders">
          <p>You have not placed any orders yet.</p>
          <Link to="/brands">Start Shopping</Link>
        </div>
      ) : (
        <div className="orders-list">
          {orders.map((order, index) => (
            <div key={index} className="order-card">
              <div className="order-header">
                <h3>Order #{order._id.substring(order._id.length - 8)}</h3>
                <p>Date: {new Date(order.datePlaced).toLocaleDateString()}</p>
              </div>
              <div className="order-body">
                <h4>Items:</h4>
                <ul className="order-items">
                  {/* The fix is here: using ?. to safely access products */}
                  {order.products?.map((item, itemIndex) => (
                    <li key={itemIndex} className="order-item">
                      <img src={item.Image} alt={item.Name} className="item-image" />
                      <div className="item-details">
                        <p className="item-name">{item.Name}</p>
                        <p>Quantity: {item.quantity}</p>
                        <p>Price: R{(Number(item.Price.replace(/[^0-9.-]+/g, "")) * item.quantity).toLocaleString()}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-summary">
                <p><strong>Subtotal:</strong> R{order.subtotal?.toLocaleString() || '0'}</p>
                <p><strong>Delivery:</strong> {order.deliveryOption?.name || 'N/A'} (R{order.deliveryOption?.price?.toLocaleString() || '0'})</p>
                <p><strong>Total:</strong> R{order.total?.toLocaleString() || '0'}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Order;