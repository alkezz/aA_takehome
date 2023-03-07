import React, { useState, useEffect } from 'react'
import Rating from '@mui/material/Rating'
import Modal from '@mui/material/Modal';
import logo from './logo.svg';
import { ReactComponent as Star } from './star-solid.svg'
import { ReactComponent as Mug } from './mug.svg'
import './App.css';

function App() {
  const [coffee, setCoffee] = useState([])
  const [posts, setPosts] = useState([])
  const [open, setOpen] = useState(false)
  const [newCoffeeOpen, setNewCoffeeOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [postCoffee, setPostCoffee] = useState("")
  const [rating, setRating] = useState(1)
  const [postText, setPostText] = useState("")
  const [name, setName] = useState("")
  const [year, setYear] = useState(0)
  const [caffineContent, setCaffineContent] = useState(0)
  const [update, setUpdate] = useState(false)
  const [errors, setErrors] = useState([])
  const handleOpen = () => setOpen(true)
  const handleClose = () => { setOpen(false); setErrors([]) }
  useEffect(() => {
    async function getCoffees() {
      const res = await fetch('http://localhost:5000/coffee')
      const data = await res.json()
      setCoffee(data)
    }
    async function getPosts() {
      const res = await fetch('http://localhost:5000/post')
      const data = await res.json()
      setPosts(data)
    }
    getCoffees()
    getPosts()
  }, [setCoffee, setPosts, setUpdate, update])
  console.log(coffee)
  const handlePost = async (e) => {
    e.preventDefault()
    const errors = []
    if (title.length <= 5 || title.length >= 20) {
      errors.push("Title should be between 5 and 20 characters")
    }
    if (rating <= 0 || rating > 5) {
      errors.push("Rating should be between 1 and 5")
    }
    if (postText.length > 180 || postText.length < 10) {
      errors.push("Post body should be between 10 and 180 characters")
    }
    if (errors.length) {
      setErrors(errors)
      return
    }
    const newPost = {
      title: title,
      coffee: Number(postCoffee),
      text: postText,
      rating: rating
    }
    await fetch('http://localhost:5000/post', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost)
    })
    setOpen(false)
    setUpdate(false)
    setTitle("")
    setRating(1)
    setPostText("")
  }
  const handleNewCoffee = async (e) => {
    e.preventDefault()
    const errors = []
    if (!name || name.length > 20 || name.length < 5) errors.push("Name must be between 5 and 20 characters")
    if (!year || year < 1920 || year > new Date().getFullYear()) errors.push("Year must be between 1920 and the current year")
    if (!caffineContent) errors.push("Please enter a valid caffine content")
    if (errors.length) {
      setErrors(errors)
      return
    }
    const newCoffee = {
      name,
      year,
      caffine_content: caffineContent,
      caffine_percentage: caffineContent * 100
    }
    await fetch('http://localhost:5000/coffee/create', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newCoffee)
    })
    setNewCoffeeOpen(false)
    setUpdate(false)
    setName("")
    setYear()
    setCaffineContent()
  }
  const handleDelete = async (postId) => {
    await fetch(`http://localhost:5000/post/${postId}`, {
      method: "DELETE"
    })
    setUpdate(!update)
  }
  const handleCoffeeDelete = async (coffeeId) => {
    await fetch(`http://localhost:5000/coffee/delete/${coffeeId}`, {
      method: "DELETE"
    })
    setUpdate(!update)
  }
  return (
    <div className="App-Body">
      <div className='middle-side-components-container'>
        <div className='top-header'>
          <div className='top-content'>
            <h2 style={{ marginTop: "15px", marginLeft: "10px" }}>Posts</h2>
            &nbsp;
            &nbsp;
            <button onClick={handleOpen} className='new-post-button'>New Post</button>
          </div>
          <Modal open={open} onClose={handleClose}>
            <div style={{ display: "flex", justifyContent: "center", marginTop: "200px" }}>
              <div className="modal-container">
                {errors && (
                  <span>{errors.map((error) => {
                    return <li>{error}</li>
                  })}</span>
                )}
                <h2>Create Post</h2>
                <input className='post-title-input' placeholder='Title' value={title} onChange={(e) => setTitle(e.target.value)} />
                <br />
                <div style={{ display: "flex", justifyContent: "center" }}>
                  <input className='post-rating-input' type='number' defaultValue={""} min={1} max={5} placeholder='Rating' value={rating} onChange={(e) => setRating(e.target.value)} />
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  &nbsp;
                  <span>Coffee:</span>
                  &nbsp;
                  <select className='post-coffee-input' placeholder='Coffee' value={postCoffee} onChange={(e) => setPostCoffee(e.target.value)}>
                    {coffee.map((coffee) => {
                      return <option value={coffee.id}>{coffee.name}</option>
                    })}
                  </select>
                </div>
                <br />
                <textarea style={{ width: "90%", height: "150px" }} placeholder='Post Text' value={postText} onChange={(e) => setPostText(e.target.value)} />
                <br />
                <button onClick={(e) => { handlePost(e); setUpdate(!update) }} style={{ cursor: "pointer", width: "90%", borderTopRightRadius: "10px", borderBottomLeftRadius: "10px", borderColor: "#DFB78C" }}>submit</button>
                <br />
              </div>
            </div>
          </Modal>
          <div className='middle-content'>
            {posts.map((post) => {
              return (
                <div style={{ display: "flex", flexDirection: "column", alignItems: "center", borderBottom: "3px dashed #DFB78C", paddingBottom: "10px", marginBottom: "5px" }}>
                  <h2>{post.title}</h2>
                  <Rating style={{ color: "black" }} readOnly precision={0.5} value={post.rating} />
                  <br />
                  <span>{post.text}</span>
                  <br />
                  <span>{coffee.filter((coffee) => coffee.id === post.coffee)[0]?.name} - {coffee.filter((coffee) => coffee.id === post.coffee)[0]?.caffine_content * 100}mg <button className='delete-post-button' onClick={(e) => { handleDelete(post.id); setUpdate(!update) }}>X</button></span>
                </div>
              )
            })}
          </div>
        </div>
        &nbsp;
        &nbsp;
        <div style={{ display: "flex", flexDirection: "column", marginLeft: "50px" }}>
          <div style={{ display: "flex" }}>
            <h2 style={{ marginTop: "30px" }}>Coffees</h2>
            &nbsp;
            &nbsp;
            &nbsp;
            <button onClick={(e) => newCoffeeOpen ? setNewCoffeeOpen(false) : setNewCoffeeOpen(true)} className='new-coffee-button'>New Coffee</button>
          </div>
          {newCoffeeOpen && (
            <div className='new-coffee-div'>
              <h3>New Coffee</h3>
              <div style={{ display: "flex", flexDirection: "column", marginLeft: "15px" }} >
                <div style={{ display: "flex" }}>
                  <span style={{ width: "60px" }}>Name: &nbsp;</span>
                  <input className={errors.includes("Name must be between 5 and 20 characters") ? "error" : "coffee-name-input"} value={name} onChange={(e) => setName(e.target.value)} />
                </div>
                <div style={{ display: "flex" }}>
                  <span style={{ width: "60px" }}>Year: &nbsp;</span>
                  <input value={year} onChange={(e) => setYear(e.target.value)} style={{ width: "50px" }} />
                </div>
                <div style={{ display: "flex", height: "23px" }}>
                  <span style={{ width: "60px" }}>Caffine: &nbsp;</span>
                  <input value={caffineContent} onChange={(e) => setCaffineContent(e.target.value)} style={{ width: "50px" }} />
                </div>
                <button onClick={(e) => { handleNewCoffee(e); setUpdate(!update) }} className='submit-coffee-button'>Submit</button>
              </div>
            </div>
          )}
          <div>
            {coffee.map((coffee) => {
              return (
                <div className='coffee-list'>&nbsp;&nbsp;<Mug width={20} />&nbsp;{coffee.name} - {coffee.year} <button className='delete-coffee-button' onClick={(e) => { handleCoffeeDelete(coffee.id); setUpdate(!update) }}>x</button></div>
              )
            })}
          </div>
        </div>
      </div>
    </div >
  );
}

export default App;
