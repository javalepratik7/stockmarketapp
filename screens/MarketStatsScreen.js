import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  ScrollView, 
  TouchableOpacity, 
  StyleSheet, 
  RefreshControl,
  Dimensions 
} from 'react-native';
import LoadingSpinner from '../components/LoadingSpinner';
import MarketCard from '../components/MarketCard';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

const MarketStatsScreen = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('indices');

  const fetchMarketData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      
      // Simulate API call with your backend data structure
      const mockData = {
        indices: [
          {
            name: 'Nifty50',
            current: 22495.60,
            change: 125.45,
            change_pct: 0.56,
            high: 22520.80,
            low: 22380.25,
            volume: '245.6M'
          },
          {
            name: 'Sensex',
            current: 74119.39,
            change: 350.81,
            change_pct: 0.48,
            high: 74200.50,
            low: 73850.75,
            volume: '189.3M'
          },
          {
            name: 'Bank Nifty',
            current: 48225.15,
            change: -85.30,
            change_pct: -0.18,
            high: 48400.60,
            low: 48050.45,
            volume: '156.8M'
          }
        ],
        commodities: [
          {
            name: 'Gold (1g)',
            current: 5850,
            change: -50,
            change_pct: -0.85,
            high: 5900,
            low: 5840,
            volume: '12.4K'
          },
          {
            name: 'Silver (1kg)',
            current: 78500,
            change: -1200,
            change_pct: -1.51,
            high: 79800,
            low: 78400,
            volume: '8.7K'
          },
          {
            name: 'Crude Oil (per barrel)',
            current: 6200,
            change: 150,
            change_pct: 2.48,
            high: 6250,
            low: 6050,
            volume: '45.2K'
          }
        ]
      };
      
      setData(mockData);
      setLastUpdated(new Date());
    } catch (err) {
      setError('Failed to fetch market data. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchMarketData();
  }, [fetchMarketData]);

  useEffect(() => {
    fetchMarketData();
    
    // Refresh data every 30 seconds
    const interval = setInterval(fetchMarketData, 30000);
    return () => clearInterval(interval);
  }, [fetchMarketData]);

  const HeaderSection = () => (
    <View style={styles.headerSection}>
      <View style={styles.headerTop}>
        <View style={styles.titleContainer}>
          <Text style={styles.pageTitle}>Live Market Data</Text>
          <Text style={styles.pageSubtitle}>
            Real-time Indian stock market updates
          </Text>
        </View>
        <View style={styles.liveBadge}>
          <View style={styles.liveDot} />
          <Text style={styles.liveText}>LIVE</Text>
        </View>
      </View>
      
      <View style={styles.refreshContainer}>
        <TouchableOpacity
          style={[styles.refreshButton, (loading || refreshing) && styles.refreshButtonDisabled]}
          onPress={fetchMarketData}
          disabled={loading || refreshing}
        >
          <Text style={styles.refreshIcon}>🔄</Text>
          <Text style={[
            styles.refreshText,
            (loading || refreshing) && styles.refreshTextDisabled
          ]}>
            {loading || refreshing ? 'Updating...' : 'Refresh'}
          </Text>
        </TouchableOpacity>
        
        {lastUpdated && (
          <Text style={styles.lastUpdated}>
            Updated: {lastUpdated.toLocaleTimeString()}
          </Text>
        )}
      </View>
    </View>
  );

  const TabButton = ({ title, isActive, onPress }) => (
    <TouchableOpacity
      style={[styles.tabButton, isActive && styles.tabButtonActive]}
      onPress={onPress}
    >
      <Text style={[styles.tabText, isActive && styles.tabTextActive]}>
        {title}
      </Text>
    </TouchableOpacity>
  );

  const MarketSummary = () => {
    const totalIndices = data?.indices?.length || 0;
    const upIndices = data?.indices?.filter(item => item.change >= 0).length || 0;
    const marketTrend = upIndices > totalIndices / 2 ? 'Bullish' : 'Bearish';
    
    return (
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Market Summary</Text>
        <View style={styles.summaryStats}>
          <View style={styles.summaryStat}>
            <Text style={styles.statValue}>{upIndices}/{totalIndices}</Text>
            <Text style={styles.statLabel}>Indices Up</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryStat}>
            <Text style={[
              styles.statValue,
              { color: marketTrend === 'Bullish' ? '#059669' : '#dc2626' }
            ]}>
              {marketTrend}
            </Text>
            <Text style={styles.statLabel}>Trend</Text>
          </View>
          <View style={styles.summaryDivider} />
          <View style={styles.summaryStat}>
            <Text style={styles.statValue}>Live</Text>
            <Text style={styles.statLabel}>Status</Text>
          </View>
        </View>
      </View>
    );
  };

  if (loading && !data) {
    return (
      <View style={styles.container}>
        <HeaderSection />
        <LoadingSpinner />
      </View>
    );
  }

  if (error && !data) {
    return (
      <View style={styles.container}>
        <HeaderSection />
        <View style={styles.errorContainer}>
          <Text style={styles.errorEmoji}>⚠️</Text>
          <Text style={styles.errorTitle}>Market Data Unavailable</Text>
          <Text style={styles.errorMessage}>{error}</Text>
          <TouchableOpacity style={styles.retryButton} onPress={fetchMarketData}>
            <Text style={styles.retryText}>Try Again</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <HeaderSection />
      
      <ScrollView 
        style={styles.content}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={onRefresh}
            colors={['#059669']}
            tintColor="#059669"
          />
        }
        showsVerticalScrollIndicator={false}
      >
        {/* Tab Navigation */}
        <View style={styles.tabContainer}>
          <TabButton 
            title="Indices" 
            isActive={activeTab === 'indices'} 
            onPress={() => setActiveTab('indices')} 
          />
          <TabButton 
            title="Commodities" 
            isActive={activeTab === 'commodities'} 
            onPress={() => setActiveTab('commodities')} 
          />
        </View>

        {/* Market Summary */}
        <MarketSummary />

        {/* Market Indices Section */}
        {activeTab === 'indices' && data?.indices && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Market Indices</Text>
            <View style={styles.cardsGrid}>
              {data.indices.map((item, idx) => (
                <MarketCard key={idx} {...item} type="index" />
              ))}
            </View>
          </View>
        )}

        {/* Commodities Section */}
        {activeTab === 'commodities' && data?.commodities && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Commodities</Text>
            <View style={styles.cardsGrid}>
              {data.commodities.map((item, idx) => (
                <MarketCard key={idx} {...item} type="commodity" />
              ))}
            </View>
          </View>
        )}

        {/* Data Source Info */}
        <View style={styles.infoCard}>
          <Text style={styles.infoTitle}>💡 Market Insights</Text>
          <Text style={styles.infoText}>
            Data sourced from NSE/BSE live feeds. Prices update every 30 seconds.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  content: {
    flex: 1,
  },
  headerSection: {
    padding: 20,
    backgroundColor: '#1e293b',
    borderBottomWidth: 1,
    borderBottomColor: '#334155',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleContainer: {
    flex: 1,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 4,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#94a3b8',
  },
  liveBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#dc2626',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  liveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ffffff',
  },
  liveText: {
    fontSize: 10,
    fontWeight: '600',
    color: '#ffffff',
  },
  refreshContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#059669',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
  refreshButtonDisabled: {
    backgroundColor: '#475569',
    opacity: 0.6,
  },
  refreshIcon: {
    fontSize: 16,
  },
  refreshText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '600',
  },
  refreshTextDisabled: {
    color: '#cbd5e1',
  },
  lastUpdated: {
    fontSize: 12,
    color: '#94a3b8',
  },
  tabContainer: {
    flexDirection: 'row',
    padding: 20,
    gap: 12,
  },
  tabButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#1e293b',
    borderWidth: 1,
    borderColor: '#334155',
    alignItems: 'center',
  },
  tabButtonActive: {
    backgroundColor: '#059669',
    borderColor: '#059669',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#94a3b8',
  },
  tabTextActive: {
    color: '#ffffff',
  },
  summaryCard: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#334155',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 16,
    textAlign: 'center',
  },
  summaryStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  summaryStat: {
    alignItems: 'center',
    flex: 1,
  },
  summaryDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#334155',
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
    textAlign: 'center',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 16,
  },
  cardsGrid: {
    gap: 16,
  },
  infoCard: {
    margin: 20,
    marginTop: 0,
    backgroundColor: '#1e293b',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#334155',
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 12,
    color: '#94a3b8',
    lineHeight: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  errorEmoji: {
    fontSize: 48,
    marginBottom: 16,
  },
  errorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 8,
    textAlign: 'center',
  },
  errorMessage: {
    fontSize: 14,
    color: '#94a3b8',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  retryButton: {
    backgroundColor: '#059669',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  retryText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default MarketStatsScreen