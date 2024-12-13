/**
 * Debounced Search Challenge
 * 
 * Problem Statement:
 * Create a Search Component in React that:
 * 1. Includes an input field where the user can type.
 * 2. Displays a list of matching results based on the search term 
 *    from the Rick and Morty API: https://rickandmortyapi.com/api/character/?name=.
 * 3. Implements debouncing to avoid sending API requests on every keystroke.
 * 4. Displays appropriate messages for:
 *    - "Loading..." while fetching.
 *    - "No results found." if the API returns no data.
 *    - "Error occurred." for failed requests.
 *
 * API Details:
 * - Base URL: https://rickandmortyapi.com/api/character/
 * - Query Parameter: name=<search_term>
 * 
 * Requirements:
 * - Use useEffect to handle the API call.
 * - Implement debouncing logic with setTimeout and clearTimeout.
 * - Ensure no redundant API calls are made while typing.
 * - Display the character name and image in the results.
 * 
 * Expected Output:
 * 1. Typing "rick" should fetch characters like "Rick Sanchez."
 * 2. If the user clears the input, the results should reset.
 * 3. If no results are found, show "No results found."
 */


import React, { useEffect, useRef, useState } from 'react'

const RICK_AND_MORTY_URL = 'https://rickandmortyapi.com/api/character/';

const CharacterCard = React.memo(({character}) => {
    return (
        <>
            <h3>{character.name}</h3>
            <img src={character.image} width={100} height={100}></img>
            <div>{character.species}</div>
        </>
    )
})

export default function AM2() {
    const [count, setCount] = useState(0);
    const [searchTerm, setSearchTerm] = useState();
    const timerIdRef = useRef(null);
    const [charactersList, setCharactersList] = useState();

    useEffect(() => {
        timerIdRef.current = setTimeout(() => {
            searchTerm && makeAPICall()
        }, 1000);
        return () => {
            clearTimeout(timerIdRef.current);
            timerIdRef.current = null;
        }
    }, [searchTerm]);

    const makeAPICall = async () => {
        setCount(p => p+1);
        const res = await fetch(`${RICK_AND_MORTY_URL}?name=${searchTerm}`);
        const data = await res.json();
        setCharactersList(data.results);
    }

    return (
        <div>
            <label>Enter Search term here:</label><input value={searchTerm || ''} onChange={((e) => setSearchTerm(e.target.value))}></input>
            <h6>API called: {count} times</h6>
            {charactersList && <h2>Characters: </h2>}
            {charactersList && charactersList?.map(character => <CharacterCard key={character.id} character={character} ></CharacterCard>)}
        </div>
    )
}

