import { type FC, useEffect } from "react";
import { View, StyleSheet, ViewProps } from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withRepeat,
	Easing,
} from "react-native-reanimated";

import { PALETTE } from "@app/enums/enums";

const BAR_WIDTH = 200;
const BAR_HEIGHT = 6;
const INDICATOR_WIDTH = 50;
const DURATION = 1500;

type CustomLoaderProps = {
	barWidth?: number;
	barHeight?: number;
	indicatorWidth?: number;
	duration?: number;
	style?: ViewProps["style"];
};

const CustomLoader: FC<CustomLoaderProps> = ({
	barHeight = BAR_HEIGHT,
	barWidth = BAR_WIDTH,
	duration = DURATION,
	indicatorWidth = INDICATOR_WIDTH,
	style,
}) => {
	const translateX = useSharedValue(-indicatorWidth);

	useEffect(() => {
		translateX.value = withRepeat(
			withTiming(barWidth, {
				duration: duration,
				easing: Easing.linear,
			}),
			-1,
			false
		);
	}, [barWidth, duration, translateX]);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: translateX.value }],
	}));

	const combinedBarStyles: ViewProps["style"] = [
		styles.bar,
		{ width: barWidth, height: barHeight, borderRadius: barHeight / 2 },
	];
	const combinedIndicatorStyles: ViewProps["style"] = [
		styles.line,
		{
			width: indicatorWidth,
			height: barHeight,
			borderRadius: barHeight / 2,
		},
	];

	return (
		<View style={style}>
			<View style={combinedBarStyles}>
				<Animated.View
					style={[combinedIndicatorStyles, animatedStyle]}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	bar: {
		backgroundColor: "rgba(255, 255, 255, 0.2)",
		overflow: "hidden",
	},
	line: {
		backgroundColor: PALETTE.white,
		position: "absolute",
	},
});

export { CustomLoader };
