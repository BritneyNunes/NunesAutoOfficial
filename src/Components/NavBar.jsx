import { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import { User, ShoppingCart, LogOut } from 'lucide-react';

function NavBar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user info exists in localStorage
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    setIsLoggedIn(false);
    setIsDropdownOpen(false);
    navigate("/signUp"); // Redirect to signup after logout
  };

  const handleUserClick = () => {
    if (!isLoggedIn) {
      navigate("/signUp"); // If not logged in, go to sign up
    } else {
      toggleDropdown();
    }
  };

  return (
    <nav className="nav-container">
      <h3 className="nav-logo">
        <Link to="/">NunesAuto</Link>
      </h3>

      <ul className="nav-links-main">
        <li><Link to="/" className="nav-link-btn home-btn">Home</Link></li>
        <li><Link to="/brand" className="nav-link-btn products-btn">Products</Link></li>
        <li><Link to="/aboutUs" className="nav-link-btn aboutus-btn">About Us</Link></li>
      </ul>

      <div className="nav-links-side">
        <Link to="/cart" className="side-link"><ShoppingCart /></Link>

        {/* User icon + dropdown */}
        <div className="dropdown-container">
          <div className="side-link user-icon-trigger" onClick={handleUserClick}>
            <User />
          </div>

          {isLoggedIn && isDropdownOpen && (
            <div className="dropdown-menu">
              <Link to="/profile" className="dropdown-item" onClick={toggleDropdown}>Profile</Link>
              <Link to="/orders" className="dropdown-item" onClick={toggleDropdown}>Orders</Link>
              <button onClick={handleLogout} className="dropdown-item logout-btn">Log Out<span className='log-out-icon'><LogOut /></span></button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
