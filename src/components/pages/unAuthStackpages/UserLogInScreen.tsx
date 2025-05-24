import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, Platform, ImageBackground, ScrollView } from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/config';
import useAppNavigation from '../../../navigators/useAppNavigation';
import { Images } from '../../../utilis/Images';

const UserLogInScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { navigation, setScreenOptions } = useAppNavigation()

    useEffect(() => {
        setScreenOptions({
            'header': () => null
        })
    }, [navigation])

    const handleLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                Alert.alert('Success', `Welcome back, ${user.email}!`);
            })
            .catch((error) => {
                Alert.alert('Error', error.message); // Display error message if login fails
            });
    };

    return (
        <KeyboardAvoidingView
            style={{ flex: 1 }}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        >
            <ScrollView
                style={{ flexGrow: 1 }}
                contentContainerStyle={{ flexGrow: 1 }}
            >
                <ImageBackground style={{ flexGrow: 1 }} source={Images.ic_login_background} resizeMode="cover">
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
