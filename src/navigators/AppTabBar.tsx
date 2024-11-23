import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, } from 'react-native';
import { AppStackNavigationType } from './types';
import HomeScreen from '../components/pages/HomeScreen';
import SearchScreen from '../components/pages/SearchScreen';
import MessageScreen from '../components/pages/MessageScreen';
import FeedScreen from '../components/pages/FeedScreen';
import SettingsScreen from '../components/pages/SettingsScreen';
import { Images } from '../utilis/Images';

type MyTabsType = {
    name: string,
    routeName: 'homeScreen' | 'searchScreen' | 'MessageScreen' | 'feedScreen' | 'settingsScreen',
    component: React.ComponentType<any>
    tabIcon: ImageSourcePropType
}

const AppTabBar = () => {
    const Tab = createBottomTabNavigator<AppStackNavigationType>()
    const MyTabs: MyTabsType[] = [
        { name: 'home', routeName: 'homeScreen', component: HomeScreen, tabIcon: Images.ic_home },
        { name: 'search', routeName: 'searchScreen', component: SearchScreen, tabIcon: Images.ic_search },
        { name: 'message', routeName: 'MessageScreen', component: MessageScreen, tabIcon: Images.ic_message },
        { name: 'reels', routeName: 'feedScreen', component: FeedScreen, tabIcon: Images.ic_feed },
        { name: 'settings', routeName: 'settingsScreen', component: SettingsScreen, tabIcon: Images.ic_settings }
    ]

    return (
        <Tab.Navigator initialRouteName='homeScreen' screenOptions={{
            headerTitleAlign: 'center'
        }} >
            {
                MyTabs?.map((item, index) =>
                    <Tab.Screen
                        key={index}
                        name={item.routeName}
                        component={item.component}
                        {...({
                            'options':
                            {
                                'tabBarIcon': ({ focused, color, size }) => <Image source={item.tabIcon}
                                    tintColor={focused ? 'black' : 'grey'}
                                    style={{ width: 26, height: 26, resizeMode: 'contain' }} />,
                                'tabBarLabel': item.name,
                                'tabBarLabelStyle': { color: 'black', fontSize: 12 }
                            },
                        })}
                    />
                )
            }
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({})

export default AppTabBar;
