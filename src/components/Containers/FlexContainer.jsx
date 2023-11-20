import React from 'react'

function FlexContainer({
    children,
    flexDirection = "row",
    flexWrap = "wrap", 
    justifyContent = "evenly",
    alignItems = "center",
    mt = "8",
    py = "4",
    px = "24",
    }) {
    return (
        <div className={`mt-${mt} flex flex-${flexDirection=="col" ? "col" : "row"} flex-${flexWrap=="nowrap" ? "nowrap" : "wrap"} items-${alignItems} justify-${justifyContent} px-${px} py-${py}`}>
            {children}
        </div>
    )
}

export default FlexContainer