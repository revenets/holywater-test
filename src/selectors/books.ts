import { BooksDto } from "@app/types";
import remoteConfig from "@react-native-firebase/remote-config";

const getBooksData = () => {
	const data = remoteConfig().getValue("json_data").asString();

	const booksDto: BooksDto = JSON.parse(data);

	return booksDto;
};

const selectAllBooks = () => {
	const booksDto = getBooksData();

	return booksDto.books;
};

const selectAllBooksIds = () => {
	return selectAllBooks().map(({ id }) => id);
}

const selectBookById = (id: number) =>
	getBooksData().books.find((book) => book.id === id);
const selectSliderItems = () => getBooksData().top_banner_slides;
const selectYouWillLikeSectionBooks = () =>
	getBooksData().you_will_like_section;

const selectBooksIdsGroupedByGenre = () => {
	const unorderedBooks = selectAllBooks();
	const groupedBooks: { [genre: string]: number[] } = unorderedBooks.reduce(
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

export {
	selectAllBooks,
	selectBookById,
	selectSliderItems,
	selectYouWillLikeSectionBooks,
	selectBooksIdsGroupedByGenre,
	selectAllBooksIds,
};
