import React, { FC, PropsWithChildren } from 'react';
import { StyleSheet, View } from 'react-native';

type WorkingProgresScreenType = {

}

const WorkingProgresScreen: FC<PropsWithChildren<WorkingProgresScreenType>> = ({ children }) => {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {children}
        </View>
    );
}

const styles = StyleSheet.create({})

export default WorkingProgresScreen;
