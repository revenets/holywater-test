import { useRouter } from "expo-router";
import { Text } from "react-native";

export default function LoaderScreen() {
    return (
        <>
            <Text style={{ marginTop: 100, fontFamily: "GeorgiaItalic_700" }}>Loading...</Text>
            <Text style={{ marginTop: 100, fontFamily: "NunitoSans_700" }}>Test Nunito 700</Text>
            <Text style={{ marginTop: 100, fontFamily: "NunitoSans_600" }}>Test nunito 600</Text>
        </>
    )
}