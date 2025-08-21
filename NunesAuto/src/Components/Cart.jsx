import { useState } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import './Cart.css'

function Cart() {
  return (
    <div className="cart">
    <NavBar />
    <div className='cart-container'>
       <div className='product'>

       </div>

       <div className='product'>

       </div>

       <table>
        <tr>
          <th>Delivery Options</th>
        </tr>

        <tr>
          <td>
            Regular (5-9 Business days)R120
          </td>
        </tr>

        <tr>
          <td>
            Delivery Go (3-5 Business days)R300
          </td>
        </tr>

        <tr>
          <td>
            Regular (3-5 hours)R550
          </td>
        </tr>
       </table>
    </div>
    <Footer />
    </div>

  )
}

export default Cart
