import React, { useCallback, useEffect } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import firestore, { firebase } from '@react-native-firebase/firestore';
import useAppNavigation from '../../navigators/useAppNavigation';
import ChatInfoCard from '../molecules/ChatInfoCard';
import { Images } from '../../utilis/Images';
import { useFocusEffect } from '@react-navigation/native';
import AppButton from '../atoms/AppButton';
import { useAppSelector } from '../../redux/store';
import { MessageInfoType } from '../../api/types/ResponseType';
import { firstLettertoUpperCase, formatLastSeenMessage } from '../../utilis/CommonFunction';

const MessageScreen = () => {
    const navigation = useAppNavigation()
    const [chatDiscussionList, setChatDiscussionList] = React.useState<MessageInfoType[]>([])
    const userDetails = useAppSelector(state => state.userreducer.userDetails)

    useEffect(() => {
        navigation.setScreenOptions({
            'headerTitle': "Message",
            'headerTitleAlign': 'center',
            'headerRight': () =>
                <AppButton title={'Create +'}
                    style={{ marginRight: 10, width: 100, paddingVertical: 6, backgroundColor: 'lightgreen' }}
                    textStyle={{ color: 'black' }}
                    onPress={() => navigation.navigation.navigate('chatRoomScreen')}
                />
        })
    }, [navigation])

    const GetData = async () => {
        const userId = userDetails?.uid
        try {
            firebase.firestore()
                .collection("Discussion")
                .where("participantsList", "array-contains", userId)
                .onSnapshot((data) => {
                    const Data = data.docs?.map(doc => ({ id: doc.id, ...doc.data() }))
                    console.log('dataaa',(data.docs),userId)
                    if (!Data.length) return 
                    const formatedData: MessageInfoType[] = Data.map((item: any) => {
                        const lastSeen = formatLastSeenMessage(item.updatedAt)
                        const participants_uid = Object.keys(item?.participants).find(id => id !== userId)
                        const participantsUserName = item?.participants[participants_uid!]?.userName
                        const chatTitle = firstLettertoUpperCase(participantsUserName)

                        return {
                            id: item.id,
                            updatedAt: lastSeen,
                            title: chatTitle,
                            UnreadCount: item.participants[userId].UnreadCount,
                            last_message: item.last_message,
                            image: item.image
                        }
                    })
                    setChatDiscussionList(formatedData)
                })

        } catch (error) {
            console.log('error-->', error)
        } finally {

        }

    }

    useFocusEffect(
        useCallback(() => {
            GetData();
            return () => {
            };
        }, [])
    );

    return (
        <View>
            <FlatList
                data={chatDiscussionList}
                renderItem={({ item, index }: { item: MessageInfoType, index: number }) => {
                    return (
                        <Pressable onPress={() => navigation.navigation.navigate('discussionScreen', {
                            'discussionId': item.id,
                            'chatTitle': item.title
                        })}
                            style={({ pressed }) => ({ opacity: pressed ? 0.8 : 1 })}
                        >
                            <ChatInfoCard
                                image={item.image || Images.ic_male}
                                title={item.title}
                                lastMessage={item.last_message}
                                time={item.updatedAt}
                                unreadCount={item.UnreadCount}
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
