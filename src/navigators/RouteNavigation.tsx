import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { AppStackNavigationType } from './types';
import ProfileScreen from '../components/pages/ProfileScreen';
import AddPhotoScreen from '../components/pages/AddPhotoScreen';
import DiscussionScreen from '../components/pages/DiscussionScreen';
import AppTabBar from './AppTabBar';

const RouteNavigation = () => {
    const Stack = createNativeStackNavigator<AppStackNavigationType>()
    return (
        <Stack.Navigator>
            <Stack.Screen name='mainTabs' component={AppTabBar}  options={{ headerShown: false }} />
            <Stack.Screen name='profileScreen' component={ProfileScreen} />
            <Stack.Screen name='addPhotoScreen' component={AddPhotoScreen} />
            <Stack.Screen name='discussionScreen' component={DiscussionScreen} />
        </Stack.Navigator>
    );
}

const styles = StyleSheet.create({})

export default RouteNavigation;
