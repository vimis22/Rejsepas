import React from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import { Navbar } from '../components/Navbar';
import { VisaCard } from '../components/VisaCard';
import { useUserProfile } from '../hooks/useUserProfile';
import { UserData } from '../logic/types';

export const VisaScreen = () => {
  const { profile, loading, error } = useUserProfile();

  if (loading) {
    return (
      <View style={styles.container}>
        <Navbar title="Mine Visa" />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#0047AB" />
        </View>
      </View>
    );
  }

  const userData = profile as UserData;
  const visas = userData?.visas || [];

  return (
    <View style={styles.container}>
      <Navbar title="Mine Visa" />
      <FlatList
        data={visas}
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
        ListEmptyComponent={<Text style={styles.empty}>Ingen visa fundet.</Text>}
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
