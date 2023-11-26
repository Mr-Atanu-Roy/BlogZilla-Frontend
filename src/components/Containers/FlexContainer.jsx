import { cn } from "@/lib/utils"

function FlexContainer({
    children,
    className='',
    }) {
    return (
        <div className={cn('mt-8 flex flex-wrap items-center justify-evenly px-24 py-4 ', className)}>
            {children}
        </div>
    )
}

export default FlexContainer