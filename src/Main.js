import {useState} from "react"
import React from "react"

const Main = () => {

  const [memeContent, setMemeContent] = useState({
    toptext:"I will do it",
    bottomtext:"When i'm big",
    imgurl:"./meme1.jpg"

  })
  const [allMeme, setAllMeme] = useState([])
  React.useEffect(()=>{
    fetch("https://api.imgflip.com/get_memes")
      .then(res => res.json())
      .then(data => setAllMeme(data.data.memes))
  }, [])
  
  function newImg (){
    const randomNumber = Math.floor(Math.random()* allMeme.length)
    const newImgurl = allMeme[randomNumber].url
    setMemeContent(prev =>({
      ...prev, 
      imgurl: newImgurl
    }))
  }


  function handleChange(event){
    const {value, name} = event.currentTarget
    setMemeContent(prev => ({...prev, [name]: value}))   
  }
  return (
    <main>
        <div className="form">
            <div className="topbottom">
            <label>
                Top Text 
                <input 
                type="text"
                placeholder="Enter the top text"                
                name = "toptext"
                onChange={handleChange}
                value={memeContent.toptext}
                />
            </label>
            <label>
                Bottom Text
                <input 
                type="text"
                placeholder="Enter the bottom text"        
                name = "bottomtext"
                onChange={handleChange}
                value={memeContent.bottomtext}
                />
            </label>
            </div>
            <button onClick={newImg}>Get a New meme img</button>
        </div>
        <div className="meme-container">
            <img src={memeContent.imgurl} alt=" " className="meme-img"/>
            <span className="top-text">{memeContent.toptext} </span>
            <span className="bottom-text">{memeContent.bottomtext} </span>
        </div>
    </main>
  )
}

export default Main