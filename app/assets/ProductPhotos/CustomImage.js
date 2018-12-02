const fs = require('fs'); 
import React from 'react'     
import { exists } from 'builder-util/out/fs';
export const CustomImage = ({height, width,divWith, name}) =>{
    let path=''
    const style = {
        imgStyle: {
            borderRadius: '7px',
            marginBottom:  '15px',
            height: height ? height : '80%',
            width: width ? width : '90%',
            // height: height ? height : '90px',
            // width: width ? width : '100px',
        }
    }
    
    try{
        //path = require(name)
      if (name.length <= 0) {
        return <div style={{width: divWith ? '' : '100%', display:'flex', justifyContent:'center'}}><div style={style.imgStyle}/></div>
      }
        return <div style={{width: divWith ? '' : '100%', display:'flex', justifyContent:'center'}}><img style={style.imgStyle} src={name}/></div>
    }
    catch(err){

        return <div style={{width: divWith ? '' : '100%', display:'flex', justifyContent:'center'}}><div style={style.imgStyle}/></div>
    }

}
    
    // console.log('aabldm', exists(path))
    // if (fs.statSync(path)) {
     
    //     return <img src={require('./'+name+'.jpeg')}/>
    // }
    // else { return <div>Slm</div>}
