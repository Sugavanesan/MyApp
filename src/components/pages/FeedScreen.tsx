import React, { useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import WorkingProgresScreen from '../templates/WorkingProgresScreen';
import useAppNavigation from '../../navigators/useAppNavigation';

const FeedScreen = () => {
    const { navigation, setScreenOptions } = useAppNavigation()

    useEffect(() => {
        setScreenOptions({
            headerTitle: 'Feed'
        })
    }, [navigation])

    return (
        <WorkingProgresScreen>
            <Text>working in progress</Text>
        </WorkingProgresScreen>
    );
}

const styles = StyleSheet.create({})

export default FeedScreen;
