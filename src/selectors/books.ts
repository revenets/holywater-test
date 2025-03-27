import { BooksDto } from '@app/types/book';
import remoteConfig from '@react-native-firebase/remote-config';

const getBooksData = () => {
    const data = remoteConfig().getValue('json_data').asString();

    const booksDto: BooksDto = JSON.parse(data);
    
    return booksDto;
}

const selectAllBooks = () => {
    const booksDto = getBooksData();
    
    return booksDto.books;
};

const selectBookById = (id: number) => getBooksData().books.find(book => book.id === id);
const selectSliderItems = () => getBooksData().top_banner_slides;
const selectYouWillLikeSectionBooks = () => getBooksData().you_will_like_section;

export { selectAllBooks, selectBookById, selectSliderItems, selectYouWillLikeSectionBooks };
