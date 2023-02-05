// import Phaser from "phaser";
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.js";
import PhaserConfig from './phaser/Config'
// import playGame from "./phaser/scene";
// import PlayingScene from "./phaser/PlayingScene";
// console.log(App);

// const game = new Phaser.Game(PhaserConfig);

//id값이 root인 태그 랜더링
const root = ReactDOM.createRoot(document.getElementById("root") || document.createElement("div"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// ReactDOM.render(
//   <App />,
//   document.getElementById("root") || document.createElement("div")
// );
