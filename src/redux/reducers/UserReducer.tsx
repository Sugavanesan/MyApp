import { createSlice } from "@reduxjs/toolkit";
import { UserStateType } from "../utilis/ReducerTypes";
const initialState:UserStateType = {
    userDetails:{
        
    }
}
const UserSlice = createSlice({
    name: 'userreducer',
    initialState: initialState,
    reducers: {
        updateUserDetails: (state, action) => {
            state.userDetails = action.payload
        }
    },
})

export const UserReducer = UserSlice.reducer;
export const userDetailsAction = UserSlice.actions