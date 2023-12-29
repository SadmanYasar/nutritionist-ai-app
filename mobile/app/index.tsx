import { useEffect } from 'react';
import { useRootNavigationState, Redirect, router } from 'expo-router';
import { getItem } from 'utils/asyncStorage';
import { Text, View } from 'react-native';

const Index = () => {
  useEffect(() => {
    checkOnboardingAndRedirect();
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

  return null; // or any loading indicator while checking AsyncStorage
};

export default Index;
