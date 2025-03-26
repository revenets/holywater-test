import { FC } from "react";
import { StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";

import { Text } from "./text";
import { FONT_FAMILY, PALETTE } from "@app/constants/constants";

type ButtonProps = TouchableOpacityProps & {
    title: string;
}

const Button: FC<ButtonProps> = ({ title, onPress, style: stylesOverride, ...props }) => {
    const combinedStyles: TouchableOpacityProps['style'] = [styles.container, stylesOverride];

    return (
        <TouchableOpacity onPress={onPress} style={combinedStyles} {...props}>
            <Text color={PALETTE.white} size="md" fontFamily={FONT_FAMILY.Nunito700}>{title}</Text>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: PALETTE.pink100,
        padding: 16,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export { Button };
