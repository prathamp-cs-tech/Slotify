import { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';

import { Ionicons } from '@expo/vector-icons';

export default function ForgotPassScreen({
  navigation,
  route,
}) {

  const { role } = route.params || {};

  const [otpVisible, setOtpVisible] = useState(false);

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  return (

    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.brandTitle}>SLOTIFY</Text>
      </View>

      {/* CARD */}
      <View style={styles.card}>

        <View style={styles.welcomeRow}>

          <Text style={styles.welcomeText}>
            Forgot Password?
          </Text>

          <Ionicons
            name="lock-closed-outline"
            size={24}
            color="#6C63FF"
            style={{ marginLeft: 8 }}
          />

        </View>

        <Text style={styles.subText}>
          Enter your email address to receive password reset instructions
        </Text>

        {/* EMAIL */}
        <View style={styles.inputWrapper}>

          <Ionicons
            name="person-outline"
            size={18}
            color="#888"
          />

          <TextInput
            style={styles.input}
            placeholder="Email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
          />

        </View>

        {/* SEND OTP */}
        <TouchableOpacity style={styles.forgotWrapper}>

          <Text style={styles.forgotText}>
            Send OTP
          </Text>

        </TouchableOpacity>

        {/* OTP */}
        <View style={styles.inputWrapper}>

          <Ionicons
            name="key-outline"
            size={18}
            color="#888"
          />

          <TextInput
            style={styles.input}
            placeholder="Enter OTP"
            placeholderTextColor="#999"
            secureTextEntry={!otpVisible}
            value={otp}
            onChangeText={setOtp}
          />

          <TouchableOpacity
            onPress={() => setOtpVisible(!otpVisible)}
          >

            <Ionicons
              name={
                otpVisible
                  ? 'eye-outline'
                  : 'eye-off-outline'
              }
              size={18}
              color="#888"
            />

          </TouchableOpacity>

        </View>

        {/* VERIFY BUTTON */}
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() =>
            navigation.navigate('Reset', {
              role,
            })
          }
        >

          <Text style={styles.loginButtonText}>
            VERIFY OTP
          </Text>

        </TouchableOpacity>

        {/* SIGNUP */}
        <View style={styles.signupRow}>

          <Text style={styles.signupText}>
            Don’t have an account?
          </Text>

          <TouchableOpacity
            onPress={() =>
              navigation.navigate('Signup', {
                role,
              })
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
    fontSize: 28,
    fontWeight: '800',
    letterSpacing: 5,
    color: '#4C1D95',
  },

  card: {
    flex: 0.65,
    backgroundColor: '#F3F0FF',
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
    color: '#6C63FF',
  },

  subText: {
    fontSize: 13,
    color: '#777',
    marginBottom: 25,
    lineHeight: 20,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEBFF',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 14,
    marginBottom: 14,
  },

  input: {
    flex: 1,
    marginLeft: 10,
    fontSize: 14,
    color: '#333',
  },

  forgotWrapper: {
    alignItems: 'flex-end',
    marginBottom: 20,
    alignItems: 'center',
  },

  forgotText: {
    fontSize: 13,
    color: '#7C3AED',
    fontWeight: '600',
  },

  loginButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 40,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
  },

  loginButtonText: {
    color: 'white',
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
    color: '#555',
  },

  signupLink: {
    fontSize: 13,
    color: '#7C3AED',
    fontWeight: '600',
  },

});