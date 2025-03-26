import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import 'react-native-gesture-handler';
import { FONT_FAMILY } from '@app/constants/text';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    [FONT_FAMILY.Nunito600]: require('@app/assets/fonts/NunitoSans_600.ttf'),
    [FONT_FAMILY.Nunito700]: require('@app/assets/fonts/NunitoSans_700.ttf'),
	  [FONT_FAMILY.Georgia700]: require('@app/assets/fonts/GeorgiaItalic_700.ttf'),
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
