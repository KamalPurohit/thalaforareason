import { useState } from "react";


export default function ThalaMeme(props){
    
    
    return(
        <div className="thalaMeme">
            <p className="topText">{props.text}</p>
            <img src={props.thalaImage} width="300px"/>
        </div>       
    )
}

