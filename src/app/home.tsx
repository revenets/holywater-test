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

import { Divider, Text } from "@app/components";
import { BooksCarousel, BooksListItem } from "@app/components/home-screen";
import { selectBooksIdsGroupedByGenre } from "@app/selectors";
import { PALETTE } from "@app/enums";

type SectionAuxData = {
	title: string;
};

export default function HomeScreen() {
	const booksIds = selectBooksIdsGroupedByGenre();

	const sections = useMemo(() => {
		return Object.entries(booksIds).map(([key, value]) => ({
			title: key,
			data: [value],
		}));
	}, [booksIds]);

	const renderHorizontalItemSeparator = () => <Divider isVertical />;

	const renderHorizontalListItem = useCallback(
		({ item }: ListRenderItemInfo<number>) => (
			<BooksListItem key={item} bookId={item} />
		),
		[]
	);

	const renderSectionItem = ({ item }: ListRenderItemInfo<number[]>) => {
		return (
			<FlatList
				data={item}
				renderItem={renderHorizontalListItem}
				ItemSeparatorComponent={renderHorizontalItemSeparator}
				showsHorizontalScrollIndicator={false}
				horizontal
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

	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<BooksCarousel />
			<SectionList<number[], SectionAuxData>
				sections={sections}
				renderItem={renderSectionItem}
				renderSectionHeader={renderSectionHeader}
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
		paddingHorizontal: 16,
		paddingVertical: 20,
		rowGap: 40,
	},
	sectionHeader: {
		marginTop: 10,
	},
});
