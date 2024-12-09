import React, { FC } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';
type AppTextInputProps = {
    style?:ViewStyle
    props?:TextInputProps
    value?: string
    onChangeText:(text: string) => void
}
const AppTextInput:FC<AppTextInputProps> = ({value, onChangeText,props,style}) => {
    return (
        <View style={[style,{}]}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({})

export default AppTextInput;
