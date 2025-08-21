import { useState } from 'react'
import Home from './Components/Home'
import Brand from './Components/Brands'
import Cart from './Components/Cart'
import Checkout from './Components/Checkout'
import Location from './Components/Locaton'
import LogIn from './Components/LogIn'
import NavBar from './Components/NavBar'
import Orders from './Components/Orders'
import Parts from './Components/Parts'
import SignUp from './Components/SignUp'
import AboutUs from './Components/AboutUs'
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"


function App() {
  return(
    <Router>
      <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/brand" element={<Brand />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/location" element={<Location />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/navBar" element={<NavBar />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/parts" element={<Parts />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/aboutUs" element={<AboutUs />} />
      </Routes>
    </>
    </Router>
  )
}

export default App
