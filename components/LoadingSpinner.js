import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingSpinner = ({ message = "Loading Market Data...", subMessage = "Fetching live prices from exchange" }) => {
  return (
    <View style={styles.container}>
      <View style={styles.spinnerContainer}>
        <ActivityIndicator size="large" color="#059669" />
        <Text style={styles.loadingEmoji}>📊</Text>
      </View>
      <Text style={styles.loadingText}>{message}</Text>
      <Text style={styles.loadingSubtext}>{subMessage}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
    backgroundColor: '#0f172a',
  },
  spinnerContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  loadingEmoji: {
    position: 'absolute',
    top: 12,
    left: 12,
    fontSize: 20,
  },
  loadingText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 8,
    textAlign: 'center',
  },
  loadingSubtext: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default LoadingSpinner