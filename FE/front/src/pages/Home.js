import React from "react"
import { Link } from 'react-router-dom';


const Home = () => {
  return (
    <div>
      <h1>Home</h1>
      <Link to="/about">About</Link>
      <br/> 
      <Link to="/phaser">Phaser</Link>
      <br/> 
      <Link to="/QR">QRcode</Link>
    </div>
  )
}

export default Home