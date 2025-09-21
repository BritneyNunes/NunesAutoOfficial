import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './LogIn.css'
import { useApi } from "./ApiContext";
import { getBaseUrl } from "../Utilities/getBaseUrl";

// Accept the new prop from App.jsx
function LogIn({ onLoginSuccess }) {
   const { apiUrl } = useApi(); //Get apiURL from context 
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Removed the useEffect hook that checked for a user in localStorage
  // The App.jsx state will now handle whether the user is logged in

  const handleLogin = async (e) => {
       const baseUrl = getBaseUrl();
    
    e.preventDefault();
    setError("");

    try {
      let response = await fetch(`${url}/checkpassword`, {
        method: "GET",
        headers: {
          Authorization: `Basic ${btoa(`${data.Email}:${data.Password}`)}`,
        },
      });

      if (!response.ok) {
        throw new Error("Invalid username or password");
      }
      
      const responseData = await response.json();
      console.log("Frontend Response", responseData);
      console.log("Frontend Data", data);

      if (responseData) {
        // Store user data in localStorage and then call the prop
        localStorage.setItem("user", JSON.stringify(data));
        onLoginSuccess(); // This updates the state in App.jsx
        navigate("/");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("Error signing in, please try again.");
    }
  };

  return (
    <div className='logIn'>
      <div className='LGformContainer'>
        <h3 className='LGheading'>Log In</h3>
        <hr className='LGform-divider'/>
        <form className='LGform' onSubmit={handleLogin}>
          {error && <div className="error-message">{error}</div>}
          <label className='LGlabel'>Email:</label>
          <input className='LGinput' type='email' placeholder="johndoe@gmail.com" onChange={(e) => setData({ ...data, Email: e.target.value })} required></input>
          <label className='LGlabel'>Password:</label>
          <input className='LGinput' type='password' placeholder='johnisawesome5' onChange={(e) => setData({ ...data, Password: e.target.value })} required></input>
          <button type="submit" className='LGbutton'>Log In</button>
          <hr className='LGform-divider'></hr>
          <div className="LGlinkSection">
            <p>Don't have an account?</p>
            {/* The "element" prop is not used here and has been removed */}
            <Link to="/signUp">Sign Up</Link>
          </div>
        </form>
        {/* The "element" prop is not used here and has been removed */}
        <Link to="/brand" className='LGbrowse-btn'>
          <button>Browse products</button>
        </Link>
      </div>
    </div>
  );
}

export default LogIn;