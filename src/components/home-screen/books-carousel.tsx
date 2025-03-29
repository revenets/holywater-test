import React, {
	useRef,
	useEffect,
	useState,
	useCallback,
	FC,
	useMemo,
} from "react";
import {
	View,
	FlatList,
	Image,
	TouchableOpacity,
	StyleSheet,
	Dimensions,
	ListRenderItemInfo,
} from "react-native";
import Animated, { ZoomIn, ZoomOut } from "react-native-reanimated";
import { router } from "expo-router";

import { FONT_FAMILY, PALETTE } from "@app/enums";
import { useBooksStore } from "@app/store";
import { SliderItem } from "@app/types";
import { Text } from "../text";

const SCREEN_WIDTH = Dimensions.get("window").width;
const AUTO_SCROLL_INTERVAL = 2000;
const DEFAULT_PADDING = 16;
const SLIDER_WIDTH = SCREEN_WIDTH - 2 * DEFAULT_PADDING;

type BookSliderItemProps = {
	item: SliderItem;
	onPress?: () => void;
};

const BookSliderItem: FC<BookSliderItemProps> = ({ item, onPress }) => {
	const { allBooks } = useBooksStore();
	const bookData = allBooks.find((book) => book.id === item.book_id);
	const { name, author } = bookData ?? {};

	return (
		<TouchableOpacity
			style={styles.slide}
			activeOpacity={0.8}
			onPress={onPress}
		>
			<Image source={{ uri: item.cover }} style={styles.image} />
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
	const flatListRef = useRef<FlatList<SliderItem>>(null);
	const [currentIndex, setCurrentIndex] = useState<number>(1);
	const { sliderBooks } = useBooksStore();

	const infiniteData = useMemo(
		() => [
			sliderBooks[sliderBooks.length - 1],
			...sliderBooks,
			sliderBooks[0],
		],
		[sliderBooks]
	);

	const goToNextSlide = useCallback(() => {
		let nextIndex = currentIndex + 1;
		flatListRef.current?.scrollToIndex({
			index: nextIndex,
			animated: true,
		});
		setCurrentIndex(nextIndex);
	}, [currentIndex]);

	const handleRenderItem = ({ item }: ListRenderItemInfo<SliderItem>) => {
		const handleItemPress = () => {
			router.navigate({
				pathname: "/book-details/[bookId]",
				params: { bookId: item.book_id },
			});
		};

		return <BookSliderItem item={item} onPress={handleItemPress} />;
	};

	const handleScrollEnd = (event: any) => {
		let index = Math.round(
			event.nativeEvent.contentOffset.x / SLIDER_WIDTH
		);
		setCurrentIndex(index);

		if (index === infiniteData.length - 1) {
			flatListRef.current?.scrollToIndex({ index: 1, animated: false });
			setCurrentIndex(1);
		}

		if (index === 0) {
			flatListRef.current?.scrollToIndex({
				index: infiniteData.length - 2,
				animated: false,
			});
			setCurrentIndex(infiniteData.length - 2);
		}
	};

	const activeIndex =
		(currentIndex - 1 + sliderBooks.length) % sliderBooks.length;

	useEffect(() => {
		const interval = setInterval(() => {
			goToNextSlide();
		}, AUTO_SCROLL_INTERVAL);

		return () => clearInterval(interval);
	}, [goToNextSlide]);

	return (
		<View style={styles.container}>
			<FlatList
				ref={flatListRef}
				data={infiniteData}
				horizontal
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				keyExtractor={(_, index) => index.toString()}
				renderItem={handleRenderItem}
				initialScrollIndex={1}
				getItemLayout={(_, index) => ({
					length: SLIDER_WIDTH,
					offset: SLIDER_WIDTH * index,
					index,
				})}
				onMomentumScrollEnd={handleScrollEnd}
				scrollEventThrottle={16}
			/>

			<View style={styles.progressContainer}>
				{sliderBooks.map((_, index) => (
					<Animated.View key={index} style={[styles.dot]}>
						{activeIndex === index ? (
							<Animated.View
								entering={ZoomIn}
								exiting={ZoomOut}
								style={styles.activeDot}
							/>
						) : null}
					</Animated.View>
				))}
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		position: "relative",
		paddingHorizontal: DEFAULT_PADDING,
	},
	slide: {
		width: SLIDER_WIDTH,
		height: 200,
		justifyContent: "center",
		alignItems: "center",
	},
	image: {
		width: "100%",
		height: "100%",
		borderRadius: 10,
		resizeMode: "cover",
	},
	progressContainer: {
		position: "absolute",
		bottom: 12,
		width: SCREEN_WIDTH,
		flexDirection: "row",
		justifyContent: "center",
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: PALETTE.carbon50,
		marginHorizontal: 5,
		overflow: "hidden",
	},
	activeDot: {
		...StyleSheet.absoluteFillObject,
		borderRadius: 4,
		backgroundColor: PALETTE.pink200,
	},
	cardBookInfoWrapper: {
		borderRadius: 16,
		backgroundColor: "rgba(81, 81, 81, 0.7)",
		alignItems: "center",
		justifyContent: "center",
		position: "absolute",
		maxWidth: "80%",
		bottom: 30,
		left: 16,
		padding: 8,
	},
	bookNameText: {
		flex: 1,
	},
});

export { BooksCarousel };
