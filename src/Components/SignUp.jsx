import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import LogIn from "./LogIn"
import Brand from './Brands'
import Home from './Home'
import { useNavigate } from 'react-router-dom'
import './SignUp.css'
import { useApi } from "./ApiContext";
import { getBaseUrl } from "../Utilities/getBaseUrl"; 

// Accept the new prop from App.jsx
function SignUp({ onSignUpSuccess }) {
   const { apiUrl } = useApi(); //Get apiURL from context 
  const [data, setData] = useState({});
  const navigate = useNavigate();
  // The user is still checked from localStorage, but the state update
  // is now handled by the prop from App.jsx
  const user = JSON.parse(localStorage.getItem("user"));

  // This is a common pattern to check for existing login status
  useEffect(() => {
    const baseUrl = getBaseUrl();
    
       if(apiUrl){
           let url = baseUrl
         } else {
           url = apiUrl
         }

    if (user) {
      navigate("/"); 
      console.log("user in local storage, redirecting to home page");
    } else {
      console.log("no user in local storage");
    }
  }, [navigate, user]); 

  const submition = async (e) => {
    e.preventDefault();
    try {
      let response = await fetch(
        `${url}/users`, {
        method: "post",
        body: JSON.stringify({ data }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (!response.ok) {
        throw new Error('Failed to sign up.');
      }

      const responseData = await response.json();
      console.log("Response frontend", responseData);
      console.log("Data frontend", data);

      if (responseData) {
        alert("Welcome To The Nunes Auto Family");
        localStorage.setItem("user", JSON.stringify(data));
        // Call the prop to update the state in App.jsx
        onSignUpSuccess();
        navigate("/");
      }
    } catch (error) {
      console.error("Signup error:", error);
    }
  }

  return (
    <div className='signUp'>
      <div className='formContainer'>
        <h3 className='heading'>Sign Up</h3>
        <hr className='form-divider' />
        <form className='form' onSubmit={submition}>
          <label className='form-label'>User Name:</label>
          <input className='form-input' type='text' placeholder="John Doe" onChange={(e) => setData({ ...data, NameAndSurname: e.target.value })} required></input>
          
          <label className='form-label'>Email:</label>
          <input className='form-input' type='email' placeholder="johndoe@gmail.com" onChange={(e) => setData({ ...data, Email: e.target.value })} required></input>
          
          <label className='form-label'>Password:</label>
          <input className='form-input' type='password' placeholder='johnisawesome5' onChange={(e) => setData({ ...data, Password: e.target.value })} required></input>
          
          <label className='form-label'>User Number:</label>
          <input className='form-input' type='tel' placeholder="081 234 5678" onChange={(e) => setData({ ...data, UserNumber: e.target.value })} required></input>
          
          <label className='form-label'>Gender</label>
          <div className='gender-options'>
            <label className='gender-label' htmlFor="male">Male</label>
            <input type='radio' value='Male' name='gender' id='male' checked={data.Gender === 'Male'} onChange={(e) => setData({ ...data, Gender: e.target.value })} required></input>
            <label className='gender-label' htmlFor="female">Female</label>
            <input type='radio' value='Female' name='gender' id='female' checked={data.Gender === 'Female'} onChange={(e) => setData({ ...data, Gender: e.target.value })} required></input>
          </div>
          
          <button type="submit" className='button'>Sign Up</button>
          <hr className='form-divider' />
          
          <p className="login-text">Already have an account?</p>
          {/* Removed the 'element' prop from Link components, as it is not needed */}
          <Link to="/login" className="login-link">Log In</Link>
        </form>
      </div>
      {/* Removed the 'element' prop from Link components, as it is not needed */}
      <Link to="/brand" className='browse-btn'>
        <button>Browse products</button>
      </Link>
    </div>
  )
}

export default SignUp;