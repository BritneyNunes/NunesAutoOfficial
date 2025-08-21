// Parts.jsx
import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
import './Parts.css'
import { BrandsContext } from './BrandsContext'

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

  return (
    <>
      <div className='parts'>
        <NavBar />
        {/* Added a class name to the button for styling */}
        <Link to="/brand"><button className="back-button">Back</button></Link>
        {error && <p className="error">{error}</p>}
        <div className='allProds'>
          {filteredParts.length > 0 ? (
            filteredParts.map(part => (
              <div className='products' key={part._id}>
                <img className='prodImage' src={part.Image} alt={part.Name} />
                <p className='prodName'>{part.Name}</p>
                <p className='prodPrice'>{part.Price}</p>
                <p className='prodDesc'>{part.Description}</p>
              </div>
            ))
          ) : (
            <p className="no-parts-message">
              {selectedBrand ? `No parts found for ${selectedBrand.name}.` : "Please select a brand from the Brands page."}
            </p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Parts;
