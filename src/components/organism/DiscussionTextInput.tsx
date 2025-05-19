import React, { forwardRef, memo, RefObject, useImperativeHandle, useMemo, useRef, useState } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import AppTextInput from '../molecules/AppTextInput';
import { Images } from '../../utilis/Images';
import { TextInput } from 'react-native-paper';

const DiscussionTextInput = forwardRef(({ setTextInputHeight }: { setTextInputHeight: any }, ref) => {
    const [text, setText] = useState('');
    const [height, setHeight] = useState(0)
    const viewRef = useRef(null);

    useImperativeHandle(ref, () => ({
        getText: () => text,
        clearText: () => setText(''),
        getHeight: () => height
    }));

    return (
        <View style={[styles.container, {}]} onLayout={(e) => setTextInputHeight(e.nativeEvent.layout.height)}>
            <TextInput
                value={text}
                onChangeText={setText}
                contentStyle={{
                    backgroundColor: 'white',
                    includeFontPadding: false,
                    borderRadius: 24
                }}
                style={{ flex: 1, backfaceVisibility: 'visible', backgroundColor: 'transparent' }}
                textColor='black'
                activeUnderlineColor='transparent'
                multiline
                cursorColor='black'
            />
            <TouchableOpacity style={styles.sendCotainer}>
                <Image style={{ width: 24, height: 24 }} source={Images.ic_send} />
            </TouchableOpacity>
        </View>
    );
});

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'lightblue',
        flexDirection: 'row',
        gap: 10,
        paddingHorizontal: 10,
        paddingVertical: 10,
    },
    sendCotainer: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'lightgreen',
        borderRadius: 50,
        width: 50,
        height: 50,
        alignSelf: 'center'
    }
});

export default memo(DiscussionTextInput);
