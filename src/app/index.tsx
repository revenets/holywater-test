import { View } from "react-native";

import { Button, CustomLoader, Text } from "@app/components/components";
import { FONT_FAMILY, PALETTE } from "@app/constants/constants";

export default function LoaderScreen() {
	return (
		<View style={{ backgroundColor: PALETTE.carbon300 }}>
			<Text color={PALETTE.pink100} fontFamily={FONT_FAMILY.Georgia700} size="xxxl">Loading...</Text>
			<CustomLoader barWidth={300} />
			<Button
				title="Go home"
				onPress={() => {}}
				style={{ marginTop: 20 }}
			/>
		</View>
	);
}
