import type { FC } from "react";
import {
	type ColorValue,
	type DimensionValue,
	StyleSheet,
	View,
} from "react-native";

import { PALETTE } from "@app/enums";

type LineProps = {
	size?: number;
	color?: ColorValue;
	width?: DimensionValue;
	style?: View["props"]["style"];
};

const Line: FC<LineProps> = ({
	size = StyleSheet.hairlineWidth,
	color = PALETTE.carbon100,
	width = "100%",
	style,
}) => {
	const combinedStyle: View["props"]["style"] = [
		{ borderColor: color, borderWidth: size, width },
		style,
	];

	return <View style={combinedStyle} />;
};

export { Line };
