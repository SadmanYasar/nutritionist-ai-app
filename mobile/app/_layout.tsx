import { DietProvider } from 'context';
import { useFonts } from 'expo-font';
import { SplashScreen, Stack } from 'expo-router';
import { StyleSheet, View, useColorScheme } from 'react-native';

export default function StackLayout() {
    const colorScheme = useColorScheme();

    return (
        <DietProvider>
            <Stack screenOptions={{
                headerShown: false,
                tabBarShowLabel: false,
            }}>
                <Stack.Screen
                    name="(tabs)"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
        </DietProvider>
    );
}