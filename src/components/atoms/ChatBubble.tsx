import React, { FC, memo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppText from './AppText';
import { Images } from '../../utilis/Images';
type ChatBubbleProps = {
    message: string,
    messageType: 'sent' | 'received',
    time: string
}
const ChatBubble: FC<ChatBubbleProps> = ({ message, messageType, time }) => {
    const ProfileImage = (
        <View style={{ padding: 4, borderRadius: 50, marginTop: 10, borderColor: 'black', borderWidth: 1, alignSelf: 'flex-start' }}>
            <Image source={messageType === 'sent' ? Images.ic_male : Images.ic_female}
                style={{ width: 18, height: 18, tintColor: 'black' }} />
        </View>
    )
    return (
        <View style={{}}>
            <View style={[{ flexDirection: 'row', gap: 5, alignItems: 'center' },
            messageType === 'sent'
                ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }]}>
                {messageType === 'received' && ProfileImage}
                <TouchableOpacity style={[styles.container, messageType === 'sent'
                    && { backgroundColor: 'lightgreen' }]}
                    activeOpacity={0.8} >
                    <AppText text={message} style={{ fontSize: 16 }} />
                    <AppText text={time} style={{ fontSize: 12, color: 'gray', alignSelf: 'flex-end' }} />
                </TouchableOpacity>
                {messageType === 'sent' && ProfileImage}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightblue',
        paddingVertical: 10,
        paddingHorizontal: 20,
        maxWidth: '70%',
        borderRadius: 20
    }
})

export default memo(ChatBubble);
