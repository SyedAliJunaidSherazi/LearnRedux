export const error = store=> next=> action=>{

    if(action.type=="SHOW_ERROR"){
        console.log(action.payload.error);
        // in case of error , we can pass the controll to next action and it will automaticly be dispatched from slice in case of error
        next(action);
    }
    else{
        next(action);
    }

}

