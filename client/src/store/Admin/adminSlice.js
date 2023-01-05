import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  customer: null,
  adminUser: null,
  product: null,
  transaction: null,
  invoice: null,
  ledger: null,
};

const adminSlice = createSlice({
  name: "Admin",
  initialState,
  reducers: {
    getCustomer: (state, action) => {
      state.customer = action.payload;
    },
    getAdminUser: (state, action) => {
      state.adminUser = action.payload;
    },
    getProduct: (state, action) => {
      state.product = action.payload;
    },
    getTransaction: (state, action) => {
      state.transaction = action.payload;
    },
    getInvoice: (state, action) => {
      state.invoice = action.payload;
    },
    getLedger: (state, action) => {
        state.ledger = action.payload;
    },
  },
});

export default adminSlice;
export const {
  getCustomer,
  getAdminUser,
  getProduct,
  getTransaction,
  getInvoice,
  getLedger
} = adminSlice.actions;
