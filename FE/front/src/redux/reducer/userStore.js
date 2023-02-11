import { createSlice } from "@reduxjs/toolkit";

export const userStore = createSlice({
    initialState: {
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
    },
    reducers: {
        submit(state, action) {
            state = {}
            return state
        }
    }
})

export const {} = userStore.actions

export default userStore.reducer