import { createElement, useState } from "react";
import ThalaMeme from "./thalaMeme";
import image from "../assets/images/thalaImage.png";
import boleJoKoyal from "../assets/audio/boleJoKoyal.mp3"

export default function Meme(){
    const [text,setText] = useState("")
    const [thalaResult,setThalaResult] = useState("")
    const audio = document.getElementById("music");
    const canvas = document.createElement('canvas');
    let isThala = false;
    
    function handleChange(e){
        setText(e.target.value);
    }

    function containsOnlyNumbers(str) {
        return /^\d+$/.test(str);
      }

    function handleCheck(){
        let newText = text.replaceAll(" ","");
        if(containsOnlyNumbers(text)){
            var n, remainder, sum = 0;
            n = parseInt(text);
            let arr = []
            let result = ""
            while(n)
            {
                remainder = n % 10;
                sum = sum + remainder;
                n = Math.floor(n/10);
                arr.push(remainder);
            }
            if(sum === 7){
                arr.reverse().map((m,i) =>{
                    if(i < arr.length-1){
                        result += `${m} + `
                    }
                    else{
                        result += `${m}`
                    }
                });
                setThalaResult(`${result} = 7`);  
                isThala = true;
                setText("");
            }
            else{
                setThalaResult("Try again 😔"); 
                isThala = false;
                setText("");
            }
        }
        else{
            if(newText.length == 7){
            newText = newText.split("")
            let result = "";
            newText.map((m,i)=>{
                if(i < newText.length-1){
                    result += `${m} + `
                }
                else{
                    result += `${m}`
                }
            })
            setThalaResult(`${result} = 7`);  
            isThala = true;
            setText("");
        }

        else{
            setThalaResult("Try again 😔"); 
            isThala = false;
            setText("");
        }}

        if(isThala){
        audio.play();
        }
        if(!(isThala)){
        audio.pause();
        }
    }

    const handleDownload = () => {
        
        const img = new Image();
        img.src = image;
        img.onload = () => {
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext('2d');
          const x = canvas.width / 2;
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.drawImage(img, 0, 0);
          ctx.font = '40px Arial';
          ctx.fillStyle = 'white';
          ctx.textAlign= "center"
          ctx.fillText(thalaResult, x, 50);
          ctx.strokeStyle = 'black';
          ctx.strokeText(thalaResult,x,50)
          const link = document.createElement('a');
          link.download = 'image.png';
          link.href = canvas.toDataURL('image/png');
          link.click();
        };
      };
    
      
    return(
        <main className="meme" >
            
                <h1 >Check Here</h1>
                <input type="text"  placeholder="Enter text or Number" onChange={handleChange} value={text}/>
                <button className="btn" onClick={handleCheck}>Check</button>
                <ThalaMeme thalaImage={image} text={thalaResult}/>
                <audio id="music" src={boleJoKoyal}></audio>
                <button className="btn" onClick={handleDownload}><i className="fa-solid fa-download"></i></button>
                
        </main>
    )
}