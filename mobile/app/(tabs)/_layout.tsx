import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useColorScheme } from 'react-native';

export default function TabLayout() {
    const scheme = useColorScheme();

    return (
        <Tabs
            initialRouteName="home"
            screenOptions={{
                tabBarStyle: {
                    height: 52,
                },
                headerShown: false,
                tabBarShowLabel: false,
            }}
        >
            <Tabs.Screen
                name="home"
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => {
                        return focused ? (
                            <Ionicons
                                name="home-sharp"
                                color={color}
                                size={30}
                            />
                        ) : (
                            <Ionicons
                                name="home-outline"
                                color={color}
                                size={30}
                            />
                        );
                    },
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: 'Settings',
                    tabBarIcon: ({ color, focused }) => {
                        return focused ? (
                            <Ionicons
                                name="settings-sharp"
                                color={color}
                                size={30}
                            />
                        ) : (
                            <Ionicons
                                name="settings-outline"
                                color={color}
                                size={30}
                            />
                        );
                    },
                }}
            />
        </Tabs>
    );
}