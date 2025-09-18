import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/less'
import 'swiper/less/navigation'
import 'swiper/less/pagination'
import NavBar from './NavBar'
import Footer from './Footer'
import './Brands.css'
import { BrandsContext } from './BrandsContext'

function Brand() {
  const { brands, setSelectedBrand } = useContext(BrandsContext);
  const navigate = useNavigate();

  return (
    <>
      <div className='brands'>
        <NavBar />
        <h1 className='brandsHeading'>Brands</h1>

        <Swiper
          className='allImages'
          spaceBetween={105}
          slidesPerView={3}
          onSlideChange={() => console.log('slide change')}
          onSwiper={(swiper) => console.log(swiper)}
        >
          {brands.map((brand) => (
            <SwiperSlide className='images' key={brand._id}>
              <Link
                to='/parts'
                // ✅ REMOVED: The `element={<Parts />}` prop is not used here and is unnecessary.
                onClick={() => setSelectedBrand(brand)} // This line correctly updates the context.
              >
                <button>
                  <img className='image' src={brand.Image} alt={brand.name} />
                </button>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <Footer />
    </>
  );
}

export default Brand;