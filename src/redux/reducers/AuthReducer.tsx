import { createSlice } from "@reduxjs/toolkit"
import { AuthStateType } from "../utilis/ReducerTypes"

const initialState:AuthStateType = {
    authState: 'notSigned'
}
const AuthSlice = createSlice({
    name: 'authreducer',
    initialState: initialState,
    reducers: {
        login: (state) => { state.authState = 'signed' },
        logOut: (state) => { state.authState = 'notSigned' },
    },
})

export const AuthReducer = AuthSlice.reducer;
export const authAction = AuthSlice.actions