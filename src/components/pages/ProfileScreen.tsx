import React, { useEffect, useState } from 'react';
import { Button, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import useAppNavigation from '../../navigators/useAppNavigation';
import WorkingProgresScreen from '../templates/WorkingProgresScreen';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { AuthAction } from '../../redux/reducers/AuthReducer';
import { userDetailsAction } from '../../redux/reducers/UserReducer';
import AppLoader from '../atoms/AppLoader';
import { auth } from '../../firebase/config';
import { signOut } from '@firebase/auth';
import AppTextInput from '../molecules/AppTextInput';
import AppButton from '../atoms/AppButton';
import AppText from '../atoms/AppText';
import { firebase } from '@react-native-firebase/firestore';

const ProfileScreen = () => {
    const { navigation, setScreenOptions } = useAppNavigation()
    const dispatch = useAppDispatch()
    const userData = useAppSelector(state => state.userreducer.userDetails)
    const [loader, setLoader] = useState(false)
    const [details, setDetails] = useState({
        userName: userData.userName,
    })

    console.log('userData', userData)

    useEffect(() => {
        setScreenOptions({
            'headerTitle': "Profile",
            'headerTitleAlign': 'center',
        })
    }, [navigation])

    const LogOut = async () => {
        setLoader(true)
        try {
            console.log('User signed out!', auth.currentUser);
            await signOut(auth);
            dispatch(AuthAction.logOut())
            dispatch(userDetailsAction.reset())
            console.log('User signed out!');
        } catch (error) {
            console.error('Sign-out error:', error);
        } finally {
            setLoader(false)
        }

    }

    const AddUserDetails = async () => {
        const userId = userData.uid
        setLoader(true)
        try {
            const response = await firebase.firestore().collection("users").doc(userId).update({
                'userName': details.userName
            })
            dispatch(userDetailsAction.updateUserDetails({ 'userName': details.userName }))
            console.log('response', response)
        } catch (error) {
            console.log('error', error)
        } finally {
            setLoader(false)
        }
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <AppLoader loading={loader} />
            <KeyboardAvoidingView style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingVertical: 10,
                        paddingHorizontal: 10

                    }}
                    keyboardShouldPersistTaps='handled'
                >
                    <View style={{ backgroundColor: 'lightblue', flex: 1, padding: 12 }}>
                           <AppText text={'Details'} style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }} />
                        <AppText text={`Username : ${userData.userName}`} style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }} />
                        <AppTextInput
                            onChangeText={text => setDetails({ ...details, userName: text })}
                            props={{
                                placeholder: 'User Name',
                                label: 'User Name'
                            }}
                        />
                        <AppButton style={{
                            backgroundColor: 'green', width: '50%', alignSelf: 'center', marginTop: 50
                        }} textStyle={{ color: 'white' }} title="Submit" onPress={() => AddUserDetails()} />
                    </View>
                    <View style={{ paddingVertical: 24 }}>
                        <AppButton style={{
                            backgroundColor: 'red', width: '50%', alignSelf: 'center'
                        }} textStyle={{ color: 'white' }} title="Logout" onPress={() => LogOut()} />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default ProfileScreen;
