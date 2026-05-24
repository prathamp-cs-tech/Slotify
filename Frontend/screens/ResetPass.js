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

export default function ResetPassScreen({
  navigation,
  route,
}) {
  const { role } = route.params || {};

  const [passwordVisible1, setPasswordVisible1] = useState(false);

  const [passwordVisible2, setPasswordVisible2] = useState(false);

  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');

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

        <View style={styles.titleRow}>

          <Text style={styles.title}>
            Reset Password
          </Text>

          <Ionicons
            name="shield-checkmark-outline"
            size={24}
            color="#6C63FF"
            style={{ marginLeft: 8 }}
          />

        </View>

        <Text style={styles.subtitle}>
          Enter a new password for your account
        </Text>

        {/* PASSWORD */}
        <View style={styles.inputWrapper}>

          <Ionicons
            name="lock-closed-outline"
            size={18}
            color="#888"
          />

          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!passwordVisible1}
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            onPress={() =>
              setPasswordVisible1(!passwordVisible1)
            }
          >

            <Ionicons
              name={
                passwordVisible1
                  ? 'eye-outline'
                  : 'eye-off-outline'
              }
              size={18}
              color="#888"
            />

          </TouchableOpacity>

        </View>

        {/* CONFIRM PASSWORD */}
        <View style={styles.inputWrapper}>

          <Ionicons
            name="lock-closed-outline"
            size={18}
            color="#888"
          />

          <TextInput
            style={styles.input}
            placeholder="Confirm Password"
            placeholderTextColor="#999"
            secureTextEntry={!passwordVisible2}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />

          <TouchableOpacity
            onPress={() =>
              setPasswordVisible2(!passwordVisible2)
            }
          >

            <Ionicons
              name={
                passwordVisible2
                  ? 'eye-outline'
                  : 'eye-off-outline'
              }
              size={18}
              color="#888"
            />

          </TouchableOpacity>

        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={styles.button}
          onPress={() =>
            navigation.navigate('Login', { role })
          }
        >

          <Text style={styles.buttonText}>
            RESET PASSWORD
          </Text>

        </TouchableOpacity>

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

  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },

  title: {
    fontSize: 26,
    fontWeight: '700',
    color: '#6C63FF',
  },

  subtitle: {
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

  button: {
    backgroundColor: '#7C3AED',
    borderRadius: 40,
    paddingVertical: 18,
    alignItems: 'center',
    marginTop: 20,
  },

  buttonText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 15,
    letterSpacing: 2,
  },

});