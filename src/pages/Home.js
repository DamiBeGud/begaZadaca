import React, { useEffect, useState } from 'react'
import Uploaded from '../components/Uploaded';
import DownloadPopUp from "../components/DownloadPopUp"
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import urid from 'urid';
import {storage, db} from "../firebase/firebase"
import { collection, getDocs, updateDoc, doc } from "firebase/firestore"; 
import { async } from '@firebase/util';

function Home({curentUser, login}) {
    const{id, username, role } = curentUser
    const[file, setFile] = useState("")
    const[url, setUrl] = useState({})
    const[popUp, setPopUp] = useState(false)

    const[images, setImages] = useState([])


    function uploadImage(){
        const fileName = urid()
        
        const storageRef = ref(storage, fileName);
        
        // 'file' comes from the Blob or File API
        const uploadTask = uploadBytes(storageRef, file).then((snapshot) => {
          console.log('Uploaded a blob or file!');
          console.log(snapshot)
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
            setUrl(prev => prev = {url: downloadURL, name: fileName})
            handlePopUp()
          });
        });
    }

    const handleUpload = async e => {
        // uploadImage()
        e.preventDefault()
        console.log('start of upload')
        // console.log(file)
        uploadImage()
    }


    function handlePopUp(){
        setPopUp(!popUp)
    }
    async function getImages(){
        const querySnapshot = await getDocs(collection(db, "images"));
        querySnapshot.forEach((doc) => {
        // console.log(`${doc.id} => ${doc.data().url}`);
        setImages(prev=>{
            return[...prev, {
                id: doc.id,
                name: doc.data().imgName,
                url: doc.data().url,
                status: doc.data().status
            }]
        })
        });
    }
    useEffect(()=>{
       return () => getImages()
    },[])

    async function updateSeen(e){
        const updateSeen = await updateDoc(doc(db, "images", e), {
            status: "yellow"
        })
    }
    async function updateDownload(e){
        const updateDownload = await updateDoc(doc(db, "images", e), {
            status: "red"
        })
    }
     function seen(e){
        console.log(e.target.name)
      
        updateSeen(e.target.id)

        setImages(prev=>{
            return prev.map(image=>{
                if(image.name === e.target.name){
                    return{...image, status : "yellow"}
                }else{
                    return image
                }
            })
        })

    }

    async function downloadImage(e){
        const downloadImage = await getDownloadURL(ref(storage, `${e}`))
            .then(url=>{
                const xhr = new XMLHttpRequest();
                xhr.open('GET', url);
                xhr.responseType = 'blob';
                xhr.onload = (event) => {
                    let a = document.createElement('a');
                    a.href = window.URL.createObjectURL(xhr.response);
                    a.download = e;
                    a.style.display = 'none';
                    document.body.appendChild(a);
                    a.click();                            //Simulates a click event
                    let blob = xhr.response;
                };
                xhr.send();
                
                // Or inserted into an <img> element
                const img = document.getElementById('myimg');
                img.setAttribute('href', url);
         
                 })
            .catch((error) => {
                    console.log(error.message)
                 })
            
    }
    function download(e){
        // const img = document.getElementById('myimg');
        //         img.setAttribute('download', e.target.name);
        console.log(e.target.name)
        updateDownload(e.target.id)
        setImages(prev=>{
            return prev.map(image=>{
                if(image.name === e.target.name){
                    return{...image, status : "red"}
                }else{
                    return image
                }
            })
        })
        downloadImage(e.target.name)


    }

    const displayImages = images?.map((img, index)=>{
        return(
            <article key={img.name}>
                <img src={img.url} />
                <div style={{backgroundColor: `${img.status}`, width:"1em", height:"1em", borderRadius:"1em"}}></div>
                {curentUser.role === "korisnik" && <button type='button' id={img.id} name={img.name} onClick={(e)=>seen(e)}>Vidjeno</button>}
                {curentUser.role === "korisnik" && <button type='button' id={img.id} name={img.name} onClick={(e)=>download(e)}>Download</button>}
                <a href="gs://bega-19925.appspot.com/Axve3qCSy4ORgCpl" download>dsakdsa</a>
            </article>
        )
    })
    const Forma = ()=>{
        return(
    <form>
    <input type="file" id="img"  accept="image/*" name="img" onChange={(event)=>setFile(event.target.files[0])} />
    <button type="button" onClick={(e)=>handleUpload(e)}>Upload</button>
    </form>

        )
    }
  return (
    <>
    <button onClick={()=>login()}>Odjavi se</button>
    {curentUser.role === "admin" &&<Forma />}
    <div>{username}</div>
    
    {popUp &&
     <Uploaded 
        url = {url}
        handlePopUp={handlePopUp}
        setImages={setImages}
     />}
     {displayImages}
    </>
    
  )
}




export default Home