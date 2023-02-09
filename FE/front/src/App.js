import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
// import GameView from "./pages/GameView";
import SsafyView from "./pages/SsafyView";
import BarView from "./pages/BarView";
import MainView from "./pages/MainView";
import About from "./pages/About";
import QRcode from "./components/QRcode";

export const MapContext = React.createContext();

function App() {
  return (
    // <MapContext.Provider value={data}>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/mainstreet' element={<MainView/>}/>
            <Route path='/ssafymap' element={<SsafyView/>}/>
            <Route path='/barmap' element={<BarView/>}/>
            {/* <Route path='/phaser' element={<GameView/>}/> */}
            <Route path='/QR' element={<QRcode/>}/>
          </Routes>
        </div>
      </BrowserRouter>
    // </MapContext.Provider>
  );
}

export default App;
