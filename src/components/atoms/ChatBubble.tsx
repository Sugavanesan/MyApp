import React, { FC, memo } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppText from './AppText';
import { Images } from '../../utilis/Images';
type ChatBubbleProps = {
    message: string,
    messageType: 'sent' | 'received',
    time: string
    isDelete?: boolean
}
const ChatBubble: FC<ChatBubbleProps> = ({ message, messageType, time, isDelete = false }) => {
    const ProfileImage = (
        <View style={{ padding: 4, borderRadius: 50, marginTop: 10, borderColor: 'black', borderWidth: 1, alignSelf: 'flex-start' }}>
            <Image source={messageType === 'sent' ? Images.ic_male : Images.ic_female}
                style={{ width: 18, height: 18, tintColor: 'black' }} />
        </View>
    )

    return (
        <View style={[{ flexDirection: 'row', gap: 5, alignItems: 'center', paddingHorizontal: 8 },
        messageType === 'sent' ? { alignSelf: 'flex-end' } : { alignSelf: 'flex-start' }]}>
            {messageType === 'received' && ProfileImage}

            {
                isDelete ?
                    <View style={{ backgroundColor: 'lightgreen', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 20 }}>
                        <AppText text={"This message was deleted"} style={{ fontSize: 16, color: 'grey', textAlign: 'center' }} />
                    </View>
                    :
                    <View style={[styles.container, messageType === 'sent'
                        && { backgroundColor: 'lightgreen', minWidth: 100, alignSelf: 'flex-end' }]}>
                        <AppText text={message} style={{ fontSize: 16 }} />
                        <AppText text={time} style={{ fontSize: 12, color: 'gray', alignSelf: 'flex-end' }} />
                    </View>
            }
            {messageType === 'sent' && ProfileImage}
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
