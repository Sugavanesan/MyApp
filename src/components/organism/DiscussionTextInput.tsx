import React, { forwardRef, useImperativeHandle, useState } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import AppTextInput from '../molecules/AppTextInput';
import { Images } from '../../utilis/Images';

const DiscussionTextInput = forwardRef((props, ref) => {
    const [text, setText] = useState('');

    useImperativeHandle(ref, () => ({
        getText: () => text,
        clearText: () => setText(''),
    }));

    return (
        <View style={[styles.container, { flexDirection: 'row', gap: 10, paddingHorizontal: 10, paddingVertical: 5 }]}>
            <AppTextInput
                value={text}
                onChangeText={setText}
                props={{
                    style: styles.input
                }}
                style={{
                    borderWidth: 1, borderRadius: 20,padding:6,width:'100%'
                }}
            />
            <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                <Image style={{ width: 24, height: 24 }} source={Images.ic_message} />
            </View>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'transparent',
    },
    input: {
        includeFontPadding: false,
        backgroundColor: 'white',
    },
});

export default DiscussionTextInput;
