
import * as actionTypes from "./actionTypes";
// we have created  a root reducer for our todo task whuch will handle two actions currently, and will return thr updated state.
let id =0
export default function reducer(state=[], action){
    switch(action.type){

        case actionTypes.ADD_TASK:
            return [
                ...state,
                {
                    id: ++id,
                    task: action.payload.task,
                    completed:false
                }
            ]

        
        case actionTypes.REMOVE_TASK:
            return [
                state.filter(task=> task.id !== action.payload.id)
            ]

        
        case actionTypes.COMPLETE_TASK:

            return state.map(task =>
                task.id === action.payload.id
                    ? { ...task, completed: true }
                    : task
            );

        default:

        return state


    }


    // we can also use if-else for conditions

    // if(state.type=="ADD_TASK"){
    //     return [
    //         ... state,
    //         {
    //              id: ++id,
    //             task: state.payload.task,
    //             completed:false
    //          }
    //     ]
    // }else if(state.type=="REMOVE_TASK"){

    //     return [
    //              state.filter(task=> task.id !== state.payload.id)
    //             ]
        
        
    // }

    // return state;

}