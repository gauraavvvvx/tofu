import { Button, Text, View } from "react-native";
import "../global.css";
import { Link, useRouter } from "expo-router";

export default function Index() {
  const router = useRouter();
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >

      <Button onPress={() => {router.navigate("/payments/scanner")}} title="Pay" />

    </View>
  );
}
