import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Navbar } from '../components/Navbar';
import { VisaCard } from '../components/VisaCard';
import { MOCK_VISAS } from '../logic/mockData';

export const VisaScreen = () => {
  return (
    <View style={styles.container}>
      <Navbar title="My Visas" />
      <FlatList
        data={MOCK_VISAS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <VisaCard
            country={item.country}
            flag={item.flag}
            startDate={item.startDate}
            endDate={item.endDate}
            status={item.status}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No visas found.</Text>}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  listContent: {
    padding: 16,
  },
  empty: {
    textAlign: 'center',
    marginTop: 40,
    color: '#888',
    fontSize: 16,
  },
});
