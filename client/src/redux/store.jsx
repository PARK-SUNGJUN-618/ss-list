import ssPortfolioSlice from "./ssPortfolioSlice";
import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";

const reducer = combineReducers({
  ssPortfolio: ssPortfolioSlice,
});

const store = configureStore({
  reducer,
});

export default store;