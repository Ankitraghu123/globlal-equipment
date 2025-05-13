import React from 'react'
import HeroSlider from './HeroSlider '
import BoxPage from './BoxPage '
import BoxPage2 from './BoxPage2'
import TestimonialSlider from './TestimonialSlider'
import ProductGallery from './ProductGallery'

const Home = () => {
  return (
    <div>
        <HeroSlider/>
        <BoxPage/>
        <BoxPage2/>
        {/* <TestimonialSlider/> */}
        <ProductGallery/>
    </div>
  )
}

export default Home