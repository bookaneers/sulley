import { createSlice } from "@reduxjs/toolkit";
import { validateEmployee } from "../thunks/employees";

export const employeesSlice = createSlice({
    name:'employees',
    initialState: {
        actions:{},
        employee:{},
        loading:true
    },
    reducers: {},
    extraReducers:(builder)=>{
        builder
        .addCase(validateEmployee.pending,(state)=>{
            state.loading = true
        })
        .addCase(validateEmployee.rejected,(state)=>{
            state.loading = false
        })
        .addCase(validateEmployee.fulfilled,(state)=>{
            state.loading = false
        })
    }
})

// export const { addWorkerToEmployee } = employeesSlice.actions;
// export const { resetEmployee } = employeesSlice.actions;

export default employeesSlice.reducer;