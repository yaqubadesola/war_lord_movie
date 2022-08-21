import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchMovies, getSingleMovie } from '../redux/moviesActions';

function Home(props) {
  const [selectedMovie, setSelectedMovie] = useState("");
  let tempMovies = useRef()
  let dispatch = useDispatch()
  const moviesData = useSelector(state => state.movies)
  const selectedData = useSelector(state => state.movies.selected_movie)
  const { isLoading, movies } = moviesData

  function getAllMovies() {
      dispatch(fetchMovies())
  }
  
  tempMovies.current = getAllMovies
  useEffect(() => {
    tempMovies.current()
  },[props])
  console.log("1st all movies", movies.results);
  function handleMovieSelect(e) {
    console.log("Selected movie", e.target.value);
    const movieSel = e.target.value;
    //const citiesSel = countrySel !== "" ? countries[countrySel] : [];
    setSelectedMovie(movieSel);
    dispatch(getSingleMovie(e.target.value))
  }

    const getMovieList = (allmovies) => {
        
         const moviesList = allmovies? Object.keys(allmovies).map(key => ({
            name: allmovies[key]['title']
        })) : "";
        console.log("moviesList = ", moviesList)
        return moviesList ? 
        <select
            name="movies"
            onChange={e => handleMovieSelect(e)}
            value={selectedMovie}
        >
        <option value="">Select the country</option>
        {moviesList.map((movie, key) => (
        <option key={key} value={key}>
            {movie.name}
        </option>
        ))}
    </select> : ""
         
    }
    
    
    const renderTableData = (data) => {
        console.log("Selected movie = ", data);
        return data.map((movie, index) => {
           const { skin_color, name, gender, height, hair_color } = movie //destructuring
           return (
              <tr key={index}>
                 <td>{name}</td>
                 <td>{gender}</td>
                 <td>{skin_color}</td>
                 <td>{hair_color}</td>
                 <td>{height}</td>
              </tr>
           )
        })
     }
  
  return (
    <div className="App">
      <header className="App-header">
       <h1>My Header</h1>

        <div className="Container">
        {getMovieList(movies.results)}
        </div>
      </header>
      {selectedData? 
        <div>
            <h1 id='title'>Characters in {selectedData.title}</h1>
            <h4 id='title2'>{selectedData.opening_crawl}</h4>
            <table id='characters'>
                <thead>
                    <th>Name</th>
                    <th>Gender</th>
                    <th>Skin Color</th>
                    <th>Hair Color</th>
                    <th>Height</th>
                </thead>
               <tbody>
                  {renderTableData(selectedData.characters)}
               </tbody>
            </table>
        </div>
        :""}
    </div>
  );
}

export default Home;
