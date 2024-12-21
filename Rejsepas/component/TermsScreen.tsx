import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from "react-native";
import ScreenWrapper from "../wrapperfolder/ScreenWrapper";
import ProfileScreen from "./ProfileScreen";
const TermsScreen = ({navigation}: any) => {
    return(
        <ScreenWrapper>
            <View style={styles.pageContainer}>
                <Text style={styles.title}>Terms</Text>
                <Text style={styles.content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ProfileScreen')} style={styles.acceptButton}>
                    <Text style={styles.buttonText}>I ACCEPT</Text>
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    content: {
        fontSize: 16,
        textAlign: 'center',
        paddingHorizontal: 20,
    },
    acceptButton: {
        backgroundColor: '#330099',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});

export default TermsScreen;