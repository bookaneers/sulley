import { createSlice } from "@reduxjs/toolkit";
import { validatePartInMeros } from '../thunks/dulers'

export const onedulerSlice = createSlice({
    name:'oneduler',
    initialState:{
        action:{},
        oneItem:{},
        loading: false
    },
    reducers: {
        addItemToOneDuler:(state, action) => {
            state.oneItem = action.payload
            state.loading = true
        },
        
        changeDepartmentInOneDuler:(state) => {
            if (state.oneItem.currentProcess === state.oneItem.processes.length - 1 ){
                console.log('GAME OVER')
            } else {
                state.oneItem.currentProcess++;
                state.oneItem.department = state.oneItem.processes[state.oneItem.currentProcess].process
                state.oneItem.status = 'queue';
            }
        },

        dispatchInOneDuler:(state, action) => {
            state.oneItem.status = action.payload
            state.loading = true
        },

        changeProcessPriorityInOneDuler:(state, action) => {
            state.oneItem.processes[action.payload.index].priority = !state.oneItem.processes[action.payload.index].priority
            state.loading = true
        },
        assignCell:(state, action) => {
            state.oneItem.status = action.payload
            state.loading = true
        },
        addEmployeeToProcess:(state, action) => {
            state.oneItem.processes.forEach((process) => {
                if (process.process === state.oneItem.department && process.employeeID === '') {
                    process.employeeID = action.payload.employeeId;
                    process.employeeName = action.payload.employeeName;
                }
            })
            state.loading = true
        },
        addEmployeeTaktTime:(state, action) => {
            const taktTime = Math.abs((((state.oneItem.processes[state.oneItem.currentProcess].setupTime) +
            (state.oneItem.processes[state.oneItem.currentProcess].cycleTime*state.oneItem.quantity)) * 60000) 
            - ((((state.oneItem.processes[state.oneItem.currentProcess].setupTime) +
            (state.oneItem.processes[state.oneItem.currentProcess].cycleTime*state.oneItem.quantity)) * 60000) - action.payload))
            state.oneItem.processes[state.oneItem.currentProcess].employeeTaktTime = (taktTime/60000).toFixed(2)
            if (state.oneItem.currentProcess === state.oneItem.processes.length - 1 ){
                console.log('GAME OVER')
            } else {
                state.oneItem.currentProcess++;
                state.oneItem.department = state.oneItem.processes[state.oneItem.currentProcess].process
                state.oneItem.status = 'queue';
            }
            state.loading = true
        },
        addEmployeeRopeTime:(state, action) => {
            state.oneItem.processes[state.oneItem.currentProcess - 1].employeeRopeTime = (action.payload/60000).toFixed(2)
            state.loading = true
        }
    },
    extraReducers:(builder)=>{
        builder
        // ========== validatePartInMeros ==========
        .addCase(validatePartInMeros.pending,(state)=>{
            state.loading = true
        })
        .addCase(validatePartInMeros.fulfilled,(state)=>{
            state.loading = false
        })
        .addCase(validatePartInMeros.rejected,(state)=>{
            state.loading = false
        })

        // // ========== addPartToMeros ==========
        // .addCase(addOrderToMeros.pending,(state)=>{
        //     state.loading = true
        // })
        // .addCase(addOrderToMeros.fulfilled,(state, action)=>{
        //     state.orders = action.payload
        //     state.loading = false
        // })
        // .addCase(addOrderToMeros.rejected,(state)=>{
        //     state.loading = false
        // })

        // // ========== updatePartInMeros ==========
        // .addCase(updateOrderInMeros.pending,(state)=>{
        //     state.loading = true
        // })
        // .addCase(updateOrderInMeros.fulfilled,(state, action)=>{
        //     state.orders = action.payload
        //     state.loading = false
        // })
        // .addCase(updateOrderInMeros.rejected,(state)=>{
        //     state.loading = false
        // })

        // ========== deletePartInMeros ==========
        // .addCase(deleteOrderInMeros.pending,(state)=>{
        //     state.loading = true
        // })
        // .addCase(deleteOrderInMeros.fulfilled,(state, action)=>{
        //     state.orders = action.payload
        //     state.loading = false
        // })
        // .addCase(deleteOrderInMeros.rejected,(state)=>{
        //     state.loading = false
        // })
    }
})

// exporting the reducer
export const { addItemToOneDuler } = onedulerSlice.actions;
export const { changeDepartmentInOneDuler } = onedulerSlice.actions;
export const { dispatchInOneDuler } = onedulerSlice.actions;
export const { changeProcessPriorityInOneDuler } = onedulerSlice.actions;
export const { assignCell } = onedulerSlice.actions;
export const { addEmployeeToProcess } = onedulerSlice.actions;
export const { addEmployeeTaktTime } = onedulerSlice.actions;
export const { addEmployeeRopeTime } = onedulerSlice.actions;

export default onedulerSlice.reducer;