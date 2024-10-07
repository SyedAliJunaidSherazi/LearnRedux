
import tasks, {loadTask, getTasksAction, addTaskAction, removeTaskAction , completeTaskAction, fetchTasks, addTask, updateTask, deleteTask} from "./configureStore/tasks";
import { addEmployeeAction } from "./configureStore/employees";
import store from "./configureStore/store";
import axios from "axios";
import { apiCallBegan } from "./configureStore/api";

/// Note: Redux Tool Kit is better to use as compared to Redux Core as we already learned abour redux core and know how things work. So there is no need to write boiler plate for reducers, actions, dispatchers , store configuration, slices(combination of reducers and actions) and much more. we can use redux tool kit for that.

// we can do like this byt it is not a good thing to do, instead, we should create seprate actions
// store.dispatch({type:"ADD_TASK", payload: {task: "TASK 1"}});
// console.log(store.getState());

// store.dispatch({type: "REMOVE_TASK", payload: {id: 1}});
// console.log(store.getState());


// Subscribe is a method of store that accepts the call back function and is called everytime, the state is chnaged in store (just like when we subsribe youtube channel, we gets notified, everytime a new video comes)
// store.subscribe(() =>{

//     console.log("Updated", store.getState());

// })

// Subscribe also comes with unsubsribe, when we call it, it will not notify us about anny state change or update.
// const unsubscribe = store.subscribe(()=>{

//     console.log("Updated", store.getState());

// });

// // here is how we call it.
// unsubscribe();




// We have direclty passed the action functions to dispatch to get the updated state from store.

// Implementation when using Redux Core

// store.dispatch(addTaskAction("Task 1"));
// store.dispatch(addTaskAction("Task 2"));
// console.log(store.getState());

// store.dispatch(completedTaskAction(2));
// console.log(store.getState());

// store.dispatch(removeTaskAction(1));
// console.log(store.getState());


// Implementation using Redux ToolKit

// we can pass a payload object in the created action instead of passing it as String

// store.dispatch({type:"SHOW_ERROR", payload:{error:"User not found"}});
// store.dispatch(addEmployeeAction({name:"Syed Ali Junaid"}));
// console.log(store.getState());

// store.dispatch(addTaskAction({task:"Task 1"}));
// store.dispatch(addTaskAction({task:"Task 2"}));
// console.log(store.getState());

// store.dispatch(completeTaskAction({id:2}));
// console.log(store.getState());

// store.dispatch(removeTaskAction({id:1}));
// console.log(store.getState());



// Note: We have three ways to make api request to backend using redux:
// 1: using normal function and use either fetch or axios
//2: using AsyncThunk which is the default middleware from redux toolkit
//3 using customized middlwares for api request.

// 1: Using Method No 1: (Normal Api Function using Axios)

// const gettingTasks = async () =>{

//     try{
//         const response = await axios.get("http://localhost:5000/api/tasks");
//         console.log(response);
//         store.dispatch(getTasksAction({tasks: response.data}));

//     }
//     catch(error){

//         // in case of error, e will utilize our error middlware for displaying errors
//         store.dispatch({type:"SHOW_ERROR", payload: {error: error.message}})

//     }

// }
// gettingTasks();

// Using Method 2: (dispatching Async Thunk action created in index.js to fetch tasks)

// passed the action to dispatch to make api call to backend
// store.dispatch(fetchTasks())

// Using Method 3: (dispatcing the action of custom middleware api created inside api.js)


console.log(getTasksAction());

// now we can direcly dispatch directly action creator which will return multple actions

// dispatching action for fetching tasks
store.dispatch(loadTask());

// dispatching action for adding tasks
store.dispatch(addTask({task: "This is new redex course"}));

// dispatching action for updating task
store.dispatch(updateTask({id:4, completed: true}));

// dispatching action for deleting task

store.dispatch(deleteTask({id:5}))




// // we can wrap our action inside this general action.
// store.dispatch(
//     // general action function
//     apiCallBegan({
//         url:"/tasks",
//         // onSuccess:"/tasks/getTasksAction",
//         // onError:"SHOW_ERROR"
//         // we can now user a parm callee onstart to dispatch the action of apiReuqest
//         onStart:"tasks/apiRequested",
//         onSuccess: getTasksAction.type,
//         //    onError: "SHOW_ERROR",
//         // we can pass our action in slice to be dispatched in case of error
//         onError: "tasks/apiRequestFailed"
    
//     }),
 
// )

// this will dispatch the action for fetching tasks using middlware api and will dispatch action in the slice.

// store.dispatch({type: "apiRequest", payload: {
//     url:"/tasks",
//     // onSuccess:"/tasks/getTasksAction",
//     // onError:"SHOW_ERROR"
//     // we can now user a parm callee onstart to dispatch the action of apiReuqest
//     onStart:"tasks/apiRequested",
//     onSuccess: getTasksAction.type,
//     //    onError: "SHOW_ERROR",
//     // we can pass our action in slice to be dispatched in case of error
//     onError: "tasks/apiRequestFailed"

// }})




