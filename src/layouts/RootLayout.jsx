import React from 'react'
import { Outlet } from 'react-router'
import Navbar from '../pages/Shared/NavBar/Navbar'
import Footer from '../pages/Shared/Footer/Footer'

const RootLayout = () => {
  return (   
    <div className='max-w-7xl mx-auto'>
    <Navbar></Navbar>
    <Outlet></Outlet>
    <Footer></Footer>
    </div>
  )
}

export default RootLayout