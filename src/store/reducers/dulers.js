import { createSlice } from "@reduxjs/toolkit";
import { fetchDulers, addOrderToDulers, updateOrderInDulers } from "../thunks/dulers";

export const dulersSlice = createSlice({
    name:'dulers',
    initialState: {
        action:{},
        orders:{
            items:[]
        },
        loading: false
    },
    reducers: {
        addItemToDulers:(state, action) => {
            state.orders.items = action.payload
            state.loading = true
        },

        updateItemInDulers:(state, action) => {
            state.orders.items.forEach((item, index) => {
                if (item._id === action.payload.oneItem._id) {
                    state.orders.items[index] = action.payload.oneItem
                }
            })
            state.loading = true
        }

    },
    extraReducers:(builder)=>{
        builder
        // ========== fetchParts ==========
        .addCase(fetchDulers.pending,(state)=>{
            state.loading = true
        })
        .addCase(fetchDulers.fulfilled,(state,action)=>{
            // at this point, all the database info is passed to the state
            state.orders = action.payload
            state.loading = false
        })
        .addCase(fetchDulers.rejected,(state)=>{
            state.loading = false
        })
        
        // ========== addPartToMeros ==========
        .addCase(addOrderToDulers.pending,(state)=>{
            state.loading = true
        })
        .addCase(addOrderToDulers.fulfilled,(state, action)=>{
            state.orders.items = action.payload.items
            state.loading = false
        })
        .addCase(addOrderToDulers.rejected,(state)=>{
            state.loading = false
        })

        // ========== updatePartInMeros ==========
        .addCase(updateOrderInDulers.pending,(state)=>{
            state.loading = true
        })
        .addCase(updateOrderInDulers.fulfilled,(state, action)=>{
            state.orders = action.payload
            state.loading = false
        })
        .addCase(updateOrderInDulers.rejected,(state)=>{
            state.loading = false
        })
    }
})

// exporting the reducer
export const { addItemToDulers } = dulersSlice.actions;
export const { updateItemInDulers } = dulersSlice.actions;

export default dulersSlice.reducer;