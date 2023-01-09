import { createAsyncThunk } from "@reduxjs/toolkit";

import { axios_services } from "../../services/axiosservices";

export const validateEmployee = createAsyncThunk(
    'employees/validateEmployee',
    async(data) => {
        try {
            const findPart = await axios_services.get(`/api3/checkid/${data}`)
            if (Array.isArray(findPart.data) && findPart.data.length) {
                return {
                    data: findPart.data[0],
                    result: 'found'
                }
            } else {
                return {
                    result: 'not-found',
                }
            }
        } catch (error) {
            throw error;
        }
    }
)