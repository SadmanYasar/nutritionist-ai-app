// App.js file 

import { StatusBar } from "expo-status-bar";
import { useState } from "react";
import {
    Button,
    StyleSheet,
    Text,
    Image,
    SafeAreaView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";

export default function Home() {

    // State to hold the selected image 
    const [image, setImage] = useState(null);

    // State to hold extracted text 
    const [extractedText, setExtractedText] =
        useState("");

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
            setImage(result.assets[0].uri);
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
            setImage(result.assets[0].uri);
        }
    };

    // Function to perform OCR on an image 
    // and extract text 
    const performOCR = (file) => {
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
        fetch(
            process.env.EXPO_PUBLIC_API_URL,
            requestOptions
        )
            .then((response) => response.json())
            .then((result) => {
                console.log(result);
                // Set the extracted text in state 
                setExtractedText(result["all_text"]);
            })
            .catch((error) => console.log("error", error));
    };

    return (
        <SafeAreaView style={styles.container}>
            <Text style={styles.heading2}>
                Convert Image to Text
            </Text>
            <Button
                title="Pick an image from gallery"
                onPress={pickImageGallery}
            />
            <Button
                title="Pick an image from camera"
                onPress={pickImageCamera}
            />
            {image && (
                <Image
                    source={{ uri: image }}
                    style={{
                        width: 400,
                        height: 300,
                        objectFit: "contain",
                    }}
                />
            )}

            <Text style={styles.text1}>
                Extracted text:
            </Text>
            <Text style={styles.text1}>
                {extractedText}
            </Text>
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
    heading: {
        fontSize: 28,
        fontWeight: "bold",
        marginBottom: 10,
        color: "blue",
        textAlign: "center",
    },
    heading2: {
        fontSize: 22,
        fontWeight: "bold",
        marginBottom: 10,
        color: "black",
        textAlign: "center",
    },
    text1: {
        fontSize: 16,
        marginBottom: 10,
        color: "black",
        fontWeight: "bold",
    },
});
