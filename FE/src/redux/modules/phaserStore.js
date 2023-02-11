import { createSlice } from "@reduxjs/toolkit";

export const phaserStore = createSlice({
    name: 'phaser',
    initialState: {
        scene: "",
        store: -1,
        table: -1, 
        seat: -1,
    },
    reducers: {
        getScene: (state, action) => {
            state.scene =  action.payload;
        },
        getTableSeat: (state, action) => {
            state.table = action.payload.table;
            state.seat = action.payload.seat
        }
    }
})

export const phaserActions = phaserStore.actions

export default phaserStore.reducer