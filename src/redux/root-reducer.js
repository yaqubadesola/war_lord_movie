import { combineReducers } from "redux";
import { moviesReducer } from "./moviesReducer";

const rootReducers = combineReducers({
    movies: moviesReducer
})

export default rootReducers;