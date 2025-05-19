import React, { useEffect } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import useAppNavigation from '../../navigators/useAppNavigation';
import ChatInfoCard from '../molecules/ChatInfoCard';
import { Images } from '../../utilis/Images';

const MessageScreen = () => {
    const navigation = useAppNavigation()

    useEffect(() => {
        navigation.setScreenOptions({
            'headerTitle': "Message",
            'headerTitleAlign': 'center',
        })
    }, [navigation])

    const GetData = async () => {
        const response = await firestore().collection('users').doc("XVHxb14y8Ss7yUGKd0Kd").get()
        console.log('response-->', JSON.stringify(response.data()))
    }

    useEffect(() => {
        GetData()
    }, [])

    return (
        <View>
            <FlatList
                data={Array.from({ length: 20 })}
                renderItem={({ item, index }) => {
                    return (
                        <Pressable onPress={() => navigation.navigation.navigate('discussionScreen', {
                            'discussionId': index
                        })}
                            style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
                        >
                            <ChatInfoCard
                                image={Images.ic_male}
                                title={'Virat kholi'}
                                lastMessage={'hii da'}
                                time={'10.05 p.m'}
                                unreadCount={10}
                            />
                        </Pressable>
                    )
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({})

export default MessageScreen;
