import React from 'react';
import { View, StyleSheet, FlatList, Text } from 'react-native';
import { Navbar } from '../components/Navbar';
import { RecordCard } from '../components/RecordCard';
import { MOCK_RECORDS } from '../logic/mockData';

export const RecordsScreen = () => {
  return (
    <View style={styles.container}>
      <Navbar title="Travel Records" />
      <FlatList
        data={MOCK_RECORDS}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <RecordCard
            country={item.country}
            flag={item.flag}
            airport={item.airport}
            date={item.date}
            type={item.type}
          />
        )}
        ListEmptyComponent={<Text style={styles.empty}>No travel records yet.</Text>}
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
