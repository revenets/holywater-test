import { useSafeAreaInsets, type Edge } from "react-native-safe-area-context";
import type { FlexStyle } from "react-native";

type ExtendedEdge = Edge | "start" | "end";

const propertySuffixMap = {
	top: "Top",
	bottom: "Bottom",
	left: "Start",
	right: "End",
	start: "Start",
	end: "End",
};

const edgeInsetMap: Record<"start" | "end", Edge> = {
	start: "left",
	end: "right",
};

type UseSafeAreaStyle = Pick<
	FlexStyle,
	| "marginBottom"
	| "marginEnd"
	| "marginStart"
	| "marginTop"
	| "paddingBottom"
	| "paddingEnd"
	| "paddingStart"
	| "paddingTop"
>;

function useSafeAreaStyle(
	safeAreaEdges: ExtendedEdge[] = [],
	property: "padding" | "margin" = "padding"
): UseSafeAreaStyle {
	const insets = useSafeAreaInsets();

	return safeAreaEdges.reduce<UseSafeAreaStyle>((acc, e) => {
		let value: Edge;

		if (e === "start" || e === "end") {
			value = edgeInsetMap[e];
		} else {
			value = e;
		}

		return {
			...acc,
			[`${property}${propertySuffixMap[e]}`]: insets[value],
		};
	}, {});
}

export { useSafeAreaStyle };
