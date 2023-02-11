import phaser from 'phaser';
import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import streetConfig from '../phaser/streetConfig';
// import { useGame } from '../hook/useGame';

// import store from '../redux_temp/store';
// import { changeShop } from '../redux_temp/actions';

// 게임 화면 뷰 영역 컴포넌트
const GameView = () => {
  // 게임 화면 초기화
  const phaserEl = useRef(null);
  const [startGame, setStartGame] = useState()
  const navigate = useNavigate();
  
  // store.subscribe(() => {
  //   if (store.getState().shop ==='ssafy') {
  //     console.log('싸피맵')
  //     navigate('/ssafymap')
  //   } else if (store.getState().shop == 'bar') {
  //     console.log('bar맵')
  //     navigate('/barmap')
  //   } else if (store.getState().shop == 'mypage') {
  //     console.log('mypage')
  //     navigate('/mypage')
  //   }
  // })

  
  // 게임 실행 훅 함수 (만듬)
  // useGame(phaserConfig, phaserEl);

  useEffect(() => {
    // console.log('페이져 불러옴');
    if (!startGame && phaserEl.current) {
      const newGame = new phaser.Game(streetConfig)
      // phaserEl레퍼런스에 phaserConfig 로 scene을 생성
      phaserEl.current = newGame
      setStartGame(newGame)
    }
    // 언마운트 시 destroy
    return () => {
      startGame?.destroy(true)
    }
  }, [streetConfig, phaserEl, startGame])

  
  return (
    <div>
      <div ref={phaserEl} className="game-container"></div>
    </div>
  );
};

export default GameView;