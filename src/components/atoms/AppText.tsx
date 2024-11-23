import React, { FC } from 'react';
import { StyleSheet, Text, TextStyle, View } from 'react-native';
type AppTextType={
    style?:TextStyle
    text:string
}
const AppText:FC<AppTextType> = ({style,text}) => {
    return (
        <Text style={[styles.textStyle,style]}>{text}</Text>
    );
}

const styles = StyleSheet.create({
    textStyle:{
        color:'black',
    }
})

export default AppText;
