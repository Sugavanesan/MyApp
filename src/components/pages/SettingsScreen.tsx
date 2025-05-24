
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, Text, View } from 'react-native';
import useAppNavigation from '../../navigators/useAppNavigation';
import AppButton from '../atoms/AppButton';

const SettingsScreen = () => {
    const { navigation, setScreenOptions } = useAppNavigation()

    useEffect(() => {
        setScreenOptions({
            headerTitle: 'Settings'
        })
    }, [navigation])

    return (
        <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View>
                <AppButton title={'go to profile SCreen'} style={{ width: '50%', alignSelf: 'center' }}
                    onPress={() => navigation.navigate('profileScreen')} />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default SettingsScreen;
