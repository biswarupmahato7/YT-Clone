import React from 'react'
import FilteredBtn from './FilteredBtn'
import VideoContainer from './VideoContainer'

const Feed = () => {
  return (
    <div className='ml-8 mt-16 xl:ml-3-3 md:ml-3 lg:ml-8 mr-3 overflow-x-hidden  '>
      <FilteredBtn/>
      <VideoContainer/>
    </div>
  )
}

export default Feed