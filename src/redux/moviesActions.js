import {
    MOVIES_FETCH_REQUEST,
    MOVIES_FETCH_ERROR,
    MOVIES_FETCH_SUCCESS,
    SELECTED_MOVIE,
    SELECTED_MOVIES_XTERS
} from './moviesActionTypes';

import axios from 'axios';

const fetchRequest = () => {
    return {
        type: MOVIES_FETCH_REQUEST
    }
}

const fetchRequestSuccess = movies => {
    return {
        type: MOVIES_FETCH_SUCCESS,
        payload: movies
    }
}

const fetchRequestError = error => {
    return {
        type: MOVIES_FETCH_ERROR,
        payload: error
    }
}



const getOneMovie = movie => {
    return {
        type: SELECTED_MOVIE,
        payload: movie
    }
}


//axios and Thunk API CALL happens here
const fetchMovies = () => {
    return (dispatch) => {
        dispatch(fetchRequest)
        axios.get(`${process.env.REACT_APP_ENPOINT}`)
            .then(response => {

                dispatch(fetchRequestSuccess(response.data))
            })
            .catch(response => {
                const error = response.message
                dispatch(fetchRequestError(error))

            })

    }
}

const fetchAllXters = async (xtersEndPoints) => {
    
    try {
      const res = await Promise.all(xtersEndPoints.map(item =>axios.get(item)
    ));
    
      const data = res.map((res) => res.data);
      return data
    } catch {
      throw Error("Promise failed");
    }
};

//axios and Thunk API CALL happens here
const getSingleMovie = id => {
    console.log("Got here = ",id);
    return (dispatch) => {
        dispatch(fetchRequest)

             axios.get(`${process.env.REACT_APP_ENPOINT}`)
            .then(response => {
                //
                const allData = response.data.results;
                const singleMovie  =  allData.filter((item,key) => key == id)
                if (singleMovie){
                    //const xtersDetails = fetchAllXters(singleMovie[0].characters)
                   
                    //   Promise.all()
                    //   .then(response => {
                    //     const data = result.map((res) => res.data);
                    //     if(data){
                    //         singleMovie[0].characters = data
                    //         //console.log("new single Data = ",singleMovie[0]);
                    //         dispatch(getOneMovie(singleMovie))
                    //     }
                    //   }).catch(response => {
                    //     throw Error("Promise failed");
                    //   }) 
                    console.log("new single Data = ",singleMovie[0]);
                    Promise.all(singleMovie[0].characters.map(item =>axios.get(item)
                    )).then(function (responses) {
                        // Get a JSON object from each of the responses
                        return Promise.all(responses.map(function (response) {
                            return response.data;
                        }));
                    }).then(function (data) {
                        singleMovie[0].characters = data
                        console.log("new single Data = ",singleMovie[0]);
                        dispatch(getOneMovie(singleMovie[0]))
                    }).catch(function (error) {
                        // if there's an error, log it
                        console.log("Error data could not be loaded ", error);
                    });
                   
                }
               
            })
            .catch(response => {
                const error = response.message
                dispatch(fetchRequestError(error))

            })

    }
}





//axios and Thunk API CALL happens here


//axios and Thunk API CALL happens here

export { getSingleMovie,fetchRequestError, fetchRequest, fetchRequestSuccess, fetchMovies }