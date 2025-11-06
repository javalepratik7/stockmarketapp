import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MarketCard = ({ name, current, change, change_pct, type = 'index', high, low, volume }) => {
  const isPositive = change >= 0;
  
  const getCardIcon = () => {
    if (type === 'commodity') {
      if (name.includes('Gold')) return '💰';
      if (name.includes('Silver')) return '🥈';
      if (name.includes('Oil')) return '🛢️';
      return '📦';
    }
    return '📈';
  };

  const formatValue = (value, itemName) => {
    if (itemName.includes('Oil')) return `$${value.toLocaleString('en-IN')}`;
    return `₹${value.toLocaleString('en-IN')}`;
  };

  const formatChange = (change) => {
    return isPositive ? `+${change}` : `${change}`;
  };

  return (
    <View style={[
      styles.card,
      { borderLeftColor: isPositive ? '#059669' : '#dc2626' }
    ]}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.titleSection}>
          <Text style={styles.cardIcon}>{getCardIcon()}</Text>
          <View style={styles.titleContainer}>
            <Text style={styles.cardTitle}>{name}</Text>
            <Text style={styles.cardType}>
              {type === 'index' ? 'Index' : 'Commodity'}
            </Text>
          </View>
        </View>
        <View style={[
          styles.changeBadge,
          { backgroundColor: isPositive ? '#d1fae5' : '#fecaca' }
        ]}>
          <Text style={[
            styles.changeBadgeText,
            { color: isPositive ? '#065f46' : '#991b1b' }
          ]}>
            {isPositive ? '↗' : '↘'} {Math.abs(change_pct).toFixed(2)}%
          </Text>
        </View>
      </View>
      
      {/* Current Value */}
      <View style={styles.valueSection}>
        <Text style={styles.currentValue}>
          {formatValue(current, name)}
        </Text>
        <View style={styles.changeSection}>
          <Text style={[
            styles.changeAmount,
            { color: isPositive ? '#059669' : '#dc2626' }
          ]}>
            {formatChange(change)}
          </Text>
          <Text style={[
            styles.changePercentage,
            { color: isPositive ? '#059669' : '#dc2626' }
          ]}>
            ({formatChange(change_pct)}%)
          </Text>
        </View>
      </View>

      {/* Additional Info */}
      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Day Range:</Text>
          <Text style={styles.infoValue}>
            {formatValue(low, name)} - {formatValue(high, name)}
          </Text>
        </View>
        {volume && (
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Volume:</Text>
            <Text style={styles.infoValue}>{volume}</Text>
          </View>
        )}
      </View>

      {/* Footer */}
      <View style={styles.cardFooter}>
        <Text style={styles.marketStatus}>
          {isPositive ? 'Bullish' : 'Bearish'} Trend
        </Text>
        <Text style={styles.updateStatus}>Live</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#1e293b',
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: '#334155',
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  titleSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  cardIcon: {
    fontSize: 24,
  },
  titleContainer: {
    flex: 1,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 2,
  },
  cardType: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  changeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  changeBadgeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  valueSection: {
    marginBottom: 16,
  },
  currentValue: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#f1f5f9',
    marginBottom: 8,
  },
  changeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  changeAmount: {
    fontSize: 16,
    fontWeight: '600',
  },
  changePercentage: {
    fontSize: 14,
    fontWeight: '500',
  },
  infoSection: {
    gap: 6,
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 12,
    color: '#e2e8f0',
    fontWeight: '600',
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  marketStatus: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  updateStatus: {
    fontSize: 12,
    color: '#059669',
    fontWeight: '600',
  },
});

export default MarketCard