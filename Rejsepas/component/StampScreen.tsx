import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import ScreenWrapper from "../wrapperfolder/ScreenWrapper";
import SettingsScreen from "./SettingsScreen";

function Item({isStatus}: {isStatus: boolean}) {
    return <Text>{isStatus ? "✔" : "✗"}</Text>
}

const stamps = [
    { id: 1, status: true, place: "Delhi, India", issue: "12/12/2023", expiry: "12/12/2025" },
    { id: 2, status: false, place: "Delhi, India", issue: "01/01/2022", expiry: "01/01/2023" },
    { id: 3, status: true, place: "Mumbai, India", issue: "15/08/2020", expiry: "15/08/2024" },
];

const StampScreen = ({navigation}: any) => {
    return (
        <ScreenWrapper>
            <View style={styles.pageContainer}>
                {stamps.map((stamp) => (
                    <View key={stamp.id} style={styles.stampContainer}>
                        <Text style={styles.text}>Status: <Item isStatus={stamp.status} /> </Text>
                        <Text style={styles.text}>Place: {stamp.place}</Text>
                        <Text style={styles.text}>Issue Date: {stamp.issue}</Text>
                        <Text style={styles.text}>Expiry Date: {stamp.expiry}</Text>
                    </View>
                ))}
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate(SettingsScreen)}>
                    <Text style={styles.buttonText}>NEXT PAGE</Text>
                </TouchableOpacity>
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 20,
    },
    stampContainer: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    text: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
    },
    buttonContainer: {
        backgroundColor: '#330099',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default StampScreen;
