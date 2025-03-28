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
import { selectBookById, selectSliderItems } from "@app/selectors/books";
import { Text } from "../text";
import { SliderItem } from "@app/types";
import { FONT_FAMILY } from "@app/enums";

const DEFAULT_SCREEN_PADDING = 16;

const WIDTH = Dimensions.get("window").width;
const HEIGHT = WIDTH / 2.2;
const PROGRESS_BAR_SIZE = 7;

type BooksCarouselItemProps = {
	bookId: number | string;
	bookCover: string;
	onPress?: () => void;
};

const BookCarouselItem: FC<BooksCarouselItemProps> = ({
	bookId,
	bookCover,
	onPress,
}) => {
	const bookData = selectBookById(Number(bookId));
	const { author, name } = bookData ?? {};

	if (!bookCover || !bookId) {
		return null;
	}

	return (
		<TouchableOpacity style={styles.cardBookItem} onPress={onPress}>
			<ImageBackground
				source={{ uri: bookCover }}
				resizeMode="cover"
				style={StyleSheet.absoluteFillObject}
			/>
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
		</TouchableOpacity>
	);
};

const BooksCarousel: FC = () => {
	const progress = useSharedValue<number>(0);
	const data = selectSliderItems();

	const handleItemPress = (bookId: number) => () => {
		router.navigate({
			pathname: "/book-details/[bookId]",
			params: { bookId },
		});
	};

	const handleRenderCarouselItem: CarouselRenderItem<SliderItem> = ({
		item,
	}) => {
		return (
			<BookCarouselItem
				bookCover={item.cover}
				bookId={item.book_id}
				onPress={handleItemPress(item.book_id)}
			/>
		);
	};

	return (
		<View style={{ alignItems: "center" }}>
			<Carousel
				width={WIDTH}
				height={HEIGHT}
				data={data}
				onProgressChange={progress}
				renderItem={handleRenderCarouselItem}
				autoPlay
				autoPlayInterval={3000}
			/>

			<Pagination.Basic
				progress={progress}
				data={data}
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
