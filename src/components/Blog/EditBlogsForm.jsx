import {useState, useEffect} from 'react'
import { set, useForm } from 'react-hook-form'

import { postService } from '../../service/index'

import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { TextEditor, TagsController } from '../index'
import { useToast } from '@/components/ui/use-toast'

import { MoveRight, Save, Subtitles, FileText, FileImage } from "lucide-react"

function EditBlogsForm({blogUUID}) {
    const [loading, setLoading] = useState(false)
    const {toast} = useToast()
    const { register, watch, handleSubmit, control, setValue, setError, clearErrors, getValues } = useForm();

    useEffect(() => {

        (async () => {
            setValue("title", "")
            setValue("tags", [])
            setValue("content", "")
            setValue("picture", null)
            
            setLoading(true);
            try {
                if(blogUUID){
                  const response = await postService.retrievePost(blogUUID)
                  if(response.status == 200){
                    if(response?.title) setValue("title", response.title)
                    if(response?.tags_parsed) setValue("tags", response.tags_parsed)
                    if(response?.header_img) setValue("pic_preview", response.header_img)
                    if(response?.content) setValue("content", response.content)
                  }else{
                      toast({ variant: "destructive", title: "Something went wrong. Please try again later.".toUpperCase(),})
                  }
                }

            } catch (error) {
              toast({ variant: "destructive", title: 'Something went wrong.',})
            }finally{
              setLoading(false);
            }
      
          })();

    }, [blogUUID]);

    const watchTags = watch('tags')
    const watchPicture = watch('picture') //TODO: add the picture preview


    const handelError = (errors) => {
        if(errors.title?.type == "required") toast({ variant: "destructive", title: 'Title is required',})
        if(errors.title?.type == "minLength" || errors.title?.type == "maxLength") toast({ variant: "destructive", title: 'Title should be between 8 to 45 characters',})
        
        if(errors.content?.type == "required") toast({ variant: "destructive", title: 'Post Content is required',})
        if(errors.content?.type == "minLength") toast({ variant: "destructive", title: 'Post Content must be more that 1500 characters',})
    
        if(errors.tags?.type == "required") toast({ variant: "destructive", title: 'At least 1 tags is required',})
    }

    const editPost = async(data) => {
        console.log(data)
    }


    const saveAsDraft = async(data) => {
    }


    return (
        <form onSubmit={handleSubmit(editPost, handelError)}>
            <div className="mb-10">
                <div className='flex items-center justify-between w-11/12 mx-auto'>
                    <div className='mr-3'>
                        <Label htmlFor="title" className="flex items-center"><Subtitles className="w-4 h-4 mr-1" /> Post Title: </Label>
                        <Input type="text" placeholder="Give a post title" className="w-[350px]"
                        {...register("title", {required: true, minLength: 8, maxLength: 45, pattern: /^[a-zA-Z0-9\s]+$/})}
                        />
                    </div>
                    <div className='ml-3'>
                        <Label htmlFor="picture" className="flex items-center"><FileImage className="w-4 h-4 mr-1" /> Change Picture: </Label>
                        <Input type="file" id="picture" className="w-[350px] cursor-pointer"
                            {...register("picture")}
                        />
                    </div>
                </div>
                <TagsController name="tags" control={control} required={true} defaultValue={getValues("tags")} watchTags={watchTags} setValue={setValue} getValues={getValues}/>
            </div>

            <div>
                <div className='mb-2.5 px-1.5 flex items-center justify-between'>
                    <Label htmlFor="title" className="flex items-center"><FileText className="w-4 h-4 mr-1" /> Write Your Post: </Label>
                </div>
                <TextEditor name="content" height="620px" width="880px" minLength={1500} control={control} required={true} defaultValue={getValues("content")} />
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

export default EditBlogsForm