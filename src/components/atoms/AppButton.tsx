import React, { FC } from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewStyle } from 'react-native';
type AppButtonType = {
    style?: ViewStyle
    title: string
    onPress: () => void
}
const AppButton: FC<AppButtonType> = ({ style, title, onPress }) => {
    return (
        <TouchableOpacity style={[style, styles.btnStyle]} onPress={onPress}>
            <Text style={{ color: 'black', textAlign: 'center' }}>{title}</Text>
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
