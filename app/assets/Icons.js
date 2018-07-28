import React from 'react';

export const Icons = ({ iconName }) => {
    let txt ='url(./assets/icons/'+iconName+'.svg) center / contain no-repeat'
    return (
        <div>
            <img  className='icon' style={{height:'35px',width:'35px',webkitMask:txt}}  />
        </div>
    )

}