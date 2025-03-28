import { type FC, useEffect } from "react";
import {
	View,
	StyleSheet,
	type ViewProps,
	type ColorValue,
} from "react-native";
import Animated, {
	useSharedValue,
	useAnimatedStyle,
	withTiming,
	withRepeat,
	Easing,
} from "react-native-reanimated";

import { PALETTE } from "@app/enums";

const BAR_WIDTH = 200;
const BAR_HEIGHT = 6;
const INDICATOR_WIDTH = 50;
const DURATION = 1500;
const DEFAULT_BAR_COLOR = "rgba(255, 255, 255, 0.2)";

type CustomLoaderProps = {
	barColor?: ColorValue;
	barWidth?: number;
	barHeight?: number;
	indicatorColor?: ColorValue;
	indicatorWidth?: number;
	duration?: number;
	style?: ViewProps["style"];
};

const CustomLoader: FC<CustomLoaderProps> = ({
	barColor = DEFAULT_BAR_COLOR,
	barHeight = BAR_HEIGHT,
	barWidth = BAR_WIDTH,
	duration = DURATION,
	indicatorColor = PALETTE.white,
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
		{
			width: barWidth,
			height: barHeight,
			borderRadius: barHeight / 2,
			backgroundColor: barColor,
		},
	];
	const combinedIndicatorStyles: ViewProps["style"] = [
		styles.line,
		{
			width: indicatorWidth,
			height: barHeight,
			borderRadius: barHeight / 2,
			backgroundColor: indicatorColor,
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
		overflow: "hidden",
	},
	line: {
		position: "absolute",
	},
});

export { CustomLoader };
