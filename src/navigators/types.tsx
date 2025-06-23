import { RouteProp, useRoute } from "@react-navigation/native"

export type AppStackNavigationType = {
    mainTabs: undefined
    homeScreen: undefined,
    searchScreen: undefined,
    MessageScreen: undefined,
    feedScreen: undefined,
    settingsScreen: undefined,
    profileScreen: undefined,
    discussionScreen: {
        discussionId: string,
        chatTitle: string
    },
    addPhotoScreen: undefined
    loginscreen: undefined
    registerscreen: undefined,
    chatRoomScreen: undefined,
    galleryScreen: {
        imageList: { id: number, url: string }[],
    }
}

export function useAppRoute<RouteName extends keyof AppStackNavigationType>() {
    return useRoute<RouteProp<AppStackNavigationType, RouteName>>();
}