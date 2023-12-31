// DietQuestionScreen.jsx
import React, { useContext, useState } from 'react';
import { View, Text, Button, SafeAreaView, Pressable, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { DietContext } from 'context';

const DietQuestionScreen = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([]);
    const [items, setItems] = useState([
        { label: 'Vegetarian', value: 'Vegetarian' },
        { label: 'Vegan', value: 'Vegan' },
        { label: 'Paleo', value: 'Paleo' },
        // Add more options as needed
    ]);
    //get context
    const { setDietPreference } = useContext(DietContext);

    const handleNext = async () => {
        // Save selected dropdown values to AsyncStorage
        console.log("values: ", value);
        // await AsyncStorage.setItem('dietPreference', JSON.stringify(value));

        // save the value to context
        setDietPreference(value);

        // Change route to dietRestrictions using Expo Router v2
        router.replace('/dietRestrictions');
    };

    return (
        <View style={styles.container}>
            <Text style={styles.textHeading}>Select your dietary preference</Text>
            <DropDownPicker
                open={open}
                value={value}
                items={items}
                setOpen={setOpen}
                setValue={setValue}
                setItems={setItems}
                multiple={true}
                min={1}
                mode="BADGE"
                badgeDotColors={["#e76f51", "#00b4d8", "#8ac926"]}
                placeholder="Select"
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

export default DietQuestionScreen;

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