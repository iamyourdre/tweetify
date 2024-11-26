import React, { useContext } from 'react'
import TabBar from './TabBar'
import { HomeTabContext, HomeTabProvider } from '../../contexts/HomeTabContext'
import TabFYP from './TabFYP'
import RightSide from './RightSide'

const Home = () => {
  return (
    <HomeTabProvider>
      <HomeContent />
    </HomeTabProvider>
  )
}

const HomeContent = () => {
  const { activeHomeTab } = useContext(HomeTabContext);
  return (
    <>
      <div className='grid lg:grid-cols-8'>
        <div className="lg:col-span-5 relative">
          <TabBar />
          <div className='overflow-auto px-3.5 pt-20'>
            {activeHomeTab==1 ? <TabFYP /> : 'else'}
          </div>
        </div>
        <div className="lg:col-span-3 hidden ml-2 z-50 lg:flex flex-col gap-4">
          <RightSide/>
        </div>
      </div>
    </>
  )
}

export default Home