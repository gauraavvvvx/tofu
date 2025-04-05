import { Text, View } from 'react-native'
import '../global.css'
import { Link } from 'expo-router'

export default function Index() {
    return (
        <View
            style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Link href={'/onboarding'}>Onboarding</Link>
            <Link href={'/goals'} className="text-4xl">
                Goals
            </Link>
        </View>
    )
}
