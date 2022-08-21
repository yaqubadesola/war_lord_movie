


import {
    MOVIES_FETCH_REQUEST,
    MOVIES_FETCH_ERROR,
    MOVIES_FETCH_SUCCESS,
    SELECTED_MOVIE,
    SELECTED_MOVIES_XTERS
} from './moviesActionTypes';

const initialState = {
    isLoading: true,
    movies: [],
    selected_movie: null,
    error: ""
}
const moviesReducer = (state = initialState, action) => {
    switch (action.type) {
        case MOVIES_FETCH_REQUEST:
            return {
                ...state,
                isLoading: true
            }

        case MOVIES_FETCH_SUCCESS:
            return {
                ...state,
                isLoading: false,
                movies: action.payload
            }
        case MOVIES_FETCH_ERROR:
            return {
                movies: [],
                isLoading: false,
                error: action.payload
            }
        case SELECTED_MOVIE:
            return {
                ...state,
                isLoading: false,
                selected_movie: action.payload
            }
      
        default:
            return state
    }
}

export { moviesReducer }