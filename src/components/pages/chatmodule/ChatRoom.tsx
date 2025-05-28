import React, { FC, useEffect, useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import useAppNavigation from '../../../navigators/useAppNavigation';
import AppTextInput from '../../molecules/AppTextInput';
import AppButton from '../../atoms/AppButton';
import { useAppSelector } from '../../../redux/store';
import { firebase } from '@react-native-firebase/firestore';
import { auth } from '../../../firebase/config';
import { userDetailsType } from '../../../redux/utilis/ReducerTypes';

const ChatRoom = () => {

    const navigation = useAppNavigation()
    useEffect(() => {
        navigation.setScreenOptions({
            'headerTitle': "CreateChat",
            'headerTitleAlign': 'center',
        })
    }, [navigation])
    const userDetails = useAppSelector(state => state.userreducer.userDetails)
    const [searchText, setSearchText] = React.useState('');
    const [loader, setLoader] = useState(false)

    const CreateChatDiscussion = async () => {
        const userId = userDetails?.uid;
        const searchUserId = searchText?.trim();
        console.log('searchUserId', searchUserId,'userId',userId)   
        if (!userId || !searchUserId || userId === searchUserId) {
            Alert.alert('Error', 'Missing user information.');
            return;
        }
        setLoader(true);
        try {
            const response = await firebase.firestore().collection("users").doc(searchUserId).get();

            if (!response.exists) {
                Alert.alert('Error', 'User does not exist.');
                console.log('❌ No user profile found for UID:', searchUserId);
                return;
            }
            const searchUserData = response.data() as userDetailsType;
            await firebase.firestore().collection('Discussion').add({
                createdBy: userId,
                title: '',
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
                last_message: "",
                image: "",
                isGroup: false,
                participantsList: [userId, searchUserId],
                participants: {
                    [userId]: {
                        pinned: false,
                        UnreadCount: 0,
                        participantsStatus: 1,
                        archive: false,
                        lastSeenMessageId: "",
                        lastSeenAt: firebase.firestore.FieldValue.serverTimestamp(),
                        userName: userDetails.userName
                    },
                    [searchUserId]: {
                        pinned: false,
                        UnreadCount: 0,
                        participantsStatus: 1,
                        archive: false,
                        lastSeenMessageId: "",
                        lastSeenAt: "",
                        userName: searchUserData.userName
                    }
                }
            });
            console.log('✅ Discussion created successfully');
            navigation.navigation.goBack()
        } catch (error) {
            console.error('🔥 Error creating discussion:', error);
            Alert.alert('Error', error?.message || 'Failed to create chat discussion.');
        } finally {
            setLoader(false);
        }
    };


    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            >
                <ScrollView
                    contentContainerStyle={{
                        flexGrow: 1,
                        paddingVertical: 10,
                        paddingHorizontal: 10

                    }}
                    keyboardShouldPersistTaps='handled'
                >
                    <View style={{ backgroundColor: 'lightblue', flex: 1, padding: 12 }}>
                        <AppTextInput
                            onChangeText={setSearchText}
                            props={{
                                placeholder: 'Enter Id',
                                style: {
                                    backgroundColor: 'white',
                                    paddingHorizontal: 10,
                                    paddingVertical: 5,
                                    borderRadius: 18
                                },
                                textColor: 'black',
                                cursorColor: 'black',
                                label: 'Enter Id',
                                mode: 'outlined',
                                outlineColor: 'black',
                                activeOutlineColor: 'black'
                            }}
                        />
                        <AppButton title={'Create Chat'}
                            style={{
                                width: '50%', alignSelf: 'center', marginVertical: 100,
                                paddingVertical: 6, backgroundColor: 'lightgreen'
                            }}
                            textStyle={{ color: 'black' }}
                            onPress={() => CreateChatDiscussion()}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default ChatRoom;
