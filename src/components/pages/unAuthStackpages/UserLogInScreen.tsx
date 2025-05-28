import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, Platform, ImageBackground, ScrollView } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/config';
import useAppNavigation from '../../../navigators/useAppNavigation';
import { Images } from '../../../utilis/Images';
import AppLoader from '../../atoms/AppLoader';
import { useAppDispatch } from '../../../redux/store';
import { AuthAction } from '../../../redux/reducers/AuthReducer';
import { userDetailsAction } from '../../../redux/reducers/UserReducer';
import { FirebaseError } from 'firebase/app';
import { firebase } from '@react-native-firebase/firestore';
import { userDetailsType } from '../../../redux/utilis/ReducerTypes';

const UserLogInScreen = () => {

    const dispatch = useAppDispatch()
    const [loader, setLoader] = useState(false)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { navigation, setScreenOptions } = useAppNavigation()

    useEffect(() => {
        setScreenOptions({
            'header': () => null
        })
    }, [navigation])

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill all the fields');
            return
        }
        try {
            setLoader(true)
            const response = await signInWithEmailAndPassword(auth, email, password)
            const user = response.user;
           
            const userDetails = await firebase.firestore().collection("users").doc(user.uid).get()
            const UserData= userDetails.data() as userDetailsType
            
            dispatch(AuthAction.login())
            dispatch(userDetailsAction.updateUserDetails({
                uid: user.uid,
                email: user.email || '',
                emailVerified: user.emailVerified,
                'dob': UserData.dob || '',
                'nickName': UserData.nickName || '',
                'private_account': UserData.private_account,
                'profilePhoto': UserData.profilePhoto || '',
                'userName': UserData.userName || '',
            }))
        } catch (error) {
            console.log('error', error)
            const firebaseError = error as FirebaseError;

            let message = 'Something went wrong. Please try again.';

            switch (firebaseError.code) {
                case 'auth/invalid-email':
                    message = 'Invalid email format.';
                    break;
                case 'auth/user-not-found':
                    message = 'No user found with this email.';
                    break;
                case 'auth/wrong-password':
                    message = 'Incorrect password.';
                    break;
                case 'auth/too-many-requests':
                    message = 'Too many failed attempts. Please try again later.';
                    break;
                default:
                    message = firebaseError.message; // fallback to Firebase message
                    break;
            }

            Alert.alert('Login Error', message);
        }
        finally {
            setLoader(false)
        }
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                style={{ flexGrow: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
                keyboardShouldPersistTaps="handled"
            >
                <ImageBackground style={{ flexGrow: 1 }} source={Images.ic_login_background} resizeMode="cover">
                    <AppLoader loading={loader} />
                    <View style={styles.container}>
                        <Text style={styles.title}>LogIn</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            value={email}
                            onChangeText={setEmail}
                            keyboardType="email-address"
                            autoCapitalize="none"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                        <Button title="Login" onPress={handleLogin} />
                        <Text style={styles.signupText}>
                            Don’t have an account?{' '}
                            <Text onPress={() => {
                                navigation.navigate('registerscreen')
                            }} style={styles.link}>
                                Register
                            </Text>
                        </Text>
                    </View>
                </ImageBackground>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
        color: 'white'
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        marginBottom: 15,
        'color': 'white'
    },
    signupText: {
        textAlign: 'center',
        marginTop: 25,
        color: 'white'
    },
    link: {
        color: 'orange',
        fontWeight: 'bold',
        textDecorationLine: 'underline'
    },
});

export default UserLogInScreen;
