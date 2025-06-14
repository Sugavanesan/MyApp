import React, { FC } from 'react';
import { Image, ImageSourcePropType, StyleSheet, Text, View, ViewStyle } from 'react-native';
import { messageType } from '../../api/types/ResponseType';

type ChatInfoCardType = {
    image: ImageSourcePropType
    title: string
    lastMessage: messageType
    time: string
    unreadCount: number
    style?: ViewStyle
}
const ChatInfoCard: FC<ChatInfoCardType> = ({ style, image, title, lastMessage, time, unreadCount }) => {
    return (
        <View style={[{
            flex: 1, flexDirection: 'row', justifyContent: 'center', borderBottomColor: 'lightgray', borderBottomWidth: 1,
            alignItems: 'center', gap: 10, paddingHorizontal: 14, paddingVertical: 10, backgroundColor: 'white'
        }, style]}>
            <View style={{
                borderWidth: 1, borderColor: 'black', borderRadius: 50,
                justifyContent: 'center', alignItems: 'center', padding: 5
            }} >
                <Image source={image} style={{ resizeMode: 'contain', width: 30, height: 30 }} />
            </View>
            <View style={{ flex: 1, gap: 4 }}>
                <Text numberOfLines={1} style={{ fontWeight: 'bold', fontSize: 16 }}>{title}</Text>
                <Text style={{ fontSize: 16 }} numberOfLines={1} >{lastMessage?.isDelete ? "This message was deleted" : lastMessage.message}</Text>
            </View>
            <View style={{ gap: 4, alignItems: 'flex-end' }}>
                <Text>{time}</Text>
                {!!unreadCount && <View style={{
                    backgroundColor: 'lightblue', borderWidth: 1, borderRadius: 50,
                    justifyContent: 'center', alignItems: 'center', paddingVertical: 2, paddingHorizontal: 6
                }}>
                    <Text style={{ fontSize: 14 }}>{unreadCount}</Text>
                </View>}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({})

export default ChatInfoCard;
