import { BOOK_GENRE } from "@app/enums";
import { ValueOf } from "./common";
import { SliderItem } from "./slider";

type Book = {
    id: number;
    name: string;
    author: string;
    summary?: string;
    genre: ValueOf<typeof BOOK_GENRE>;
    cover_url?: string;
    views: string;
    likes: string;
    quotes: string;
}

type BooksDto = {
    books: Book[];
    top_banner_slides: SliderItem[];
    you_will_like_section: number[];
}

export type { Book, BooksDto };
