import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const LanguageOptions: React.FC = () => {
    const [selectedValue, setSelectedValue] = useState<string>("English");

    return (
        <View style={styles.container}>
            <Picker
                style={styles.picker}
                selectedValue={selectedValue}
                onValueChange={(value) => setSelectedValue(value)}
            >
                <Picker.Item label="English" value="English" />
                <Picker.Item label="Danish" value="Danish" />
                <Picker.Item label="German" value="German" />
                <Picker.Item label="Hindi" value="Hindi" />
            </Picker>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
    picker: {
        backgroundColor: '#ffcd00',
        height: 50,
        width: 150,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 10,
    },
});

export default LanguageOptions;
