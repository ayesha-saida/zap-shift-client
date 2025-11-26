import React, { useEffect, useState } from 'react'
import { Autoplay, EffectCoverflow, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css';
import ReviewCard from './ReviewCard';
import customerTop from '../../../assets/customer-top.png'

const Reviews = () => {
const [reviews, setReviews] = useState([])

useEffect(() => {
fetch('/reviews.json').then( res => res.json()).then(data => {
  setReviews(data)
 //console.log(data)
}) 
},[])

  return (
    <div className='pt-5'>
      <div className='flex justify-center items-center pt-8'>
      <img src={customerTop} className='w-[250px]' /> 
      </div>

      <div className='text-center pt-5 mb-8'> 
      <h1 className='text-3xl text-secondary font-bold'>What our customers are sayings </h1>
      <p className='text-sm font-light'>Enhance posture, mobility, and well-being effortlessly with Posture Pro. Achieve proper alignment, reduce pain, and strengthen your body with ease!</p>
</div>

<div>
<Swiper
loop={true}
effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={3}
        coverflowEffect={{
                    rotate: 30,
                    stretch: '50%',
                    depth: 200,
                    modifier: 1,
                    scale: 0.75,
                    slideShadows: true,
       }}
          autoplay={{
                    delay: 2000,
                    disableOnInteraction: false,
                }}
        pagination={true}
        modules={[EffectCoverflow, Pagination, Autoplay]}
        className="mySwiper">


{
  reviews.map(review => ( <SwiperSlide key={review.id}>
    <ReviewCard review={review}></ReviewCard>
  </SwiperSlide>))
}

        </Swiper>
</div>
  
    </div>
  )
}

export default Reviews