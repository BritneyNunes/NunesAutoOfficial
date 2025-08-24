import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
import './Parts.css'
import { BrandsContext } from './BrandsContext'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function Parts() {
 const [parts, setParts] = useState([]);
 const [error, setError] = useState(""); 
 const { selectedBrand } = useContext(BrandsContext); 

  useEffect(() => {
   fetch("http://localhost:3000/parts") 
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
       setError("Data received from the server is not a valid array.");
       }
      })
       .catch(err => {
        console.error("Fetch error:", err);
      setError("Could not load parts. Please try again later.");
      });
  }, []);

 const filteredParts = selectedBrand
    ? parts.filter(part => {
      const brandName = selectedBrand.Brand || selectedBrand.name;
     return part.Brand === brandName;
     })
    : [];

  // Function to handle adding a part to the cart
  const handleAddToCart = (part) => {
    fetch("http://localhost:3000/cart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(part),
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to add item to cart.");
        }
        return res.json();
      })
      .then(data => {
        console.log("Item added to cart:", data);
        alert(`${part.Name} has been added to your cart!`);
      })
      .catch(err => {
        console.error("Error adding to cart:", err);
        alert("Could not add item to cart. Please try again.");
      });
  };

  return (
     <>   <div className='parts'>
    <NavBar />
    <Link to="/brand"><button className="back-button"><KeyboardBackspaceIcon /></button></Link>
    <div className='allProds'> 
       {filteredParts.length > 0 ? (
       filteredParts.map(part => (
       <div className='products' key={part._id}>
        <img className='prodImage' src={part.Image} alt={part.Name} />
        <p className='prodName'>{part.Name}</p>
         <p className='prodPrice'>{part.Price}</p>
          <button className="addToCartBtn" onClick={() => handleAddToCart(part)}>
            <ShoppingCartIcon />Add to Cart
           </button>
          </div>
          ))
          ) : (
            <p>No products available for this brand.</p>
          )}
      </div>
     </div>
     <Footer />
    </>
    );
}

export default Parts;