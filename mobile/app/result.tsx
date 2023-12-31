import { DietContext } from 'context';
import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useContext, useEffect, useState } from 'react';
import { Platform, SafeAreaView, Pressable, Button, Text, TextInput, View, StyleSheet } from 'react-native';
import { useCompletion } from 'react-native-vercel-ai';
import { useDebouncedCallback } from 'use-debounce';
import TypeWriterEffect from 'react-native-typewriter-effect';

const Result = () => {
    const router = useRouter();
    const { dietPreference, dietRestrictions, extractedText } = useContext(DietContext);
    const [completion, setCompletion] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const api = "https://potential-acorn-wxgp7wqp66539679-3000.preview.app.github.dev/api/completion";

    const prompt = `You are a nutritionist. You are talking to a client who has the following diet preferences: ${dietPreference} The client also has the following diet restrictions: ${dietRestrictions}. The client asks you if the following product is healthy for them based on the information from nutrition label: ${extractedText}. You answer:`;

    //make a debounced request call to api with prompt
    const init = useDebouncedCallback(() => {
        console.log("Inside init");
        console.log("prompt: ", prompt);
        console.log(api);
        handleSubmit(prompt);
    }, 1000);

    useEffect(() => {
        console.log("Calling init");
        init();
    }, [])

    const handleSubmit = async (prompt) => {
        console.log("Inside handleSubmit");
        setLoading(true); // Add loading state

        try {
            const response = await fetch(api, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ prompt: prompt })
            });

            const data = await response.json();
            console.log("data: ", data);
            setCompletion(data.data); // Update completion state
        } catch (error) {
            console.error("Error:", error);
            setError(error); // Update error state
        } finally {
            setLoading(false); // Set loading state to false
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            {loading && <Text style={styles.text}>Loading...</Text>}
            {completion && <>
                <TypeWriterEffect content={completion} style={styles.text} />
                <Pressable style={styles.button} onPress={() => router.replace('/home')}>
                    <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>
                        Home
                    </Text>
                </Pressable>
            </>}
            {error && <Text style={styles.text}>An Error Occurred.</Text>}
        </SafeAreaView>
    )
};

export default Result;

const styles = StyleSheet.create({
    container: {
        display: "flex",
        alignContent: "center",
        alignItems: "center",
        justifyContent: "space-evenly",
        backgroundColor: "#fff",
        paddingHorizontal: 20,
        height: "100%",
    },
    text: {
        fontSize: 18,
        color: "black",
    },
    iconContainer: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-evenly',
    },
    icon: {
        /* set background color */
        backgroundColor: "#000000",
        /* set border radius */
        borderRadius: 10,
        padding: 10,
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
});
