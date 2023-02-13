import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  birth: '',
  email: '',
  gender: '',
  image: '',
  interest: '',
  kakao_id: '',
  name: '',
  nickname: '',
  reportcnt: '',
  uid: 0,
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    authSubmit(state) {
      state = {}
      return state
    }
  },
})

// Action creators are generated for each case reducer function
// authSlice.actions에 있는 액션을 쓸꺼임
export const { authSubmit } = authSlice.actions

// authSlice안에 reducer를 밖으로 전달 (store에 전달)
export default authSlice.reducer