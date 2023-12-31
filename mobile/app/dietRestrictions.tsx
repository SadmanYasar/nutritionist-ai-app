// DietRestrictionsScreen.jsx
import React, { useContext, useState } from 'react';
import { View, Text, Button, StyleSheet, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { router } from 'expo-router';
import { DietContext } from 'context';

const DietRestrictionsScreen = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([]);
    const [items, setItems] = useState([
        { label: 'Gluten-Free', value: 'Gluten-Free' },
        { label: 'Lactose-Free', value: 'Lactose-Free' },
        // Add more options as needed
    ]);
    const { setDietRestrictions } = useContext(DietContext);

    const handleNext = async () => {
        // Save selected dropdown values to AsyncStorage
        console.log("values: ", value);
        // await AsyncStorage.setItem('dietRestrictions', JSON.stringify(value));

        //save the value to context
        setDietRestrictions(value);

        // Change route to home using Expo Router v2
        router.replace('/home');
    };

    return (
        <View style={styles.container}>
            <Text>Select your dietary restriction(s):</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                multiple={true}
                mode="BADGE"
                badgeDotColors={["#e76f51", "#8ac926"]}
                style={styles.dropDown}
            />
            <Pressable style={styles.button} onPress={handleNext}>
                <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                    Next
                </Text>
            </Pressable>
        </View>
    );
};

export default DietRestrictionsScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        /* center item */
        alignItems: 'center',
        /* center horizontally */
        justifyContent: 'center',
        /* center vertically */
        paddingHorizontal: 15
    },
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 12,
        paddingHorizontal: 32,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: 'black',
    },
    textHeading: {
        fontSize: 18,
        color: "black",
        textAlign: "center",
        fontWeight: "bold"
    },
    dropDown: {
        marginVertical: 20,
        fontSize: 16,
        color: "black",
    }
})