import { firebase } from "@react-native-firebase/firestore"
import { userDetailsType } from "../redux/utilis/ReducerTypes"

export const useGetUserDetails=() =>{
    const getData=async (id:string) =>{
        const response = await firebase.firestore().collection("users").doc(id).get()
        const result = response.data() as userDetailsType
        return result
    }
    return getData
}