const fs = require('fs'); 
import React from 'react'     
import { exists } from 'builder-util/out/fs';
export const CustomImage = ({height, width, name}) =>{
    let path=''
    try{
        path = require('./'+name+'.jpg')
        return<div style={{width:'150px', display:'flex', justifyContent:'center'}}><img style={style.imgStyle} src={path}/></div>
    }
    catch(err){
        return <div style={{width:'150px', display:'flex', justifyContent:'center'}}><div style={style.imgStyle}/></div>
    }

}
    const style = {
        imgStyle: {
            borderRadius: '7px',
            height: '150px',
        }
    }
    // console.log('aabldm', exists(path))
    // if (fs.statSync(path)) {
     
    //     return <img src={require('./'+name+'.jpeg')}/>
    // }
    // else { return <div>Slm</div>}
