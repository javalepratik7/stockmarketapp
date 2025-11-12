import React, { useState, useEffect } from 'react';
import { 
  View, 
  StyleSheet, 
  SafeAreaView, 
  StatusBar,
  ActivityIndicator
} from 'react-native';
import { isLoggedIn } from './src/config/api';

import LoginScreen from './screens/LoginScreen';
import SignUpScreen from './screens/SignUpScreen';
import HomeScreen from './screens/HomeScreen';
import MarketStatsScreen from './screens/MarketStatsScreen';
import AnalyzeScreen from './screens/AnalyzeScreen';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check if user is already logged in on app start
  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const loggedIn = await isLoggedIn();
      if (loggedIn) {
        setIsLoggedIn(true);
        setCurrentScreen('home');
      }
    } catch (error) {
      console.error('Auth check error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentScreen('home');
  };

  const handleSignUp = () => {
    setIsLoggedIn(true);
    setCurrentScreen('home');
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentScreen('login');
  };

  const renderScreen = () => {
    if (!isLoggedIn) {
      switch (currentScreen) {
        case 'login':
          return <LoginScreen onLogin={handleLogin} onNavigateToSignUp={() => setCurrentScreen('signup')} />;
        case 'signup':
          return <SignUpScreen onSignUp={handleSignUp} onNavigateToLogin={() => setCurrentScreen('login')} />;
        default:
          return <LoginScreen onLogin={handleLogin} onNavigateToSignUp={() => setCurrentScreen('signup')} />;
      }
    }

    switch (currentScreen) {
      case 'home':
        return <HomeScreen />;
      case 'market':
        return <MarketStatsScreen />;
      case 'analyze':
        return <AnalyzeScreen />;
      default:
        return <HomeScreen />;
    }
  };

  // Show loading indicator while checking auth status
  if (isLoading) {
    return (
      <SafeAreaView style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#059669" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      {isLoggedIn && (
        <Navbar 
          currentScreen={currentScreen} 
          onScreenChange={setCurrentScreen}
          onLogout={handleLogout}
        />
      )}
      <View style={styles.mainContent}>
        {renderScreen()}
      </View>
      {isLoggedIn && <Footer />}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  mainContent: {
    flex: 1,
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});