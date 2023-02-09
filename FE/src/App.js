import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

//import Home from "./pages/Home";
import GameView from "./pages/GameView";
import MainView from "./pages/MainView";
import About from "./pages/About";
import QRcode from "./components/QRcode";

import './App.css';
import Preview from './pages/Preview';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import Temp from './pages/Temp';
import Meeting from './pages/Meeting';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/about' element={<About/>}/>
          <Route path='/mainstreet' element={<MainView/>}/>
          <Route path='/phaser' element={<GameView/>}/>
          <Route path='/QR' element={<QRcode/>}/>
          <Route path='/' element={<Preview/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/mypage' element={<Mypage/>}/>
          <Route path='/temp' element= {<Temp/>}/>

          <Route path='/meeting' element= {<Meeting/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
