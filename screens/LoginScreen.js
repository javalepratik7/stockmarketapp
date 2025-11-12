import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  ActivityIndicator
} from 'react-native';
import { login } from "../src/config/api";

const LoginScreen = ({ onLogin, onNavigateToSignUp }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleLogin = useCallback(async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing Information', 'Please enter both email and password');
      return;
    }

    if (!validateEmail(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long');
      return;
    }

    setLoading(true);
    
    try {
      const response = await login(email, password);
      
      // If login is successful, call the onLogin callback
      if (response && response.token) {
        Alert.alert('Success', 'Login successful!', [
          { text: 'OK', onPress: onLogin }
        ]);
      } else {
        Alert.alert('Login Failed', 'Invalid response from server');
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Login Failed', error.message || 'An error occurred during login');
    } finally {
      setLoading(false);
    }
  }, [email, password, onLogin]);

  const handleQuickDemo = useCallback(() => {
    setEmail('demo@trader.com');
    setPassword('demo123');
  }, []);

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <View style={styles.header}>
          <View style={styles.logoContainer}>
            <Text style={styles.logoText}>📈</Text>
          </View>
          <Text style={styles.title}>TradeSmart Pro</Text>
          <Text style={styles.subtitle}>Access Your Investment Portfolio</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.formTitle}>Trader Login</Text>
          
          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your registered email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#94a3b8"
              editable={!loading}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#94a3b8"
              editable={!loading}
            />
            <TouchableOpacity 
              style={styles.passwordToggle}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Text style={styles.passwordToggleText}>
                {showPassword ? 'HIDE' : 'SHOW'}
              </Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.forgotPassword}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={[
              styles.loginButton, 
              loading && styles.loginButtonDisabled,
              (!email || !password) && styles.loginButtonDisabled
            ]}
            onPress={handleLogin}
            disabled={loading || !email || !password}
          >
            {loading ? (
              <View style={styles.buttonContent}>
                <ActivityIndicator size="small" color="#ffffff" />
                <Text style={styles.loginButtonText}>Authenticating...</Text>
              </View>
            ) : (
              <Text style={styles.loginButtonText}>Access Portfolio</Text>
            )}
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.demoButton}
            onPress={handleQuickDemo}
            disabled={loading}
          >
            <Text style={styles.demoButtonText}>Use Demo Credentials</Text>
          </TouchableOpacity>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>New to TradeSmart? </Text>
            <TouchableOpacity onPress={onNavigateToSignUp} disabled={loading}>
              <Text style={styles.signupLink}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.securityNote}>
          <Text style={styles.securityText}>🔒 Secure & Encrypted Login</Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 24,
  },
  header: {
    alignItems: 'center',
    marginBottom: 48,
  },
  logoContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 32,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
  },
  form: {
    backgroundColor: '#1e293b',
    padding: 24,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  formTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 24,
    textAlign: 'center',
  },
  inputWrapper: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#e2e8f0',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#0f172a',
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: '#f1f5f9',
  },
  passwordToggle: {
    position: 'absolute',
    right: 16,
    top: 40,
  },
  passwordToggleText: {
    color: '#60a5fa',
    fontSize: 12,
    fontWeight: '500',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: '#60a5fa',
    fontSize: 14,
    fontWeight: '500',
  },
  loginButton: {
    backgroundColor: '#059669',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 12,
  },
  loginButtonDisabled: {
    backgroundColor: '#475569',
    opacity: 0.6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  loginButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  demoButton: {
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#475569',
    marginBottom: 24,
  },
  demoButtonText: {
    color: '#94a3b8',
    fontSize: 14,
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#334155',
  },
  dividerText: {
    color: '#64748b',
    paddingHorizontal: 16,
    fontSize: 12,
    fontWeight: '500',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  signupText: {
    color: '#94a3b8',
    fontSize: 14,
  },
  signupLink: {
    color: '#60a5fa',
    fontSize: 14,
    fontWeight: '600',
  },
  securityNote: {
    alignItems: 'center',
    marginTop: 24,
  },
  securityText: {
    color: '#64748b',
    fontSize: 12,
  },
});

export default LoginScreen;