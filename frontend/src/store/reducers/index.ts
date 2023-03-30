import { combineReducers } from "@reduxjs/toolkit";
import { authenticationReducer } from "./authentication";

export const rootReducer = combineReducers({
    authentication: authenticationReducer,
})