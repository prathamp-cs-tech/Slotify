import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import { Ionicons }
from '@expo/vector-icons';

import API from '../services/api';

import {
  saveUserData,
} from '../services/auth';

import {
  COLORS,
} from '../constants/colors';

export default function LoginScreen({
  navigation,
  route,
}) {

  const { role } =
    route.params || {};

  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [
    passwordVisible,
    setPasswordVisible,
  ] = useState(false);

  const [loading, setLoading] =
    useState(false);

  const handleLogin = async () => {

    try {

      console.log('BUTTON PRESSED');

      if (!email || !password) {

        Alert.alert(
          'Error',
          'Please fill all fields'
        );

        return;

      }

      setLoading(true);

      console.log('SENDING REQUEST');

      const response =
        await API.post(
          '/auth/login',
          {
            email,
            password,
          }
        );

      console.log(
        'SUCCESS:',
        response.data
      );

      const token =
        response.data.token;

      const user =
        response.data.user;

      await saveUserData(
        token,
        user
      );

      if (
        user.role ===
        'provider'
      ) {

        navigation.replace(
          'ProviderStack'
        );

      } else {

        navigation.replace(
          'UserStack'
        );

      }

    } catch (error) {

      console.log(
        'FULL ERROR:',
        error
      );

      console.log(
        'ERROR RESPONSE:',
        error.response?.data
      );

      console.log(
        'ERROR MESSAGE:',
        error.message
      );

      Alert.alert(
        'Login Failed',
        error.response?.data?.message ||
        error.message ||
        'Something went wrong'
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <KeyboardAvoidingView
      style={styles.container}
      behavior={
        Platform.OS === 'ios'
          ? 'padding'
          : 'height'
      }
    >

      <View style={styles.header}>

        <Text style={styles.brandTitle}>
          SLOTIFY
        </Text>

      </View>

      <View style={styles.card}>

        <View style={styles.welcomeRow}>

          <Text style={styles.welcomeText}>
            Welcome back
          </Text>

          <Ionicons
            name="person"
            size={24}
            color={COLORS.primary}
            style={{
              marginLeft: 6,
            }}
          />

        </View>

        <Text style={styles.subText}>
          Enter valid email &
          password to continue
        </Text>

        <View style={styles.inputWrapper}>

          <Ionicons
            name="mail-outline"
            size={18}
            color={COLORS.lightGray}
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor={
              COLORS.lightGray
            }
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

        </View>

        <View style={styles.inputWrapper}>

          <Ionicons
            name="lock-closed-outline"
            size={18}
            color={COLORS.lightGray}
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor={
              COLORS.lightGray
            }
            secureTextEntry={
              !passwordVisible
            }
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            onPress={() =>
              setPasswordVisible(
                !passwordVisible
              )
            }
          >

            <Ionicons
              name={
                passwordVisible
                  ? 'eye-outline'
                  : 'eye-off-outline'
              }
              size={18}
              color={
                COLORS.lightGray
              }
            />

          </TouchableOpacity>

        </View>

        

        <TouchableOpacity
          style={styles.loginButton}
          onPress={handleLogin}
          disabled={loading}
        >

          <Text style={styles.loginButtonText}>

            {loading
              ? 'LOGGING IN...'
              : 'LOGIN'}

          </Text>

        </TouchableOpacity>

        <View style={styles.signupRow}>

          <Text style={styles.signupText}>
            Don't have an account?
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                'Signup',
                {
                  role:
                    role ===
                    'provider'
                      ? 'provider'
                      : 'customer',
                }
              )
            }
          >

            <Text style={styles.signupLink}>
              {' '}Sign up
            </Text>

          </TouchableOpacity>

        </View>

      </View>

    </KeyboardAvoidingView>

  );

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#9F8FEF',
  },

  header: {
    flex: 0.35,
    justifyContent: 'center',
    alignItems: 'center',
  },

  brandTitle: {
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 5,
    color: '#4C1D95',
  },

  card: {
    flex: 0.65,
    backgroundColor:
      COLORS.background,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 30,
    paddingTop: 35,
  },

  welcomeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  welcomeText: {
    fontSize: 26,
    fontWeight: '700',
    color: COLORS.primary,
  },

  subText: {
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: 25,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor:
      COLORS.card,
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 14,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: COLORS.text,
  },

  forgotWrapper: {
    alignItems: 'flex-end',
    marginBottom: 24,
  },

  forgotText: {
    fontSize: 13,
    color: COLORS.gray,
  },

  loginButton: {
    backgroundColor:
      COLORS.primary,
    borderRadius: 40,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 24,
  },

  loginButtonText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 2,
  },

  signupRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  signupText: {
    fontSize: 13,
    color: COLORS.gray,
  },

  signupLink: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '700',
  },

});