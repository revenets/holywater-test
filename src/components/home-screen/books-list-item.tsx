import { FC } from "react";
import { ColorValue, Image, StyleSheet, TouchableOpacity } from "react-native";

import { Text } from "../text";
import { PALETTE } from "@app/enums";
import { useBooksStore } from "@app/store";

type BooksListItemProps = {
	bookId: number | string;
	bookNameColor?: ColorValue;
	onPress?: () => void;
};

const BooksListItem: FC<BooksListItemProps> = ({
	bookId,
	bookNameColor = PALETTE.carbon200,
	onPress,
}) => {
	const { allBooks } = useBooksStore();
	const book = allBooks.find((book) => book.id === Number(bookId));
	const { name, cover_url } = book ?? {};

	if (!book) {
		return null;
	}

	return (
		<TouchableOpacity
			onPress={onPress}
			style={styles.container}
			disabled={typeof onPress !== "function"}
		>
			<Image
				source={{ uri: cover_url }}
				resizeMode="cover"
				style={styles.bookCover}
			/>
			<Text
				color={bookNameColor}
				style={styles.bookName}
				numberOfLines={2}
				ellipsizeMode="tail"
			>
				{name}
			</Text>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
	container: {
		width: 120,
		rowGap: 10,
	},
	bookCover: {
		width: "100%",
		aspectRatio: 0.75,
		borderRadius: 16,
	},
	bookName: {
		flex: 1,
	},
});

export { BooksListItem };
