import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LoginScreen from '../component/LoginScreen';
import TermsScreen from '../component/TermsScreen';

const NavigationBar = ({ navigation }: any) => {
    return (
        <View style={styles.pageContainer}>
            <TouchableOpacity onPress={() => navigation.navigate(LoginScreen)} style={styles.sideButton}>
                <Text style={styles.title}>{'<'}</Text>
            </TouchableOpacity>

            <View style={styles.centerContainer}>
                <Text style={styles.icons}>🌍</Text>
                <Text style={styles.applicationsTitle}>Digital Passport</Text>
            </View>

            <TouchableOpacity onPress={() => navigation.navigate(TermsScreen)} style={styles.sideButton}>
                <Text style={styles.title}>{'>'}</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        height: 60,
        backgroundColor: '#330099',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between', // Placerer knapperne på yderpunkterne
        paddingHorizontal: 15,
    },
    centerContainer: {
        flexDirection: 'row', // Arrangerer ikon og titel side om side
        alignItems: 'center', // Justerer vertikalt i midten
    },
    applicationsTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5, // Lidt afstand mellem ikonet og teksten
    },
    icons: {
        color: 'white',
        fontSize: 20,
    },
    sideButton: {
        width: 40, // Fast bredde for at sikre ens placering
        alignItems: 'center',
    },
    title: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default NavigationBar;
