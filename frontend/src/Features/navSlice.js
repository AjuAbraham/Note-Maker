import { createSlice } from "@reduxjs/toolkit";


export const navSlice = createSlice({
    initialState: {username:'',avatar:''},
    name: 'nav',
    reducers:{
        addNavDetail: (state,action)=>{
                state.username = action.payload.username;
                state.avatar = action.payload.avatar;
        },
        removeNavDetial: (state)=>{
            state.username = '';
            state.avatar = '';
        }
    }
})

export const {addNavDetail,removeNavDetial} = navSlice.actions;

export default navSlice.reducer;