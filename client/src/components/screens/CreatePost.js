import React,{useState,useEffect} from 'react';
import { useHistory} from 'react-router-dom';
import M from 'materialize-css';
import '../../App.css'
function CreatePost() {
  const history = useHistory()
  const [title,setTitle] = useState("")
  const [body,setBody] = useState("")
  const [image,setImage] = useState("")
  const [url,setUrl] = useState("")
   
  useEffect(()=>{
  if(url){
    fetch("/createpost",{
      method:"POST",
      headers:{
        "Content-Type":"application/json",
        "Authorization": "Bearer "+ localStorage.getItem("jwt")
      },
      body:JSON.stringify({
       title,
       body,
       image:url
      })
      }).then(res => res.json())
      .then(data => { 
        if(data.error){
          M.toast({html: data.error,classes:"#d32f2f red darken-2"})
        }
        else{
          console.log(data);
          M.toast({html:"Post Uploaded ",classes:"#43a047 green darken-1"})
          history.push('/')
        }
      }
        )
    }
  },[url])


  const postDetails=()=>{
    const data = new FormData()
    data.append("file",image)
    data.append("upload_preset","Social Media")
    data.append("cloud_name","yashbansal")
    fetch("	https://api.cloudinary.com/v1_1/yashbansal/image/upload",{
      method:"POST",
      body:data
    }).then(res => res.json())
    .then(data=> {
      setUrl(data.url)})
    .catch(err => console.log(err))
  }




  return (
    <div className="card input-field"
    style={{
        margin:"10px auto",
        maxWidth:"500px",
        padding:"20px",
        textAlign:"center"
    }}>
        <input type="text" placeholder="Title"
        value={title}
        onChange={(e)=>setTitle(e.target.value)}/>
        <input type="text" placeholder="Body" 
        value={body}
        onChange={(e)=>setBody(e.target.value)}/>

        <div className="file-field input-field">
      <div className="btn #1e88e5 blue darken-1">
        <span>Upload Image</span>
        <input type="file"  
        onChange={(e)=> setImage(e.target.files[0])} />
      </div>
      <div className="file-path-wrapper">
        <input className="file-path validate" type="text" placeholder="Upload image" />
      </div>
    </div>
    <button className="btn waves-effect waves-light #1e88e5 blue darken-1"   onClick={()=>postDetails()} >Submit Post
    
  </button>
    </div>
  );
}

export default CreatePost;
