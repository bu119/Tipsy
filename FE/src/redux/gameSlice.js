import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  scene: "",
  store: -1,
  table: -1, 
  seat: -1,
}
// reducers만드는 것을 도와줌
export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    getScene: (state, action) => {
      state.scene = action.payload;
    },
    getTableSeat: (state, action) => {
      state.table = action.payload;
      state.seat = action.payload;
    }

  },
})

// Action creators are generated for each case reducer function
export const { getScene, getTableSeat } = gameSlice.actions

export default gameSlice.reducer