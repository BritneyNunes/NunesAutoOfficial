import { useState, useEffect } from 'react'
import { Link } from "react-router-dom"
import LogIn from "./LogIn"
import Brand from './Brands'
import Home from './Home'
import { useNavigate } from 'react-router-dom'
import './SignUp.css'
import { getBaseUrl } from "../Utilities/getBaseUrl"; 

const baseUrl = getBaseUrl();
console.log(`Base URL used for fetching brands: ${baseUrl}`);

function SignUp({ onSignUpSuccess }) {
  const [data, setData] = useState({});
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
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
      let response = await fetch(`${baseUrl}/users`, {
        method: "post",

        // ❗ FIX: Send the fields directly, NOT { data }
        body: JSON.stringify(data),

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

      // ❗ FIX: Store exactly what comes from backend
      if (responseData && responseData.user) {
        alert("Welcome To The Nunes Auto Family");

        localStorage.setItem("user", JSON.stringify({
          _id: responseData.user._id,
          Email: responseData.user.Email,
          NameAndSurname: responseData.user.NameAndSurname,
          Gender: responseData.user.Gender,
          UserNumber: responseData.user.UserNumber,
          CustomerID: responseData.user.CustomerID  // <-- this was missing
        }));

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
          <input className='form-input' type='text' placeholder="John Doe"
            onChange={(e) => setData({ ...data, NameAndSurname: e.target.value })} required />

          <label className='form-label'>Email:</label>
          <input className='form-input' type='email' placeholder="johndoe@gmail.com"
            onChange={(e) => setData({ ...data, Email: e.target.value })} required />

          <label className='form-label'>Password:</label>
          <input className='form-input' type='password' placeholder='johnisawesome5'
            onChange={(e) => setData({ ...data, Password: e.target.value })} required />

          <label className='form-label'>Phone Number:</label>
          <input className='form-input' type='tel' placeholder="081 234 5678"
            onChange={(e) => setData({ ...data, UserNumber: e.target.value })} required />

          <label className='form-label'>Gender</label>
          <div className='gender-options'>
            <label className='gender-label' htmlFor="male">Male</label>
            <input type='radio' value='Male' name='gender' id='male'
              checked={data.Gender === 'Male'}
              onChange={(e) => setData({ ...data, Gender: e.target.value })} required />

            <label className='gender-label' htmlFor="female">Female</label>
            <input type='radio' value='Female' name='gender' id='female'
              checked={data.Gender === 'Female'}
              onChange={(e) => setData({ ...data, Gender: e.target.value })} required />
          </div>

          <button type="submit" className='button'>Sign Up</button>
          <hr className='form-divider' />

          <p className="login-text">Already have an account?</p>
          <Link to="/login" className="login-link">Log In</Link>
        </form>
      </div>

      <Link to="/brand" className='browse-btn'>
        <button>Browse products</button>
      </Link>
    </div>
  )
}

export default SignUp;
