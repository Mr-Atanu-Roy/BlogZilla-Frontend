import {useEffect} from 'react'

import { Controller } from 'react-hook-form'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

import { Tags, X } from "lucide-react"


function TagsController({name, control, defaultValue = [], required=false, watchTags, setValue, getValues}) {


  //func to handel tag adding
  const addTag = (tag) => {
    const currentTags = getValues('tags') || []
    const newTags = [...currentTags, tag.toLowerCase()];
    setValue('tags', newTags);
  };
  
  //func to handel tag removing
  const removeTag = (index) => {
    const currentTags = getValues('tags') || []
    const newTags = currentTags.filter((_, i) => i !== index);
    setValue('tags', newTags);
  };


  return (
    <Controller
    name={name || "tagsController"}
    control={control}
    rules={{ 
        required: required,
    }}
    defaultValue = {defaultValue}
    render={({field: {onChange}}) => (
      <div className='flex items-center justify-between w-11/12 mx-auto'>
        <div className='mt-7 mr-3'>
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
          <p className="text-gray-500 font-medium text-xs mt-1">Press enter to add a tag</p>
        </div>
        <div className='mt-7 ml-3'>
          <Label className="flex items-center"><Tags className="w-4 h-4 mr-1" /> Tags Added: </Label>
          
          <div className='flex flex-wrap mt-2.5 w-[350px]'>
            {
              watchTags?.length > 0 ? watchTags.map((tag, index) => (
                <div key={index+tag} className='text-sm m-1 items-center justify-center font-medium flex w-fit bg-green-400 rounded-full px-3 py-1.5'>
                  <span>{tag}</span> 
                  <span><X className='w-4 h-4 ml-1 cursor-pointer' onClick={() => removeTag(index)}/></span>
                </div>
              )) : (<p className='text-gray-400 text-sm'>No tags added yet</p>)
            }
          </div>
        </div>
      </div>
    )}
    />
  )
}

export default TagsController