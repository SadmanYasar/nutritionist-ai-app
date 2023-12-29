// DietQuestionScreen.jsx
import React, { useState } from 'react';
import { View, Text, Button, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';

const DietQuestionScreen = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([]);
    const [items, setItems] = useState([
        { label: 'Vegetarian', value: 'Vegetarian' },
        { label: 'Vegan', value: 'Vegan' },
        { label: 'Paleo', value: 'Paleo' },
        // Add more options as needed
    ]);

    const handleNext = async () => {
        // Save selected dropdown values to AsyncStorage
        console.log("values: ", value);
        await AsyncStorage.setItem('dietaryPreference', JSON.stringify(value));

        //todo - save the value to context

        // Change route to dietRestrictions using Expo Router v2
        router.replace('/dietRestrictions');
    };

    return (
        <View style={{
            backgroundColor: '#FFFFFF',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 15
        }}>
            <Text>Select your dietary preference:</Text>
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
                badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
                placeholder="Select"
            />

            <Button title="Next" onPress={handleNext} />
        </View>
    );
};

export default DietQuestionScreen;
