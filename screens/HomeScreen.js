import React from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet,
  Dimensions 
} from 'react-native';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const HomeScreen = () => {
  // Market data
  const marketIndices = [
    { name: 'NIFTY 50', value: 22495, change: '+125', changePercent: '+0.56%', trend: 'up' },
    { name: 'SENSEX', value: 74119, change: '+350', changePercent: '+0.47%', trend: 'up' },
    { name: 'BANK NIFTY', value: 48225, change: '-85', changePercent: '-0.18%', trend: 'down' },
    { name: 'NIFTY IT', value: 36845, change: '+220', changePercent: '+0.60%', trend: 'up' }
  ];

  const topGainers = [
    { symbol: 'RELIANCE', price: 2850, change: '+2.5%' },
    { symbol: 'TCS', price: 3850, change: '+1.8%' },
    { symbol: 'INFY', price: 1650, change: '+1.2%' },
    { symbol: 'HDFC', price: 1650, change: '+0.9%' }
  ];

  const quickActions = [
    { 
      title: 'Market Trends', 
      subtitle: 'Live indices & analysis', 
      emoji: '📈', 
      hasNotification: true 
    },
    { 
      title: 'AI Analysis', 
      subtitle: 'Smart recommendations', 
      emoji: '🤖', 
      progress: 75 
    },
    { 
      title: 'Top Stocks', 
      subtitle: 'Best performers', 
      emoji: '🏆', 
      isPremium: true 
    }
  ];

  const tradingPlatforms = [
    { 
      name: 'Zerodha', 
      emoji: '🚀', 
      features: ['Zero Brokerage', 'Advanced Charts', 'Kite Platform'],
      rating: '4.8/5'
    },
    { 
      name: 'Groww', 
      emoji: '📱', 
      features: ['User Friendly', 'Mutual Funds', 'Beginner Friendly'],
      rating: '4.6/5'
    },
    { 
      name: 'INDmoney', 
      emoji: '💰', 
      features: ['Wealth Management', 'US Stocks', 'Financial Planning'],
      rating: '4.5/5'
    },
    { 
      name: 'Upstox', 
      emoji: '⚡', 
      features: ['Fast Execution', 'Advanced Tools', 'Pro Charts'],
      rating: '4.4/5'
    }
  ];

  const FeatureCard = ({ emoji, title, description, onPress }) => (
    <TouchableOpacity style={styles.featureCard} onPress={onPress}>
      <Text style={styles.featureEmoji}>{emoji}</Text>
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDesc}>{description}</Text>
    </TouchableOpacity>
  );

  const MarketIndex = ({ name, value, change, changePercent, trend }) => (
    <View style={styles.indexCard}>
      <View style={styles.indexHeader}>
        <Text style={styles.indexName}>{name}</Text>
        <Text style={[
          styles.indexChange,
          trend === 'up' ? styles.positiveChange : styles.negativeChange
        ]}>
          {change} ({changePercent})
        </Text>
      </View>
      <Text style={styles.indexValue}>{value.toLocaleString('en-IN')}</Text>
    </View>
  );

  const StockRow = ({ symbol, price, change }) => (
    <View style={styles.stockRow}>
      <View style={styles.stockInfo}>
        <Text style={styles.stockSymbol}>{symbol}</Text>
        <Text style={styles.stockPrice}>₹{price.toLocaleString('en-IN')}</Text>
      </View>
      <Text style={[
        styles.stockChange,
        change.includes('+') ? styles.positiveChange : styles.negativeChange
      ]}>
        {change}
      </Text>
    </View>
  );

  const QuickAction = ({ 
    emoji, 
    title, 
    subtitle, 
    onPress, 
    progress, 
    hasNotification = false,
    isPremium = false 
  }) => (
    <TouchableOpacity 
      style={[
        styles.quickAction,
        isPremium && styles.premiumAction
      ]} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.actionMain}>
        <View style={styles.emojiWrapper}>
          <Text style={styles.actionEmoji}>{emoji}</Text>
          {hasNotification && <View style={styles.notificationDot} />}
          {isPremium && <Text style={styles.premiumBadge}>⭐</Text>}
        </View>
        
        <View style={styles.textContainer}>
          <View style={styles.titleRow}>
            <Text style={styles.actionTitle}>{title}</Text>
            {progress !== undefined && (
              <Text style={styles.progressText}>{progress}%</Text>
            )}
          </View>
          <Text style={styles.actionSubtitle}>{subtitle}</Text>
        </View>
      </View>

      {progress !== undefined && (
        <View style={styles.progressBar}>
          <View 
            style={[
              styles.progressFill, 
              { width: `${progress}%` }
            ]} 
          />
        </View>
      )}
    </TouchableOpacity>
  );

  const PlatformCard = ({ name, emoji, features, rating }) => (
    <View style={styles.platformCard}>
      <View style={styles.platformHeader}>
        <Text style={styles.platformEmoji}>{emoji}</Text>
        <View style={styles.platformInfo}>
          <Text style={styles.platformName}>{name}</Text>
          <Text style={styles.platformRating}>{rating}</Text>
        </View>
      </View>
      
      <View style={styles.featuresList}>
        {features.map((feature, index) => (
          <View key={index} style={styles.featureItem}>
            <Text style={styles.featureDot}>•</Text>
            <Text style={styles.featureText}>{feature}</Text>
          </View>
        ))}
      </View>
      
      <TouchableOpacity style={styles.exploreButton}>
        <Text style={styles.exploreButtonText}>Explore Platform</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView 
      style={styles.container} 
      contentContainerStyle={styles.content}
      showsVerticalScrollIndicator={false}
    >
      {/* Welcome Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.welcomeText}>Welcome back,</Text>
          <Text style={styles.userName}>Trader!</Text>
        </View>
        <View style={styles.notificationBadge}>
          <Text style={styles.notificationText}>3</Text>
        </View>
      </View>

      {/* Market Overview Card */}
      <View style={styles.overviewCard}>
        <Text style={styles.overviewTitle}>Market Overview</Text>
        <Text style={styles.overviewSubtitle}>Indian markets trading positive today</Text>
        
        <View style={styles.marketStats}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>+0.8%</Text>
            <Text style={styles.statLabel}>NIFTY 50</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>+1.2%</Text>
            <Text style={styles.statLabel}>BANK NIFTY</Text>
          </View>
          <View style={styles.statDivider} />
          <View style={styles.statItem}>
            <Text style={styles.statValue}>₹245Cr</Text>
            <Text style={styles.statLabel}>FII Inflow</Text>
          </View>
        </View>
      </View>

      {/* Market Indices */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Live Indices</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.indicesContainer}
        >
          {marketIndices.map((index, i) => (
            <MarketIndex key={i} {...index} />
          ))}
        </ScrollView>
      </View>

      {/* Top Gainers */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Gainers</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>View All</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.stocksContainer}>
          {topGainers.map((stock, index) => (
            <StockRow key={index} {...stock} />
          ))}
        </View>
      </View>

      {/* Quick Actions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Quick Actions</Text>
        <View style={styles.quickActionsGrid}>
          {quickActions.map((action, index) => (
            <QuickAction key={index} {...action} />
          ))}
        </View>
      </View>

      {/* Trading Platforms */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recommended Platforms</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>Compare</Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.platformsSubtitle}>
          Popular trading platforms for Indian investors
        </Text>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.platformsContainer}
        >
          {tradingPlatforms.map((platform, index) => (
            <PlatformCard key={index} {...platform} />
          ))}
        </ScrollView>
      </View>

      {/* Features Grid */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Smart Features</Text>
        <View style={styles.featureGrid}>
          <FeatureCard
            emoji="🤖"
            title="AI Analysis"
            description="Get intelligent stock recommendations based on market trends"
          />
          <FeatureCard
            emoji="📊"
            title="Portfolio Insights"
            description="Deep analysis of your holdings and performance metrics"
          />
          <FeatureCard
            emoji="🛡️"
            title="Risk Management"
            description="Personalized risk assessment and protection strategies"
          />
          <FeatureCard
            emoji="⚡"
            title="Real-time Alerts"
            description="Instant notifications on price movements and opportunities"
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    padding: 20,
    paddingBottom: 40,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  welcomeText: {
    fontSize: 16,
    color: '#94a3b8',
  },
  userName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginTop: 2,
  },
  notificationBadge: {
    backgroundColor: '#dc2626',
    width: 20,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: 'bold',
  },
  overviewCard: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
    marginBottom: 24,
  },
  overviewTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 4,
  },
  overviewSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 16,
  },
  marketStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#94a3b8',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#334155',
  },
  section: {
    marginBottom: 28,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f1f5f9',
  },
  seeAllText: {
    color: '#60a5fa',
    fontSize: 14,
    fontWeight: '500',
  },
  indicesContainer: {
    gap: 12,
  },
  indexCard: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    minWidth: 140,
    marginRight: 12,
  },
  indexHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  indexName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e2e8f0',
    flex: 1,
  },
  indexValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1f5f9',
  },
  positiveChange: {
    color: '#059669',
  },
  negativeChange: {
    color: '#dc2626',
  },
  stocksContainer: {
    backgroundColor: '#1e293b',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
    padding: 16,
  },
  stockRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  stockInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  stockSymbol: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f1f5f9',
    minWidth: 70,
  },
  stockPrice: {
    fontSize: 14,
    color: '#e2e8f0',
    fontWeight: '500',
  },
  stockChange: {
    fontSize: 14,
    fontWeight: '600',
  },
  quickActionsGrid: {
    gap: 12,
  },
  quickAction: {
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  premiumAction: {
    borderColor: '#f59e0b',
  },
  actionMain: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  emojiWrapper: {
    position: 'relative',
  },
  actionEmoji: {
    fontSize: 24,
    width: 40,
    height: 40,
    textAlign: 'center',
    lineHeight: 40,
  },
  notificationDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#dc2626',
    borderWidth: 1,
    borderColor: '#1e293b',
  },
  premiumBadge: {
    position: 'absolute',
    bottom: -4,
    right: -4,
    fontSize: 10,
  },
  textContainer: {
    flex: 1,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  actionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f1f5f9',
    flex: 1,
  },
  progressText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#059669',
    marginLeft: 8,
  },
  actionSubtitle: {
    fontSize: 13,
    color: '#94a3b8',
    lineHeight: 18,
  },
  progressBar: {
    height: 3,
    backgroundColor: '#334155',
    borderRadius: 1.5,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#059669',
    borderRadius: 1.5,
  },
  platformsContainer: {
    gap: 16,
    paddingRight: 20,
  },
  platformsSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 16,
  },
  platformCard: {
    width: 280,
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  platformHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  platformEmoji: {
    fontSize: 32,
  },
  platformInfo: {
    flex: 1,
  },
  platformName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 2,
  },
  platformRating: {
    fontSize: 14,
    color: '#f59e0b',
    fontWeight: '500',
  },
  featuresList: {
    marginBottom: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  featureDot: {
    color: '#60a5fa',
    fontSize: 16,
  },
  featureText: {
    fontSize: 13,
    color: '#e2e8f0',
    flex: 1,
  },
  exploreButton: {
    backgroundColor: '#059669',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  exploreButtonText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  featureGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  featureCard: {
    width: (SCREEN_WIDTH - 52) / 2,
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  featureEmoji: {
    fontSize: 24,
    marginBottom: 8,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 4,
  },
  featureDesc: {
    fontSize: 12,
    color: '#94a3b8',
    lineHeight: 16,
  },
});

export default HomeScreen;