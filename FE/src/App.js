import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CookiesProvider } from 'react-cookie';

// import GameView from "./pages/GameView";
import QRcode from "./components/QRcode";

import './App.css';
import Preview from './pages/Preview';
import Login from './pages/Login';
import Mypage from './pages/Mypage';
import Temp from './pages/Temp';
import Meeting from './pages/Meeting';

import SsafyView from "./pages/SsafyView";
import BarView from "./pages/BarView";
import MainView from "./pages/MainView";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/mainstreet' element={<MainView/>}/>
          <Route path='/ssafymap' element={<SsafyView/>}/>
          <Route path='/barmap' element={<BarView/>}/>
          {/* <Route path='/phaser' element={<GameView/>}/> */}
          <Route path='/QR' element={<QRcode/>}/>
          <Route path='/' element={<Preview/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/mypage' element={<Mypage/>}/>
          <Route path='/temp' element= {<Temp/>}/>
          <Route path='/meeting/:id' element= {<Meeting/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
