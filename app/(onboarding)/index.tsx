import { View, Text, Button } from 'react-native'
import React from 'react'
import { useRouter } from 'expo-router'
export default function Index() {
    const router = useRouter()
    return (
        <View className="flex-1 justify-center items-center bg-orange-50 px-4 rounded-2xl">
            <View className="w-full max-w-md p-6 bg-white rounded-2xl shadow-md border border-gray-200">
                <View className="items-center mb-6">
                    <Text className="text-2xl font-extrabold text-orange-600 mt-6">
                        Hello, Welcome To T.O.F.U
                    </Text>
                    <Text className="text-base text-gray-600 text-center">
                        Before you can get started, we need to know more about
                        you.
                    </Text>
                </View>
                <Button
                    title="Get Started"
                    onPress={() =>
                        router.navigate('/(onboarding)/personal_details')
                    }
                    color="#f97316"
                />
            </View>
        </View>
    )
}
