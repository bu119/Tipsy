import phaser from 'phaser';
import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ssafyConfig from '../phaser/ssafyConfig';
import axios from "axios";

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
  const currentChair = useSelector((state) => state.game.chair)
  const currentTable = useSelector((state) => state.game.table)
  const roomNum = `10${currentTable}`
  // 건물번호 1,2,3
  const storeNum = 1
  const url = 'http://i8d207.p.ssafy.io:8083'


  const getTable = () => {
    axios
      .get(`${url}/room/${storeNum}`)
      .then((res) => {
        console.log({ storeNum } + "번 건물 테이블 정보");
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

  // 방생성
  const createRoom = () => {
    console.log(room);
    axios
      .post(url, { 
        code: room.code,
        title: room.code,
        max: room.max,
        password: room.password,
        antrance: room.antrance,
        silence: room.silence,
        hashtag: [room.hashtag]
      })
      .then((data) => {
        console.log(data);
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
    getTable()
  }, [])


  useEffect(() => {
    console.log(changeScene)
    if (changeScene ==='street') {
      navigate('/mainstreet')
    }
  }, [changeScene])


  useEffect(() => {


    console.log(roomNum)
    console.log(currentChair, currentTable)
    // navigate(`/meetinge/${roomNum}`)
  }, [currentChair, currentTable, roomNum])
  

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