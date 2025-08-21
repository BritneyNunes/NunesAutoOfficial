import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import NavBar from './NavBar'
import Footer from './Footer'
import './Parts.css'

function Part() {
  const [parts, setParts] = useState([]);
  const [error, setError] = useState(""); 

  function popUp(){
    
  }

  useEffect(() => {
    fetch("http://localhost:3000/parts") 
      .then(res => {
        if (!res.ok) {
          throw new Error('Failed to fetch parts. Server responded with: ', res.status);
        }
        return res.json();
      })
      .then(data => {

        if (Array.isArray(data)) {
          setParts(data);
        } else {
          // If the data is not an array, set an error message.
          setError("Data received from the server is not a valid array.");
        }
      })
      .catch(err => {
        console.error("Fetch error:", err);
        setError("Could not load parts. Please try again later.");
      });
  }, []);


  return (
    <>
      <div className='parts'>
        <NavBar />
        <div className='allProds'>
          {parts.map(part => (
            <button onClick={popUp()}>
              <div className='products' key={part._id}>
              <img className='prodImage' src={part.Image} alt={part.name} />
              <p className='prodName'>{part.name}</p>
            </div>
            </button>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Part;