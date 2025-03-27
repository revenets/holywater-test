import { selectBookById } from "@app/selectors/books";
import { useLocalSearchParams } from "expo-router";
import { Text } from "react-native";

export default function BookDetailsScreen() {
	const { bookId } = useLocalSearchParams();

	const currentBook = selectBookById(Number(bookId));
	const { author, genre, name } = currentBook ?? {};

	return (
		<>
			<Text>{author}</Text>
			<Text>{genre}</Text>
			<Text>{name}</Text>
		</>
	);
}
