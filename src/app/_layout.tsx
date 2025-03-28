import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect } from "react";
import "react-native-reanimated";
import "react-native-gesture-handler";
import remoteConfig from "@react-native-firebase/remote-config";
import { Platform } from "react-native";
import {
	initialWindowMetrics,
	SafeAreaProvider,
	useSafeAreaInsets,
} from "react-native-safe-area-context";

import { FONT_FAMILY, PALETTE } from "@app/enums";
import { Text } from "@app/components";

SplashScreen.preventAutoHideAsync();

const fetchRemoteConfig = async () => {
	await remoteConfig().fetchAndActivate();
};

export default function RootLayout() {
	const [loaded] = useFonts({
		[FONT_FAMILY.Nunito600]: require("@app/assets/fonts/NunitoSans_600.ttf"),
		[FONT_FAMILY.Nunito700]: require("@app/assets/fonts/NunitoSans_700.ttf"),
		[FONT_FAMILY.Georgia700]: require("@app/assets/fonts/GeorgiaItalic_700.ttf"),
	});

	useEffect(() => {
		SplashScreen.hideAsync();
		fetchRemoteConfig();
	}, []);

	if (!loaded) {
		return null;
	}

	return <RootLayoutNav />;
}

function RootLayoutNav() {
	const { top } = useSafeAreaInsets();

	return (
		<SafeAreaProvider initialMetrics={initialWindowMetrics}>
			<Stack>
				<Stack.Screen name="index" options={{ headerShown: false }} />
				<Stack.Screen
					name="home"
					options={{
						headerBackVisible: false,
						headerLeft: () => (
							<Text
								color={PALETTE.pink200}
								preset="heading"
								style={{
									marginTop:
										Platform.OS === "android"
											? top
											: undefined,
								}}
							>
								Library
							</Text>
						),
						headerTitle: "",
						headerStyle: {
							backgroundColor: PALETTE.screenBackground,
						},
						contentStyle: {
							backgroundColor: PALETTE.screenBackground,
						},
					}}
				/>
				<Stack.Screen
					name="book-details/[bookId]"
					options={{ headerShown: false }}
				/>
			</Stack>
			<StatusBar style="inverted" />
		</SafeAreaProvider>
	);
}
