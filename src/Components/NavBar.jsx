import { useState } from 'react'; // Added this import
import { Link } from "react-router-dom";
import "./Navbar.css";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

// The NavBar component now accepts isLoggedIn and onLogout props
function NavBar({ isLoggedIn, onLogout }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = () => {
    onLogout();
    setIsDropdownOpen(false); // Close the dropdown on logout
  };

  return (
    <nav className="nav-container">
      <h3 className="nav-logo">
        <Link to="/">NunesAuto</Link>
      </h3>

      <ul className="nav-links-main">
        <li>
          <Link to="/" className="nav-link-btn home-btn">Home</Link>
        </li>
        <li>
          <Link to="/brand" className="nav-link-btn products-btn">Products</Link>
        </li>
        <li>
          <Link to="/aboutUs" className="nav-link-btn aboutus-btn">About Us</Link>
        </li>
      </ul>

      <div className="nav-links-side">
        <Link to="/cart" className="side-link"><ShoppingCartIcon /></Link>
        
        {/* Conditional rendering for the "Sign Up" link */}
        {isLoggedIn ? (
          <div className="dropdown-container">
            <div className="side-link" onClick={toggleDropdown}>
              My Account
            </div>
            {isDropdownOpen && (
              <div className="dropdown-menu">
                <Link to="/profile" className="dropdown-item" onClick={toggleDropdown}>Profile</Link>
                <Link to="/orders" className="dropdown-item" onClick={toggleDropdown}>Orders</Link>
                <button onClick={handleLogout} className="dropdown-item logout-btn">
                  Logout
                </button>
              </div>
            )}
          </div>
        ) : (
          <Link to="/signUp" className="side-link">Sign Up</Link>
        )}
      </div>

    </nav>
  );
}

export default NavBar;