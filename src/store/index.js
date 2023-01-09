import { configureStore } from "@reduxjs/toolkit";
import dulersReducer from './reducers/dulers';
import oneDulerReducer from './reducers/oneduler';
import employeeReducer from './reducers/employees';
import lasersReducer from './reducers/lasers';

export const store = configureStore({
    reducer:{
        dulers: dulersReducer,
        oneduler: oneDulerReducer,
        employee: employeeReducer,
        lasers: lasersReducer
    }
})