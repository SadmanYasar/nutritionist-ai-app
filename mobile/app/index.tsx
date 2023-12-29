import { useEffect } from 'react';
import { useRootNavigationState, Redirect, router } from 'expo-router';
import { clearAll, getItem } from 'utils/asyncStorage';
import { Text, View, StyleSheet, Dimensions } from 'react-native';
import Lottie from 'lottie-react-native';

const { width, height } = Dimensions.get('window');

const Index = () => {
  useEffect(() => {
    // Dev Mode Only !!
    // clear AsyncStorage
    clearAll().then(() => {
      checkOnboardingAndRedirect();
    })

  }, []);

  const checkOnboardingAndRedirect = async () => {
    try {
      const onboarded = await getItem('onboarded');

      if (!onboarded) {
        console.log('Onboarding not completed, redirecting to onboarding');
        // return <Redirect href="/onboarding" />;
        router.replace('/onboarding');
        return;
      }

      const dietaryPreference = await getItem('dietaryPreference');
      const dietaryRestrictions = await getItem('dietaryRestrictions');

      if (!dietaryPreference || !dietaryRestrictions) {
        // return <Redirect href="/dietPreferences" />;
        router.replace('/dietPreferences');
        return;
      }

      // All checks passed, redirect to home
      router.replace('/home');
      return;
    } catch (error) {
      // Handle errors, e.g., AsyncStorage failure
      console.error('Error checking AsyncStorage:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.lottie}>
        <Lottie source={require('../assets/AnikiHamster.json')} autoPlay loop />
      </View>
    </View>
  ); // or any loading indicator while checking AsyncStorage
};

export default Index;

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
  lottie: {
    width: width * 0.9,
    height: width
  },
});