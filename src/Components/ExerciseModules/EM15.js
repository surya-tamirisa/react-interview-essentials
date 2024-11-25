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