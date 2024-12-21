import React from 'react';
import { TextInput, Text, View, StyleSheet, TouchableOpacity } from "react-native";
import ScreenWrapper from "../wrapperfolder/ScreenWrapper";

const ProfilePage = ({ navigation }: any) => {
    const fields = [
        { label: "Passport Number", placeholder: "********" },
        { label: "Country", placeholder: "********" },
        { label: "Date of Birth", placeholder: "********" },
        { label: "Place of Birth", placeholder: "********" },
        { label: "Place of Issue", placeholder: "********" },
        { label: "Sex", placeholder: "M", short: true },
        { label: "CPR-Number", placeholder: "********" },
        { label: "Date of Issue", placeholder: "********" },
        { label: "Date of Expiry", placeholder: "********" },
    ];

    return (
        <ScreenWrapper>
            <View style={styles.pageContainer}>
                <View style={styles.profileContainer}>
                    <View style={styles.profileCircle} />
                    <Text style={styles.labelBold}>Firstname</Text>
                    <Text style={styles.label}>Vivek</Text>
                    <Text style={styles.labelBold}>Lastname</Text>
                    <Text style={styles.label}>Misra</Text>
                </View>

                <View style={styles.inputContainer}>
                    {fields.map((field, index) => (
                        <View key={index} style={[styles.inputGroup, field.short ? styles.shortInputGroup : {},]}>
                            <Text style={styles.label}>{field.label}</Text>
                            <TextInput style={[styles.input, field.short ? styles.shortInput : {},]} placeholder={field.placeholder}
                                secureTextEntry={field.label === "CPR-Number"}
                            />
                        </View>
                    ))}
                </View>
            </View>

            <View style={styles.navbar}>
                {["\u{1F464}", "\u{1F4D3}", "\u{1F4F0}", "\u{2699}"].map((icon, index) => (
                    <TouchableOpacity key={index} style={styles.navButton}>
                        <Text style={styles.navText}>{icon}</Text>
                    </TouchableOpacity>
                ))}
            </View>
        </ScreenWrapper>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#003399',
        padding: 10,
    },
    headerText: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
    pageContainer: {
        flex: 1,
        alignItems: 'center',
        padding: 20,
    },
    profileContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    profileCircle: {
        width: 100,
        height: 100,
        borderRadius: 50,
        borderWidth: 2,
        borderColor: 'black',
    },
    labelBold: {
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    label: {
        fontSize: 16,
        marginTop: 5,
    },
    inputContainer: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: 15,
    },
    shortInputGroup: {
        width: '40%',
        alignSelf: 'center',
    },
    input: {
        backgroundColor: '#f9f9f9',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 10,
        textAlign: 'center',
    },
    shortInput: {
        width: '100%',
        textAlign: 'center',
    },
    navbar: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        backgroundColor: '#003399',
        padding: 10,
    },
    navButton: {
        alignItems: 'center',
    },
    navText: {
        fontSize: 20,
        color: 'white',
    },
});

export default ProfilePage;
