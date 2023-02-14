import phaser from 'phaser';
import styled from "styled-components"
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import streetConfig from '../phaser/streetConfig';
import axios from "axios";


// 리덕스
import { useSelector } from 'react-redux'
// useSelector 데이터 읽기
// useDispatch 데이터 부르기


const GameViewContainer = styled.section`
  z-index: 6;
  position: absolute;
  top: 0px;
  left: 100px;
  color: white;
`;

// 게임 화면 뷰 영역 컴포넌트
const StreetView = () => {
  // 게임 화면 초기화
  const phaserEl = useRef(null);
  const [startGame, setStartGame] = useState()
  const navigate = useNavigate(); 
  const changeScene = useSelector((state) => state.game.scene)
  
  const url = "http://i8d207.p.ssafy.io:8083";


  const getBuilding = () => {
    axios
      .get(`${url}/room`)
      .then((res) => {
        console.log("건물별 정보");
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
        // 403 에러가 발생한 경우
        if (e.response && e.response.status === 403) {
          console.log("로그인으로 이동");
          
        }
      });
  };

  useEffect(() => {
    getBuilding()
  }, [])

  useEffect(() => {
    // console.log(changeScene)
    if (changeScene ==='ssafy') {
      navigate('/ssafymap')
    } else if (changeScene ==='bar'){
      navigate('/barmap')
    } else if (changeScene ==='mypage'){
      navigate('/mypage')
    }
  }, [changeScene])

  
  // store.subscribe(() => {
  //   if (useSelector((state) => state.game.scene) ==='ssafy') {
  //     console.log('싸피맵')
  //     navigate('/ssafymap')
  //   } else if (useSelector((state) => state.game.scene) == 'bar') {
  //     console.log('bar맵')
  //     navigate('/barmap')
  //   } else if (useSelector((state) => state.game.scene)== 'mypage') {
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
      <GameViewContainer>
        <div className='text1'>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
        <div>ssss</div>
      </GameViewContainer>
      <div ref={phaserEl} className="game-container"></div>

    </div>
  );
};

export default StreetView;