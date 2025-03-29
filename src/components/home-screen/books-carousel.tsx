import { router } from "expo-router";
import { type FC } from "react";
import {
	Dimensions,
	ImageBackground,
	StyleSheet,
	TouchableOpacity,
	View,
} from "react-native";
import { useSharedValue } from "react-native-reanimated";
import Carousel, {
	Pagination,
	CarouselRenderItem,
} from "react-native-reanimated-carousel";

import { PALETTE } from "@app/enums/colors";
import { Text } from "../text";
import { Book, SliderItem } from "@app/types";
import { FONT_FAMILY } from "@app/enums";
import { useBooksStore } from "@app/store";

const DEFAULT_SCREEN_PADDING = 16;

const WIDTH = Dimensions.get("window").width;
const HEIGHT = WIDTH / 2.2;
const PROGRESS_BAR_SIZE = 7;

type SliderItemExtended = SliderItem & Pick<Book, "author" | "name">;

type BooksCarouselItemProps = {
	book: SliderItemExtended;
	onPress?: () => void;
};

const BookCarouselItem: FC<BooksCarouselItemProps> = ({ book, onPress }) => {
	const { author, name, cover, book_id: bookId } = book ?? {};

	if (!cover || !bookId) {
		return null;
	}

	return (
		<TouchableOpacity style={styles.cardBookItem} onPress={onPress}>
			<ImageBackground
				source={{ uri: cover }}
				resizeMode="cover"
				style={StyleSheet.absoluteFillObject}
			/>
			{!!name && !!author && (
				<View style={styles.cardBookInfoWrapper}>
					<Text
						color={PALETTE.white}
						size="lg"
						fontFamily={FONT_FAMILY.Nunito700}
						style={styles.bookNameText}
						numberOfLines={1}
						ellipsizeMode="tail"
					>
						{name}
					</Text>
					<Text color={PALETTE.white}>{author}</Text>
				</View>
			)}
		</TouchableOpacity>
	);
};

const BooksCarousel: FC = () => {
	const progress = useSharedValue<number>(0);
	const { allBooks, sliderBooks } = useBooksStore();

	const carouselData: SliderItemExtended[] = sliderBooks.map((item) => {
		const correspondingBook = allBooks.find(
			(book) => book.id === item.book_id
		);

		return {
			...item,
			author: correspondingBook?.author ?? "",
			name: correspondingBook?.name ?? "",
		};
	});

	const handleItemPress = (bookId: number) => {
		router.navigate({
			pathname: "/book-details/[bookId]",
			params: { bookId },
		});
	};

	const handleRenderCarouselItem: CarouselRenderItem<SliderItemExtended> = ({
		item,
	}) => {
		return (
			<BookCarouselItem
				book={item}
				onPress={() => handleItemPress(item.book_id)}
			/>
		);
	};

	return (
		<View style={{ alignItems: "center" }}>
			<Carousel
				width={WIDTH}
				height={HEIGHT}
				data={carouselData}
				onProgressChange={progress}
				renderItem={handleRenderCarouselItem}
				autoPlay
				autoPlayInterval={3000}
			/>

			<Pagination.Basic
				progress={progress}
				data={carouselData}
				dotStyle={{
					backgroundColor: PALETTE.carbon50,
					borderRadius: 50,
				}}
				activeDotStyle={{
					backgroundColor: PALETTE.pink100,
				}}
				size={PROGRESS_BAR_SIZE}
				containerStyle={{ gap: 10, marginTop: -2 * PROGRESS_BAR_SIZE }}
			/>
		</View>
	);
};

export { BooksCarousel };

const styles = StyleSheet.create({
	cardBookItem: {
		flex: 1,
		borderRadius: 16,
		justifyContent: "center",
		overflow: "hidden",
		marginHorizontal: DEFAULT_SCREEN_PADDING,
	},
	cardBookInfoWrapper: {
		borderRadius: 16,
		backgroundColor: "rgba(81, 81, 81, 0.7)",
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		maxWidth: "80%",
		bottom: 16,
		left: 16,
		padding: 8,
	},
	bookNameText: {
		flex: 1,
	},
});
