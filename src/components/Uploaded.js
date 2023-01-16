
import React from 'react'
import { collection, addDoc } from "firebase/firestore"
import {db} from "../firebase/firebase"

function Uploaded({url, handlePopUp, setImages}) {
    
  async function handleOK(){
    try {
        const imgRef = await addDoc(collection(db, "images"),{
            imgName:url.name,
            url:url.url,
            status: "green"
        }) 
        console.log("document written with ID of =>  " + imgRef.id)
        setTimeout(()=>{
          setImages(prev=>{
            return[...prev, {
              
                id: imgRef.id,
                name: url.name,
                url: url.url,
                status: "green"
            
            }]
          })
        },500)
        setTimeout(()=>{handlePopUp()},1000)
    } catch (error) {
        console.log(error.message)
    }
   }
  return (
    <div>
        <h1>Slika je uspjesno Uploadana</h1>
        <button onClick={()=>handleOK()}>OK</button>
    </div>
  )
}

export default Uploaded