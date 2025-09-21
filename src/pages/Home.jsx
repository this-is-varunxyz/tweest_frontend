import React, { useState, useEffect } from 'react'
import GTASixHero from '../components/GTASixHero'
import LatestCollection from '../components/LatestCollection'
import BestSeller from '../components/BestSeller'
import OurPolicy from '../components/OurPolicy'
import NewsletterBox from '../components/NewsletterBox'

const Home = () => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Show  for home page
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 2000)

    return () => clearTimeout(timer)
  }, [])

  
  return (
    <div>
      <GTASixHero />
      <LatestCollection/>
      <BestSeller/>
      <OurPolicy/>
      {/* <NewsletterBox/> */}
    </div>
  )
}

export default Home
