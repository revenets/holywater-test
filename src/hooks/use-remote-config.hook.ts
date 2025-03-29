import { useEffect, useState } from "react";
import remoteConfig from "@react-native-firebase/remote-config";
import { useBooksStore } from "@app/store";
import { BooksDto } from "@app/types";

export const useRemoteConfig = () => {
	const { allBooks, setAllBooks, setRecommendedBooks, setSliderBooks } =
		useBooksStore();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		const loadRemoteConfig = async () => {
			setLoading(true);
			try {
				if (allBooks.length) {
					setLoading(false);
					return;
				}

				await remoteConfig().fetchAndActivate();

				const fetchedData: BooksDto = JSON.parse(
					remoteConfig().getValue("json_data").asString()
				);

				const { books, top_banner_slides, you_will_like_section } =
					fetchedData ?? {};
				setAllBooks(books);
				setRecommendedBooks(you_will_like_section);
				setSliderBooks(top_banner_slides);
			} catch (error) {
				console.error("Remote Config fetch error:", error);
			}
			setLoading(false);
		};

		loadRemoteConfig();
	}, [allBooks.length, setAllBooks, setRecommendedBooks, setSliderBooks]);

	return { loading };
};
