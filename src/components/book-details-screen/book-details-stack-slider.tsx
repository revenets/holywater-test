import { useCallback, useMemo, type FC } from "react";
import {
	Image,
	ImageBackground,
	StyleSheet,
	useWindowDimensions,
	View,
} from "react-native";
import Carousel, {
	type CarouselRenderItem,
} from "react-native-reanimated-carousel";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { FONT_FAMILY, PALETTE } from "@app/enums";
import { Text } from "../text";
import { NavigationBackButton } from "./navigation-back-button";
import { useBooksStore } from "@app/store";

const ITEM_WIDTH = 200;

type BookDetailsSliderItemProps = {
	bookId: number;
};

const BookDetailsSliderItem: FC<BookDetailsSliderItemProps> = ({ bookId }) => {
	const { allBooks } = useBooksStore();
	const book = allBooks.find((book) => book.id === bookId);

	const { cover_url, author, name } = book ?? {};

	return (
		<View style={styles.carouselItemContainer}>
			<Image
				source={{ uri: cover_url }}
				resizeMode="cover"
				style={styles.bookCover}
			/>
			<View style={styles.carouselItemTextWrapper}>
				<Text
					preset="heading"
					color={PALETTE.white}
					numberOfLines={2}
					ellipsizeMode="tail"
					style={styles.bookName}
				>
					{name}
				</Text>
				<Text
					color={PALETTE.white}
					size="sm"
					fontFamily={FONT_FAMILY.Nunito700}
					numberOfLines={2}
				>
					{author}
				</Text>
			</View>
		</View>
	);
};

type BookDetailsStackSliderProps = {
	currentBookId: number | string;
	onBookChange?: (bookId: number) => void;
	onBookLoading?: (value: boolean) => void;
};

const BookDetailsStackSlider: FC<BookDetailsStackSliderProps> = ({
	currentBookId,
	onBookChange,
	onBookLoading,
}) => {
	const { allBooks } = useBooksStore();
	const bookIds = allBooks.map(({ id }) => id);
	const { width: SCREEN_WIDTH } = useWindowDimensions();
	const { top } = useSafeAreaInsets();

	const defaultIndex = useMemo(() => {
		return bookIds.findIndex((id) => id === currentBookId);
	}, [bookIds, currentBookId]);

	const handleRenderCarouselItem: CarouselRenderItem<number> = ({ item }) => {
		return <BookDetailsSliderItem bookId={item} />;
	};

	const handleSnapToBook = useCallback(
		(newIndex: number) => {
			const bookIdByIndex = bookIds.find(
				(_, index) => index === newIndex
			);
			if (!bookIdByIndex) return;

			onBookChange?.(bookIdByIndex);
		},
		[bookIds, onBookChange]
	);

	const handleScrollStart = () => onBookLoading?.(true);
	const handleScrollEnd = () => onBookLoading?.(false);

	return (
		<View style={{ paddingTop: top }}>
			<ImageBackground
				source={require("@app/assets/images/details_bg.png")}
				resizeMode="cover"
				style={StyleSheet.absoluteFillObject}
			/>
			<NavigationBackButton style={styles.backButton} />
			<Carousel
				data={bookIds}
				width={SCREEN_WIDTH}
				height={300}
				pagingEnabled={true}
				snapEnabled={true}
				defaultIndex={defaultIndex}
				onSnapToItem={handleSnapToBook}
				mode={"horizontal-stack"}
				modeConfig={{
					snapDirection: "left",
					stackInterval: 200,
					scaleInterval: 0.2,
				}}
				renderItem={handleRenderCarouselItem}
				onScrollStart={handleScrollStart}
				onScrollEnd={handleScrollEnd}
			/>
			<View style={styles.sliderBottom} />
		</View>
	);
};

export { BookDetailsStackSlider };

const styles = StyleSheet.create({
	bookCover: {
		flex: 1,
		borderRadius: 16,
	},
	bookName: { textAlign: "center" },
	sliderBottom: {
		width: "100%",
		height: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: PALETTE.white,
		marginTop: 20,
	},
	carouselContainer: {
		alignItems: "center",
		justifyContent: "center",
		width: "100%",
		paddingVertical: 20,
	},
	carouselItemContainer: {
		flex: 1,
		width: ITEM_WIDTH,
		height: "100%",
		alignSelf: "center",
	},
	carouselItemTextWrapper: {
		alignItems: "center",
		rowGap: 4,
		marginTop: 16,
	},
	backButton: {
		marginLeft: 16,
		alignSelf: "flex-start",
	},
});
