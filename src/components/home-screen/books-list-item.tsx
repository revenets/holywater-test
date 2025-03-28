import { selectBookById } from "@app/selectors";
import { FC, memo, useCallback } from "react";
import { ColorValue, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Text } from "../text";
import { PALETTE } from "@app/enums";
import { router } from "expo-router";

type BooksListItemProps = {
	bookId: number | string;
	bookNameColor?: ColorValue;
};

const _BooksListItem: FC<BooksListItemProps> = ({ bookId, bookNameColor = PALETTE.carbon200 }) => {
	const book = selectBookById(Number(bookId));
	const { name, cover_url } = book ?? {};

	const handleOnPress = useCallback(() => {
		router.navigate({
			pathname: "/book-details/[bookId]",
			params: { bookId },
		});
	}, [bookId]);

	return (
		<TouchableOpacity onPress={handleOnPress} style={styles.container}>
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

const BooksListItem = memo(_BooksListItem);

const styles = StyleSheet.create({
	container: {
		width: 120,
        rowGap: 10,
	},
	bookCover: {
		width: '100%',
		aspectRatio: 0.75,
        borderRadius: 16,
	},
	bookName: {
		flex: 1,
	},
});

export { BooksListItem };
