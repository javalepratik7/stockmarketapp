import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  StatusBar
} from 'react-native';


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
});