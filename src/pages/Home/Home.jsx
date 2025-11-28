import React from 'react'
import Banner from './Banner/Banner'
import Work from './Work/Work'
import Service from './Service/Service'
import Brands from './Brands/Brands'
import Reviews from './Reviews/Reviews'
import Features from './Features/Features'
import HeroBanner from './Features/heroBanner'
//import AskFAQ from './FAQ/AskFAQ'
import FAQ from './FAQ/FAQ'

const Home = () => {
  return (
    <div>
        <Banner></Banner>
        <Work></Work>
        <Service></Service>
        <Brands></Brands>
        <Features></Features>
      <HeroBanner></HeroBanner>
        <Reviews></Reviews>
        <FAQ></FAQ>
      { /* <AskFAQ></AskFAQ> */}
    </div>
  )
}

export default Home