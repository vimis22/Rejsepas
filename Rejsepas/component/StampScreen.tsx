import React from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from "react-native";

const stamps = [
    {id: 1, status: "✔", place: "Delhi, India", issue: new Date().toLocaleDateString(), expiry: new Date().toLocaleDateString()},
    {id: 2, status: "✗", place: "Delhi, India", issue: new Date().toLocaleDateString(), expiry: new Date().toLocaleDateString()},
    {id: 3, status: "✔", place: "Delhi, India", issue: new Date().toLocaleDateString(), expiry: new Date().toLocaleDateString()},
];

const renderItem = ({item}) => {
    return(
        <View style={styles.pageContainer}>
            <Text style={styles.text}>ID: {item.id}</Text>
            <Text style={styles.text}>Status: {item.status}</Text>
            <Text style={styles.text}>Place: {item.place}</Text>
            <Text style={styles.text}>Issue Date: {item.issue}</Text>
            <Text style={styles.text}>Expiry Date: {item.expiry}</Text>
        </View>
    )
};
const StampScreen = () => {
    return(
        <View style={styles.pageContainer}>
            <FlatList data={stamps} renderItem={renderItem} keyExtractor={(item) => item.id.toString()}/>
            <TouchableOpacity style={styles.buttonContainer}>
                <Text style={styles.buttonText}>NEXT PAGE</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: 'white',
        justifyContent: 'center',
        padding: 20,
    },
    itemContainer: {
        backgroundColor: 'white',
        padding: 10,
        marginVertical: 8,
        borderRadius: 8,
    },
    text: {
        fontSize: 14,
        color: 'black',
        fontWeight: 'bold',
    },
    buttonContainer: {
        backgroundColor: '#330099',
        padding: 10,
        borderRadius: '10',
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