export interface UserStateType {
    userDetails: userDetailsType
}

export interface userDetailsType {
    uid: string,
    userName: string,
    email: string
    emailVerified: boolean
    nickName?: string
    private_account?: boolean
    profilePhoto?: string
    dob?: string
}

export interface AuthStateType {
    authState: 'signed' | 'notSigned'
}