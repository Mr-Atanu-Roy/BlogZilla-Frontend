import * as React from "react"

import { cn } from "@/lib/utils"

const Input = React.forwardRef(({ className, type="text", ...props }, ref) => {
  return (
    (<input
      type={type}
      className={cn(
        "flex h-10 font-medium w-full border-input bg-background px-1 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none outline-none rounded-none border-b-[2.4px] focus-visible:ring-0 focus-visible:ring-offset-0 border-b-primary",
        className
      )}
      ref={ref}
      {...props} />)
  );
})
Input.displayName = "Input"

export { Input }
