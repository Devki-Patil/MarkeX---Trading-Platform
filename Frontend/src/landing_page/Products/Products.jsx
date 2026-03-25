import Hero from './Hero'
import LeftImage from './LeftImage'
import RightImage from './RightImage'

const Products = () => {
  return (
    <div>
      <Hero />
       {/* 1. LEFT IMAGE — Kite */}
      <LeftImage
        image="../../../public/kite.jpg"
        title="Kite"
        description="Our ultra-fast flagship trading platform..."
        playstore="../../../public/google-play-badge.svg"
        appstore="../../../public/appstore-badge.svg"
        demoLink="#"
        learnMoreLink="#"
      />

      {/* 2. RIGHT IMAGE — Console */}
      <RightImage
        image="../../../public/console.jpg"
        title="Console"
        description="The central dashboard for all your investments..."
        learnMoreLink="#"
      />

      {/* 3. LEFT IMAGE — Coin */}
      <LeftImage
        image="../../../public/coin.jpg"
        title="Coin"
        description="Buy direct mutual funds online, commission-free..."
        playstore="../../../public/google-play-badge.svg"
        appstore="../../../public/appstore-badge.svg"
      />

      {/* 4. RIGHT IMAGE — Kite Connect */}
      <RightImage
        image="../../../public/kiteConnect.jpg"
        title="Kite Connect API"
        description="Build your own trading applications..."
        learnMoreLink="#"
      />

      {/* 5. LEFT IMAGE — Varsity */}
      <LeftImage
        image="../../../public/varsity.jpg"
        title="Varsity mobile"
        description="An easy-to-grasp collection of stock market lessons..."
        playstore="../../../public/google-play-badge.svg"
        appstore="../../../public/appstore-badge.svg"
      />
      <h4 className='text-white mb-16 text-center'>Want to know more about our technology stack? Check out the <a href="#" className='text-blue-500'>Zerodha.tech</a>  blog.</h4>
    </div>
  )
}

export default Products
