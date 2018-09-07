const INITIAL_STATE = {
    timesButtonHasBeenHit: "DONT DO IT!"
};

const ADD_ANOTHER_HIT = "ADD_ANOTHER_HIT"

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case ADD_ANOTHER_HIT: 
            return {...state, timesButtonHasBeenHit: state.timesButtonHasBeenHit + 'STOP!!'}
        
            default: return state;
    }
}

export function addStop(){
    return {
        type: ADD_ANOTHER_HIT,
        payload: null
    }
}