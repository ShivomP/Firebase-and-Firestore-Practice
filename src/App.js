 import './App.css';
import React from 'react';
import {auth, db } from './firebase/init'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { 
  signInWithEmailAndPassword, 
  signOut, 
  onAuthStateChanged 
} from "firebase/auth";
import {collection, addDoc, getDocs, getDoc, doc, query, where, updateDoc, deleteDoc} from 'firebase/firestore'

function App() {
  const [user, setUser] = React.useState({})
  const [loading, setLoading] = React.useState(true)

  async function updatePost(){
    const hardId = "a6zdlpprcnif5M85sNi2"
    const postRef = doc(db, "posts", hardId)
    const post = await getPostsById (hardId)
    console.log(post)
    const newPost = {
      ...post, 
      description: "Go to beddddddd",
    }
    console.log(newPost)
    updateDoc(postRef, newPost)
  }

  function deletePost(){
    const hardId = "a6zdlpprcnif5M85sNi2"
    const postRef = doc(db, "posts", hardId)
    deleteDoc(postRef)
  }


function createPosts(){
  const post ={
    title: "TikTIk",
    description: "joker",
    uid: user.uid
  }
  addDoc(collection(db, "posts"), post)
}

async function getAllPosts(){
  const {docs} = await getDocs(collection(db, "posts"))
  const posts = docs.map (elem => ({...elem.data(), id: elem.id}))
  console.log(posts)
}

async function getPostsById(id){
  const postRef = doc(db, "posts", id)
  const postSnap = await getDoc(postRef)
  return postSnap.data()
}

async function getPostsByUid(){
  const postCollectionRef = await query(
    collection(db, "posts"),
    where("uid", "==", user.uid)
  )
  const {docs} = await getDocs(postCollectionRef)
  console.log(docs.map(doc => doc.data()))
}

  React.useEffect(()=> {
    onAuthStateChanged(auth, (user) => {
      setLoading(false)
      console.log(user)
      if(user) {
        setUser(user)
      }
    })
  }, [])

  function register(){
    createUserWithEmailAndPassword(auth, 'email@email.com', 'password')
      .then((user) => {
        console.log(user)
      })
      .catch((error) => {
       console.log(error)
      });
  }

  function login() {
    signInWithEmailAndPassword(auth, "email@email.com", "password")
    .then(({user}) => {
      console.log(user)
      setUser(user)
    })
    .catch((error) => {
      console.log(error.message)
     });
  }

  function logOut(){
    signOut(auth)
    setUser({})
  }

  return (
    <div className="App">
      <button onClick={register}> Register</button>
      <button onClick={login}> Login</button>
      <button onClick={logOut}> LogOut</button>
      {loading ? 'loading...' :  user.email}
      <button onClick={createPosts}> Creat Post</button>
      <button onClick={getAllPosts}> Get All Post</button>
      <button onClick={getPostsById}> Get One Post</button>
      <button onClick={getPostsByUid}> Get It</button>
      <button onClick={updatePost}> Update</button>
      <button onClick={deletePost}> Delete</button>
    </div>
  );
}

export default App;
