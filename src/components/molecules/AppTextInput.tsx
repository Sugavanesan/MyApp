import React, { FC } from 'react';
import { StyleSheet, View, ViewStyle } from 'react-native';
import { TextInput, TextInputProps } from 'react-native-paper';
type AppTextInputProps = {
    style?: ViewStyle
    props?: TextInputProps
    value?: string
    onChangeText: (text: string) => void
}
const AppTextInput: FC<AppTextInputProps> = ({ value, onChangeText, props, style }) => {
    return (
        <View style={[style, {}]}>
            <TextInput
                value={value}
                onChangeText={onChangeText}
                style={{
                    backgroundColor: 'white',
                    paddingHorizontal: 10,
                    paddingVertical: 5,
                    borderRadius: 18
                }}
                textColor='black'
                cursorColor='black'
                mode='outlined'
                outlineColor='black'
                activeOutlineColor='black'
                {...props}
            />
        </View>
    );
}

const styles = StyleSheet.create({})

export default AppTextInput;
