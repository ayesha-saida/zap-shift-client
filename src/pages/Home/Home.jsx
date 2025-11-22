import React from 'react'
import Banner from './Banner/Banner'
import Work from './Work/Work'
import Service from './Service/Service'
import Brands from './Brands/Brands'
import Reviews from './Reviews/Reviews'

const Home = () => {
  return (
    <div>
        <Banner></Banner>
        <Work></Work>
        <Service></Service>
        <Brands></Brands>
        <Reviews></Reviews>
    </div>
  )
}

export default Home