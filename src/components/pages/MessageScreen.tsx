import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import WorkingProgresScreen from '../templates/WorkingProgresScreen';
import firestore from '@react-native-firebase/firestore';

const MessageScreen = () => {

    const GetData = async () => {
        const data = await firestore().collection('users')
        console.log({ data })
    }

    useEffect(() => {
        GetData()
    }, [])

    return (
        <WorkingProgresScreen>
            <Text>MessageScreen</Text>
        </WorkingProgresScreen>
    );
}

const styles = StyleSheet.create({})

export default MessageScreen;
