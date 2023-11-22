import React from 'react'
import parse from "html-react-parser";

import {TagsBtn} from '../../index'

export default function ContentBody({className, content='', tags=[]}) {
    
  return (
    <div className={`text-lg ${className}`}>
        {parse(content)}
        {
          tags && tags.length > 0 &&
          <div className='my-8 flex'>
              {
                tags.map((item) => (
                  <TagsBtn title={item} key={item} className='mr-2'/>
                ))
              }
          </div>
        }
    </div>
  )
}
