/// This the implementation of Actions, and reducers using redux Core.
// Instead of setting action types, in every file, we can make action tyoes file adn define all out actions here so that they can be used from here and we can to chnage values in only one file incase of any change

// // Action Types
// export const ADD_TASK ="ADD_TASK";
// export const REMOVE_TASK = "REMOVE_TASK";
// export const COMPLETE_TASK = "COMPLETE_TASK";

// // Actions
// export const addTaskAction
//   = (task) =>{
//     return {type:ADD_TASK, payload: {task:task}};
//  }

//  export const removeTaskAction = (id) =>{
//     return {type:REMOVE_TASK, payload:{id: id}};
//  }

//  export const completedTaskAction = (id) =>{
//     return {type:COMPLETE_TASK, payload:{id:id}};
//  }

//  // Reducers
//  let id =0
// export default function reducer(state=[], action){
//     switch(action.type){

//         case ADD_TASK:
//             return [
//                 ...state,
//                 {
//                     id: ++id,
//                     task: action.payload.task,
//                     completed:false
//                 }
//             ]

        
//         case REMOVE_TASK:
//             return [
//                 state.filter(task=> task.id !== action.payload.id)
//             ]

        
//         case COMPLETE_TASK:

//             return state.map(task =>
//                 task.id === action.payload.id
//                     ? { ...task, completed: true }
//                     : task
//             );

//         default:

//         return state


//     }
// }


/// This is the implementation of Actions and Reducers using Redux toolkit. 

// Instead of setting action types, in every file, we can make action tyoes file adn define all out actions here so that they can be used from here and we can to chnage values in only one file incase of any change

/// Note: for redux toolkit, we don't have to define action types, actions and reducers manually, instead we will use built in redux tool kit methods and functions.


// import to create actions using redux tookkit (we not using slice)
// import { createAction, createReducer } from "@reduxjs/toolkit";


// import slice when we have multiple reducers for multiple purposes.
// import asnyc Thunk method to create aync action for making api request to backend
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { apiCallBegan } from "./api";
import axios from "../utils/http";





// Actions using Redux ToolKit

// Note: we can crete actions if we have samll appp, else no nedd to create them, we can use slices and can export our actions using specifc slice.
// this function takes the string or number as  action type

// export const addTaskAction = createAction("ADD_TASK");
// export const removeTaskAction = createAction("REMOVE_TASK");
// export const completeTaskAction = createAction("COMPLETE_TASK");

// Note: The Second Method for async api calls to backend is to use AsyncThunk, which is the default action from redux toolkit.
// we can use it to create our desired async action to backend which we can later dispatch where we are making api request.
// the Async Thunk action has three sub Actions as follow:
//1: Pending: (when it awaits for response from backend, at this action, we can show our loading spinner)
// 2: Fullfilled: (when we gets succeffull response from backend, at this time, we updates the state in the store and can show sucess message)
// 3: Rejected: (when we gets error from backend or the api request fails> we can show error message in this case)

// Creating a  Async Thunk Action for getting tasks from backend
// first parm is name of action and the second param is callback function

// For handling loading state and error, we can utilize the three sub action of async thunk acton by making a intial state object and later we can update it in the exta reducer acoording to our requirement

const initialState = {
  tasks: [],
  loading: false,
  error: null,
}

// we can create it this exportable method individually using createAsyncThunk for making request to bakend which and utilizing it to control the sub actions in the extra reducers inside slice.
// export const fetchTasks = createAsyncThunk("fetchTasks", async(a,{rejectWithValue})=>{

//   try{
//     // utilizing instance of axios and using baseurl 
//     const response = await axios("/tasks");
//     // action always returns payload that the reducers utilize
//     return {tasks: response.data};

//   }catch(error){
//     // in case of error, we will return error payload which will be utilized in the sub action reducer
//     return rejectWithValue({error:error.message});

//   }

// })



// We can create a single slice for a specific purpose which will have all our actions and reducer cases
// and then we can simple export all our actions and root reducer for a specifc slice easily, instead og creating them indivdually.

