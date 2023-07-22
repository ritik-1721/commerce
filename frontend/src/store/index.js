import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./slice";

const store = configureStore(rootReducer);

export default store;
