import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import SuggestionCard from "../components/SuggestionCard";
import { analyzeInvestment } from '../src/config/api'; // Import the API function

const AnalyzeScreen = () => {
  const [formData, setFormData] = useState({
    price: '',
    risk: '3',
    investmentType: '',
    duration: '',
  });
  const [suggestions, setSuggestions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    // Validation
    if (!formData.price || !formData.investmentType || !formData.duration) {
      setError('Please fill in all required fields');
      return;
    }

    // Validate price is a positive number
    const price = parseFloat(formData.price);
    if (isNaN(price) || price <= 0) {
      setError('Please enter a valid investment amount');
      return;
    }

    setLoading(true);
    setError(null);
    setSuggestions(null);

    try {
      // Prepare data for API call
      const investmentData = {
        price: parseFloat(formData.price),
        risk: parseInt(formData.risk),
        investmentType: formData.investmentType,
        duration: formData.duration
      };

      console.log('Sending investment data:', investmentData);

      // Call the actual API
      const response = await analyzeInvestment(investmentData);
      
      console.log('API Response:', response);

      // Handle the response structure
      if (response && response.suggestions) {
        setSuggestions(response.suggestions);
      } else {
        setError('No suggestions received from the server');
      }
      
    } catch (err) {
      console.error('API Error:', err);
      setError(err.message || 'An unexpected error occurred while analyzing your investment');
    } finally {
      setLoading(false);
    }
  };

  const FeatureHighlights = () => (
    <View style={styles.featureGrid}>
      <View style={styles.featureItem}>
        <Text style={styles.featureEmoji}>🤖</Text>
        <View>
          <Text style={styles.featureTitle}>Smart Analysis</Text>
          <Text style={styles.featureDesc}>AI-powered investment insights</Text>
        </View>
      </View>
      
      <View style={styles.featureItem}>
        <Text style={styles.featureEmoji}>🛡️</Text>
        <View>
          <Text style={styles.featureTitle}>Risk Managed</Text>
          <Text style={styles.featureDesc}>Tailored to your risk profile</Text>
        </View>
      </View>
      
      <View style={styles.featureItem}>
        <Text style={styles.featureEmoji}>⏰</Text>
        <View>
          <Text style={styles.featureTitle}>Time Optimized</Text>
          <Text style={styles.featureDesc}>Matched to your timeline</Text>
        </View>
      </View>
    </View>
  );

  const LoadingSpinner = () => (
    <View style={styles.loadingContainer}>
      <View style={styles.spinner} />
      <Text style={styles.loadingTitle}>Analyzing Your Portfolio</Text>
      <Text style={styles.loadingText}>Crunching numbers and finding the best opportunities...</Text>
    </View>
  );

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.pageTitle}>Smart Investment Analyzer</Text>
          <Text style={styles.pageSubtitle}>
            Get AI-powered investment recommendations tailored to your financial goals and risk profile
          </Text>
        </View>

        <FeatureHighlights />
        
        {/* Investment Form */}
        <View style={styles.formContainer}>
          <View style={styles.formGrid}>
            {/* Investment Amount */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                💰 Investment Amount (₹) *
              </Text>
              <TextInput
                style={styles.input}
                value={formData.price}
                onChangeText={(value) => handleChange('price', value)}
                placeholder="e.g., 50000"
                keyboardType="numeric"
                placeholderTextColor="#94a3b8"
              />
            </View>

            {/* Risk Tolerance */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                📊 Risk Tolerance (1-5) *
              </Text>
              <View style={styles.pickerContainer}>
                {[1, 2, 3, 4, 5].map((riskLevel) => (
                  <TouchableOpacity
                    key={riskLevel}
                    style={[
                      styles.riskOption,
                      formData.risk === riskLevel.toString() && styles.riskOptionSelected
                    ]}
                    onPress={() => handleChange('risk', riskLevel.toString())}
                  >
                    <Text style={[
                      styles.riskText,
                      formData.risk === riskLevel.toString() && styles.riskTextSelected
                    ]}>
                      {riskLevel}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
              <Text style={styles.riskDescription}>
                {formData.risk === '1' && 'Very Conservative (Minimal Risk)'}
                {formData.risk === '2' && 'Conservative (Low Risk)'}
                {formData.risk === '3' && 'Moderate (Balanced Risk)'}
                {formData.risk === '4' && 'Aggressive (Higher Risk)'}
                {formData.risk === '5' && 'Very Aggressive (Maximum Risk)'}
              </Text>
            </View>

            {/* Investment Type */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>🎯 Investment Type *</Text>
              <View style={styles.pickerContainer}>
                {[
                  'Stocks', 'Bonds', 'Mutual Funds', 'ETFs', 
                  'Real Estate', 'Commodities', 'Cryptocurrency', 'Mixed'
                ].map((type) => (
                  <TouchableOpacity
                    key={type}
                    style={[
                      styles.typeOption,
                      formData.investmentType === type.toLowerCase().replace(' ', '-') && 
                      styles.typeOptionSelected
                    ]}
                    onPress={() => handleChange('investmentType', type.toLowerCase().replace(' ', '-'))}
                  >
                    <Text style={[
                      styles.typeText,
                      formData.investmentType === type.toLowerCase().replace(' ', '-') && 
                      styles.typeTextSelected
                    ]}>
                      {type}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            {/* Investment Duration */}
            <View style={styles.formGroup}>
              <Text style={styles.label}>
                ⏳ Investment Duration *
              </Text>
              <View style={styles.pickerContainer}>
                {[
                  { value: 'short-term', label: 'Short-term (0-2 years)' },
                  { value: 'medium-term', label: 'Medium-term (2-5 years)' },
                  { value: 'long-term', label: 'Long-term (5-10 years)' },
                  { value: 'very-long-term', label: 'Very Long-term (10+ years)' }
                ].map((duration) => (
                  <TouchableOpacity
                    key={duration.value}
                    style={[
                      styles.durationOption,
                      formData.duration === duration.value && styles.durationOptionSelected
                    ]}
                    onPress={() => handleChange('duration', duration.value)}
                  >
                    <Text style={[
                      styles.durationText,
                      formData.duration === duration.value && styles.durationTextSelected
                    ]}>
                      {duration.label}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>

          {/* Submit Button */}
          <TouchableOpacity 
            style={[styles.submitButton, loading && styles.submitButtonDisabled]}
            onPress={handleSubmit}
            disabled={loading}
          >
            {loading ? (
              <View style={styles.buttonContent}>
                <View style={styles.loadingSpinner} />
                <Text style={styles.submitButtonText}>Analyzing Your Portfolio...</Text>
              </View>
            ) : (
              <View style={styles.buttonContent}>
                <Text style={styles.submitButtonText}>Get Smart Recommendations</Text>
                <Text style={styles.arrowIcon}>→</Text>
              </View>
            )}
          </TouchableOpacity>
        </View>

        {/* Error Message */}
        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorTitle}>⚠️ Error</Text>
            <Text style={styles.errorMessage}>{error}</Text>
          </View>
        )}

        {/* Loading State */}
        {loading && <LoadingSpinner />}

        {/* Investment Suggestions */}
        {suggestions && suggestions.length > 0 && (
          <View style={styles.resultsSection}>
            <View style={styles.resultsHeader}>
              <Text style={styles.resultsTitle}>Your Personalized Recommendations</Text>
              <Text style={styles.resultsSubtitle}>
                Based on your risk profile and investment preferences
              </Text>
            </View>
            
            <View style={styles.suggestionsGrid}>
              {suggestions.map((suggestion, idx) => (
                <SuggestionCard
                  key={idx}
                  suggestion={suggestion}
                  index={idx}
                />
              ))}
            </View>
          </View>
        )}
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
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#f1f5f9',
    marginBottom: 12,
  },
  pageSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 22,
  },
  featureGrid: {
    gap: 16,
    marginBottom: 32,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 20,
    backgroundColor: '#1e293b',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  featureEmoji: {
    fontSize: 24,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 14,
    color: '#94a3b8',
  },
  formContainer: {
    backgroundColor: '#1e293b',
    padding: 24,
    borderRadius: 16,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#334155',
  },
  formGrid: {
    gap: 24,
  },
  formGroup: {
    gap: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e2e8f0',
  },
  input: {
    borderWidth: 1,
    borderColor: '#334155',
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    backgroundColor: '#0f172a',
    color: '#f1f5f9',
  },
  pickerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  riskOption: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#0f172a',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#334155',
  },
  riskOptionSelected: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  riskText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#94a3b8',
  },
  riskTextSelected: {
    color: '#ffffff',
  },
  riskDescription: {
    fontSize: 14,
    color: 'crimson',
    marginTop: 4,
  },
  typeOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0f172a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
  },
  typeOptionSelected: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  typeText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#94a3b8',
  },
  typeTextSelected: {
    color: '#ffffff',
  },
  durationOption: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#0f172a',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#334155',
    flex: 1,
    minWidth: '48%',
  },
  durationOptionSelected: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  durationText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#94a3b8',
    textAlign: 'center',
  },
  durationTextSelected: {
    color: '#ffffff',
  },
  submitButton: {
    backgroundColor: '#059669',
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  submitButtonDisabled: {
    backgroundColor: '#475569',
    opacity: 0.6,
  },
  buttonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  arrowIcon: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loadingSpinner: {
    width: 20,
    height: 20,
    borderWidth: 2,
    borderColor: 'transparent',
    borderTopColor: 'white',
    borderRadius: 10,
  },
  errorContainer: {
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#dc2626',
    borderRadius: 12,
    padding: 20,
    alignItems: 'center',
    marginBottom: 24,
  },
  errorTitle: {
    color: '#dc2626',
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  errorMessage: {
    color: '#fca5a5',
    textAlign: 'center',
    lineHeight: 20,
  },
  loadingContainer: {
    alignItems: 'center',
    padding: 40,
  },
  spinner: {
    width: 60,
    height: 60,
    borderWidth: 4,
    borderColor: '#334155',
    borderTopColor: '#059669',
    borderRadius: 30,
    marginBottom: 16,
  },
  loadingTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 8,
  },
  loadingText: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
  },
  resultsSection: {
    marginTop: 24,
  },
  resultsHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  resultsTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 8,
    textAlign: 'center',
  },
  resultsSubtitle: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
  },
  suggestionsGrid: {
    gap: 16,
  },
});

export default AnalyzeScreen;