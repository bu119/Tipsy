import { configureStore } from '@reduxjs/toolkit'
import gameReducer from './gameSlice'
import authReducer from './authSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    game: gameReducer,
  },
})