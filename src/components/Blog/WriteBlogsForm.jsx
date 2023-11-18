import {useEffect, useState} from 'react'
import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from '@/components/ui/use-toast'

import { TextEditor } from '../index'

import { X, MoveRight, Save, Subtitles, Tags, FileText, FileImage } from "lucide-react"

function WriteBlogsForm() {

  const {toast} = useToast()
  const [loading, setLoading] = useState(false)

  const { register, watch, handleSubmit, control, setValue, getValues } = useForm({
    defaultValues: {
      tags: [],
      publish: true,
    },
  });

  //watch the tags
  const watchTags = watch('tags')

  const handelError = (errors) => {
    console.log(getValues())
    if(errors.title?.type == "required") toast({ variant: "destructive", title: 'Title is required',})
    if(errors.title?.type == "minLength" || errors.title?.type == "maxLength") toast({ variant: "destructive", title: 'Title should be between 8 to 45 characters',})
    
    if(errors.picture?.type == "required") toast({ variant: "destructive", title: 'Picture is required',})
    
    if(errors.content?.type == "required") toast({ variant: "destructive", title: 'Post Content is required',})
    if(errors.content?.type == "minLength") toast({ variant: "destructive", title: 'Post Content must be more that 1500 characters',})

  }

  const publishPost = async(data) => {
    console.log(data)
  } 

  const saveAsDraft = async(data) => {
    data = {...data, publish: false}
  }


  //func to handel tag adding
  const addTag = (tag) => {
    const currentTags = getValues('tags') || [];
    const newTags = [...currentTags, tag.toLowerCase()];
    setValue('tags', newTags);
  };

  //func to handel tag removing
  const removeTag = (index) => {
    const currentTags = getValues('tags') || [];
    const newTags = currentTags.filter((_, i) => i !== index);
    setValue('tags', newTags);
  };

  return (
    <form onSubmit={handleSubmit(publishPost, handelError)}>

      <div className="grid grid-cols-2 gap-5 mb-10">
          <div className='mx-auto'>
            <div>
              <Label htmlFor="title" className="flex items-center"><Subtitles className="w-4 h-4 mr-1" /> Post Title: </Label>
              <Input type="text" placeholder="Give a post title" className="w-[350px]"
                {...register("title", {required: true, minLength: 8, maxLength: 45, pattern: /^[a-zA-Z0-9\s]+$/})}
              />
            </div>
            <div className='mt-5'>
              <Label htmlFor="tags" className="flex items-center"><Tags className="w-4 h-4 mr-1" /> Tags: </Label>
              <Input type="text" placeholder="Add tags to post" className="w-[350px]" 
                onKeyPress={(event) => {
                  if (event.key === 'Enter') {
                    event.preventDefault()
                    addTag(event.target.value)
                    event.target.value = ''
                  }
                }}
              />
            </div>
          </div>
          <div className='mx-auto'>
            <div>
              <Label htmlFor="picture" className="flex items-center"><FileImage className="w-4 h-4 mr-1" /> Picture: </Label>
              <Input type="file" id="picture" className="w-[350px] cursor-pointer"
                {...register("picture", {required: true})}
              />
            </div>
            <div className='mt-6'>
              <Label className="flex items-center"><Tags className="w-4 h-4 mr-1" /> Tags Added: </Label>
              
              <div className='flex flex-wrap mt-2.5 w-[350px]'>
                {
                  watchTags.length > 0 ? watchTags.map((tag, index) => (
                    <div key={index+tag} className='text-sm m-1 items-center justify-center font-medium flex w-fit bg-green-400 rounded-full px-3 py-1.5'>
                      <span>{tag}</span> 
                      <span><X className='w-4 h-4 ml-1 cursor-pointer' onClick={() => removeTag(index)}/></span>
                    </div>
                  )) : (<p className='text-gray-400 text-sm'>No tags added yet</p>)
                }
              </div>
            </div>
            <div>

            </div>
          </div>
      </div>

      <div>
        <div className='mb-2.5 px-1.5 flex items-center justify-between'>
            <Label htmlFor="title" className="flex items-center"><FileText className="w-4 h-4 mr-1" /> Write Your Post: </Label>
        </div>
        <TextEditor name="content" height="620px" width="880px" control={control} required={true} defaultValue='' />
      </div>

      <div className='flex items-center justify-evenly w-full mt-10'>
          <Button onClick={saveAsDraft} className={`w-5/12 ${loading ? 'cursor-not-allowed' : null}`} disabled={loading}>
              {
                loading ? <><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg> Processing</> : <>Save As Draft <Save className="ml-1.5 h-5 w-5" /></>
              }
          </Button>
          <Button type="submit" className={`w-5/12 ${loading ? 'cursor-not-allowed' : null}`} disabled={loading}>
              {
                loading ? <><svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg> Processing</> : <>Publish <MoveRight className="ml-1.5 mt-1" /></>
              }
          </Button>
      </div>

    </form>
  )
}

export default WriteBlogsForm

