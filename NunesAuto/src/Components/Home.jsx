import { useState } from 'react'
import NavBar from './NavBar'
import Footer from './Footer'
import "./Home.css"

function Home() {

    return (
        <div className='home'>
        <NavBar />
        <div className='text'>
        <h1 className='bigLogo'>NunesAuto</h1>
        <p className='phrase'>Moving faster, together</p>
        {/* <img className='bgImage' src="../public/Home Page background.webp"/> */}
        </div>
        <Footer />
        </div>
    )
}

export default Home
