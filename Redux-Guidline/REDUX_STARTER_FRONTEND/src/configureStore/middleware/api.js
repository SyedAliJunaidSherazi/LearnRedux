import axios from "axios";
import { apiCallBegan } from "../api";
// we have created a custom middleware for api call instead of directly using aysnc thunk from redex toolkit.
// we can extract dispatch from action parm using object destructering and can utlize it to dispatch the action after successfully get data from backend. incase of error, we will dispatch action for error.

const api = ({dispatch}) => next => async action=> {

    // if(action.type!=="apiRequest"){
    //     return next(action);

    // }
    
    // after creating a  api begen action creator, we can directly pass it and the middleware will be called based on apiBegin type

    if(action.type!== apiCallBegan.type){
        return next(action);

    }
    // we are using object destructuring to get all the neccaey things  from the payload that has been provide to use while dispatching the action from index.js file
    // so the single diapatch is handling multiple actions and dispatching them due to the use of middleware api call as it is present between  action and reducers
    const {url, method, onStart, data, onSuccess, onError} = action.payload;

    // in case of onStart action, it will dispatch its action from the slice and will utilize apiRequested action defined inside the slice inside the store.
    if(onStart){
        dispatch({type:onStart})
    }

    try{

        const response = await axios.request({
            baseURL:"http://localhost:5000/api",
            url,
            method,
            data
        
        });
        dispatch({type:onSuccess, payload:response.data });
      

    }catch(error){
        if(onError){
            dispatch({type:onError, payload: error.message});

        }
    
    }


}

export default api;