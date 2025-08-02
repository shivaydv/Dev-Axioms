import { Loader2 } from 'lucide-react'
import React from 'react'

const Loading = () => {
  return (
    <div className='h-full flex-1 w-full flex justify-center items-center'>
        <Loader2 className='animate-spin text-foreground/50' size={32} />
    </div>
  )
}

export default Loading