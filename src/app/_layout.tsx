import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import HomeScreen from './home';
import BookDetailsScreen from './book-details';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    NunitoSans_700: require('@app/assets/fonts/NunitoSans_700.ttf'),
    NunitoSans_600: require('@app/assets/fonts/NunitoSans_600.ttf'),
	GeorgiaItalic_700: require('@app/assets/fonts/GeorgiaItalic_700.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="home" />
        <Stack.Screen name="book-details"  />
      </Stack>
      <StatusBar style="auto" />
    </>
  );
}
