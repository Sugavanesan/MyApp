import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import { Image, ImageSourcePropType, StyleSheet, View } from 'react-native';
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
        { name: 'Home', routeName: 'homeScreen', component: HomeScreen, tabIcon: Images.ic_home },
        { name: 'Search', routeName: 'searchScreen', component: SearchScreen, tabIcon: Images.ic_search },
        { name: 'Message', routeName: 'MessageScreen', component: MessageScreen, tabIcon: Images.ic_message },
        { name: 'Reels', routeName: 'feedScreen', component: FeedScreen, tabIcon: Images.ic_feed },
        { name: 'Settings', routeName: 'settingsScreen', component: SettingsScreen, tabIcon: Images.ic_settings }
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
                                'tabBarIcon': ({ focused, color, size }) => focused ?
                                    <View style={{backgroundColor:'lightgray',paddingHorizontal:10,paddingVertical:3,borderRadius:50}}>
                                        <Image source={item.tabIcon}
                                            tintColor={focused ? 'black' : 'grey'}
                                            style={{ width: 26, height: 26, resizeMode: 'contain' }} />
                                    </View>
                                    : <Image source={item.tabIcon}
                                        tintColor={focused ? 'black' : 'grey'}
                                        style={{ width: 26, height: 26, resizeMode: 'contain' }} />,
                                'tabBarLabel': item.name,
                                'tabBarLabelStyle': { color: 'black', fontSize: 14 },
                                'tabBarStyle': { height: 60 }

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
