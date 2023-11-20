import React from 'react'

import { LatestBlog } from '../../components/index'

function ListBlogs({type=null}) {

    if(type == "latest") return <LatestBlog />
    // else return <LatestBlog />
    
}

export default ListBlogs