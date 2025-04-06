import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect } from 'react'
import { useRouter } from 'expo-router'
import { Storage } from 'expo-sqlite/kv-store'
import { Sparkles } from 'lucide-react-native'

export default function Index() {
	const router = useRouter()

	useEffect(() => {
		Storage.setItem('savings', '0')
		Storage.setItem('monthlyIncome', '0')
	}, [])

	return (
		<View className="flex-1 justify-center items-center bg-[#050f10] px-4">
			<View className="w-full max-w-md p-6 bg-white rounded-2xl shadow-lg border border-[#eee]">
				<View className="items-center mb-6">
					<Text className="text-2xl font-extrabold text-[#77cc6d] mt-4">
						Welcome to T.O.F.U!
					</Text>
					<Text className="text-base text-gray-700 text-center mt-2">
						Let's get to know you a bit before we start saving smartly.
					</Text>
				</View>

				<TouchableOpacity
					onPress={() => router.navigate('/(onboarding)/personal_details')}
					className="bg-[#77cc6d] py-3 px-6 rounded-xl mt-4"
				>
					<Text className="text-white text-center font-semibold text-lg">
						Get Started
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	)
}
