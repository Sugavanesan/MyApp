import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userDetailsType, UserStateType } from "../utilis/ReducerTypes";
const initialState: UserStateType = {
    userDetails: {
        uid: '',
        displayName: '',
        email: '',
        emailVerified: false
    }
}
const UserSlice = createSlice({
    name: 'userreducer',
    initialState: initialState,
    reducers: {
        updateUserDetails: (state, action: PayloadAction<userDetailsType>) => {
            state.userDetails = action.payload
        },
        reset: (state) => {
            state.userDetails = initialState.userDetails
        }
    },
})

export const UserReducer = UserSlice.reducer;
export const userDetailsAction = UserSlice.actions