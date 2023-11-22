import React from 'react'

import { LatestBlog } from '../../components/index'

function ListBlogs({type=null}) {

    if(type == "latest") return <LatestBlog />
    // else if(type == "popular") return <PopularBlog />
    // else return <Blogs /> 
    
}

export default ListBlogs