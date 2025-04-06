import { Text, View } from 'react-native'
import '../global.css'
import { useRouter } from 'expo-router'
import { Button } from 'react-native-paper'
import React from 'react'

export default function Index() {
    const router = useRouter()

    return (
        <View className="flex-1 justify-center items-center bg-[#050f10] px-4">
            <View className="w-full max-w-md p-6 bg-[#0c1a1c] rounded-2xl shadow-lg border border-[#1a2b2c]">
                <View className="items-center mb-6">
                    <Text className="text-3xl font-extrabold text-[#77cc6d] mt-4 text-center">
                        Welcome to T.O.F.U
                    </Text>
                    <Text className="text-base text-[#cccccc] text-center mt-2">
                        Before you can get started, we need to know more about
                        you.
                    </Text>
                </View>

                <Button
                    mode="contained"
                    onPress={() =>
                        router.navigate('/(onboarding)/personal_details')
                    }
                    contentStyle={{ paddingVertical: 10 }}
                    labelStyle={{ fontWeight: 'bold', fontSize: 16 }}
                    style={{ backgroundColor: '#77cc6d', borderRadius: 10 }}
                >
                    Get Started
                </Button>
            </View>
        </View>
    )
}
