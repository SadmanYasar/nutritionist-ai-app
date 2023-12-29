import { useLocalSearchParams, useNavigation, useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import { Button, Text, TextInput, View } from 'react-native';
import { useCompletion } from 'react-native-vercel-ai';
import { useDebouncedCallback } from 'use-debounce';

//get props from home.tsx
const Result = () => {
    const param = useLocalSearchParams();
    const { extractedText } = param;

    const {
        completion,
        input,
        handleInputChange,
        handleSubmit,
        stop,
        isLoading,
        setInput,
        setCompletion,
        error
    } = useCompletion({
        api: 'http://localhost:3001/api/completion',
    });

    //make a debounced request call handleSubmit with extractedText
    const init = useDebouncedCallback(() => {
        const prompt = `This is a blog about Understanding and Using the Nutrition Facts Label. I am a nutritionist. I saw the following nutrition facts on a product: ${extractedText}. Someone asked me if this product is healthy for them with the same diet preference and restrictions mentioned. I answered:`;

        handleSubmit(prompt);
    }, 2000);

    useEffect(() => {
        init();
    }, [])

    return (
        <View style={{ margin: 10 }}>
            <View>
                {isLoading && Platform.OS !== 'web' ? (
                    <View style={{ marginVertical: 7, marginBottom: 12 }}>
                        <Text>Loading...</Text>
                    </View>
                ) : (
                    <View style={{ marginVertical: 7, marginBottom: 12 }}>
                        <Text>Completion result: {completion}</Text>
                    </View>
                )}
            </View>
            <View
                style={{ height: 1, backgroundColor: 'gray', marginVertical: 25 }}
            />

            <View style={{ width: '100%', flexDirection: 'row' }}>
                {/* <TextInput
                    style={{
                        borderWidth: 1,
                        borderColor: 'black',
                        padding: 10,
                        width: '67%',
                        paddingHorizontal: 20,
                        borderRadius: 5,
                        marginRight: 3,
                    }}
                    value={input}
                    placeholder="Say something..."
                    onChangeText={(e) => {
                        handleInputChange(
                            Platform.OS === 'web' ? { target: { value: e } } : e
                        );
                    }}
                />
                <Button onPress={handleSubmit} title="Send" /> */}
                <Button onPress={stop} title="Stop" />
            </View>
        </View>
    );
};

export default Result;