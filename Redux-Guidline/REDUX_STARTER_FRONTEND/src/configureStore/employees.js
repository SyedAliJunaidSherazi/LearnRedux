import { createSlice } from "@reduxjs/toolkit";


let id =0;

const employeeSlice = createSlice({
    name:"employees",
    initialState: [],
    reducers:{
        addEmployeeAction: (state, action)=>{
            state.push({
    
                id: ++id,
                name: action.payload.name,
    
            })
    
        }

    }
   
})

export const {addEmployeeAction} = employeeSlice.actions;
export default employeeSlice.reducer;