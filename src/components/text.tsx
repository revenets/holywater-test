import type { FC } from "react";
import {
	Text as RNText,
	type StyleProp,
	type TextProps as RNTextProps,
	type TextStyle,
	ColorValue,
} from "react-native";

import { FONT_FAMILY, PALETTE } from "@app/enums";
import { ValueOf } from "@app/types";

type Sizes = keyof typeof sizeToStyleMap;
type Presets = "default" | "heading" | "subheading";

interface TextProps extends RNTextProps {
	children?: React.ReactNode;
	color?: ColorValue;
	fontFamily?: ValueOf<typeof FONT_FAMILY>;
	preset?: Presets;
	size?: Sizes;
	style?: StyleProp<TextStyle>;
}

const Text: FC<TextProps> = ({
	size,
	children,
	color,
	fontFamily,
	style: styleOverride,
	preset = "default",
	...props
}) => {
	const styles: StyleProp<TextStyle> = [
		presetToStyleMap[preset],
		size && sizeToStyleMap[size],
		fontFamily ? { fontFamily } : null,
		color ? { color } : null,
		styleOverride,
	];

	return (
		<RNText {...props} allowFontScaling={false} style={styles}>
			{children}
		</RNText>
	);
};

export { Text };

const sizeToStyleMap = {
	xxxl: { fontSize: 52, lineHeight: 60 },
	xxl: { fontSize: 24, lineHeight: 26 },
	xl: { fontSize: 20, lineHeight: 22 },
	lg: { fontSize: 18, lineHeight: 26 },
	md: { fontSize: 16, lineHeight: 18 },
	sm: { fontSize: 14, lineHeight: 16 },
	xs: { fontSize: 12, lineHeight: 14 },
} as const satisfies Record<string, TextStyle>;

const baseStyle: StyleProp<TextStyle> = [sizeToStyleMap.md];

const presetToStyleMap: Record<Presets, StyleProp<TextStyle>> = {
	default: baseStyle,
	heading: [
		baseStyle,
		sizeToStyleMap.xl,
		{ color: PALETTE.carbon400, fontFamily: FONT_FAMILY.Nunito700 },
	],
	subheading: [
		baseStyle,
		sizeToStyleMap.lg,
		{ color: PALETTE.carbon400, fontFamily: FONT_FAMILY.Nunito700 },
	],
};
