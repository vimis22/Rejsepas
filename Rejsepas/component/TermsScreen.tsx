import React from 'react';
import {View, Text, StyleSheet} from "react-native";
import ScreenWrapper from "../wrapperfolder/ScreenWrapper";
const TermsScreen = () => {
    return(
        <ScreenWrapper>
            <View style={styles.pageContainer}>
                <Text style={styles.title}>Terms</Text>
                <Text style={styles.content}>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Text>
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
});

export default TermsScreen;