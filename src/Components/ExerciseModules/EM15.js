/*
Question: Create a React component to simulate a voting system.

Requirements:
1. The component should:
   - Display a list of contestants with their details (name, age, ID, current vote count).
   - Provide controls for upvoting and downvoting each contestant.

2. Voting functionalities:
   - Increment or decrement the vote count for each contestant.
   - Prevent vote counts from going below zero.

3. Election controls:
   - A "Reset Election" button to reset all vote counts to zero.
   - A "Finalize Election" button to determine and display the contestant with the highest votes.

4. Display the winner:
   - Show the winner's name when the election is finalized.
   - Update dynamically if votes change before finalization.
*/

import React, { createContext, useContext, useEffect, useReducer } from "react";

const initialState = {
    list: [],
    winner: null
}

const VotingContext = createContext();

const contestants = [
    {
        id: 152,
        name: 'Doland Jump',
        age: 75
    },
    {
        id: 982,
        name: 'Boe Jiden',
        age: 80
    },
    {
        id: 763,
        name: 'Qamala Yaris',
        age: 55
    },
    {
        id:45,
        name: 'Barake Omama',
        age: 55
    }
]


const votingReducer = (state, action) =>{
    let candidateId = action.payload.id;
    switch(action.type){
        case 'UPVOTE':
            if(candidateId){
                let newList = state.list.map(cand => {
                    if(cand.id === candidateId)
                        return {...cand, votes: cand.votes + 1}
                    else return cand;
                })
                return {
                    ...state, list: [...newList], winner: null
                }
            }
            break;
        case 'DOWNVOTE':
            if(candidateId){
                let newList = state.list.map(cand => {
                    if(cand.id === candidateId)
                        return {...cand, votes: (cand.votes - 1) >0 ? cand.votes - 1 : 0}
                    else return cand;
                })
                return {
                    ...state, list: [...newList], winner: null
                }
            }
            break;
        case 'RESET':
            let newList = state.list.map(cand => {
                return {...cand, votes: 0}
            })
            return {
                ...state, list: [...newList], winner: null
            }
            break;
        case 'FINALIZE':
            let lead = state.list[0]
            state.list.forEach(cand => {
                if(cand.votes > lead.votes)
                    lead = {...cand};
            });
            return {
                ...state, winner: {...lead}
            }
            break;
        case 'SET_LIST':
            return {
                ...state, list: action.payload.newList
            }
        default:
            return state;
            break;
    }
}

const VoterCard = React.memo(({voter}) => {
    const {dispatch} = useContext(VotingContext);
    return (
        <div style={{ display: 'flex', justifyContent:'space-evenly', alignItems:'center', gap:'15px'}}>
            Contestant:
            <h3>Name: {voter.name}</h3>
            <div>Age: {voter.age}</div>
            <div>Cand ID: {voter.id}</div>
            <h4>CurrentVotes: {voter.votes}</h4>
            <button onClick={() => dispatch({type: 'UPVOTE', payload:{id: voter.id}})}>Upvote</button>
            <button onClick={() => dispatch({type: 'DOWNVOTE', payload:{id: voter.id}})}>Downvote</button>
            <br></br>
            <br></br>
            <br></br>
        </div>
    )
})

const EM15 = () => {
    const [state, dispatch] = useReducer(votingReducer, initialState);

    useEffect(() => {
        let newList = contestants.map(c => {return {...c, votes:0}})
        dispatch({type: 'SET_LIST', payload:{newList: newList}})
    }, []);

    return (
        <VotingContext.Provider value={{dispatch, state}}>
            {state?.list?.map(cand => <VoterCard key={cand.id} voter={cand}></VoterCard>)}
            <button onClick={() => dispatch({type: 'RESET', payload:{}})}>Reset Election</button>
            <button onClick={() => dispatch({type: 'FINALIZE', payload:{}})}>Finalize Election</button>
            {state.winner && <h1>We have a winner: {state.winner.name} </h1>}
        </VotingContext.Provider>
    );
}

export default EM15;