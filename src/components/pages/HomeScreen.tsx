import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WorkingProgresScreen from '../templates/WorkingProgresScreen';
import useAppNavigation from '../../navigators/useAppNavigation';

const HomeScreen = () => {
    const { navigation, setScreenOptions } = useAppNavigation()

    useEffect(() => {
        setScreenOptions({
            headerTitle: 'Home'
        })
    }, [navigation])

    return (
        <WorkingProgresScreen>
            <Text>working in progress</Text>
        </WorkingProgresScreen>
    );
}

const styles = StyleSheet.create({})

export default HomeScreen;
