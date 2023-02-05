import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./pages/Home";
import GameView from "./components/GameView";
import About from "./pages/About";

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
        <h1>Hello World</h1>
          <Routes>
            <Route path='/' element={<Home/>}/>
            <Route path='/about' element={<About/>}/>
            <Route path='/phaser' element={<GameView/>}/>
          </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;