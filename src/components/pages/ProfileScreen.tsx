import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import useAppNavigation from '../../navigators/useAppNavigation';
import WorkingProgresScreen from '../templates/WorkingProgresScreen';
import { useAppDispatch } from '../../redux/store';
import { AuthAction } from '../../redux/reducers/AuthReducer';
import { userDetailsAction } from '../../redux/reducers/UserReducer';
import AppLoader from '../atoms/AppLoader';
import { auth } from '../../firebase/config';
import { signOut } from '@firebase/auth';

const ProfileScreen = () => {
    const { navigation, setScreenOptions } = useAppNavigation()
    const dispatch = useAppDispatch()
    
    const [loader, setLoader] = useState(false)

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

    return (
        <WorkingProgresScreen>
            <AppLoader loading={loader} />
            <Button title="Logout" onPress={() => LogOut()} />
        </WorkingProgresScreen>
    );
}

const styles = StyleSheet.create({})

export default ProfileScreen;
