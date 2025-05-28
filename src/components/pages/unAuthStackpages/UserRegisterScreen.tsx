import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, Platform, ImageBackground } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/config';
import useAppNavigation from '../../../navigators/useAppNavigation';
import { Images } from '../../../utilis/Images';
import { useAppDispatch } from '../../../redux/store';
import { AuthAction } from '../../../redux/reducers/AuthReducer';
import AppLoader from '../../atoms/AppLoader';
import { userDetailsAction } from '../../../redux/reducers/UserReducer';
import { FirebaseError } from 'firebase/app';
import { firebase } from '@react-native-firebase/firestore';
import { randomString } from '../../../utilis/CommonFunction';

const UserRegisterScreen = () => {

  const dispatch = useAppDispatch()
  const [loader, setLoader] = useState(false)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { navigation, setScreenOptions } = useAppNavigation()

  useEffect(() => {
    setScreenOptions({
      'header': () => null
    })
  }, [navigation])

  const handleSignUp = async () => {
    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill all the fields');
      return
    }
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      setPassword('');
      setConfirmPassword('');
      return;
    }
    if (password.length < 8) {
      Alert.alert('Error', 'Password must be at least 6 characters');
      return
    }

    try {
      setLoader(true)
      const response = await createUserWithEmailAndPassword(auth, email, password)
      const user = response.user;

      //create user in firestoredatabase

      await firebase.firestore().collection("users").doc(user.uid).set({
        userName: randomString(10),
        nickName: "",
        dob: "",
        profilePhoto: "",
        private_account: false,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });

      console.log('✅ User document created successfully');

      dispatch(AuthAction.login())
      dispatch(userDetailsAction.updateUserDetails({
        uid: user.uid, 'displayName': user.displayName || '',
        email: user.email || '', emailVerified: user.emailVerified
      }))

    } catch (error) {
      console.log('error', error)
      const firebaseError = error as FirebaseError;

      let message = 'Registration failed. Please try again.';

      switch (firebaseError.code) {
        case 'auth/email-already-in-use':
          message = 'This email is already in use.';
          break;
        case 'auth/invalid-email':
          message = 'Invalid email format.';
          break;
        case 'auth/weak-password':
          message = 'Password is too weak (min 6 characters).';
          break;
        case 'auth/operation-not-allowed':
          message = 'Email/password sign-up is not enabled.';
          break;
        default:
          message = firebaseError.message; // fallback
          break;
      }

      Alert.alert('Registration Error', message);
    } finally {
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
            <Text style={styles.title}>Register</Text>
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
            <TextInput
              style={styles.input}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
            <Button title="Sign Up" onPress={handleSignUp} />
            <Text style={styles.loginText}>
              Already have an account?{' '}
              <Text onPress={() => {
                navigation.goBack()
              }} style={styles.link}>
                Login here
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
    color: 'white'
  },
  loginText: {
    textAlign: 'center',
    marginTop: 25,
    color: 'white'
  },
  link: {
    color: 'orange',
    fontWeight: 'bold',

  },
});

export default UserRegisterScreen;
