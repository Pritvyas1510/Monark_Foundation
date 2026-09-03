import React from 'react'
import Hero from './Components/Hero'
import MissionSection from './Components/MissionSection'
import Initiatives from './Components/Initiatives'
import FeaturedStory from './Components/FeaturedStory'
import TeamSection from './Components/TeamSection'
import FAQSection from './Components/FAQSection'
import CTASection from './Components/CTASection'
import BackToTop from './Components/BackToTop'
import EventNotifyed from './Components/EventNotifyed'
import ExecutiveLeadership from '../Leadership/components/ExecutiveLeadership'
import RegisterButton from '../../components/RegisterButton'

const Home = () => {
  return (
    <div>
        <Hero/>
        <EventNotifyed/>
          <RegisterButton/>
        <MissionSection/>
        <Initiatives/>
       
        <TeamSection/>
      <ExecutiveLeadership/>
        <FAQSection/>
        
        <CTASection/>
         <FeaturedStory/>
        <BackToTop/>
    </div>
  )
}

export default Home