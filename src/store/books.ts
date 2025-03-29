import { Book, SliderItem } from '@app/types';
import { create } from 'zustand';

type BooksStore = {
    allBooks: Book[],
    sliderBooks: SliderItem[],
    recommendedBookIds: number[],

    setAllBooks: (books: Book[]) => void;
    setSliderBooks: (items: SliderItem[]) => void;
    setRecommendedBooks: (books: number[]) => void;
}

const useBooksStore = create<BooksStore>(set => ({
    allBooks: [],
    sliderBooks: [],
    recommendedBookIds: [],
    setAllBooks: books => set(() => ({ allBooks: books })),
    setSliderBooks: books => set(() => ({ sliderBooks: books })),
    setRecommendedBooks: books => set(() => ({ recommendedBookIds: books })),
}));

export { useBooksStore };