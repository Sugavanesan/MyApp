import React, { FC } from 'react';
import { Dimensions, ImageSourcePropType, StyleSheet, View } from 'react-native';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';
const { width, height } = Dimensions.get('window');
const ZoomImage: FC<{ imageUrl: ImageSourcePropType }> = ({ imageUrl }) => {

    const translationX = useSharedValue(0);
    const translationY = useSharedValue(0);
    const savedTranslationX = useSharedValue(0);
    const savedTranslationY = useSharedValue(0);
    const scale = useSharedValue(1);
    const savedScale = useSharedValue(1);

    const AniImageStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: translationX.value },
                { translateY: translationY.value },
                { scale: scale.value }
            ]
        };
    });


    const panGesture = Gesture.Pan()
        .onUpdate((e) => {
            if (scale.value > 1) {
                translationX.value = e.translationX + savedTranslationX.value;
                translationY.value = e.translationY + savedTranslationY.value;
            }
        })
        .onEnd(() => {
            savedTranslationX.value = translationX.value;
            savedTranslationY.value = translationY.value;
        });


    const pinchGesture = Gesture.Pinch()
        .onUpdate((e) => {
            scale.value = e.scale + savedScale.value;
        })
        .onEnd((e) => {
            if (scale.value < 1) {
                scale.value = withSpring(1);
                savedScale.value = 1
            }
            savedScale.value = scale.value
        });

    const tagGesture = Gesture.Tap()
        .numberOfTaps(2)
        .onStart(() => {
            scale.value = withSpring(1);
            savedScale.value = 1
            translationX.value = withSpring(0);
            translationY.value = withSpring(0);
            savedTranslationX.value = 0;
            savedTranslationY.value = 0;
        })

    const composedGesture = Gesture.Simultaneous(pinchGesture, panGesture, tagGesture);

    return (
        <GestureDetector gesture={composedGesture}>
            <Animated.View style={{ flex: 1, width, height }}>
                <Animated.Image
                    source={imageUrl}
                    style={[
                        {
                            resizeMode: 'contain',
                            width: '100%',
                            height: '100%',
                            tintColor:'white'
                        },
                        AniImageStyle
                    ]}
                />
            </Animated.View>
        </GestureDetector>
    );
}

const styles = StyleSheet.create({})

export default ZoomImage;
