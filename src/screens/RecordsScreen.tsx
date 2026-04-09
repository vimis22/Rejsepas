import React from 'react';
import { View, StyleSheet, FlatList, Text, ActivityIndicator } from 'react-native';
import { Navbar } from '../components/Navbar';
import { RecordCard } from '../components/RecordCard';
import { useUserProfile } from '../hooks/useUserProfile';
import { UserData } from '../logic/types';
import { useTheme } from '../context/ThemeContext';

export const RecordsScreen = () => {
  const { profile, loading } = useUserProfile();
  const { colors } = useTheme();

  if (loading) {
    return (
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <Navbar title="Rejsehistorik" />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={colors.primary} />
        </View>
      </View>
    );
  }

  const userData = profile as UserData;
  const records = userData?.records || [];

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Navbar title="Rejsehistorik" />
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
            type={item.type === 'Departure' ? 'Afrejse' : 'Ankomst'}
          />
        )}
        ListEmptyComponent={<Text style={[styles.empty, { color: colors.secondaryText }]}>Ingen rejsehistorik endnu.</Text>}
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
