import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppStackNavigationType } from './types';

const useAppNavigation = () => {

    type NavigationProp = NativeStackNavigationProp<AppStackNavigationType>;
    const navigation = useNavigation<NavigationProp>();

    const setScreenOptions = (options: Parameters<typeof navigation.setOptions>[0]) => {
        navigation.setOptions(options);
    };

    return {
        navigation,
        setScreenOptions,
    };
};

export default useAppNavigation;
