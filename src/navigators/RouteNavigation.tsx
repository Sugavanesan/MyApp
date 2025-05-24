import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import { StyleSheet } from 'react-native';
import { AppStackNavigationType } from './types';
import ProfileScreen from '../components/pages/ProfileScreen';
import AddPhotoScreen from '../components/pages/AddPhotoScreen';
import DiscussionScreen from '../components/pages/DiscussionScreen';
import AppTabBar from './AppTabBar';
import UserLogInScreen from '../components/pages/unAuthStackpages/UserLogInScreen';
import UserRegisterScreen from '../components/pages/unAuthStackpages/UserRegisterScreen';
import { useAppSelector } from '../redux/store';

const RouteNavigation = () => {
    const Stack = createNativeStackNavigator<AppStackNavigationType>()
    const authDetails = useAppSelector(state => state.authreducer)

    const AuthStack = (
        <Stack.Navigator 
            initialRouteName='mainTabs'
        >
            <Stack.Screen name='mainTabs' component={AppTabBar}  options={{ headerShown: false }} />
            <Stack.Screen name='profileScreen' component={ProfileScreen} />
            <Stack.Screen name='addPhotoScreen' component={AddPhotoScreen} />
            <Stack.Screen name='discussionScreen' component={DiscussionScreen} />
        </Stack.Navigator>
    )

    const UnAuthStack = (
        <Stack.Navigator>
            <Stack.Screen name='loginscreen' component={UserLogInScreen} />
            <Stack.Screen name='registerscreen' component={UserRegisterScreen} />
        </Stack.Navigator>
    )


    return (
        authDetails?.authState == 'signed' ? AuthStack : UnAuthStack
    );
}


const styles = StyleSheet.create({})

export default RouteNavigation;
