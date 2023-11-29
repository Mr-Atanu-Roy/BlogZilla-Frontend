import { cn } from '@/lib/utils'

import { Loader2 } from 'lucide-react'

function Spinner({isText=false, text="Processing", className='', loaderClass=''}) {
  return (
    <div className={cn('flex items-center justify-center ', className)}>
        <Loader2 className={cn('mr-2 animate-spin w-5 h-5 ', loaderClass)} />
        {
          isText && text
        }
    </div>
  )
}

export default Spinner