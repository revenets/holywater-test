import { useNavigation } from "expo-router";
import type { FC } from "react";
import {
	type ColorValue,
	Image,
	type ImageStyle,
	type StyleProp,
	TouchableOpacity,
	type ViewStyle,
} from "react-native";

import { PALETTE } from "@app/enums";

type NavigationBackButtonProps = {
	size?: number;
	color?: ColorValue;
	iconStyle?: StyleProp<ImageStyle>;
	style?: Omit<StyleProp<ViewStyle>, "color">;
};

const NavigationBackButton: FC<NavigationBackButtonProps> = ({
	color = PALETTE.white,
	size = 24,
	iconStyle: imageStyleOverride,
	style,
}) => {
	const navigation = useNavigation();
	const handleGoBack = () => {
		if (navigation.canGoBack()) {
			navigation.goBack();
		}
	};

	const imageStyle: StyleProp<ImageStyle> = [
		{ tintColor: color, width: size, height: size },
		imageStyleOverride,
	];

	return (
		<TouchableOpacity hitSlop={10} onPress={handleGoBack} style={style}>
			<Image
				source={require("@app/assets/images/arrow_left.png")}
				style={imageStyle}
			/>
		</TouchableOpacity>
	);
};

export { NavigationBackButton };