let id =0;
const taskSlice = createSlice({
    name: "tasks",
    // initialState: [],
    // we can pass intial state object here, if name is same we can pass by name only
    initialState,
    reducers: {
      // we can also ulize high order(that returns another function) connect action function or simply call it an action that will recieve the state from the store when it dispatched
      // this action will first dispatched untill the middlware api fetches tasks from backend.
      apiRequested: (state, action) =>{
        // at start, it will be true as long as we dont get any tasks from rhe backend,
        state.loading = true;

      },
      //we can also created another high order action function that be dipatched incase of any error.
      apiRequestFailed: (state, action) =>{
        state.loading= false;
      },
      // made another action for that will update the tasks state with all the tasks getting returned from backend as we will dispatch this action as soon as we get response from backend.
      getTasksAction: (state, action)=>{
    

        // we will now jus update the task list with the current
        // state.tasks = action.payload.tasks;

        // as we are directly passsing tasks inside payload in the the api middlware, we can use it directly
         state.tasks = action.payload;
         // in case of using apiRequest connect function, we can set it to false as this action will be dispatched from middlware after getting tasks from bakend.
         state.loading = false;

        // return action.payload.tasks;
      },
        addTaskAction
        : (state, action)=>{
            // state.push({
            //             id: ++id,
            //             task: action.payload.task,
            //             completed: false
            //           });

            // case when we are not using action creatot
            // state.tasks.push({
            //             id: ++id,
            //             task: action.payload.task,
            //             completed: false
            //           }); 
            
            // if we have action creator for add task, then we simply add the returned task payload into thr store to update the state

            state.tasks.push(action.payload);
        },
        removeTaskAction: (state, action) =>{
            // const index = state.findIndex(task => task.id === action.payload.id);
            //       if (index !== -1) {
            //         state.splice(index, 1);
            //       }

            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if (index !== -1) {
              state.tasks.splice(index, 1);
            }
        },
        completeTaskAction: (state, action) =>{
            // const index = state.findIndex(task => task.id === action.payload.id);
            //       if (index !== -1) {
            //         state[index].completed = true;
            //       }

            const index = state.tasks.findIndex(task => task.id === action.payload.id);
                  if (index !== -1) {
                    // state.tasks[index].completed = true;
                    // now, we can set the task status dynammically based on our object being dispatched
                    state.tasks[index].completed = action.payload.completed;
                    
                  }
        }
    },
    // we can register the reducers for handling 3 sub action of our any specifc async think action in extra reducer object
    // extraReducers: (builder) => {
    //   builder
    //     .addCase(fetchTasks.pending, (state) => {
    //       state.loading = true;
    //     })
    //     .addCase(fetchTasks.fulfilled, (state, action) => {
    //       state.tasks = action.payload.tasks;
    //       state.loading = false;
    //     })
    //     .addCase(fetchTasks.rejected, (state, action) => {
    //       state.error = action.payload.error;
    //       state.loading = false;
    //     });
    // }
    

});

export const { apiRequested, apiRequestFailed, getTasksAction, addTaskAction, removeTaskAction, completeTaskAction} = taskSlice.actions;
export default taskSlice.reducer;

const url = "/tasks";
// we can create action creators for creating multiple actions for specific reason instead of dispatc
export const loadTask = () =>

 
  // return general action function in our action creator
  apiCallBegan({
      url:url,
      // onSuccess:"/tasks/getTasksAction",
      // onError:"SHOW_ERROR"
      // we can now user a parm callee onstart to dispatch the action of apiReuqest
      onStart:apiRequested.type,
      onSuccess: getTasksAction.type,
      //    onError: "SHOW_ERROR",
      // we can pass our action in slice to be dispatched in case of error
      onError: apiRequestFailed.type

  });

  // we can create another action creator for add task using same staratery by wraping out object inside high order function

  export const addTask = (task) =>
    apiCallBegan({
      url,
      method: "POST",
      data: task,
      onSuccess: addTaskAction.type

    });

      // we can create another action creator for update task using same strategy by wraping out object inside high order function

      export const updateTask = task => apiCallBegan({
        url: `${url}/${task.id}`,
        method: "PATCH",
        data: task,
        onSuccess: completeTaskAction.type,
      })

       // we can create another action creator for deleting task using same strategy by wraping out object inside high order function
       export const deleteTask = task => apiCallBegan({
        url: `${url}/${task.id}`,
        method: "DELETE",
        onSuccess: removeTaskAction.type,
      })






//Note: we can crete reducers individually if we have samll appp, else no nedd to create them, we can use slices and can export reducer using our specific slice
// Creating Reducers using function from redux toolkit. in the latest redux toolkit version.
// we use builder notation to add multiple cases inside our root reducer.

// let id = 0;

// export default createReducer([], (builder) => {
//   builder
//     .addCase(addTaskAction.type, (state, action) => {
//       state.push({
//         id: ++id,
//         task: action.payload.task,
//         completed: false
//       });
//     })
//     .addCase(removeTaskAction.type, (state, action) => {
//       const index = state.findIndex(task => task.id === action.payload.id);
//       if (index !== -1) {
//         state.splice(index, 1);
//       }
//     })
//     .addCase(completeTaskAction.type, (state, action) => {
//       const index = state.findIndex(task => task.id === action.payload.id);
//       if (index !== -1) {
//         state[index].completed = true;
//       }
//     });
// });


 // Reducers using Redux core
//  let id =0
// export default function reducer(state=[], action){
//     switch(action.type){

//         // we can use .type property to get the type of any action
//         case addTaskAction.type:
//             return [
//                 ...state,
//                 {
//                     id: ++id,
//                     task: action.payload.task,
//                     completed:false
//                 }
//             ]

        
//         case removeTaskAction.type:
//             return [
//                 state.filter(task=> task.id !== action.payload.id)
//             ]

        
//         case completeTaskAction.type:

//             return state.map(task =>
//                 task.id === action.payload.id
//                     ? { ...task, completed: true }
//                     : task
//             );

//         default:

//         return state


//     }
// }

