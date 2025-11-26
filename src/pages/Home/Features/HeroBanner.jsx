import React from 'react'
import locationMerchant from '../../../assets/location-merchant.png'
import merchantBg from '../../../assets/be-a-merchant-bg.png'
 
const HeroBanner = () => {
  return (
 <div className="w-full px-4">
      <div
        className="relative bg-secondary text-white rounded-xl p-10 flex items-center justify-between overflow-hidden"
        style={{
          backgroundImage: `url(${merchantBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* LEFT CONTENT */}
        <div className="w-1/2 space-y-4 z-10">
          <h1 className="text-3xl font-semibold leading-snug">
            Merchant and Customer Satisfaction <br />
            is Our First Priority
          </h1>

          <p className="text-sm opacity-90">
            We offer the lowest delivery charges with the highest value along with
            100% safety of your product. ZapShift courier delivers your parcels
            in every corner of Bangladesh right on time.
          </p>

          <div className="flex gap-4 pt-4">
            <button className="px-6 py-2 bg-primary text-black rounded-full font-medium">
              Become a Merchant
            </button>

            <button className="px-6 py-2 border border-primary text-primary bg-transparent rounded-full font-medium">
              Earn with ZapShift Courier
            </button>
          </div>
        </div>

        {/* RIGHT IMAGE */}
        <div className="w-1/2 flex justify-end z-10">
          <img src={locationMerchant} alt="merchant" className="w-[260px]" />
        </div>

        {/* Decorative vertical background grid */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="h-full w-full grid grid-cols-12 gap-0 opacity-[0.07]">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="bg-white"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeroBanner