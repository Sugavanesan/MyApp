import React, { FC } from 'react';
import { StyleSheet, Text, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';
type AppButtonType = {
    style?: ViewStyle
    textStyle?: TextStyle
    title: string
    onPress: () => void
}
const AppButton: FC<AppButtonType> = ({ style, title, onPress, textStyle }) => {
    return (
        <TouchableOpacity style={[styles.btnStyle, style]} onPress={onPress}>
            <Text style={[{ color: 'black', textAlign: 'center' }, textStyle]}>{title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    btnStyle: {
        paddingVertical: 12,
        paddingHorizontal: 20,
        borderRadius: 7,
        backgroundColor: 'lightblue',
        borderWidth: 1,
        borderColor: 'blue'
    }
})

export default AppButton;
