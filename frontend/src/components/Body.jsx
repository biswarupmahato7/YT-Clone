import React from 'react'
import Sidebar from './Sidebar'
import Feed from './Feed'


const Body = () => {
  return (
    <div>
      <div className="flex">
        <Sidebar />
        <Feed/>
      </div>
    </div>
  )
}

export default Body
