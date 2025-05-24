import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, KeyboardAvoidingView, ScrollView, Platform, ImageBackground } from 'react-native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../../firebase/config';
import useAppNavigation from '../../../navigators/useAppNavigation';
import { Images } from '../../../utilis/Images';

const UserRegisterScreen = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const { navigation, setScreenOptions } = useAppNavigation()

  useEffect(() => {
    setScreenOptions({
      'header': () => null
    })
  }, [navigation])

  const handleSignUp = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        Alert.alert('Success', `Welcome, ${user.email}!`);
      })
      .catch((error) => {
        const errorMessage = error.message;
        Alert.alert('Error', errorMessage);
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
