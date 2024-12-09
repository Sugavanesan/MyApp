import React, { FC, PropsWithChildren, useEffect } from 'react';
import { Modal, StyleSheet, TouchableOpacity, useWindowDimensions, View } from 'react-native';
import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
import { Portal } from 'react-native-paper';
import Animated, { interpolate, runOnJS, useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';

type AppDrawerLayoutProps = {
    visible: boolean;
    closeDrawer: () => void;
};

const AppDrawerLayout: FC<PropsWithChildren<AppDrawerLayoutProps>> = ({ children, visible, closeDrawer }) => {
    const { width } = useWindowDimensions();
    const animValue = useSharedValue(-width * 0.8);
    const opacityValue = useSharedValue(0);

    const animStyle = useAnimatedStyle(() => ({
        transform: [
            {
                translateX: animValue.value,
            },
        ],
    }));
    const opacityAnimStyle = useAnimatedStyle(() => ({
        opacity: withTiming(opacityValue.value, { duration: 30 }),
    }));

    const handleCloseDrawer = () => {
        animValue.value = withTiming(-width * 0.8, { duration: 300 });
        opacityValue.value = withTiming(0, { duration: 300 });
        setTimeout(closeDrawer, 300)
    };
    useEffect(() => {
        if (visible) {
            animValue.value = withTiming(0, { duration: 300 });
            opacityValue.value = withTiming(1, { duration: 30 });
        } else {
            animValue.value = withTiming(-width * 0.8, { duration: 300 });
            opacityValue.value = withTiming(0, { duration: 300 });
        }
    }, [visible]);


    const pan = Gesture.Pan()
        .onStart((event) => {
        })
        .onChange((event) => {
            if (event.translationX < 0) {
                animValue.value = event.translationX
                opacityValue.value = interpolate(animValue.value, [ 0,-(width * 0.8)], [1, 0.7])
            }
        })
        .onEnd((event) => {
            if (event.translationX < 0) {
                if (animValue.value < (-width * 0.8 / 2)) {
                    runOnJS(handleCloseDrawer)()
                } else {
                    animValue.value = withTiming(0, { duration: 300 });
                    opacityValue.value = withTiming(1, { duration: 30 });
                }
            }
        })

    return (
        <Portal>
            <Modal visible={visible} onRequestClose={handleCloseDrawer} transparent>
                <GestureHandlerRootView style={{ flex: 1 }}>
                    <Animated.View style={[styles.container, opacityAnimStyle]}>
                        <GestureDetector gesture={pan}  >
                            <Animated.View style={[styles.drawer, { width: width * 0.8 }, animStyle]}>
                                {children}
                            </Animated.View>
                        </GestureDetector>
                        <TouchableOpacity style={[styles.overlay]} onPress={handleCloseDrawer} />
                    </Animated.View>
                </GestureHandlerRootView>
            </Modal>
        </Portal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    drawer: {
        backgroundColor: 'white',
        height: '100%',
    },
    overlay: {
        flex: 1,
    },
});

export default AppDrawerLayout;
