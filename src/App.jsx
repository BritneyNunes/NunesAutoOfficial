import { useState } from 'react'; // Added useState
import { BrandsProvider } from './Components/BrandsContext';
import Home from './Components/Home';
import Brand from './Components/Brands';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import Location from './Components/Locaton';
import LogIn from './Components/LogIn';
import NavBar from './Components/NavBar';
import Orders from './Components/Orders';
import Parts from './Components/Parts';
import SignUp from './Components/SignUp';
import AboutUs from './Components/AboutUs';
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  // We'll manage the login state here
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // This function will be called by the Login and SignUp components
  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    // You should also clear tokens or cookies here
    setIsLoggedIn(false);
  };

  return (
    <BrandsProvider>
      <Router>
        <>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/brand" element={<Brand />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/location" element={<Location />} />
            
            {/* Pass the login handler to your login and signup components */}
            <Route path="/login" element={<LogIn onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/parts" element={<Parts />} />
            <Route path="/signUp" element={<SignUp onSignUpSuccess={handleLoginSuccess} />} />
            <Route path="/aboutUs" element={<AboutUs />} />
            
            {/* The Nav bar route is removed, as it's always visible now */}
          </Routes>
        </>
      </Router>
    </BrandsProvider>
  );
}

export default App;