import { createAsyncThunk } from "@reduxjs/toolkit";

import { axios_services } from "../../services/axiosservices";

// export a Thunk to GET data from the database
export const fetchDulers = createAsyncThunk(
    'dulers/fetchDulers',
    async() => {
        const forwardSlash = window.location.href.lastIndexOf('/') + 1
        const processPage = window.location.href.slice(forwardSlash, window.location.href.length)

        try {
            const response = await axios_services.get(`/api2/getorders/${processPage}`);
            response.data.map((duler, index) =>
                duler.typeOfCard === 'build' || duler.typeOfCard === 'engineering' ?
                    duler.cardPriority = 3
                :null
            )
            response.data.map((duler, index) =>
                    duler.typeOfCard === 'build' || duler.typeOfCard === 'engineering' ?
                        duler.processes.map((dulerprocess, index2) => 
                            dulerprocess.priority && dulerprocess.process === processPage ?
                            duler.cardPriority = 2
                            :null
                        ) 
                    :null
            )
            response.data.sort((a,b) => a.cardPriority - b.cardPriority || new Date(a.releaseDate) - new Date(b.releaseDate))
            
            return {
                items:response.data
            }
        } catch(error) {
            throw error;
        }
    }
)

// export a Thunk to validate (GET) data to the database
export const validatePartInMeros = createAsyncThunk(
    // reducer's name / function's name
    'oneduler/validatePartInMeros',
    // data sent by user
    async (dataReceived) => {
        try {
            // GET part with partNumber equals to partNumber from data received
            const findPart = await axios_services.get(`/api2/getorder/${dataReceived.partNumber}`)
            // check if part found is NOT (it must be an object) an array and it is not empty
            if (Array.isArray(findPart.data) && findPart.data.length) {
                // return the found part and the message 'found'
                return {
                    data: findPart.data[0],
                    result: 'found'
                }
            // if not
            } else {
                // return the message 'not-found'
                return {
                    result: 'not-found'
                }
            }
        } catch (error) {
            throw error;
        }
    }
)

// export a Thunk to POST data to the database
export const addOrderToDulers = createAsyncThunk(
    // reducer's name / function's name
    'dulers/addOrderToDulers',
    // data sent by user and State
    async(dataReceived,{ getState }) => {
        try {
            // check if part found is NOT (it must be an object) an array and it is not empty
            if(!Array.isArray(dataReceived)) {
                // POST new item in database
                const response = await axios_services({
                    method:'POST',
                    url:`/api2/addorder`,
                    data:dataReceived
                });
                // get State information
                const prevState = getState().dulers;
                // return the data with new item; and message 'added'
                return {
                    items:[...prevState.orders.items, response.data],
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

export const updateOrderInDulers = createAsyncThunk(
    'oneduler/updateOrderInDulers',
    async(dataReceived,{ getState }) => {
        try {
            // check if part found is NOT (it must be an object) an array and it is not empty
            if(!Array.isArray(dataReceived)) {
                // const response = await axios.post(`/api2/updateorder/${dataReceived.item._id}`, dataReceived.item );
                await axios_services({
                    method:'POST',
                    url:`/api2/updateorder/${dataReceived.oneItem._id}`,
                    // data: {
                    //     department: dataReceived.item.department,
                    //     currentProcess: dataReceived.item.currentProcess
                    // }
                    data: dataReceived.oneItem
                    // Headers: {
                    //     "Content-Type": "application/json; charset=UTF-8"
                    // },
                });
                // get State information
                const prevState = getState().dulers;
                // return the data with new item; and message 'updated'
                return {
                    items:[...prevState.orders.items],
                    result: 'updated'
                    // item:response.data
                }

                // if not
            } else {
                // return the message 'not-found'
                return{
                    result: 'failed'
                }
            }
        } catch(error) {
            throw error;
        }
    }
)