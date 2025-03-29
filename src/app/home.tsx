import { useCallback, useMemo } from "react";
import {
	FlatList,
	SectionList,
	type ListRenderItemInfo,
	View,
	StyleSheet,
	SectionListData,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { useRouter } from "expo-router";

import { Divider, Text } from "@app/components";
import { BooksCarousel, BooksListItem } from "@app/components/home-screen";
import { getBooksIdsGroupedByGenre } from "@app/helpers";
import { PALETTE } from "@app/enums";
import { useBooksStore } from "@app/store";

type SectionAuxData = {
	title: string;
};

export default function HomeScreen() {
	const { allBooks } = useBooksStore();
	const booksIds = getBooksIdsGroupedByGenre(allBooks);
	const router = useRouter();

	const sections = useMemo(() => {
		return Object.entries(booksIds)
			.map(([key, value]) => ({
				title: key,
				data: [value],
			}))
			.filter(({ data }) => Boolean(data.length));
	}, [booksIds]);

	const handleListItemPress = useCallback(
		(bookId: number) => () => {
			router.navigate({
				pathname: "/book-details/[bookId]",
				params: { bookId },
			});
		},
		[router]
	);

	const renderHorizontalItemSeparator = () => <Divider isVertical />;

	const renderHorizontalListItem = useCallback(
		({ item }: ListRenderItemInfo<number>) => (
			<BooksListItem
				key={item}
				bookId={item}
				onPress={handleListItemPress(item)}
			/>
		),
		[handleListItemPress]
	);

	const renderSectionItem = ({ item }: ListRenderItemInfo<number[]>) => {
		return (
			<FlatList
				data={item}
				renderItem={renderHorizontalListItem}
				ItemSeparatorComponent={renderHorizontalItemSeparator}
				keyExtractor={(item) => item.toString()}
				horizontal
				showsHorizontalScrollIndicator={false}
				scrollEventThrottle={16}
				contentContainerStyle={styles.horizontalList}
			/>
		);
	};

	const renderSectionHeader = ({
		section,
	}: {
		section: SectionListData<number[], SectionAuxData>;
	}) => {
		return (
			<Text
				preset="heading"
				color={PALETTE.white}
				style={styles.sectionHeader}
			>
				{section.title}
			</Text>
		);
	};

	const renderEmptyListPlaceholder = () => {
		return (
			<Text
				preset="heading"
				color={PALETTE.carbon100}
				style={styles.placeholderText}
			>
				No books available
			</Text>
		);
	};

	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<BooksCarousel />
			<SectionList<number[], SectionAuxData>
				sections={sections}
				renderItem={renderSectionItem}
				renderSectionHeader={renderSectionHeader}
				ListEmptyComponent={renderEmptyListPlaceholder}
				SectionSeparatorComponent={Divider}
				stickySectionHeadersEnabled={false}
				showsVerticalScrollIndicator={false}
			/>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingVertical: 20,
		rowGap: 40,
	},
	sectionHeader: {
		marginTop: 10,
		marginLeft: 16,
	},
	placeholderText: {
		marginVertical: 30,
	},
	horizontalList: {
		paddingHorizontal: 16,
	},
});
