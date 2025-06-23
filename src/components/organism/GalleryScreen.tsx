import React, { useEffect, useMemo } from 'react';
import { Dimensions, FlatList, Image, SafeAreaView, StyleSheet, View } from 'react-native';
import useAppNavigation from '../../navigators/useAppNavigation';
import { useAppRoute } from '../../navigators/types';
import ZoomImage from './ZoomImage';
import { Images } from '../../utilis/Images';

const GalleryScreen = () => {

    const { navigation, setScreenOptions } = useAppNavigation();
    const route = useAppRoute<'galleryScreen'>().params

    useEffect(() => {
        setScreenOptions({
            'headerTitle': "Gallery",
            'headerTitleAlign': 'center',
            'header': () => null
        })
    }, [navigation])

    const ImageList = useMemo(() => {
        return route?.imageList?.map((item: any) => item)
    }, [route?.imageList])

    return (
        <View style={{ flex: 1, backgroundColor: 'black' }}>
            <FlatList
                data={[Images.ic_camera, Images.ic_male]}
                horizontal
                pagingEnabled
                style={{ flex: 1 }}
                contentContainerStyle={{
                    flexGrow: 1
                }}
                scrollEnabled={true}
                showsHorizontalScrollIndicator={true}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item, index }) => {
                    console.log('item', index)
                    return (
                        <ZoomImage imageUrl={item} />
                    )
                }
                }
            />
        </View>

    );
}

const styles = StyleSheet.create({
    focalSTyle: {
        ...StyleSheet.absoluteFillObject,
        width: 30,
        height: 30,
        backgroundColor: 'red',
        borderRadius: 50,
    }
})

export default GalleryScreen;
