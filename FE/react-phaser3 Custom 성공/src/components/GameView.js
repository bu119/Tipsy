import Phaser from 'phaser';
import React from 'react';
import { useRef, useEffect } from 'react';
import phaserConfig from '../phaser/Config';


const GameView = () => {
  // 게임 화면 초기화
  const parentEl = useRef(null);

  useEffect(() => {
    // game 레퍼런스에 phaserConfig 로 씬을 생성
    // 씬은 game 레퍼런스에 HTMLcanvas를 그리는 식으로 생성된다.
    parentEl.current = new Phaser.Game(phaserConfig);
    // 주의!! 단 한 번만 실행될 수 있도록 신경써야 한다. 
    // 두 번 실행되면 가차없이 두 개의 게임 화면이 생긴다.
    // 여기서는 useEffect 의 dependency array에 []를 넣어서 한 번만 실행되도록 했다.
  }, []);

  // const game = new Phaser.Game(PhaserConfig);
  return (
    <div>
      <div ref={parentEl} className="game-container"></div>
    </div>
  );
};

export default GameView;