import React from "react"
import { Link } from 'react-router-dom';
import MainNav from "../components/MainNav";

const About = () => {
  return (
    <div>
      <MainNav/>
      <h1>About</h1>
      <Link to="/">Home</Link>
    </div>
  )
}

export default About