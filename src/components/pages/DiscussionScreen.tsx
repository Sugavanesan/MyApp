import React, { useEffect, useRef } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import useAppNavigation from '../../navigators/useAppNavigation';
import AppButton from '../atoms/AppButton';
import DiscussionTextInput from '../organism/DiscussionTextInput';
import AppDrawerLayout from '../templates/AppDrawerLayout';
import Animated, { runOnJS, useAnimatedStyle } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';

const DiscussionScreen = () => {
    const navigation = useAppNavigation()
    const TextInputRef = useRef<any>(null)
    useEffect(() => {
        navigation.setScreenOptions({
            'headerTitle': "Discussion",
            'headerTitleAlign': 'center',
        })
    }, [])
    const handlePress = () => {

    }

    const [open, setOpen] = React.useState(false);

    return (
        <KeyboardAvoidingView style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'} >
            <FlatList
                data={[]}
                contentContainerStyle={{
                    flexGrow: 1
                }}
                renderItem={({ item, index }) => {
                    return (
                        <View>

                        </View>
                    )
                }}
            />
            <DiscussionTextInput ref={TextInputRef} />
            <AppButton title={'click'} onPress={function (): void {
                setOpen(true)
            }} />
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({})

export default DiscussionScreen;
