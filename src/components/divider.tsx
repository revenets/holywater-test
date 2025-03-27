import { type FC } from 'react';
import { View } from 'react-native';

const DEFAULT_SIZE = 14;

type DividerProps = {
	size?: number;
    isVertical?: boolean;
}

const Divider: FC<DividerProps> = ({ size = DEFAULT_SIZE, isVertical = false }) => {
	const style: View['props']['style'] = { [!isVertical ? 'paddingTop' : 'paddingRight']: size };

	return <View style={style} />;
};

export { Divider };