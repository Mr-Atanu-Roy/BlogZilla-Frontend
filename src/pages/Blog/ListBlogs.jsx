import React from 'react'

import { LatestBlog, PopularBlog, BlogsByTag } from '../../components/index'

function ListBlogs({type=null}) {

    if(type == "latest") return <LatestBlog />
    else if(type == "popular") return <PopularBlog />
    else if(type == "tags") return <BlogsByTag />
    // else return <Blogs /> 
    
}

export default ListBlogs