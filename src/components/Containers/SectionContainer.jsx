import { cn } from "@/lib/utils"

function SectionContainer({
    sectionClass,
    children,
    title,
    description,
    }) {
    return (
        <section className={cn('my-8 ', sectionClass)}>
            {
                title &&
                <div className='text-center w-full'>
                    <h2 className={`font-bold text-4xl`}>{title}</h2>
                    {
                        description &&
                        <p className='text-gray-400 mt-2'>{description}</p>
                    }
                </div>
            }
            {children}
        </section>
    )
}

export default SectionContainer