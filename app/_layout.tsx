import { Stack } from 'expo-router'
import '../global.css'
import { verifyInstallation } from "nativewind";
verifyInstallation()
export default function RootLayout() {
	return <Stack screenOptions={{ headerShown: false }} />
}
