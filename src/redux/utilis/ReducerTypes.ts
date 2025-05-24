export interface UserStateType {
    userDetails: userDetailsType
}

export interface userDetailsType {
    uid: string,
    displayName: string,
    email: string
    emailVerified: boolean
}

export interface AuthStateType {
    authState: 'signed' | 'notSigned'
}