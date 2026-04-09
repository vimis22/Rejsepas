import React from "react";
import ScreenWrapper from "../wrapperfolder/ScreenWrapper";
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import LoginScreen from "./LoginScreen";
import StampScreen from "./StampScreen";

const options = [
    {id: 1, name: "Personalization"},
    {id: 2, name: "Notification"},
    {id: 3, name: "Visa Application"},
    {id: 4, name: "Private Policy"},
];
const SettingsScreen = ({navigation}:any) => {
    return(
        <ScreenWrapper>
            <View style={styles.pageContainer}>
                <FlatList
                    data={options}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({item}) => (
                        <View style={styles.optionContainer}>
                            <Text style={styles.text}>{item.name}</Text>
                        </View>
                    )}
                />
                <TouchableOpacity style={styles.buttonContainer} onPress={() => navigation.navigate(LoginScreen)}>
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
        padding: 20,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    optionContainer: {
        backgroundColor: '#f9f9f9',
        padding: 15,
        marginVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    text: {
        fontSize: 16,
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

export default SettingsScreen;