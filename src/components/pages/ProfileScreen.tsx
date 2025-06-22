import React, { useEffect, useState } from 'react';
import { Button, Image, KeyboardAvoidingView, PermissionsAndroid, Platform, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import useAppNavigation from '../../navigators/useAppNavigation';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { AuthAction } from '../../redux/reducers/AuthReducer';
import { userDetailsAction } from '../../redux/reducers/UserReducer';
import AppLoader from '../atoms/AppLoader';
import AppTextInput from '../molecules/AppTextInput';
import AppButton from '../atoms/AppButton';
import AppText from '../atoms/AppText';
import { firebase } from '@react-native-firebase/firestore';
import { Images } from '../../utilis/Images';
import { NativeModules } from 'react-native';
import auth from '@react-native-firebase/auth';

const { ImagePickerModule } = NativeModules;

const ProfileScreen = () => {
    const { navigation, setScreenOptions } = useAppNavigation()
    const dispatch = useAppDispatch()
    const userData = useAppSelector(state => state.userreducer.userDetails)
    const [loader, setLoader] = useState(false)
    console.log('userData', userData)
    const [details, setDetails] = useState({
        userName: userData.userName,
        profilePhoto: userData.profilePhoto
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
            await auth().signOut();
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
            console.log('coming here')
            const downloadURL = await uploadImage(details.profilePhoto, userId);
            console.log({ downloadURL })
            const response = await firebase.firestore().collection("users").doc(userId).update({
                'userName': details.userName,
                'profilePhoto': downloadURL
            })
            console.log('response', response)
            dispatch(userDetailsAction.updateUserDetails({ 'userName': details.userName } as any))
            console.log('response', response)
        } catch (error) {
            console.log('error', error)
        } finally {
            setLoader(false)
        }
    }

    const addImage = async () => {
        ImagePickerModule.openImagePicker()
            .then((response: any) => {
                console.log('response', response)
                setDetails({ ...details, profilePhoto: response })
            })
            .catch((error: any) => {
                console.log('error', error)
            })
    }

    const openCamera = async () => {
        if (Platform.OS === 'android') {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Camera Permission',
                    message: 'App needs camera access to take photos',
                    buttonPositive: 'OK',
                }
            );

            if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
                console.warn('Camera permission denied');
                return;
            }
        }

        try {
            const uri = await ImagePickerModule.openCamera();
            setDetails({ ...details, profilePhoto: uri })
            console.log('Captured image URI:', uri);
        } catch (err) {
            console.error('Camera error:', err);
        }
    };

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
                    <View style={{ backgroundColor: 'lightyellow', flex: 1, padding: 12 }}>
                        <AppText text={'Details'} style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }} />
                        <AppText text={`Username : ${userData.userName}`} style={{ fontSize: 20, fontWeight: 'bold', textAlign: 'center' }} />

                        {/* Profile View Starts */}
                        <View style={{ paddingVertical: 12 }}>
                            <TouchableOpacity style={{ width: 100, height: 100, alignSelf: 'center' }} onPress={() => addImage()}>
                                <Image source={details.profilePhoto ? { uri: details.profilePhoto } : Images.ic_male} style={{ width: 100, height: 100, borderRadius: 50, alignSelf: 'center', resizeMode: 'cover', borderWidth: 1, borderColor: 'black' }} />
                            </TouchableOpacity>
                        </View>
                        <AppTextInput
                            onChangeText={text => setDetails({ ...details, userName: text })}
                            props={{
                                placeholder: 'User Name',
                                label: 'User Name'
                            }}
                        />


                        {/* Profile`s View Ends */}



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
