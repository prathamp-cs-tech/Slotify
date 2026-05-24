import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function SignupScreen({ navigation, route }) {
  const { role } = route.params || {};
  const [passwordVisible, setPasswordVisible] = useState(false);

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brand}>SLOTIFY</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>

        <Text style={styles.title}>Create Account</Text>
        <Text style={styles.sub}>Sign up to continue</Text>

        {/* Name */}
        <View style={styles.inputBox}>
          <Ionicons name="person-outline" size={18} color="#888" />
          <TextInput placeholder="Full Name" style={styles.input} />
        </View>

        {/* Email */}
        <View style={styles.inputBox}>
          <Ionicons name="mail-outline" size={18} color="#888" />
          <TextInput placeholder="Email" style={styles.input} />
        </View>

        {/* Password */}
        <View style={styles.inputBox}>
          <Ionicons name="lock-closed-outline" size={18} color="#888" />
          <TextInput
            placeholder="Password"
            secureTextEntry={!passwordVisible}
            style={styles.input}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons
              name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
              size={18}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* Signup Button */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Login', { role })}
        >
          <Text style={styles.buttonText}>SIGN UP</Text>
        </TouchableOpacity>

        {/* Back to Login */}
        <View style={styles.row}>
          <Text style={{ fontSize: 13 }}>Already have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login', { role })}>
            <Text style={styles.link}>Login</Text>
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
    backgroundColor: '#F3F0FF',
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    padding: 25,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 5,
  },

  sub: {
    fontSize: 13,
    color: '#777',
    marginBottom: 20,
  },

  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#EDEBFF',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },

  input: {
    flex: 1,
    marginLeft: 10,
  },

  button: {
    backgroundColor: '#7C3AED',
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

  link: {
    color: '#7C3AED',
    fontWeight: '600',
  },
});