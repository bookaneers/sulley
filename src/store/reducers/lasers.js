import { createSlice } from "@reduxjs/toolkit";
import { fetchLasers, addTaskToLasers, updateJobInLasers, 
    updateJobOrderInLasers, updateJobOrderInLasers2, deleteJobInLasers } from "../thunks/lasers";

export const lasersSlice = createSlice({
    name:'lasers',
    initialState: {
        action:{},
        tasks:{
            jobs:[]
        },
        loading: false
    },
    reducers: {
        // addJobToLasers:(state, action) => {
        //     state.tasks.jobs = action.payload
        //     state.loading = true
        // },

        // updateJobInLasers:(state, action) => {
        //     state.tasks.jobs.forEach((job, index) => {
        //         if (job._id === action.payload.oneJob._id) {
        //             state.tasks.jobs[index] = action.payload.oneJob
        //         }
        //     })
        //     state.loading = true
        // }

    },
    extraReducers:(builder)=>{
        builder
        // ========== fetchParts ==========
        .addCase(fetchLasers.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchLasers.fulfilled,(state,action)=>{
            // at this point, all the database info is passed to the state
            state.tasks = action.payload
            state.loading = false
        })
        .addCase(fetchLasers.rejected,(state)=>{
            state.loading = false
        })
        
        // ========== addPartToMeros ==========
        .addCase(addTaskToLasers.pending,(state)=>{
            state.loading = true
        })
        .addCase(addTaskToLasers.fulfilled,(state, action)=>{
            state.tasks = action.payload
            state.loading = false
        })
        .addCase(addTaskToLasers.rejected,(state)=>{
            state.loading = false
        })

        // ========== updateJobInLasers ==========
        .addCase(updateJobInLasers.pending,(state)=>{
            state.loading = true
        })
        .addCase(updateJobInLasers.fulfilled,(state, action)=>{
            // state.tasks = action.payload
            state.loading = false
        })
        .addCase(updateJobInLasers.rejected,(state)=>{
            state.loading = false
        })

        // ========== updateJobOrderInLasers ==========
        .addCase(updateJobOrderInLasers.pending,(state)=>{
            state.loading = true
        })
        .addCase(updateJobOrderInLasers.fulfilled,(state, action)=>{
            // state.tasks = action.payload
            state.loading = false
        })
        .addCase(updateJobOrderInLasers.rejected,(state)=>{
            state.loading = false
        })

        
        // ========== updateJobOrderInLasers2 ==========
        .addCase(updateJobOrderInLasers2.pending,(state)=>{
            state.loading = true
        })
        .addCase(updateJobOrderInLasers2.fulfilled,(state, action)=>{
            // state.tasks = action.payload
            state.loading = false
        })
        .addCase(updateJobOrderInLasers2.rejected,(state)=>{
            state.loading = false
        })

        // ========== deleteJobInLasers ==========
        .addCase(deleteJobInLasers.pending,(state)=>{
            state.loading = true
        })
        .addCase(deleteJobInLasers.fulfilled,(state, action)=>{
            // state.tasks = action.payload
            state.loading = false
        })
        .addCase(deleteJobInLasers.rejected,(state)=>{
            state.loading = false
        })

    }
})

// exporting the reducer
// export const { addJobToLasers } = lasersSlice.actions;
// export const { updateJobInLasers } = lasersSlice.actions;

export default lasersSlice.reducer;