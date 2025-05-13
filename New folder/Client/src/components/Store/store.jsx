// import { configureStore } from "@reduxjs/toolkit";
// import authReducer from "../../pages/auth/authSlice"

// export const store = configureStore({
//     reducer:{
//         auth:authReducer
   
//     }
// })


// src/components/Store/store.jsx
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../auth/authSlice'; // Adjust the path as necessary

const store = configureStore({
  reducer: {
    auth: authReducer, // Add your reducers here
  },
});

export default store;