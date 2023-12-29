// DietRestrictionsScreen.jsx
import React, { useState } from 'react';
import { View, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropDownPicker from 'react-native-dropdown-picker';
import { router } from 'expo-router';

const DietRestrictionsScreen = () => {
    const [open, setOpen] = useState(false);
    const [value, setValue] = useState([]);
    const [items, setItems] = useState([
        { label: 'Gluten-Free', value: 'Gluten-Free' },
        { label: 'Lactose-Free', value: 'Lactose-Free' },
        // Add more options as needed
    ]);

    const handleNext = async () => {
        // Save selected dropdown values to AsyncStorage
        console.log("values: ", value);
        await AsyncStorage.setItem('dietaryRestrictions', JSON.stringify(value));

        //todo - save the value to context

        // Change route to home using Expo Router v2
        router.replace('/home');
    };

    return (
        <View style={{
            backgroundColor: '#FFFFFF',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            paddingHorizontal: 15
        }}>
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
                badgeDotColors={["#e76f51", "#00b4d8", "#e9c46a", "#e76f51", "#8ac926", "#00b4d8", "#e9c46a"]}
            />

            <Button title="Next" onPress={handleNext} />
        </View>
    );
};

export default DietRestrictionsScreen;
