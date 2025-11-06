import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  StyleSheet,
  Alert,
  Dimensions,
  Animated
} from 'react-native';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

const Navbar = ({ currentScreen, onScreenChange, onLogout }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [slideAnim] = useState(new Animated.Value(-SCREEN_WIDTH * 0.7));

  const navItems = [
    { key: 'home', label: 'Dashboard', icon: '🏠' },
    { key: 'market', label: 'Market Data', icon: '📈' },
    { key: 'analyze', label: 'AI Analyzer', icon: '🤖' },
  ];

  const toggleDrawer = () => {
    if (drawerOpen) {
      // Close drawer
      Animated.timing(slideAnim, {
        toValue: -SCREEN_WIDTH * 0.7,
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      // Open drawer
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
    setDrawerOpen(!drawerOpen);
  };

  const handleNavPress = (screenKey) => {
    onScreenChange(screenKey);
    toggleDrawer(); // Close drawer after selection
  };

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: onLogout, style: 'destructive' }
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Main Navbar */}
      <View style={styles.navbar}>
        <View style={styles.navContainer}>
          
          {/* Menu Button and Brand */}
          <View style={styles.leftSection}>
            <TouchableOpacity style={styles.menuButton} onPress={toggleDrawer}>
              <Text style={styles.menuIcon}>☰</Text>
            </TouchableOpacity>
            <View style={styles.brandContainer}>
              <Text style={styles.brandEmoji}>📊</Text>
            </View>
          </View>

          {/* Current Screen Title */}
          <View style={styles.centerSection}>
            <Text style={styles.currentScreenTitle}>
              {navItems.find(item => item.key === currentScreen)?.label || 'Dashboard'}
            </Text>
          </View>

          {/* User Info */}
          <View style={styles.rightSection}>
            <View style={styles.userInfo}>
              <Text style={styles.userEmoji}>👤</Text>
              <Text style={styles.userName}>Trader</Text>
            </View>
          </View>
          
        </View>
      </View>

      {/* Overlay when drawer is open */}
      {drawerOpen && (
        <TouchableOpacity 
          style={styles.overlay}
          onPress={toggleDrawer}
          activeOpacity={1}
        />
      )}

      {/* Left Drawer */}
      <Animated.View 
        style={[
          styles.drawer,
          {
            transform: [{ translateX: slideAnim }]
          }
        ]}
      >
        {/* Drawer Header */}
        <View style={styles.drawerHeader}>
          <Text style={styles.drawerTitle}>Navigation</Text>
          <TouchableOpacity style={styles.closeButton} onPress={toggleDrawer}>
            <Text style={styles.closeIcon}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Navigation Items */}
        <View style={styles.drawerContent}>
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.key}
              style={[
                styles.drawerItem,
                currentScreen === item.key && styles.drawerItemActive
              ]}
              onPress={() => handleNavPress(item.key)}
            >
              <Text style={[
                styles.drawerIcon,
                currentScreen === item.key && styles.drawerIconActive
              ]}>
                {item.icon}
              </Text>
              <Text style={[
                styles.drawerLabel,
                currentScreen === item.key && styles.drawerLabelActive
              ]}>
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Drawer Footer */}
        <View style={styles.drawerFooter}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutIcon}>🚪</Text>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  navbar: {
    backgroundColor: '#1e293b',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
    minHeight: 60,
    zIndex: 1000,
  },
  navContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuButton: {
    padding: 8,
    marginRight: 12,
  },
  menuIcon: {
    fontSize: 20,
    color: '#f1f5f9',
    fontWeight: 'bold',
  },
  brandContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  brandEmoji: {
    fontSize: 20,
    marginRight: 8,
  },
  brandText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1f5f9',
  },
  centerSection: {
    flex: 1,
    alignItems: 'center',
  },
  currentScreenTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e2e8f0',
    textAlign: 'center',
  },
  rightSection: {
    flex: 1,
    alignItems: 'flex-end',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    backgroundColor: '#0f172a',
  },
  userEmoji: {
    fontSize: 14,
  },
  userName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#e2e8f0',
  },
  // Overlay
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 999,
  },
  // Drawer Styles
  drawer: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_HEIGHT,
    backgroundColor: '#1e293b',
    borderRightWidth: 1,
    borderRightColor: '#334155',
    zIndex: 1001,
    shadowColor: '#000',
    shadowOffset: { width: 2, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 10,
  },
  drawerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
    marginTop: 60, // Account for navbar height
  },
  drawerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f1f5f9',
  },
  closeButton: {
    padding: 8,
  },
  closeIcon: {
    fontSize: 18,
    color: '#94a3b8',
    fontWeight: 'bold',
  },
  drawerContent: {
    flex: 1,
    paddingVertical: 20,
  },
  drawerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
    borderLeftWidth: 4,
    borderLeftColor: 'transparent',
  },
  drawerItemActive: {
    backgroundColor: '#0f172a',
    borderLeftColor: '#059669',
  },
  drawerIcon: {
    fontSize: 20,
    color: '#94a3b8',
    width: 24,
  },
  drawerIconActive: {
    color: '#059669',
  },
  drawerLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e2e8f0',
  },
  drawerLabelActive: {
    color: '#059669',
    fontWeight: '700',
  },
  drawerFooter: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderRadius: 8,
    backgroundColor: '#dc2626',
  },
  logoutIcon: {
    fontSize: 16,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ffffff',
  },
});

export default Navbar;