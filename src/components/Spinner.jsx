import React from 'react'

import { Loader2 } from 'lucide-react'

function Spinner({isText=false, width='5', height='5', text="Processing"}) {
  return (
    <div className='flex items-center justify-center'>
        <Loader2 className={`mr-2 h-${height} w-${width} animate-spin`} />
        {
          isText && text
        }
    </div>
  )
}

export default Spinner