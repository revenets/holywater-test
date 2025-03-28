import { useCallback, type FC } from "react";
import {
	FlatList,
	ListRenderItemInfo,
	ScrollView,
	StyleSheet,
	View,
} from "react-native";

import { FONT_FAMILY, PALETTE } from "@app/enums";
import { selectBookById } from "@app/selectors";
import { Text } from "../text";
import { Line } from "../line";
import { Divider } from "../divider";
import { BooksListItem } from "../home-screen";
import { ScreenWrapper } from "../screen-wrapper";
import { Button } from "../button";
import { CustomLoader } from "../custom-loader";

type BookDetailsInfoContainerProps = {
	bookId: number;
	isLoading?: boolean;
	suggestedBooksIds?: number[];
};

const BookDetailsInfoContainer: FC<BookDetailsInfoContainerProps> = ({
	bookId,
	isLoading = false,
	suggestedBooksIds = [],
}) => {
	const book = selectBookById(bookId);

	const { genre, likes, quotes, views, summary } = book ?? {};

	const infoConfig = [
		{
			title: "Readers",
			value: views,
		},
		{
			title: "Likes",
			value: likes,
		},
		{
			title: "Quotes",
			value: quotes,
		},
		{
			title: "Genre",
			value: genre,
		},
	];

	const renderHorizontalItemSeparator = () => <Divider isVertical />;

	const renderHorizontalListItem = useCallback(
		({ item }: ListRenderItemInfo<number>) => (
			<BooksListItem key={item} bookId={item} bookNameColor={PALETTE.carbon400} />
		),
		[]
	);

	return (
		<ScreenWrapper
			safeAreaEdges={["bottom", "left", "right"]}
			style={{ backgroundColor: PALETTE.white }}
		>
			{isLoading ? (
				<View style={styles.loaderWrapper}>
					<CustomLoader
						indicatorColor={PALETTE.pink100}
						barColor={PALETTE.carbon50}
					/>
				</View>
			) : (
				<ScrollView
					nestedScrollEnabled={true}
					contentContainerStyle={styles.container}
				>
					<View style={styles.info}>
						{infoConfig.map(({ title, value }) => (
							<View key={title} style={styles.infoItem}>
								<Text
									size="lg"
									fontFamily={FONT_FAMILY.Nunito700}
								>
									{value}
								</Text>
								<Text size="xs" color={PALETTE.carbon100}>
									{title}
								</Text>
							</View>
						))}
					</View>
					<Line style={styles.lineSeparator} />
					<Text preset="heading" style={styles.title}>
						Summary
					</Text>
					<Text size="sm">{summary}</Text>
					<Line style={styles.lineSeparator} />
					<Text preset="heading" style={styles.title}>
						You will also like
					</Text>
					<FlatList
						data={suggestedBooksIds}
						renderItem={renderHorizontalListItem}
						ItemSeparatorComponent={renderHorizontalItemSeparator}
						showsHorizontalScrollIndicator={false}
						contentContainerStyle={styles.horizontalList}
						horizontal
					/>
					<Button title="Read now" style={styles.button} />
				</ScrollView>
			)}
		</ScreenWrapper>
	);
};

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		paddingHorizontal: 16,
	},
	info: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-around",
		columnGap: 10,
	},
	infoItem: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
		rowGap: 2,
	},
	lineSeparator: {
		marginVertical: 16,
	},
	title: {
		marginBottom: 10,
	},
	horizontalList: {
		marginBottom: 24,
	},
	button: {
		marginHorizontal: 36,
	},
	loaderWrapper: {
		flex: 1,
		alignItems: "center",
		justifyContent: "center",
	},
});

export { BookDetailsInfoContainer };
