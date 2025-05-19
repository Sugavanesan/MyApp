import React, { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, StyleSheet, View } from 'react-native';
import useAppNavigation from '../../navigators/useAppNavigation';
import AppButton from '../atoms/AppButton';
import DiscussionTextInput from '../organism/DiscussionTextInput';
import ChatBubble from '../atoms/ChatBubble';


const DiscussionScreen = () => {
    const navigation = useAppNavigation()
    const TextInputRef = useRef<any>(null)
    const [textInputHeight, setTextInputHeight] = useState(0)


    useEffect(() => {
        navigation.setScreenOptions({
            'headerTitle': "Discussion",
            'headerTitleAlign': 'center',
        })
    }, [])

    const handlePress = () => {

    }
    console.log('height', textInputHeight)
    return (
        <SafeAreaView style={{ flex: 1 }}>
            <KeyboardAvoidingView style={{ flex: 1 }}
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                keyboardVerticalOffset={
                    Platform.OS === 'ios' ? textInputHeight + 88 : 88 + textInputHeight}
            >
                <FlatList
                    data={Array.from({ length: 20 })}
                    contentContainerStyle={{
                        flexGrow: 1,
                        gap: 6,
                        padding: 12
                    }}
                    inverted
                    keyboardShouldPersistTaps={'handled'}
                    renderItem={({ item, index }) => {
                        return (
                            <View>
                                <ChatBubble
                                    message={'hii byee hii byee hii byee hii byeehii byeehii byeehii byee hii byeehii byeehii byeehii byeehii byeehii byeehii byeehii byeehii byeehii byeehii byeehii byeehii byee'}
                                    messageType={index % 2 == 0 ? 'sent' : 'received'}
                                    time='10.00 am'
                                />
                            </View>
                        )
                    }}
                />
            </KeyboardAvoidingView>
            <DiscussionTextInput ref={TextInputRef} setTextInputHeight={setTextInputHeight} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({})

export default DiscussionScreen;
