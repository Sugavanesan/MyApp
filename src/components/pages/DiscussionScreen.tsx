import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import useAppNavigation from '../../navigators/useAppNavigation';
import AppButton from '../atoms/AppButton';
import DiscussionTextInput from '../organism/DiscussionTextInput';
import ChatBubble from '../atoms/ChatBubble';
import { useRoute } from '@react-navigation/native';
import { useAppRoute } from '../../navigators/types';
import { useChatMessageHook } from '../hooks/ChatMessageHooks';
import { messageType } from '../../api/types/ResponseType';
import { useAppSelector } from '../../redux/store';
import { formatLastSeenMessage, formatTimestampToTime } from '../../utilis/CommonFunction';


const DiscussionScreen = () => {
    const navigation = useAppNavigation()
    const route = useAppRoute<'discussionScreen'>().params
    const TextInputRef = useRef<any>(null)
    const [textInputHeight, setTextInputHeight] = useState(0)
    const discussionhook = useChatMessageHook({ discussionId: route.discussionId })
    const userDetails = useAppSelector(state => state.userreducer.userDetails)

    useEffect(() => {
        navigation.setScreenOptions({
            'headerTitle': "Discussion",
            'headerTitleAlign': 'center',
        })
        discussionhook?.removeUnreadCount()
    }, [])

    const handlePress = (data: string) => {
        console.log({ data })
        const messageText = data.trim();
        if (!messageText) {
            return;
        }
        discussionhook?.sendMessage(messageText)
        TextInputRef?.current?.clearText()
    }

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={
                    Platform.OS === 'ios' ? textInputHeight + 88 : 88 + textInputHeight}
            >
                <FlatList
                    data={discussionhook?.chatMessages}
                    contentContainerStyle={{
                        flexGrow: 1,
                        gap: 6,
                        padding: 12
                    }}
                    inverted
                    onResponderEnd={() => discussionhook?.getMessages()}
                    keyboardShouldPersistTaps={'handled'}
                    renderItem={({ item, index }: { item: messageType, index: number }) => {
                        return (
                            <View>
                                <ChatBubble
                                    message={item.message}
                                    messageType={userDetails?.uid === item.sentBy ? 'sent' : 'received'}
                                    time={formatTimestampToTime(item.sentAt as any)}
                                />
                            </View>
                        )
                    }}
                />
            </KeyboardAvoidingView>
            <DiscussionTextInput ref={TextInputRef} setTextInputHeight={setTextInputHeight} callback={handlePress} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default DiscussionScreen;
