import phaser from 'phaser';
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ssafyConfig from '../phaser/ssafyConfig';

// 리덕스
import { useSelector } from 'react-redux'
// useSelector 데이터 읽기
// useDispatch 데이터 전달


// 게임 화면 뷰 영역 컴포넌트
const SsafyView = () => {
  // 게임 화면 초기화
  const phaserEl = useRef(null);
  const [startGame, setStartGame] = useState()
  const navigate = useNavigate();
  const changeScene = useSelector((state) => state.game.scene)


  useEffect(() => {
    console.log(changeScene)
    if (changeScene ==='street') {
      navigate('/mainstreet')
    }
  }, [changeScene])

  
  useEffect(() => {
    // console.log('페이져 불러옴');
    if (!startGame && phaserEl.current) {
      const newGame = new phaser.Game(ssafyConfig)
      // phaserEl레퍼런스에 phaserConfig 로 scene을 생성
      phaserEl.current = newGame
      setStartGame(newGame)
    }
    // 언마운트 시 destroy
    return () => {
      startGame?.destroy(true)
    }
  }, [ssafyConfig, phaserEl, startGame])

  
  return (
    <div>
      <div ref={phaserEl} className="game-container"></div>
    </div>
  );
};

export default SsafyView;