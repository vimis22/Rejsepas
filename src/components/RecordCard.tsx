import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface RecordCardProps {
  country: string;
  flag: string;
  airport: string;
  date: string;
  type: string;
}

export const RecordCard: React.FC<RecordCardProps> = ({ country, flag, airport, date, type }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.flag}>{flag}</Text>
        <View>
          <Text style={styles.country}>{country}</Text>
          <Text style={styles.airport}>{airport} Airport</Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={styles.date}>{date}</Text>
        <View style={[styles.badge, { backgroundColor: type === 'Arrival' ? '#E8F5E9' : '#E3F2FD' }]}>
          <Text style={[styles.badgeText, { color: type === 'Arrival' ? '#2E7D32' : '#1565C0' }]}>{type}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFF',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#0047AB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  flag: {
    fontSize: 28,
    marginRight: 12,
  },
  country: {
    fontSize: 16,
    fontWeight: '700',
  },
  airport: {
    fontSize: 13,
    color: '#666',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  date: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
    textTransform: 'uppercase',
  },
});
