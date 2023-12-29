import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import { router } from 'expo-router';
import { setItem } from 'utils/asyncStorage';

const { width, height } = Dimensions.get('window');

export default function OnboardingScreen() {

    const handleDone = () => {
        setItem('onboarded', '1');

        router.replace('/dietPreferences');
    }

    const doneButton = ({ ...props }) => {
        return (
            <TouchableOpacity style={styles.doneButton} {...props}>
                <Text>Done</Text>
            </TouchableOpacity>
        )
    }

    return (
        <View style={styles.container}>
            <Onboarding
                onDone={handleDone}
                onSkip={handleDone}
                // bottomBarHighlight={false}
                DoneButtonComponent={doneButton}
                containerStyles={{ paddingHorizontal: 15 }}
                pages={[
                    {
                        backgroundColor: '#a7f3d0',
                        image: (
                            <View style={styles.lottie}>
                                <Lottie source={require('../assets/onboarding2.json')} autoPlay loop />
                            </View>
                        ),
                        title: 'Welcome to NutritionistAI!',
                        subtitle: 'Your personal guide to a healthier lifestyle.',
                    },
                    {
                        backgroundColor: '#fef3c7',
                        image: (
                            <View style={styles.lottie}>
                                <Lottie source={require('../assets/onboarding1.json')} autoPlay loop />
                            </View>
                        ),
                        title: 'Know what you eat before you buy',
                        subtitle: 'Share your preferences and scan a nutrition label to get feedback.',
                    },
                ]}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white'
    },
    lottie: {
        width: width * 0.9,
        height: width
    },
    doneButton: {
        padding: 20,
        // backgroundColor: 'white',
        // borderTopLeftRadius: '100%',
        // borderBottomLeftRadius: '100%'
    }
})