import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import WorkingProgresScreen from '../templates/WorkingProgresScreen';
import firestore from '@react-native-firebase/firestore';

const MessageScreen = () => {

    const GetData = async () => {
        const response = await firestore().collection('users').doc("XVHxb14y8Ss7yUGKd0Kd").get()
        console.log('response-->', JSON.stringify(response.data()))
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
