/*
Question: Create a React component to manage a movie watchlist.

Requirements:
1. The component should allow users to:
   - Add new movies to the watchlist by entering a title.
   - Mark movies as "Watched" or "Unwatched."
   - Delete all watched movies from the list.

2. The watchlist should:
   - Display each movie's title along with a button to toggle its watch status.
   - Dynamically update based on user interactions.

3. Provide functionality to:
   - Add movies with unique identifiers.
   - Toggle the status of individual movies between "Watched" and "Unwatched."
   - Remove all movies marked as "Watched" in a single action.
*/

import { useReducer, useState } from "react";

const initialState = {
    moviesList: []
}

const stateReducer = (state, action) => {
    switch(action.type){
        case 'ADD_MOVIE':
            let movie = action.payload.movie;
            return {
                ...state, moviesList: [...state.moviesList, movie]
            }
            break;
        case 'MOVIE_STATUS_CHANGE':
            let id = action.payload.id;
            let status = action.payload.status;
            let newMoviesList = state.moviesList.map((movie) => {
                if(movie.id === id)
                    return {...movie, isWatched:status}
                else return movie;
            })
            return {
                ...state, moviesList: [...newMoviesList]
            }
            break;
        case 'DELETE_WATCHED_MOVIES':
            let newList = state.moviesList.filter(movie => !movie.isWatched);
            return {
                ...state,
                moviesList: [...newList]
            }
        default:
            return state;
    }
}

const EM18 = () => {

    const [state, dispatch] = useReducer(stateReducer, initialState);
    const [text, setText] = useState('');

    const handleMovieWatchState = (status, id) => {
        dispatch({ type: 'MOVIE_STATUS_CHANGE', payload: {id, status}})
    }

    const addNewMovieHandler = () => {
        let movie = {
            id: Math.random()*1234/74*234/34,
            title: text,
            isWatched: false
        }
        setText('');
        dispatch({ type: 'ADD_MOVIE', payload: {movie}})
    }

    const handleDelete = () => {
        dispatch({ type: 'DELETE_WATCHED_MOVIES', payload: {}})
    }

    return (<div>
        <label>Enter Movie Name to add:</label>
        <input value={text} onChange={(e) => setText(e.target.value)}></input>
        <button onClick={() => addNewMovieHandler()}>Add Movie</button>
        {state.moviesList.length > 0 && <h4>Your Watch List:</h4>}
        {state.moviesList.map(movie => {
            return (
                <div key={movie?.id} style={{display:'flex', gap:'10px', margin:'20px'}}>
                    <div>{movie?.title}</div>
                    <button
                        onClick={() => handleMovieWatchState(!movie.isWatched, movie.id)}
                        >{movie?.isWatched ? 'Mark as Unwatched' : 'Mark as Watched'}</button>
                </div>
            )
        })}
        <h4>Danger Zone</h4>
        <div>
            Delete watched movies from list:
            <button onClick={() => handleDelete()}>Delete</button>
        </div>
    </div>);
}

export default EM18;