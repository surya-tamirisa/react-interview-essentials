/**
 * Design and implement a simple **Online Polling System**.
 *
 * Requirements:
 * 1. Display a list of candidates with their names and current vote count.
 * 2. Provide a **"Vote" button** for each candidate.
 * 3. After clicking the **"Vote" button**, the vote count should update dynamically.
 * 4. Display the **total votes** across all candidates.
 * 5. If a candidate receives the highest number of votes, display their name 
 *    as **"Current Leader"** dynamically.
 *
 * Additional Notes:
 * - Ensure the UI updates efficiently with minimal re-rendering.
 * - Focus on maintaining a clean and modular component structure.
 *
 * Example Input:
 * Candidate List:
 * - Alice
 * - Bob
 * - Charlie
 *
 * Example Output:
 * - Alice: 2 votes
 * - Bob: 5 votes
 * - Charlie: 3 votes
 * - Total Votes: 10
 * - Current Leader: Bob
 */

import React, { useEffect, useReducer, useState } from 'react'

const CandidateComponent = React.memo(({cand, dispatch}) => {
    console.log('rendering', cand)
    return (<div>
        <h4>{cand.name}</h4>
        <div>Current Votes:{cand.votes}</div>
        <button onClick={() => dispatch({type: 'UPVOTE', payload:{id: cand.id}})}>Upvote</button>
        <button onClick={() => dispatch({type: 'DOWNVOTE', payload:{id: cand.id}})}>Downvote</button>
    </div>)
})

const candidateNames = ['Alice', 'Bob', 'Charlier', 'Dominic', 'Edward'];

const initialState = {
    candidatesList : []
}

const votingReducer = (state, action) => {
    // console.log('/received: ', action)
    let candId = action.payload.id;
    switch(action.type){
        case 'DOWNVOTE':
            if(candId){
                let newArr = state.candidatesList.map(c => {
                    if(c.id === candId)
                        return {...c, votes: c.votes - 1 > 0 ? c.votes - 1 : 0}
                    else return c;
                });
                return {...state, candidatesList: [...newArr]}
            } else return state;
            break;
        case 'UPVOTE':
            if(candId){
                let newArr = state.candidatesList.map(c => {
                    if(c.id === candId)
                        return {...c, votes: c.votes + 1}
                    else return c;
                });
                return {...state, candidatesList: [...newArr]}
            } else return state;
            break;
        case 'SET_LIST':
            return {
                ...state, candidatesList: [...action.payload.list]
            }
            break;
        default:
            return state;
    }
}

function EM24() {


    const [state, dispatch] = useReducer(votingReducer, initialState);
    const [leaderBoard, setLeaderBoard] = useState(state?.candidatesList);

    useEffect(() => {
        dispatch({type: 'SET_LIST', payload:{list: [...candidateNames.map(c => { return {id: Math.round(Math.random()*731/7), name: c, votes: 0} })]}})
    }, [])

    useEffect(() => {
        let newArr = [...state?.candidatesList];
        newArr.sort((a,b) => b.votes -a.votes)
        setLeaderBoard([...newArr]);
    }, [state?.candidatesList])

    return (
        <div style={{display: 'flex', gap: '50px'}}>
            <div>
                {state?.candidatesList?.map(cand => <CandidateComponent key={cand.id} cand={cand} dispatch={dispatch}/>)}
            </div>
            <div>
                {leaderBoard?.map(c => <div key={c.id} style={{display:'flex', gap: '25px'}}>
                    <div>Name: {c.name}</div>
                    <div>Votes: {c.votes}</div>
                </div>)}
            </div>
        </div>
    )
}

export default EM24