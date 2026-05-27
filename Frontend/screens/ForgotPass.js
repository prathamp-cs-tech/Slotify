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

import { COLORS } from '../constants/colors';

export default function ForgotPassScreen({
  navigation,
  route,
}) {

  const { role } = route.params || {};

  const [otpVisible, setOtpVisible] = useState(false);

  const [email, setEmail] = useState('');

  const [otp, setOtp] = useState('');

  const [otpSent, setOtpSent] = useState(false);

  const sendOTP = () => {

    if (!email.trim()) {

      Alert.alert(
        'Missing Email',
        'Please enter your email address'
      );

      return;

    }

    setOtpSent(true);

    Alert.alert(
      'OTP Sent',
      'A verification code has been sent to your email'
    );

  };

  const verifyOTP = () => {

    if (!otp.trim()) {

      Alert.alert(
        'Missing OTP',
        'Please enter the OTP'
      );

      return;

    }

    navigation.navigate('Reset', {
      role,
    });

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
            Forgot Password?
          </Text>

          <Ionicons
            name="lock-closed-outline"
            size={24}
            color={COLORS.primary}
            style={{ marginLeft: 8 }}
          />

        </View>

        <Text style={styles.subText}>
          Enter your email address to receive password reset instructions
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
            placeholderTextColor={COLORS.lightGray}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

        </View>

        <TouchableOpacity
          style={styles.sendOtpBtn}
          onPress={sendOTP}
        >

          <Text style={styles.sendOtpText}>
            {otpSent ? 'RESEND OTP' : 'SEND OTP'}
          </Text>

        </TouchableOpacity>

        {otpSent && (

          <View style={styles.inputWrapper}>

            <Ionicons
              name="key-outline"
              size={18}
              color={COLORS.lightGray}
            />

            <TextInput
              style={styles.input}
              placeholder="Enter OTP"
              placeholderTextColor={COLORS.lightGray}
              secureTextEntry={!otpVisible}
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
            />

            <TouchableOpacity
              onPress={() =>
                setOtpVisible(!otpVisible)
              }
            >

              <Ionicons
                name={
                  otpVisible
                    ? 'eye-outline'
                    : 'eye-off-outline'
                }
                size={18}
                color={COLORS.lightGray}
              />

            </TouchableOpacity>

          </View>

        )}

        <TouchableOpacity
          style={[
            styles.loginButton,
            !otpSent && {
              opacity: 0.5,
            },
          ]}
          disabled={!otpSent}
          onPress={verifyOTP}
        >

          <Text style={styles.loginButtonText}>
            VERIFY OTP
          </Text>

        </TouchableOpacity>

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
    fontSize: 30,
    fontWeight: '900',
    letterSpacing: 5,
    color: '#4C1D95',
  },

  card: {
    flex: 0.65,
    backgroundColor: COLORS.background,
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
    lineHeight: 20,
  },

  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
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

  sendOtpBtn: {
    alignItems: 'center',
    marginBottom: 22,
  },

  sendOtpText: {
    fontSize: 13,
    color: COLORS.primary,
    fontWeight: '700',
  },

  loginButton: {
    backgroundColor: COLORS.primary,
    borderRadius: 40,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 10,
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