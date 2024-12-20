import React from 'react';
import {View, Text, TextInput, TouchableOpacity, StyleSheet} from "react-native";
import ScreenWrapper from "../wrapperfolder/ScreenWrapper";
import TermsScreen from "./TermsScreen";

const LoginScreen = ({navigation}: any) => {
    return(
        <ScreenWrapper>
            <View style={styles.pageContainer}>
                <Text style={styles.label}>Login</Text>
                <TextInput placeholder={"Passport Number"} style={styles.input} secureTextEntry={false}/>
                <TextInput placeholder={"Country"} style={styles.input} />
                <TouchableOpacity style={styles.button} onPress={()=> navigation.navigate(TermsScreen)}>
                    <Text style={styles.buttonText}>LOGIN</Text>
                </TouchableOpacity>
                <Text style={styles.scanning}>Scanning</Text>
            </View>
        </ScreenWrapper>
    );
};


const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    input: {
        width: '80%',
        marginVertical: 10,
        padding: 10,
        backgroundColor: '#fff',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        backgroundColor: '#330099',
        padding: 10,
        borderRadius: 5,
        marginVertical: 10,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    scanning: {
        marginTop: 20,
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default LoginScreen;