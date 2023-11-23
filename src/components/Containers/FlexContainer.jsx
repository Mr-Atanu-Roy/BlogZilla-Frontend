import React from 'react'

function FlexContainer({
    children,
    flexDirection = "row",
    flexWrap = "wrap", 
    justifyContent = "evenly",
    alignItems = "center",
    mt,
    py,
    px,
    }) {
    return (
        <div className={`${mt ? 'mt-'+mt : 'mt-8'} flex flex-${flexDirection=="col" ? "col" : "row"} flex-${flexWrap=="nowrap" ? "nowrap" : "wrap"} items-${alignItems} justify-${justifyContent} ${px ? 'px-'+px : 'px-24'} ${py ? 'py-'+py : 'py-4'}`}>
            {children}
        </div>
    )
}

export default FlexContainer