import { useState } from "react";
import { useLocalSearchParams } from "expo-router";

import {
	BookDetailsInfoContainer,
	BookDetailsStackSlider,
} from "@app/components/book-details-screen";
import { useBooksStore } from "@app/store";

export default function BookDetailsScreen() {
	const { bookId: _routeBookId } = useLocalSearchParams();
	const { recommendedBookIds } = useBooksStore();

	const [bookId, setBookId] = useState<number>(Number(_routeBookId));
	const [isDataLoading, setIsDataLoading] = useState<boolean>(false);

	return (
		<>
			<BookDetailsStackSlider
				currentBookId={bookId}
				onBookChange={setBookId}
				onBookLoading={setIsDataLoading}
			/>
			<BookDetailsInfoContainer
				bookId={bookId}
				isLoading={isDataLoading}
				recommendedBookIds={recommendedBookIds}
			/>
		</>
	);
}
