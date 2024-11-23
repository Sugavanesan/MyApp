import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import useAppNavigation from '../../navigators/useAppNavigation';
import WorkingProgresScreen from '../templates/WorkingProgresScreen';

const ProfileScreen = () => {
    const { navigation, setScreenOptions } = useAppNavigation()

    useEffect(() => {
        setScreenOptions({
            'headerTitle': "Profile"
        })
    }, [navigation])
    
    return (
        <WorkingProgresScreen>
            {"Profile"}
        </WorkingProgresScreen>
    );
}

const styles = StyleSheet.create({})

export default ProfileScreen;
