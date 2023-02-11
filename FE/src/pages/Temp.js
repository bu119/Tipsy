import axios from "axios";
import { useNavigate } from "react-router-dom";
import store from "../authstore";

const searchParams = new URLSearchParams(window.location.search);
let code;
for (const param of searchParams) {
  code = param[1];
}

function Temp(){
	const navigate = useNavigate()
  axios.get(`http://i8d207.p.ssafy.io:8081/user/login?code=${code}`)
  // axios.get(`http://127.0.0.1:8081/user/login?code=${code}`)
  .then(res =>{
    if(!res.data.userCheck){
			//처음 로그인시!
			navigate('/login', {state: res.data.userVo})
    }else{
        
      store.dispatch({type:'submit', state:res.data.userVo })
        navigate('/mainstreet', {state: res.data.userVo})
        //navigate('/login', {state: res.data.userVo})
      
    }
    })
  .catch(err => {
		navigate('/')
  })

}

export default Temp