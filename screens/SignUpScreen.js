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
import { signIn } from "../src/config/api";

const SignUpScreen = ({ onSignUp, onNavigateToLogin }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    riskAppetite: '',
    investmentAmount: ''
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleChange = useCallback((field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const validateForm = useCallback(() => {
    const { firstName, lastName, email, password, confirmPassword, riskAppetite, investmentAmount } = formData;

    if (!firstName.trim() || !lastName.trim() || !email.trim() || !password || !confirmPassword) {
      Alert.alert('Missing Information', 'Please fill in all required fields');
      return false;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      Alert.alert('Invalid Email', 'Please enter a valid email address');
      return false;
    }

    if (password.length < 6) {
      Alert.alert('Weak Password', 'Password must be at least 6 characters long');
      return false;
    }

    if (password !== confirmPassword) {
      Alert.alert('Password Mismatch', 'Passwords do not match');
      return false;
    }

    if (investmentAmount && isNaN(investmentAmount)) {
      Alert.alert('Invalid Amount', 'Please enter a valid investment amount');
      return false;
    }

    return true;
  }, [formData]);

  // const handleSignUp = useCallback(async () => {
  //   if (!validateForm()) return;

  //   setLoading(true);
    
  //   try {
  //     // Prepare data for signup - adjust fields according to your API requirements
  //     const signupData = {
  //       name: `${formData.firstName} ${formData.lastName}`,
  //       email: formData.email,
  //       password: formData.password,
  //       riskAppetite: formData.riskAppetite,
  //       investmentAmount: formData.investmentAmount ? parseInt(formData.investmentAmount) : 0
  //     };

  //     const response = await signIn(signupData);
      
  //     // If signup is successful, call the onSignUp callback
  //     if (response && response.token) {
  //       Alert.alert(
  //         'Account Created Successfully!',
  //         'Welcome to TradeSmart Pro. Your trading account is being set up.',
  //         [{ text: 'Continue', onPress: onSignUp }]
  //       );
  //     } else {
  //       Alert.alert('Signup Failed', 'Invalid response from server');
  //     }
  //   } catch (error) {
  //     console.error('Signup error:', error);
  //     Alert.alert('Signup Failed', error.message || 'An error occurred during signup');
  //   } finally {
  //     setLoading(false);
  //   }
  // }, [formData, validateForm, onSignUp]);


  const handleSignUp = useCallback(async () => {
  if (!validateForm()) return;

  setLoading(true);
  
  try {
    // Prepare data for signup - adjust fields according to your API requirements
    const signupData = {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      password: formData.password,
      riskAppetite: formData.riskAppetite,
      investmentAmount: formData.investmentAmount ? parseInt(formData.investmentAmount) : 0
    };

    const response = await signIn(signupData);
    
    // If signup is successful, show success message and navigate to login
    if (response && response.success) {
      Alert.alert(
        'Account Created Successfully!',
        response.message || 'Welcome to TradeSmart Pro. Please login to continue.',
        [
          { 
            text: 'Continue to Login', 
            onPress: () => {
              // Navigate to login page after successful signup
              onNavigateToLogin();
              // Clear form
              setFormData({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                riskAppetite: '',
                investmentAmount: ''
              });
            }
          }
        ]
      );
    } else {
      Alert.alert('Signup Failed', 'Invalid response from server');
    }
  } catch (error) {
    console.error('Signup error:', error);
    Alert.alert('Signup Failed', error.message || 'An error occurred during signup');
  } finally {
    setLoading(false);
  }
}, [formData, validateForm, onNavigateToLogin]);


  const getPasswordStrength = useCallback(() => {
    if (formData.password.length === 0) return { text: '', color: '#64748b' };
    if (formData.password.length < 6) return { text: 'Weak', color: '#dc2626' };
    if (formData.password.length < 8) return { text: 'Fair', color: '#d97706' };
    return { text: 'Strong', color: '#059669' };
  }, [formData.password]);

  const passwordStrength = getPasswordStrength();

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
            <Text style={styles.logoText}>🚀</Text>
          </View>
          <Text style={styles.title}>Join TradeSmart Pro</Text>
          <Text style={styles.subtitle}>Start Your Investment Journey</Text>
        </View>

        <View style={styles.form}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.nameContainer}>
            <View style={styles.nameInputWrapper}>
              <Text style={styles.inputLabel}>First Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter first name"
                value={formData.firstName}
                onChangeText={(value) => handleChange('firstName', value)}
                placeholderTextColor="#94a3b8"
                editable={!loading}
              />
            </View>
            <View style={styles.nameInputWrapper}>
              <Text style={styles.inputLabel}>Last Name *</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter last name"
                value={formData.lastName}
                onChangeText={(value) => handleChange('lastName', value)}
                placeholderTextColor="#94a3b8"
                editable={!loading}
              />
            </View>
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Email Address *</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              value={formData.email}
              onChangeText={(value) => handleChange('email', value)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              placeholderTextColor="#94a3b8"
              editable={!loading}
            />
          </View>

          <Text style={styles.sectionTitle}>Investment Profile</Text>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Risk Appetite</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g., Conservative, Moderate, Aggressive"
              value={formData.riskAppetite}
              onChangeText={(value) => handleChange('riskAppetite', value)}
              placeholderTextColor="#94a3b8"
              editable={!loading}
            />
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Initial Investment Amount (₹)</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter amount in rupees"
              value={formData.investmentAmount}
              onChangeText={(value) => handleChange('investmentAmount', value)}
              keyboardType="numeric"
              placeholderTextColor="#94a3b8"
              editable={!loading}
            />
          </View>

          <Text style={styles.sectionTitle}>Security</Text>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Password *</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Create a strong password"
                value={formData.password}
                onChangeText={(value) => handleChange('password', value)}
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
            {formData.password.length > 0 && (
              <View style={styles.passwordStrength}>
                <Text style={[styles.passwordStrengthText, { color: passwordStrength.color }]}>
                  Password Strength: {passwordStrength.text}
                </Text>
                <View style={styles.strengthBar}>
                  <View 
                    style={[
                      styles.strengthFill,
                      { 
                        width: `${Math.min((formData.password.length / 8) * 100, 100)}%`,
                        backgroundColor: passwordStrength.color
                      }
                    ]} 
                  />
                </View>
              </View>
            )}
          </View>

          <View style={styles.inputWrapper}>
            <Text style={styles.inputLabel}>Confirm Password *</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={[styles.input, styles.passwordInput]}
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChangeText={(value) => handleChange('confirmPassword', value)}
                secureTextEntry={!showConfirmPassword}
                autoCapitalize="none"
                autoCorrect={false}
                placeholderTextColor="#94a3b8"
                editable={!loading}
              />
              <TouchableOpacity 
                style={styles.passwordToggle}
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                <Text style={styles.passwordToggleText}>
                  {showConfirmPassword ? 'HIDE' : 'SHOW'}
                </Text>
              </TouchableOpacity>
            </View>
            {formData.confirmPassword.length > 0 && formData.password !== formData.confirmPassword && (
              <Text style={styles.passwordMismatch}>Passwords do not match</Text>
            )}
          </View>

          <TouchableOpacity 
            style={[
              styles.signupButton, 
              loading && styles.signupButtonDisabled,
              (!formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword) && styles.signupButtonDisabled
            ]}
            onPress={handleSignUp}
            disabled={loading || !formData.firstName || !formData.lastName || !formData.email || !formData.password || !formData.confirmPassword}
          >
            {loading ? (
              <View style={styles.buttonContent}>
                <ActivityIndicator size="small" color="#ffffff" />
                <Text style={styles.signupButtonText}>Creating Trading Account...</Text>
              </View>
            ) : (
              <Text style={styles.signupButtonText}>Create Trading Account</Text>
            )}
          </TouchableOpacity>

          <View style={styles.termsContainer}>
            <Text style={styles.termsText}>
              By creating an account, you agree to our{' '}
              <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
              <Text style={styles.termsLink}>Privacy Policy</Text>
            </Text>
          </View>

          <View style={styles.divider}>
            <View style={styles.dividerLine} />
            <Text style={styles.dividerText}>ALREADY HAVE AN ACCOUNT?</Text>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already a trader? </Text>
            <TouchableOpacity onPress={onNavigateToLogin} disabled={loading}>
              <Text style={styles.loginLink}>Sign In</Text>
            </TouchableOpacity>
          </View>
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
    marginBottom: 32,
  },
  logoContainer: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#1e293b',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  logoText: {
    fontSize: 28,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 8,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 15,
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
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e2e8f0',
    marginBottom: 16,
    marginTop: 8,
  },
  nameContainer: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 16,
  },
  nameInputWrapper: {
    flex: 1,
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
  passwordContainer: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 70,
  },
  passwordToggle: {
    position: 'absolute',
    right: 16,
    top: 14,
  },
  passwordToggleText: {
    color: '#60a5fa',
    fontSize: 12,
    fontWeight: '500',
  },
  passwordStrength: {
    marginTop: 8,
  },
  passwordStrengthText: {
    fontSize: 12,
    fontWeight: '500',
    marginBottom: 4,
  },
  strengthBar: {
    height: 4,
    backgroundColor: '#334155',
    borderRadius: 2,
    overflow: 'hidden',
  },
  strengthFill: {
    height: '100%',
    borderRadius: 2,
  },
  passwordMismatch: {
    color: '#dc2626',
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
  signupButton: {
    backgroundColor: '#059669',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 16,
  },
  signupButtonDisabled: {
    backgroundColor: '#475569',
    opacity: 0.6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  signupButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  termsContainer: {
    marginBottom: 20,
  },
  termsText: {
    color: '#94a3b8',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
  termsLink: {
    color: '#60a5fa',
    fontWeight: '500',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#334155',
  },
  dividerText: {
    color: '#64748b',
    paddingHorizontal: 12,
    fontSize: 11,
    fontWeight: '500',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  loginText: {
    color: '#94a3b8',
    fontSize: 14,
  },
  loginLink: {
    color: '#60a5fa',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default SignUpScreen;