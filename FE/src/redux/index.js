import { configureStore } from "@reduxjs/toolkit";
import phaserStoreReducer from "./modules/phaserStore";
import userStoreReducer from "./modules/userStore";

const store =  configureStore({
    reducer: {
        phaser: phaserStoreReducer,
        user: userStoreReducer
    }
})

export default store;