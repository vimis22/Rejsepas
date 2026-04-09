import React from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import { Navbar } from '../components/Navbar';
import { RecordCard } from '../components/RecordCard';
import { useUserProfile } from '../hooks/useUserProfile';
import { UserData } from '../logic/types';

export const RecordsScreen = () => {
  const { profile, loading } = useUserProfile();

  if (loading) {
    return (
      <View style={styles.container}>
        <Navbar title="Travel Records" />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0047AB" />
        </View>
      </View>
    );
  }

  const userData = profile as UserData;
  const records = userData?.records || [];

  return (
    <View style={styles.container}>
      <Navbar title="Travel Records" />
      <FlatList
        data={records}
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
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
