import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useNavigate } from 'react-router-dom'
import 'swiper/less'
import 'swiper/less/navigation'
import 'swiper/less/pagination'
import NavBar from './NavBar'
import Footer from './Footer'
import Parts from './Parts'
import './Brands.css'

function Brand() {
  const [brands, setBrands] = useState([])
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:3000/brands")
    .then(res => res.json())
    .then(data => setBrands(data))
  }, [])

  return (
    <>
    <div className='brands'>
     <NavBar />
    <h1 className='brandsHeading'>Brands</h1>
    
    <Swiper className='allImages'
      spaceBetween={105}
      slidesPerView={3}
      onSlideChange={() => console.log('slide change')}
      onSwiper={(swiper) => console.log(swiper)}

    >
      {brands.map( brand => (
        <SwiperSlide className='images' key={brand._id}>
        <Link to='/parts' element={<Parts />}><button><img className='image' src={brand.Image} /></button></Link>
        </SwiperSlide>
      
    ))}

    </Swiper>
      {/* <Link to='/parts' element={<Parts />}><button className='partsBtn'>Parts</button></Link> */}
    </div>
    <Footer />
    </>
  )
}

export default Brand
