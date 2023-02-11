import phaser from 'phaser';
import React, { useRef, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import barConfig from '../phaser/barConfig';
// import { useGame } from '../hook/useGame';

import store from '../redux/store';
import { changeShop } from '../redux/actions';

// 게임 화면 뷰 영역 컴포넌트
const BarView = () => {
  // 게임 화면 초기화
  const phaserEl = useRef(null);
  const [startGame, setStartGame] = useState()
  const navigate = useNavigate();

  store.subscribe(() => {
    if (store.getState().shop ==='street') {
      navigate('/mainstreet')
    }
  })

  useEffect(() => {
    // console.log('페이져 불러옴');
    if (!startGame && phaserEl.current) {
      const newGame = new phaser.Game(barConfig)
      // phaserEl레퍼런스에 phaserConfig 로 scene을 생성
      phaserEl.current = newGame
      setStartGame(newGame)
    }
    // 언마운트 시 destroy
    return () => {
      startGame?.destroy(true)
    }
  }, [barConfig, phaserEl, startGame])

  
  return (
    <div>
      <div ref={phaserEl} className="game-container"></div>
    </div>
  );
};

export default BarView;