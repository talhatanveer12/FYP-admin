import axiosInstance from "../../Http-Request/axios-instance";
import { getProduct,getAdminUser, getCustomer, getInvoice, getLedger } from "./adminSlice";

export const getUserProduct = () => async (dispatch) => {
    try {
        const res = await axiosInstance.get('/client/products');
        if(res.data) {
            dispatch(getProduct(res.data));
        }
    } catch (error) {
        
    }
}


export const getUserAdmin = () => async (dispatch) => {
    try {
        const res = await axiosInstance.get('/management/admins');
        if(res.data) {
            dispatch(getAdminUser(res.data));
        }
    } catch (error) {
        
    }
}
export const getUserCustomer = () => async (dispatch) => {
    try {
        const res = await axiosInstance.get('/client/customers');
        if(res.data) {
            dispatch(getCustomer(res.data));
        }
    } catch (error) {
        
    }
}

export const getUserInvoice = () => async (dispatch) => {
    try {
        const res = await axiosInstance.get('/client/invoice');
        if(res.data) {
            dispatch(getInvoice(res.data));
        }
    } catch (error) {
        
    }
}

export const getUserLedger = () => async (dispatch) => {
    try {
        const res = await axiosInstance.get('/client/ledger');
        if(res.data) {
            dispatch(getLedger(res.data));
        }
    } catch (error) {
        
    }
}
