import {useState, useEffect} from 'react'

import { postService } from '../../service/index'
import {useAPIErrors} from '../../hooks/index'

import { useForm } from "react-hook-form";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useToast } from '@/components/ui/use-toast'

import { TextEditor, TagsController, Spinner } from '../index'

import { MoveRight, Save, Subtitles, FileText, FileImage } from "lucide-react"

function WriteBlogsForm() {
  const type = ['image/png', 'image/jpeg', 'image/jpg']

  const {toast} = useToast()
  const [loading, setLoading] = useState(false)

  const { register, watch, handleSubmit, control, setValue, setError, clearErrors, getValues } = useForm();

  //watch the tags and picture
  const watchTags = watch('tags')
  const watchPicture = watch('picture') //TODO: add the picture preview

  const handelError = (errors) => {
    if(errors.title?.type == "required") toast({ variant: "destructive", title: 'Title is required',})
    if(errors.title?.type == "minLength" || errors.title?.type == "maxLength") toast({ variant: "destructive", title: 'Title should be between 8 to 45 characters',})
    
    if(errors.picture?.type == "required") toast({ variant: "destructive", title: 'Picture is required',})
    
    if(errors.content?.type == "required") toast({ variant: "destructive", title: 'Post Content is required',})
    if(errors.content?.type == "minLength") toast({ variant: "destructive", title: 'Post Content must be more that 1500 characters',})

    if(errors.tags?.type == "required") toast({ variant: "destructive", title: 'At least 1 tags is required',})
  }

  const publishPost = async(data) => {
    setLoading(true)

    try{
      if(!type.includes(data.picture[0].type)) {
        toast({ variant: "destructive", title: 'Picture must be of type png/jpg/jpeg image',})
        return
      }
      data = {
        published: true,
        title: data.title,
        header_img: data.picture[0],
        content: data.content,
        tags: data.tags.join(", "),
      }

      const response = await postService.createPost(data)
      if(response.status == 201){
        toast({ variant: "success", title: "Post published Successfully.".toUpperCase(),})
      }else if(response.status == 401 && response.data?.detail){
        toast({ variant: "destructive", title: "Login to publish posts.".toUpperCase(),})
      }else if(response.status == 400 && response.data){
        const responseErrors = useAPIErrors(response.data) //get the errors in array format
        for (let index = 0; index < responseErrors.length; index++) {
            toast({ variant: "destructive", title: responseErrors[index].toUpperCase(),})
        }
      }else{
          toast({ variant: "destructive", title: "Something went wrong. Please try again later.".toUpperCase(),})
      }        
    }catch(errors){
      toast({ variant: "destructive", title: "Something went wrong. Please try again later.".toUpperCase(),})
    }finally{
      setLoading(false)
    }


  } 

  // TODO: complete the save as draft functionality
  const saveAsDraft = async(data) => {
    setLoading(true)

    try{
      if(data.picture[0] && !type.includes(data.picture[0].type)) {
        toast({ variant: "destructive", title: 'Picture must be of type png/jpg/jpeg image',})
        return
      }
      
      data = {
        published: true,
        title: data.title,
        header_img: data.picture[0],
        content: data.content,
        tags: data.tags.join(", "),
      }

    }catch{
      toast({ variant: "destructive", title: "Something went wrong. Please try again later.".toUpperCase(),})
    }finally{
      setLoading(false)
    }
  }



  return (
    <form onSubmit={handleSubmit(publishPost, handelError)}>

      <div className="mb-10">
          <div className='flex  items-center justify-between w-11/12 mx-auto'>
            <div className='mr-3'>
              <Label htmlFor="title" className="flex items-center"><Subtitles className="w-4 h-4 mr-1" /> Post Title: </Label>
              <Input type="text" placeholder="Give a post title" className="w-[350px]"
                {...register("title", {required: true, minLength: 8, maxLength: 45, pattern: /^[a-zA-Z0-9\s]+$/})}
              />
            </div>
            <div className='ml-3'>
              <Label htmlFor="picture" className="flex items-center"><FileImage className="w-4 h-4 mr-1" /> Picture: </Label>
              <Input type="file" id="picture" className="w-[350px] cursor-pointer"
                {...register("picture", {required: true})}
              />
            </div>
          </div>
          <TagsController name="tags" control={control} required={true} defaultValue={getValues("tags")} watchTags={watchTags} setValue={setValue} getValues={getValues}/>
      </div>

      <div>
        <div className='mb-2.5 px-1.5 flex items-center justify-between'>
            <Label htmlFor="title" className="flex items-center"><FileText className="w-4 h-4 mr-1" /> Write Your Post: </Label>
        </div>
        <TextEditor name="content" height="620px" width="880px" minLength={1500} control={control} required={true} defaultValue='' />
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
          <Button type="submit" className={`w-5/12 ${loading ? 'cursor-not-allowed' : ''}`} disabled={loading}>
              {
                loading ? <Spinner isText={true} /> : <>Publish <MoveRight className="ml-1.5 mt-1" /></>
              }
          </Button>
      </div>

    </form>
  )
}

export default WriteBlogsForm

