import { useState, useEffect, useContext } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import NavBar from './NavBar';
import Footer from './Footer';
import './Parts.css';
import { BrandsContext } from './BrandsContext';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CircularProgress from '@mui/material/CircularProgress';
// const apiUrl = import.meta.env.VITE_API_URL;
import { getBaseUrl } from "../Utilities/getBaseUrl"; // Import utility for base URL

function Parts() {
  const [parts, setParts] = useState([]);
  const [error, setError] = useState(""); 
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const { selectedBrand } = useContext(BrandsContext); 
  parts.forEach(p => console.log(p.Name, p.Price));

  const elasticIP = import.meta.env.IP || "http://98.91.62.10:3000" 

  const baseUrl = getBaseUrl();  // Get the base URL (which includes IP from the query string or defaults)
  console.log(`Base URL used for fetching parts: ${elasticIP}`);
  console.log()

  useEffect(() => {
    if (!selectedBrand) {
      setError("No brand selected.");
      return;
    }

    
    // Fetch parts for the selected brand
    fetch(`${elasticIP}/parts?brandId=${selectedBrand.Brand}`)
      .then(res => {
        if (!res.ok) {
          throw new Error(`Failed to fetch parts. Server responded with: ${res.status}`);
        }
        return res.json();
      })
      .then(data => {
        if (Array.isArray(data)) {
          setParts(data);
        } else {
          setError("No parts found for the selected brand.");
        }
      })
      .catch(err => {
        setError("Failed to load parts.");
        console.error("Fetch error:", err);
      });
  }, [selectedBrand]); // Re-fetch if selectedBrand changes

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const handleAddToCart = (part) => {
    console.log("User from localStorage:", storedUser);

    if (!storedUser || !storedUser.CustomerID) {
      setMessage("Please log in to view your cart.");
      alert("Please log in to view your cart.");
      navigate("/login")
      // console.warn("No user or CustomerID found in localStorage");
      return;
    }

    fetch(`${elasticIP}/cart`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        CustomerID: storedUser.CustomerID,
        item: part,
      }),
      
    })
    .then(res => {
      if (!res.ok) {
        return res.json().then(err => { throw new Error(err.error || "Failed to add item"); });
      }
      return res.json();
    })
    
    .then(data => {
      console.log("Item added to cart:", data);
      alert(`${part.Name} has been added to your cart!`);
    })
    .catch(err => {
      console.log(storedUser, "storedUser")
      // console.error("Error adding to cart:", err);
      alert(err);
      });
      
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <>
        <NavBar />
      <div className='parts'>
        <Link to="/brand">
          <button className="back-button"><KeyboardBackspaceIcon /></button>
        </Link>
        
        <div className='allProds'>
          {parts.length > 0 ? (
            parts.map(part => (
              <div className='products' key={part._id}>
                <Link to={`/part/${part._id}`} className="product-link">
                  {/* Product Image */}
                  <img className='prodImage' src={part.Image || 'picture of product'} alt={part.Name} />
                </Link>
                <div className='product-details'>
                  <p className='prodName'>{part.Name}</p>
                  <p className='prodPrice'>{part.Price}</p>
                </div>
                <button className="addToCartBtn" onClick={() => handleAddToCart(part)}>
                  <ShoppingCartIcon /> Add to Cart
                </button>
              </div>
            ))
          ) : (
            <CircularProgress className="loader" disableShrink />
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Parts;
