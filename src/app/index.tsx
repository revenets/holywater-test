import { CustomLoader, ScreenWrapper, Text } from "@app/components";
import { FONT_FAMILY, PALETTE } from "@app/enums";
import { router, useFocusEffect } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useCallback } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";

export default function LoaderScreen() {
	useFocusEffect(
		useCallback(() => {
			let timeout;

			timeout = setTimeout(() => router.replace("/home"), 2000);

			return () => {
				clearTimeout(timeout);
			};
		}, [])
	);

	return (
		<ScreenWrapper
			safeAreaEdges={["left", "right"]}
			contentContainerStyle={styles.wrapper}
		>
			<ImageBackground
				source={require("@app/assets/images/loader_bg.png")}
				resizeMode="cover"
				style={StyleSheet.absoluteFillObject}
			/>
			<ImageBackground
				source={require("@app/assets/images/hearts_bg.png")}
				resizeMode="cover"
				style={StyleSheet.absoluteFillObject}
			/>
			<View style={styles.contentWrapper}>
				<Text
					color={PALETTE.pink100}
					fontFamily={FONT_FAMILY.Georgia700}
					size="xxxl"
				>
					Book App
				</Text>
				<Text
					size="xxl"
					color={PALETTE.white}
					fontFamily={FONT_FAMILY.Nunito700}
				>
					Welcome to Book App
				</Text>
				<CustomLoader barWidth={300} style={styles.progressBar} />
			</View>
			<StatusBar hidden />
		</ScreenWrapper>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		justifyContent: "center",
	},
	contentWrapper: {
		rowGap: 20,
		alignItems: "center",
	},
	progressBar: {
		marginTop: 15,
	},
});
