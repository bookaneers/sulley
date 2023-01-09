import { createAsyncThunk } from "@reduxjs/toolkit";

import { axios_services } from "../../services/axiosservices";

// export a Thunk to GET data from the database
export const fetchLasers = createAsyncThunk(
    'lasers/fetchLasers',
    async() => {

        try {
            const response = await axios_services.get(`/api4/gettasks`);
            response.data.sort((a,b) => new Date(a.releaseDate) - new Date(b.releaseDate))
            // response.data.sort((a,b) => (a.position) - (b.position))
            return {
                jobs:response.data
            }
        } catch(error) {
            throw error;
        }
    }
)

// export a Thunk to POST data to the database
export const addTaskToLasers = createAsyncThunk(
    // reducer's name / function's name
    'lasers/addTaskToLasers',
    // data sent by user and State
    async(dataReceived,{ getState }) => {
        try {
            // check if part found is NOT (it must be an object) an array and it is not empty
            if(!Array.isArray(dataReceived)) {
                // POST new item in database
                const response = await axios_services({
                    method:'POST',
                    url:`/api4/addtask`,
                    data:dataReceived
                });
                // get State information
                const prevState = getState().lasers;
                // return the data with new item; and message 'added'
                return {
                    jobs:[...prevState.tasks.jobs, response.data],
                    result: 'added'
                }
            // if not
            } else {
                // return the message 'not-found'
                return{
                    result: 'failed'
                }
            }
        } catch(error) {
            throw error
        }
    }
)

// export a Thunk to update (GET/PUT) data to the database
export const updateJobInLasers = createAsyncThunk(
    // reducer's name / function's name
    'lasers/updateJobInLasers',
    // data sent by user and State
    async (dataReceived) => {
        try {            
            await axios_services({
                method: 'POST',
                url: `/api4/updatejob/${dataReceived.id}`,
                data: {
                    type: dataReceived.type,
                    program: dataReceived.program,
                    material: dataReceived.material,
                    size: dataReceived.size,
                    takt: dataReceived.takt,
                    status: dataReceived.status,
                    notes: dataReceived.notes,
                    dayOfTheWeek: dataReceived.dayOfTheWeek
                }
            });

        } catch (error) {
            throw error;
        }
    }
)

// export a Thunk to update (GET/PUT) data to the database
export const updateJobOrderInLasers = createAsyncThunk(
    // reducer's name / function's name
    'lasers/updateJobOrderInLasers',
    // data sent by user and State
    async (dataReceived) => {
        try {            
            // POST updated data in item found in database
            await axios_services({
                method: 'POST',
                url: `/api4/updatejob/${dataReceived.firstIndex._id}`,
                data: {
                    releaseDate: dataReceived.secondIndex.releaseDate,
                }
            });

        } catch (error) {
            return error.message('Error with first index');
        }
    }
)


// export a Thunk to update (GET/PUT) data to the database
export const updateJobOrderInLasers2 = createAsyncThunk(
    // reducer's name / function's name
    'lasers/updateJobOrderInLasers2',
    // data sent by user and State
    async (dataReceived) => {
        try {            
            // POST updated data in item found in database
            await axios_services({
                method: 'POST',
                url: `/api4/updatejob/${dataReceived.secondIndex._id}`,
                data: {
                    releaseDate: dataReceived.firstIndex.releaseDate,
                }
            });

        } catch (error) {
            return error.message('Error with second index');
        }
    }
)


// export a Thunk to delete (GET/DELETE) data to the database
export const deleteJobInLasers = createAsyncThunk(
    // reducer's name / function's name
    'lasers/deleteJobInLasers',
    // data sent by user and State
    async(dataReceived) => {
        try{
            // GET part with partNumber equals to partNumber from data received
            await axios_services.get(`/api4/removejob/${dataReceived}`)
            // check if part found is NOT (it must be an object) an array and it is not empty

        } catch(error) {
            throw error;
        }
    }
)