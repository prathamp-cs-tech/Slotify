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

import { Ionicons } from '@expo/vector-icons';

import API from '../services/api';

import {
  saveUserData,
} from '../services/auth';

import { COLORS } from '../constants/colors';

export default function SignupScreen({
  navigation,
  route,
}) {

  const { role } = route.params || {};

  const [passwordVisible,
    setPasswordVisible] =
      useState(false);

  const [name,
    setName] =
      useState('');

  const [email,
    setEmail] =
      useState('');

  const [password,
    setPassword] =
      useState('');

  const [loading,
    setLoading] =
      useState(false);

  const handleSignup = async () => {

    if (
      !name ||
      !email ||
      !password
    ) {

      Alert.alert(
        'Error',
        'Please fill all fields'
      );

      return;

    }

    try {

      setLoading(true);

      const response =
        await API.post(
          '/auth/signup',
          {
            name,
            email,
            password,

            role:
              role === 'provider'
                ? 'provider'
                : 'customer',
          }
        );

      console.log(
        'SIGNUP RESPONSE:',
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
          'ProviderHome'
        );

      } else {

        navigation.replace(
          'Home'
        );

      }

    } catch (error) {

      console.log(
        error.response?.data
      );

      Alert.alert(
        'Signup Failed',
        error.response?.data
          ?.message ||
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

      {/* HEADER */}
      <View style={styles.header}>

        <Text style={styles.brand}>
          SLOTIFY
        </Text>

      </View>

      {/* CARD */}
      <View style={styles.card}>

        <Text style={styles.title}>
          Create Account
        </Text>

        <Text style={styles.sub}>
          Sign up to continue
        </Text>

        {/* NAME */}
        <View style={styles.inputBox}>

          <Ionicons
            name="person-outline"
            size={18}
            color="#888"
          />

          <TextInput
            placeholder="Full Name"
            placeholderTextColor="#999"
            style={styles.input}
            value={name}
            onChangeText={setName}
          />

        </View>

        {/* EMAIL */}
        <View style={styles.inputBox}>

          <Ionicons
            name="mail-outline"
            size={18}
            color="#888"
          />

          <TextInput
            placeholder="Email"
            placeholderTextColor="#999"
            style={styles.input}
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

        </View>

        {/* PASSWORD */}
        <View style={styles.inputBox}>

          <Ionicons
            name="lock-closed-outline"
            size={18}
            color="#888"
          />

          <TextInput
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={
              !passwordVisible
            }
            style={styles.input}
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
              color="#888"
            />

          </TouchableOpacity>

        </View>

        {/* SIGNUP BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={handleSignup}
          disabled={loading}
        >

          <Text style={styles.buttonText}>

            {loading
              ? 'CREATING ACCOUNT...'
              : 'SIGN UP'}

          </Text>

        </TouchableOpacity>

        {/* LOGIN */}
        <View style={styles.row}>

          <Text style={styles.rowText}>
            Already have an account?
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate(
                'Login',
                { role:role==='provider'?'provider':'costumer' }
              )
            }
          >

            <Text style={styles.link}>
              {' '}Login
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
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },

  brand: {
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 4,
    color: '#4C1D95',
  },

  card: {
    flex: 0.7,
    backgroundColor: COLORS.background,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 25,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 5,
    color: COLORS.text,
  },

  sub: {
    fontSize: 13,
    color: COLORS.gray,
    marginBottom: 20,
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    color: COLORS.text,
  },

  button: {
    backgroundColor: COLORS.primary,
    borderRadius: 30,
    paddingVertical: 15,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },

  buttonText: {
    color: '#fff',
    fontWeight: '700',
    letterSpacing: 1,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  rowText: {
    fontSize: 13,
    color: COLORS.gray,
  },

  link: {
    color: COLORS.primary,
    fontWeight: '600',
  },

});