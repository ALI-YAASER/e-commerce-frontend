import 'react'
import Hero from '../component/Hero'
import LetesCollection from '../component/LetesCollection'
import BestSeller from '../component/BestSeller'
import OurPolicy from '../component/OurPolicy'
import NewsletterBox from '../component/NewsletterBox'

const Home = () => {
  return (
    <div>
      <Hero/>
      <LetesCollection/>
      <BestSeller/>
      <OurPolicy/>
      <NewsletterBox/>
    </div>
  )
}

export default Home