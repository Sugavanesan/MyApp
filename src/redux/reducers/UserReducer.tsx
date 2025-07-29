import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { userDetailsType, UserStateType } from "../utilis/ReducerTypes";
const initialState: UserStateType = {
    userDetails: {
        uid: '',
        displayName: '',
        nickName: '',
        email: '',
        private_account: false,
        emailVerified: false,
        profilePhoto: '',
        dob:''
    }
}
const UserSlice = createSlice({
    name: 'userreducer',
    initialState: initialState,
    reducers: {
        updateUserDetails: (state, action: PayloadAction<userDetailsType>) => {
            state.userDetails = {
                ...state.userDetails,
                ...action.payload
            }
        },
        reset: (state) => {
            state.userDetails = initialState.userDetails
        }
    },
})

export const UserReducer = UserSlice.reducer;
export const userDetailsAction = UserSlice.actions