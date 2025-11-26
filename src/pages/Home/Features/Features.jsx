import React from 'react'
import liveTrack from '../../../assets/live-tracking.png'
import safeDelivery from '../../../assets/safe-delivery.png'

const Features = () => {
  return (
 <div className="w-11/12 mx-auto mt-7 space-y-16 py-10">

  <div className="flex items-start gap-10">
    <img src={liveTrack} alt="liveTrack" className="w-40" />

  {/* Dashed line */}
   <div className="flex items-stretch">
    <div className="border-l-2 border-dashed border-gray-400 h-40"></div>
  </div>

    <div className="max-w-xl">
      <h1 className="text-xl font-bold mb-2 text-secondary">Live Parcel Tracking</h1>
      <p className="text-gray-600">
        Stay updated in real-time with our live parcel tracking feature.
        From pick-up to delivery, monitor your shipment's journey and get
        instant status updates for complete peace of mind.
      </p>
    </div>
  </div>


  <div className="flex items-start gap-10">
    <img src={safeDelivery} alt="safeDelivry" className="w-40" />

    <div className="flex items-stretch">
    <div className="border-l-2 border-dashed border-gray-400 h-40"></div>
  </div>

    <div className="max-w-xl">
      <h1 className="text-xl font-bold mb-2 text-secondary">100% Safe Delivery</h1>
      <p className="text-gray-600">
        We ensure your parcels are handled with the utmost care and delivered securely to their destination.
        Our reliable process guarantees safe and damage-free delivery every time.
      </p>
    </div>
  </div>


  <div className="flex items-start gap-10">
    <img src={safeDelivery} alt="safeDelivery" className="w-40" />

  <div className="flex items-stretch">
    <div className="border-l-2 border-dashed border-gray-400 h-40"></div>
  </div>

    <div className="max-w-xl">
      <h1 className="text-xl font-bold mb-2 text-secondary">24/7 Call Center Support</h1>
      <p className="text-gray-600">
        Our dedicated support team is available around the clock to assist you
        with any questions, updates, or delivery concerns—anytime you need us.
      </p>
    </div>
  </div>

</div>

  )
}

export default Features