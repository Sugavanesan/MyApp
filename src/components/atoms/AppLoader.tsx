import React, { FC } from 'react';
import { ActivityIndicator, Dimensions, StyleSheet, View } from 'react-native';
import { Portal } from 'react-native-paper';

const AppLoader: FC<{ loading: boolean }> = ({ loading }) => {

    if (!loading) return null;

    return (
        <Portal>
            <View style={styles.overlay}>
                <ActivityIndicator animating={true} size="large" color="lightblue" />
            </View>
        </Portal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
})

export default AppLoader;
