import { Controller } from "react-hook-form";

import React from 'react'

function TagsShow({name, control, required=false, defaultValue =""}) {
  return (
    <Controller
    name={name || "TagsShow"}
    control={control}
    rules={{ 
        required: required,
    }}
    render={({field: {onChange}}) => (
        <></>
    )}
    />
  )
}

export default TagsShow