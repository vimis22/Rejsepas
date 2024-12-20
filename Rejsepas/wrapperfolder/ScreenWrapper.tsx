import React from 'react';
import {View, StyleSheet} from "react-native";
import NavigationBar from "./NavigationBar";

const ScreenWrapper = ({children}: {children: React.ReactNode}) => {
    return(
        <View>
            <NavigationBar/>
            <View style={styles.content}>{children}</View>
        </View>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
    },
    content: {
        flex: 1,
        padding: 10,
    },
});

export default ScreenWrapper;