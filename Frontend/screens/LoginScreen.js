import { useState } from 'react';
import { SafeAreaView } from 'react-native';
import {
  View, Text, TextInput, TouchableOpacity,
  StyleSheet, KeyboardAvoidingView, Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function LoginScreen({ navigation, route }) {
  const { role } = route.params || {};
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.brandTitle}>SLOTIFY</Text>
      </View>

      {/* Card */}
      <View style={styles.card}>

        <View style={styles.welcomeRow}>
          <Text style={styles.welcomeText}>Welcome back</Text>
          <Ionicons name="person" size={26} color="#6C63FF" style={{ marginLeft: 6 }} />
        </View>

        <Text style={styles.subText}>
          Enter valid user name & password to continue
        </Text>

        {/* Email */}
        <View style={styles.inputWrapper}>
          <Ionicons name="person-outline" size={18} color="#888" />
          <TextInput
            style={styles.input}
            placeholder="Username/email"
            placeholderTextColor="#999"
            value={email}
            onChangeText={setEmail}
          />
        </View>

        {/* Password */}
        <View style={styles.inputWrapper}>
          <Ionicons name="lock-closed-outline" size={18} color="#888" />
          <TextInput
            style={styles.input}
            placeholder="Password"
            placeholderTextColor="#999"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
            <Ionicons
              name={passwordVisible ? 'eye-outline' : 'eye-off-outline'}
              size={18}
              color="#888"
            />
          </TouchableOpacity>
        </View>

        {/* Forgot */}
        <TouchableOpacity style={styles.forgotWrapper} onPress={() => navigation.navigate('Forgot', { role })}>
          <Text style={styles.forgotText}>Forgot password?</Text>
        </TouchableOpacity>

        {/* Login Button */}
        <TouchableOpacity
        style={styles.loginButton}
        onPress={() => {

          if (role === 'serviceprovider') {
            navigation.navigate('ProviderHome');
          } else {
            navigation.navigate('Home');
          }

        }}
      >
        <Text style={styles.loginButtonText}>
          LOGIN
        </Text>
      </TouchableOpacity>

        {/* Signup */}
        <View style={styles.signupRow}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup', { role })}>
            <Text style={styles.signupLink}>Sign up</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
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
    marginBottom: 24,
  },

  forgotText: {
    fontSize: 13,
    color: '#555',
  },

  loginButton: {
    backgroundColor: '#7C3AED',
    borderRadius: 40,
    paddingVertical: 18,
    alignItems: 'center',
    marginBottom: 24,
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