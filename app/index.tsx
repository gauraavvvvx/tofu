import { Text, View } from "react-native";
import "../global.css";
import { Link } from "expo-router";

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Link href={"/onboarding"}>
                go to onboarding
            </Link>
            <Text className="text-xl">Edit app/index.tsx to edit this screen.</Text>
        </View>
    );
}
