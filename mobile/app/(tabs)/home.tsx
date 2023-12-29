// App.js file 

import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    View,
    Button,
    StyleSheet,
    Text,
    Image,
    SafeAreaView,
    Dimensions
} from "react-native";
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import * as ImagePicker from "expo-image-picker";
import Lottie from 'lottie-react-native';
import { router, useNavigation } from "expo-router";

const { width, height } = Dimensions.get('window');

export default function Home() {

    // State to hold the selected image 
    // const [image, setImage] = useState(null);

    // State to hold extracted text 
    // const [extractedText, setExtractedText] =
    //     useState("");

    // Function to pick an image from the 
    // device's gallery 
    const pickImageGallery = async () => {
        let result =
            await ImagePicker.launchImageLibraryAsync({
                mediaTypes:
                    ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                base64: true,
                allowsMultipleSelection: false,
            });
        if (!result.canceled) {

            // Perform OCR on the selected image 
            performOCR(result.assets[0]);

            // Set the selected image in state 
            // setImage(result.assets[0].uri);
        }
    };

    // Function to capture an image using the 
    // device's camera 
    const pickImageCamera = async () => {
        let result = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            base64: true,
            allowsMultipleSelection: false,
        });
        if (!result.canceled) {

            // Perform OCR on the captured image 
            // Set the captured image in state 
            performOCR(result.assets[0]);
            // setImage(result.assets[0].uri);
        }
    };

    // Function to perform OCR on an image 
    // and extract text 
    const performOCR = async (file) => {
        let myHeaders = new Headers();
        myHeaders.append(
            "apikey",

            // ADD YOUR API KEY HERE 
            process.env.EXPO_PUBLIC_API_KEY
        );
        myHeaders.append(
            "Content-Type",
            "multipart/form-data"
        );
        console.log("header", myHeaders);

        let raw = file;
        let requestOptions = {
            method: "POST",
            redirect: "follow",
            headers: myHeaders,
            body: raw,
        };

        // Send a POST request to the OCR API 
        try {
            const response = await fetch(
                process.env.EXPO_PUBLIC_API_URL,
                requestOptions
            );
            const result = await response.json();
            console.log(result);
            // Set the extracted text in state 
            // setExtractedText(result["all_text"]);

            //todo - pass the extracted text, form values from context to the Completion screen and change route to it
            router.push({ pathname: '/result', params: { extractedText: result["all_text"] } })
        } catch (error) {
            console.log("error", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.lottie}>
                <Lottie source={require('../../assets/Scan.json')} autoPlay loop />
            </View>
            <Text style={styles.heading2}>
                Scan A Nutrition Label
            </Text>
            <View style={styles.iconContainer}>
                <Ionicons name="camera" size={30} color="white" style={styles.icon} onPress={pickImageCamera} />
                <MaterialIcons name="photo" size={30} color="white" style={styles.icon} onPress={pickImageGallery} />
            </View>
            <StatusBar style="auto" />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#fff",
        height: "100%",
    },
    heading2: {
        fontSize: 22,
        color: "black",
        textAlign: "center",
    },
    lottie: {
        width: width * 0.9,
        height: width
    },
    iconContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
    },
    icon: {
        /* set background color */
        backgroundColor: "#000080",
        /* set border radius */
        borderRadius: 10,
        padding: 10,
    }
});
