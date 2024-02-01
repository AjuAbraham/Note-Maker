import {configureStore} from '@reduxjs/toolkit';
import navSlice from '../Features/navSlice.js'

export const store = configureStore({
    reducer:{
         nav:navSlice
    }
})