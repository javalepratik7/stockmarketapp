import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SuggestionCard = ({ suggestion, index }) => {
  if (!suggestion) {
    return (
      <View style={[styles.card, styles.errorCard]}>
        <Text style={styles.errorText}>Error: No suggestion data</Text>
      </View>
    );
  }

  const {
    name = 'Unknown Investment',
    description = 'No description available',
    current_price = 'N/A',
    sell_price = 'N/A',
    stop_loss = 'N/A',
    expected_return = 'N/A'
  } = suggestion;

  const currentPriceNum = parseFloat(current_price) || 0;
  const sellPriceNum = parseFloat(sell_price) || 0;
  const potentialGain = sellPriceNum - currentPriceNum;
  const gainPercentage = currentPriceNum > 0 ? ((potentialGain / currentPriceNum) * 100).toFixed(2) : 0;

  const getCardStyle = () => {
    if (potentialGain > 0) {
      return { borderLeftColor: '#059669', backgroundColor: '#1e293b' };
    } else if (potentialGain < 0) {
      return { borderLeftColor: '#dc2626', backgroundColor: '#1e293b' };
    }
    return { borderLeftColor: '#475569', backgroundColor: '#1e293b' };
  };

  return (
    <View style={[styles.card, getCardStyle()]}>
      {/* Header */}
      <View style={styles.cardHeader}>
        <View style={styles.headerContent}>
          <Text style={styles.investmentName}>{name}</Text>
          <View style={styles.badgeContainer}>
            <View style={[
              styles.rankBadge,
              { 
                backgroundColor: potentialGain > 0 ? '#059669' : 
                                potentialGain < 0 ? '#dc2626' : '#475569' 
              }
            ]}>
              <Text style={styles.rankText}>#{index + 1} Recommendation</Text>
            </View>
            {potentialGain !== 0 && (
              <View style={styles.gainContainer}>
                <Text style={styles.gainEmoji}>
                  {potentialGain > 0 ? '📈' : '📉'}
                </Text>
                <Text style={[
                  styles.gainText,
                  { color: potentialGain > 0 ? '#059669' : '#dc2626' }
                ]}>
                  {gainPercentage}%
                </Text>
              </View>
            )}
          </View>
        </View>
      </View>
      
      {/* Description */}
      <Text style={styles.description}>{description}</Text>
      
      {/* Price Info */}
      <View style={styles.priceContainer}>
        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>💵 Current Price</Text>
          <Text style={styles.priceValue}>₹{current_price}</Text>
        </View>
        
        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>🎯 Target Price</Text>
          <Text style={[styles.priceValue, styles.targetPrice]}>₹{sell_price}</Text>
        </View>
        
        <View style={styles.priceItem}>
          <Text style={styles.priceLabel}>🛡️ Stop Loss</Text>
          <Text style={[styles.priceValue, styles.stopLoss]}>₹{stop_loss}</Text>
        </View>
      </View>

      {/* Expected Return */}
      <View style={styles.returnContainer}>
        <Text style={styles.returnLabel}>Expected Return:</Text>
        <Text style={[
          styles.returnValue,
          { color: potentialGain > 0 ? '#059669' : '#dc2626' }
        ]}>
          {expected_return}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    borderRadius: 16,
    borderLeftWidth: 4,
    borderWidth: 1,
    borderColor: '#334155',
    minHeight: 280,
  },
  errorCard: {
    backgroundColor: '#1e293b',
    borderLeftColor: '#dc2626',
  },
  errorText: {
    color: '#dc2626',
    textAlign: 'center',
  },
  cardHeader: {
    marginBottom: 12,
  },
  headerContent: {
    flex: 1,
  },
  investmentName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f1f5f9',
    marginBottom: 8,
  },
  badgeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  rankBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginRight: 8,
  },
  rankText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
  },
  gainContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  gainEmoji: {
    fontSize: 14,
  },
  gainText: {
    fontSize: 12,
    fontWeight: '600',
  },
  description: {
    color: '#94a3b8',
    lineHeight: 20,
    marginBottom: 16,
    flex: 1,
  },
  priceContainer: {
    gap: 8,
    marginBottom: 12,
  },
  priceItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    borderRadius: 8,
    backgroundColor: '#0f172a',
  },
  priceLabel: {
    fontWeight: '500',
    color: '#e2e8f0',
    fontSize: 12,
  },
  priceValue: {
    fontWeight: '600',
    color: '#f1f5f9',
    fontSize: 12,
  },
  targetPrice: {
    color: '#059669',
    fontWeight: '700',
  },
  stopLoss: {
    color: '#dc2626',
  },
  returnContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#334155',
  },
  returnLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#e2e8f0',
  },
  returnValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default SuggestionCard;