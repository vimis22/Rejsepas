import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import LanguageOptions from "./LanguageOptions";

const NavigationBar = ({ navigation }: any) => {
    return (
        <View style={styles.pageContainer}>
            <View style={styles.centerContainer}>
                <Text style={styles.applicationsTitle}>Digital Passport</Text>
                <Text style={styles.icons}>🌍</Text>
                <LanguageOptions/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        height: 60,
        backgroundColor: '#330099',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
    },
    centerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    applicationsTitle: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
        marginLeft: 5,
    },
    icons: {
        color: 'white',
        fontSize: 20,
        marginRight: 10,
    },
});

export default NavigationBar;
