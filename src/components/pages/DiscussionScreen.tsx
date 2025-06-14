import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Image, Keyboard, KeyboardAvoidingView, Platform, Pressable, SafeAreaView, StyleSheet, TouchableOpacity, TouchableWithoutFeedback, View } from 'react-native';
import useAppNavigation from '../../navigators/useAppNavigation';
import AppButton from '../atoms/AppButton';
import DiscussionTextInput from '../organism/DiscussionTextInput';
import ChatBubble from '../atoms/ChatBubble';
import { useRoute } from '@react-navigation/native';
import { useAppRoute } from '../../navigators/types';
import { useChatMessageHook } from '../hooks/ChatMessageHooks';
import { MessageInfoType, messageType } from '../../api/types/ResponseType';
import { useAppSelector } from '../../redux/store';
import { formatLastSeenMessage, formatTimestampToTime, getDateLabel } from '../../utilis/CommonFunction';
import { Images } from '../../utilis/Images';
import { ActivityIndicator } from 'react-native-paper';
import AppText from '../atoms/AppText';


const DiscussionScreen = () => {
    const navigation = useAppNavigation()
    const route = useAppRoute<'discussionScreen'>().params
    const TextInputRef = useRef<any>(null)
    const [textInputHeight, setTextInputHeight] = useState(0)
    const discussionhook = useChatMessageHook({ discussionId: route.discussionId })
    const userDetails = useAppSelector(state => state.userreducer.userDetails)
    const [state, setState] = useState({
        showDelete: false
    })
    const currentMessageRef = useRef<messageType>(null)

    useEffect(() => {
        navigation.setScreenOptions({
            'headerTitle': route.chatTitle || "Discussion",
            'headerTitleAlign': 'center',
            'headerRight': () => state?.showDelete && <TouchableOpacity hitSlop={0.7} onPress={() => {
                discussionhook?.deleteMessage(currentMessageRef?.current)
                setState({ ...state, showDelete: false })
            }}
                style={{ marginRight: 10 }}>
                <Image source={Images.ic_delete} style={{ width: 26, height: 26 }} />
            </TouchableOpacity>
        })
        discussionhook?.removeUnreadCount()
    }, [navigation.navigation, state?.showDelete])

    const handlePress = (data: string) => {
        const messageText = data.trim();
        if (!messageText) {
            return;
        }
        discussionhook?.sendMessage(messageText)
        TextInputRef?.current?.clearText()
    }
    const handleFlatListPress = () => {
        currentMessageRef.current = null
        setState({ ...state, showDelete: false })
    }

    return (
        <SafeAreaView style={{ flex: 1 }} {
            ...({
                'role': 'presentation'
            })
        } >
            <KeyboardAvoidingView style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                keyboardVerticalOffset={
                    Platform.OS === 'ios' ? textInputHeight + 88 : 88 + textInputHeight}
            >
                <FlatList
                    data={discussionhook?.chatMessages}
                    style={{ flexGrow: 1 }}
                    contentContainerStyle={{
                        flexGrow: 1,
                        gap: 6,
                        paddingVertical: 12
                    }}
                    inverted
                    onEndReached={discussionhook?.getMessages}
                    onEndReachedThreshold={0.1}
                    keyboardShouldPersistTaps={'handled'}
                    onScrollBeginDrag={() => Keyboard.dismiss()}
                    onResponderStart={() => Keyboard.dismiss()}
                    renderItem={({ item, index }: { item: messageType, index: number }) => {
                        const messageData = discussionhook?.chatMessages[index]
                        const previousMessageData = discussionhook?.chatMessages[index - 1]
                        const isLastMessage = index == discussionhook?.chatMessages?.length - 1
                        const isDifferenceInDay = isLastMessage ? getDateLabel(messageData?.sentAt, new Date()) : getDateLabel(previousMessageData?.sentAt, messageData?.sentAt)
                        return (
                            <Fragment>
                                {
                                    isDifferenceInDay &&
                                    <View style={{ alignItems: 'center', marginVertical: 10 }}>
                                        <AppText text={isDifferenceInDay} style={{ fontSize: 14, color: 'black', backgroundColor: 'lightblue', padding: 4, paddingHorizontal: 12, borderRadius: 7 }} />
                                    </View>
                                }
                                <Pressable onPress={() => { handleFlatListPress() }}
                                    onLongPress={() => {
                                        if (item?.sentBy !== userDetails?.uid) return
                                        currentMessageRef.current = item
                                        setState({ ...state, showDelete: true })
                                    }}
                                    style={{ backgroundColor: (state.showDelete && currentMessageRef.current?.id === item.id) ? '#ffcccc' : undefined }}
                                >
                                    <ChatBubble
                                        message={item.message}
                                        messageType={userDetails?.uid === item.sentBy ? 'sent' : 'received'}
                                        time={formatTimestampToTime(item.sentAt as any)}
                                        isDelete={item?.isDelete}
                                    />
                                </Pressable>
                            </Fragment>
                        )
                    }}
                    ListFooterComponent={() => {
                        return discussionhook?.loader && <ActivityIndicator size="small" color='black' style={{ marginBottom: 10 }} />
                    }}
                />
            </KeyboardAvoidingView>
            <DiscussionTextInput ref={TextInputRef} setTextInputHeight={setTextInputHeight} callback={handlePress} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default DiscussionScreen;
