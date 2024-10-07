/// Configuration of Redux Store and Redux Dev Tools using Redux Core.


// import {createStore } from "redux";
// import reducer from "./tasks";
// // using devToolsEnhancer for enabling trace
// import {devToolsEnhancer} from "redux-devtools-extension";
// // created a redux store using root reducer ( root  reducer is a function that is the combination of all reducers, curretky we have only one reducer, so it will be our root reducer.)
// // the second param will check if the redux dev tool is available , and if yes, it will connect our app to redux dev tool extension used for redux debugging.

// // This is one way to configure redux dev tools but without enabling trace.
// // const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

// // this is the more optimal way of using redux dev tool by also enabling trace for debugging purposes.
// const store = createStore(reducer, devToolsEnhancer({trace: true}));

// // we can siimply export our store and use it and its methods such as dispatch, getState, replace reducer, subscribe etc
// export default store;


/// Configuration of Redux Store and Redux Dev Tools using Redux Tool Kit.

// Note: When using redux tool kit, we dont need to import create store and import dev tool enhancer to configure redux dev tools.
// Redux Tool Kit automatically configured dipatchers for async api calls, redux dev tool extension and provide a method of configure store to configure redux store.



import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./tasks";
import employeesReducer from "./employees";
// import {log} from "./middleware/logs"

// we can use library for logs

import {logger} from "redux-logger";
import {error} from "./middleware/error";
import api from "./middleware/api";



// when we use single reducer, then we can pass either of the reducer to the store. 
// But when we have multiple reducer , there are two ways to handle it.
// No 1 way (with redux core)
// if we are using redux core, then we can make a root reducer by importing  combineReducer function from redux and can pass mutiple reducer  inside its object and can finnally pass that combined root reducer to the store.

// import {employeeReducer} from "./employees";
// import {taskReducer} from "./tasks";
// import {combineReducer} from "redux";

// const rootReducer = combineReducer({
//     tasks: taskReducer,
//     employees: employeesReducer,
// })

// export default rootReducer;


// No 2 way (with redux toolkit)
// instead of using the combineReducer function, we can simply import multiple reducers with their names and can pass them as key valye inside the single reducer object of store.
// it has prop call reducer , but if the reducer name is same as prop, then we can only call the reducer


const store = configureStore({reducer: {
    tasks: taskReducer,
    employees: employeesReducer,

},
// this is on way of only passing our custimized middlwares.
// middleware: [log],
// we can add list of our middlewares inside the store we can include default middwares by redux toolkit, our customized middlwares such as loggers etc, muttational middlwares and middwaress for serilization
// this is one way of passing middleares using spread operators but it is nit recommended
// middleware: (getDefaultMiddleware)=> [...getDefaultMiddleware(), log],
// this is seoond way of passing middlewares using concat which is officially recommended

// middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(logger).concat(error),
// we can replace logger with our custom api middlware before error middleware
middleware: (getDefaultMiddleware)=> getDefaultMiddleware().concat(api).concat(error),

});


export default store;