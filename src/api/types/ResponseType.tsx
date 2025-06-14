import { ImageSourcePropType } from "react-native"

export interface MessageInfoType {
    id: string,
    title: string,
    UnreadCount: number,
    updatedAt: string,
    last_message: messageType
    image: ImageSourcePropType
}

export interface messageType {
    id: string
    sentBy: string,
    message: string,
    sentAt: string,
    isDelete: boolean,
    messageType: "text" | "image" | "video",
    edited: boolean,
    editedAt: string,
    media: ImageSourcePropType | null
}