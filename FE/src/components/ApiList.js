import React, { useState } from "react";
import axios from "axios";
// import { useLocation } from "react-router-dom";

function App() {
  // const props = useLocation().state;
  const [bno, setBno] = useState();
  const [room, setRoom] = useState({
    code: '',
    title: '',
    max: '',
    password: '',
    antrance: '',
    silence: '',
    hashtag: []
  });
  const [member, setMember] = useState({
    code: '',
    id: '',
    password: '',
    position:'',
  });
  const [user, setUser] = useState({
    code: '',
    id: '',
  });

  const url = "http://localhost:8081/room";

  const getBuilding = () => {
    axios
      .get(url)
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

  const getTable = function () {
    axios
      .get(`http://localhost:8081/room/${bno}`)
      .then((res) => {
        console.log({ bno } + "번 건물 테이블 정보");
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

  const handleRoom = e => {
    setRoom({
      ...room,
      [e.target.name]: e.target.value,
    })
    console.log(room);
  }

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

  // code[방코드], id[사용자id], (password[비밀번호]), position[의자위치]
  const changeRoomSet = () => {
    axios
      .post(url + "/setting", { 
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

  // code[방코드], id[사용자id], (password[비밀번호]), position[의자위치]
  const enterRoom = () => {
    axios
      .post(url + "/entry", { 
        code: member.code,
        id: member.id,
        password: member.password,
        position: member.position,
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

  const exitRoom = () => {
    axios
      .post(url + "/exit", { 
        code: user.code,
        id: user.id,
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

  const banUser = () => {
    axios
      .post(url + "/ban", { 
        code: user.code,
        id: user.id,
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



  const BnoInput = (e) => {
    setBno(e.target.value)
  }

  return (
    <div>
      <button onClick={getBuilding}>getBuilding</button>

      <div>
        <input
          value={bno} 
          onChange={BnoInput}
          />
        <button onClick={getTable}>getTable</button>
      </div>

      <form>
        <input placeholder="테이블 위치" type="text" name="code" value={room.code} onChange={handleRoom}/>
        <input placeholder="방제목" type="text" name="title" value={room.title} onChange={handleRoom}/>
        <input placeholder="최대인원" type="number" name="max" value={room.max} onChange={handleRoom}/>
        <input placeholder="비밀번호" type="text" name="password" value={room.password} onChange={handleRoom}/>
        <input placeholder="입장 시 효과" type="number" name="antrance" value={room.antrance} onChange={handleRoom}/>
        
        <input placeholder="침묵 시 효과" type="number" name="silence" value={room.silence} onChange={handleRoom}/>
        <input placeholder="해시태그" type="text" name="hashtag" value={room.hashtag} onChange={handleRoom}/>
        <button onClick={createRoom}>방 생성</button>
      </form>

    </div>
  );
};

export default App;

