
import * as actionTypes from "./actionTypes";

export const addTaskAction
  = (task) =>{
    return {type:actionTypes.ADD_TASK, payload: {task:task}};
 }

 export const removeTaskAction = (id) =>{
    return {type:actionTypes.REMOVE_TASK, payload:{id: id}};
 }

 export const completedTaskAction = (id) =>{
    return {type:actionTypes.COMPLETE_TASK, payload:{id:id}};
 }