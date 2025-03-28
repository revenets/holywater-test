import { BookDetailsStackSlider } from "@app/components/book-details-screen/details-stack-slider";
import { selectBookById } from "@app/selectors/books";
import { useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Text, View } from "react-native";

export default function BookDetailsScreen() {
	const { bookId: _routeBookId } = useLocalSearchParams();

	const [bookId, setBookId] = useState<number>(
		Number(_routeBookId)
	);
	const [isDataLoading, setIsDataLoading] = useState<boolean>(false);

	const currentBook = selectBookById(bookId);
	const { author, genre, name } = currentBook ?? {};

	return (
		<View>
			<BookDetailsStackSlider
				currentBookId={bookId}
				onBookChange={setBookId}
				onBookLoading={setIsDataLoading}
			/>
			{isDataLoading ? <ActivityIndicator  /> : <Text>{name}</Text>}
		</View>
	);
}
