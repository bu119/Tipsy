import { configureStore } from "@reduxjs/toolkit";
import phaserStoreReducer from "./reducer/phaserStore";
// import userStoreReducer from "./modules/userStore";

const store =  configureStore({
    reducer: {
        phaser: phaserStoreReducer,
    }
})

export default store;