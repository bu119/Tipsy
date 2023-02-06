import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import GameView from "./pages/GameView";
import About from "./pages/About";
import QRcode from "./components/QRcode";


// export default class App extends React.Component {
// 	render() {
// 		return (
// 			<div>
// 				<h1>Hello World</h1>
// 			</div>
// 		);
// 	}
// }

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/phaser' element={<GameView/>}/>
          <Route path='/QR' element={<QRcode/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;