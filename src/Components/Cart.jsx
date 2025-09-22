import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom';
// import { useApi } from "./ApiContext";
// import { useIp } from "./IpContext";
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import DeleteIcon from '@mui/icons-material/Delete';
import "./Cart.css"

// Define delivery options outside the component
const deliveryOptions = [
  { id: 'standard', name: 'Standard Delivery', description: '3-5 business days', price: 50.00 },
  { id: 'express', name: 'Express Delivery', description: '1-2 business days', price: 150.00 },
  { id: 'priority', name: 'Priority Delivery', description: '3-5 hours', price: 250.00 },
];

function Cart() {
  // const { apiUrl } = useApi();      
  // const { ip } = useIp();           
  const [cartItems, setCartItems] = useState([]);
  const [message, setMessage] = useState('');
  const [selectedDelivery, setSelectedDelivery] = useState(deliveryOptions[0]); 
  const navigate = useNavigate();

  // Use IP query string if provided, else ApiContext
  const baseUrl = ip ? `http://${ip}:3000` : apiUrl;

  // Fetch cart items from backend
  const fetchCart = async () => {
      const baseUrl = getBaseUrl();
      
         if(apiUrl){
             let url = baseUrl
           } else {
             url = apiUrl
           }

    try {
      const response = await fetch(`${baseUrl}/cart`);
      if (!response.ok) throw new Error("Failed to fetch cart");
      const data = await response.json();
      const itemsWithQuantity = Array.isArray(data) ? data.map(item => ({ ...item, quantity: 1 })) : [];
      setCartItems(itemsWithQuantity);
    } catch (error) {
      console.error("Error fetching cart:", error);
      setMessage("Failed to load cart. Please ensure your backend is running.");
      setCartItems([]);
    }
  };

  useEffect(() => {
    fetchCart();
  }, [baseUrl]); // re-fetch if baseUrl changes

  const handleIncreaseQuantity = (itemId) => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item._id === itemId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (itemId) => {
    setCartItems(currentItems =>
      currentItems.map(item =>
        item._id === itemId && item.quantity > 1 ? { ...item, quantity: item.quantity - 1 } : item
      )
    );
  };

  const handleRemoveItem = async (itemId) => {
    try {
      const response = await fetch(`${baseUrl}/cart/${itemId}`, { method: 'DELETE' });
      if (!response.ok) throw new Error("Failed to remove item from cart.");
      setCartItems(currentItems => currentItems.filter(item => item._id !== itemId));
      setMessage("Item removed from cart successfully.");
    } catch (error) {
      console.error("Error removing item:", error);
      setMessage("Could not remove item. Please try again.");
    }
  };

  const handleDeliveryChange = (option) => setSelectedDelivery(option);

  const subtotal = cartItems.reduce((acc, item) => {
    const price = Number(item.Price.replace(/[^0-9.-]+/g, "")) || 0;
    return acc + (price * item.quantity);
  }, 0);

  const total = subtotal + (selectedDelivery?.price || 0);

  const handleProceedToCheckout = async (e) => {
    const orderData = {
      products: cartItems,
      deliveryOption: selectedDelivery,
      subtotal,
      total,
      datePlaced: new Date().toISOString(),
    };

    try {
      const response = await fetch(`${baseUrl}/orders`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });
      if (!response.ok) throw new Error("Failed to post order data.");
      setMessage("Order data posted successfully! Redirecting...");
    } catch (error) {
      e.preventDefault();
      console.error("Error posting order data:", error);
      setMessage("Failed to proceed to checkout. Please try again.");
    }
  };

  return (
    <div className="cart">
      <div className="cart-container">
        <Link to="/brand" className="back-button">
          <KeyboardBackspaceIcon />
        </Link>
        <h2>Your Cart</h2>
        {message && <p className="message">{message}</p>}

        {cartItems.length === 0 ? (
          <div className="no-items-in-cart">
            <p>No items in cart.</p>
            <Link to="/parts" className="continue-shopping-button">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <ul>
              {cartItems.map(item => {
                const itemSubtotal = (Number(item.Price.replace(/[^0-9.-]+/g, "")) || 0) * item.quantity;
                return (
                  <li key={item._id} className="cart-item">
                    <img src={item.Image} alt={item.Name} />
                    <div className="item-details">
                      <h3>{item.Name}</h3>
                      <p>{item.Price}</p>
                      <p>Subtotal: R{itemSubtotal.toLocaleString()}</p>
                    </div>
                    <div className="quantity-and-buttons">
                      <div className="quantity-controls">
                        <button onClick={() => handleDecreaseQuantity(item._id)} className="quantity-btn"><RemoveIcon /></button>
                        <span className="quantity-display">{item.quantity}</span>
                        <button onClick={() => handleIncreaseQuantity(item._id)} className="quantity-btn"><AddIcon /></button>
                      </div>
                      <button onClick={() => handleRemoveItem(item._id)} className="delete-btn"><DeleteIcon /></button>
                    </div>
                  </li>
                );
              })}
            </ul>

            <h2 className="delivery-title">Delivery Options</h2>
            <table className="delivery-table">
              <thead>
                <tr>
                  <th>Select</th>
                  <th>Option</th>
                  <th>Description</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {deliveryOptions.map(option => (
                  <tr key={option.id} className={selectedDelivery.id === option.id ? 'selected-delivery-row' : ''}>
                    <td>
                      <input type="radio" id={option.id} name="deliveryOption"
                        checked={selectedDelivery.id === option.id}
                        onChange={() => handleDeliveryChange(option)}
                      />
                    </td>
                    <td className="delivery-option-name">{option.name}</td>
                    <td>{option.description}</td>
                    <td>R{option.price.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-summary-buttons">
              <p className="subtotal-display">Subtotal: R{subtotal.toLocaleString()}</p>
              <p className="delivery-display">Delivery: R{selectedDelivery.price.toLocaleString()}</p>
              <p className="total-display">Total: R{total.toLocaleString()}</p>
              <Link to="/checkout" className="proceed-to-checkout-button" onClick={handleProceedToCheckout}>
                Proceed to Checkout
              </Link>
              <Link to="/brands" className="continue-shopping-button">Continue Shopping</Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Cart;
