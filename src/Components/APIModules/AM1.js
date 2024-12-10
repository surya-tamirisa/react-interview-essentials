/**
 * React API Call Exercises:
 * 
 * Fetch and Display a Random Joke
 *    - API: https://official-joke-api.appspot.com/random_joke
 *    - Tasks:
 *        a. Fetch a random joke when the component mounts.
 *        b. Display the joke (setup and punchline).
 *        c. Add a button to fetch and display a new joke.
 *
 */

import React, { useEffect, useState } from 'react'

const URL = 'https://official-joke-api.appspot.com/random_joke';

export default function AM1() {
    const [currentJoke, setCurrentJoke] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchNewJoke = () => {
        setLoading(true);
        fetch(URL)
            .then((res) =>{
                if(!res.ok){
                    throw new Error('Something went wrong');
                }
                return res.json();
            })
            .then(data => setCurrentJoke(data))
            .catch((err) => console.error(err.message))
            .finally(() => setLoading(false))
    }

    useEffect(()=> {
        fetchNewJoke();
    }, [])

    return (
        <div>
            {loading ?  <div>Loading....</div> : <div>
                <h2>Here is a joke:</h2>
                <h6>Setup: {currentJoke?.setup}</h6>
                <h6>PunchLine: {currentJoke?.punchline}</h6>
            </div>}      
            <button onClick={fetchNewJoke}>Get a New Joke</button>
        </div>
    )
}
