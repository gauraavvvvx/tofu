import { Text, View } from 'react-native'
import '../global.css'
import { Link, useRouter } from 'expo-router'
import { Button } from 'react-native-paper'
import React from 'react'

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
                    mode="contained"
                    onPress={() =>
                        router.navigate('/(onboarding)/personal_details')
                    }
                    contentStyle={{ paddingVertical: 8 }}
                    labelStyle={{ fontWeight: 'bold' }}
                    style={{ backgroundColor: '#f97316', borderRadius: 8 }}
                >
                    Get Started
                </Button>
            </View>
        </View>
    )
}
