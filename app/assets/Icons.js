import React from 'react';

export const Icons = ({ iconName, height }) => {
    let txt ='url(./assets/icons/'+iconName+'.svg) center / contain no-repeat'
    return (
        <div>
            <img  className='icon' style={height ? { height:height,width:height,webkitMask:txt} : { height:'35px',width:'35px',webkitMask:txt}}  />
        </div>
    )

}