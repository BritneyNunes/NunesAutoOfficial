import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './LogIn.css'
import { getBaseUrl } from "../Utilities/getBaseUrl";

const baseUrl = getBaseUrl();  // Get the base URL (which includes IP from the query string or defaults)
    console.log(`Base URL used for fetching brands: ${baseUrl}`);

// Accept the new prop from App.jsx
function LogIn({ onLoginSuccess }) { 
  const [data, setData] = useState({});
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Removed the useEffect hook that checked for a user in localStorage
  // The App.jsx state will now handle whether the user is logged in

  const handleLogin = async (e) => {
  e.preventDefault();
  setError("");

  try {
    let response = await fetch(`${baseUrl}/checkpassword`, {
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
      try {
        const token = btoa(`${data.Email}:${data.Password}`); // create the basic auth token
        localStorage.setItem("user", JSON.stringify({ basicAuthToken: token }));

        // fetch full user profile from backend
        const profileResponse = await fetch(`${baseUrl}/users/profile`, {
          method: "GET",
          headers: { "Authorization": `Basic ${token}` },
        });

        if (!profileResponse.ok) throw new Error("Failed to fetch user profile");

        const fullUserData = await profileResponse.json();

        // Merge profile data into localStorage (includes CustomerID)
        localStorage.setItem("user", JSON.stringify({
          basicAuthToken: token,
          ...fullUserData
        }));

        onLoginSuccess();
        navigate("/");

      } catch (error) {
        console.error("Error fetching full profile:", error);
        setError("Login succeeded, but failed to fetch full profile.");
      }
    }

  } catch (error) {
    console.error("Login error:", error);
    setError(error.message || "An error occurred during login.");
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