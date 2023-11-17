import React from 'react'
import { Link } from 'react-router-dom'

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {X} from 'lucide-react'
  

function AuthBase({title, description, content}) {
  return (
    <Card className="w-[450px] shadow-md">
        <div className="text-right mt-3.5 mr-3.5">
          <Link to="/"><X className='ml-auto'/></Link>
        </div>
        <CardHeader>
            <CardTitle>{title}</CardTitle>
            <CardDescription className="pt-1.5">{description}</CardDescription>
        </CardHeader>
        <CardContent>
            {content}
        </CardContent>
    </Card>
  )
}

export default AuthBase