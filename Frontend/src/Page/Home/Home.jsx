import React from 'react'
import Hero from './Components/Hero'
import MissionSection from './Components/MissionSection'
import Initiatives from './Components/Initiatives'
import FeaturedStory from './Components/FeaturedStory'
import TeamSection from './Components/TeamSection'
import GetInvolved from './Components/GetInvolved'
import FAQSection from './Components/FAQSection'
import CTASection from './Components/CTASection'
import BackToTop from './Components/BackToTop'
import EventNotifyed from './Components/EventNotifyed'

const Home = () => {
  return (
    <div>
        <Hero/>
        <EventNotifyed/>
        <MissionSection/>
        <Initiatives/>
        <FeaturedStory/>
        <TeamSection/>
        <GetInvolved/>
        <FAQSection/>
        <CTASection/>
        <BackToTop/>
    </div>
  )
}

export default Home