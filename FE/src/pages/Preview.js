import axios from 'axios'
import { Navigate } from 'react-router-dom'
import { rsort } from 'semver'
import './Preview.css'
const Preview =() => {
  const KAKAO_API = process.env.REACT_APP_KAKAO_API
  
  return (
  <div className="Preview">
    <div className="logo"><b>T<span>i</span>p<span>s</span>y</b>
    <br/>
    <br/>
    <br/>
    <br/>
    <img src="../login/kakao_login.png" onClick={() => {
      Kakao.Auth.authorize({
        //redirectUri: 'http://i8d207.p.ssafy.io/temp',
        redirectUri: 'http://127.0.0.1:3000/temp',
      })
    }}/>
    </div>
  </div>
  )
}


export default Preview;