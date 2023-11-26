import React from 'react'
import { MainSlider, TopAuthors, BlogsPanel, TagsPanel } from '../components/index'


function Home() {
  return (
    <>
      <MainSlider />
      <TopAuthors />
      <div className="grid grid-cols-5 gap-4">
        <div className="col-span-3 ">
          <BlogsPanel />
        </div>
        <div className="col-span-2 pr-24">
          <div className='sticky top-[115px] right-0'>
            <TagsPanel />
          </div>
        </div>
      </div>
    </>
  )
}

export default Home