import { Book } from "@app/types";

const getBooksIdsGroupedByGenre = (books: Book[]) => {
	const groupedBooks: { [genre: string]: number[] } = books.reduce(
		(acc, book) => {
			if (!acc[book.genre]) {
				acc[book.genre] = [];
			}
			acc[book.genre].push(book.id);
			return acc;
		},
		{} as { [genre: string]: number[] }
	);

	return groupedBooks;
};

export { getBooksIdsGroupedByGenre };
