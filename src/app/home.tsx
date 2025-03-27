import { FlatList, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { Text } from "@app/components/components";
import { PALETTE } from "@app/enums/enums";
import { selectAllBooks } from "@app/selectors/books";
import { router } from "expo-router";

export default function HomeScreen() {
	const books = selectAllBooks();

	const handleBookPress = (bookId: number) => {
		router.navigate({
			pathname: "/book-details/[bookId]",
			params: { bookId },
		});
	};

	return (
		<View style={styles.container}>
			<FlatList
				data={books}
				renderItem={({ item }) => (
					<Text
						color={PALETTE.white}
						onPress={() => handleBookPress(item.id)}
					>
						{item.name}
					</Text>
				)}
			/>
			<StatusBar hidden />
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 16,
		paddingVertical: 20,
	},
});
