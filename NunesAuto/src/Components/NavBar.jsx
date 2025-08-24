import { Link } from "react-router-dom"
import SignUp from "./SignUp"
import "./NavBar.css"
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

function NavBar() {
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
        <Link to="/signUp" element={<SignUp />} className="side-link">SignUp</Link>
      </div>
    </nav>
  )
}

export default NavBar