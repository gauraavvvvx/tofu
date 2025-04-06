import React, { useState } from 'react'
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	KeyboardAvoidingView,
	Platform,
	Keyboard,
	TouchableWithoutFeedback,
} from 'react-native'
import { Storage } from 'expo-sqlite/kv-store'
import { useRouter } from 'expo-router'
import * as Animatable from 'react-native-animatable'
import { DollarSign } from 'lucide-react-native'

export default function AccountBalance() {
	const [balance, setBalance] = useState('')
	const [error, setError] = useState('')
	const router = useRouter()

	const handleSubmit = async () => {
		if (!balance.trim() || isNaN(Number(balance))) {
			setError('Please enter a valid numeric balance.')
			return
		}

		try {
			await Storage.setItem('accountBalance', balance)
			console.log('Account balance saved:', balance)
			router.push('/(onboarding)/payday')
		} catch (err) {
			console.error('Error saving account balance:', err)
			setError('Failed to save account balance. Please try again.')
		}
	}

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<KeyboardAvoidingView
				className="flex-1 bg-[#050f10] px-6 pt-12"
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
			>
				<Animatable.View
					animation="fadeInDown"
					duration={600}
					className="items-center mb-6"
				>
					<DollarSign size={40} color="#77cc6d" />
					<Text className="text-3xl font-bold text-white mt-2">
						Account Balance
					</Text>
					<Text className="text-gray-400 text-center mt-1">
						Enter your current account balance to get started
					</Text>
				</Animatable.View>

				<Animatable.View
					animation="fadeInUp"
					delay={200}
					className="w-full max-w-md bg-white rounded-2xl p-5 shadow-md self-center"
				>
					<Text className="text-lg font-medium text-gray-800 mb-4">
						Current Balance
					</Text>
					<TextInput
						className="border border-gray-300 rounded-lg px-4 h-12 text-gray-800"
						placeholder="Enter your balance (e.g., 5000)"
						placeholderTextColor="#9CA3AF"
						keyboardType="numeric"
						value={balance}
						onChangeText={(text) => {
							setBalance(text)
							setError('')
						}}
					/>
					{error ? (
						<Text className="text-red-500 text-sm mt-2">
							{error}
						</Text>
					) : null}
				</Animatable.View>

				<TouchableOpacity
					onPress={handleSubmit}
					className="bg-[#77cc6d] mt-10 py-4 rounded-xl shadow-md active:bg-green-600"
				>
					<Text className="text-white text-center font-semibold text-lg tracking-wide">
						Save & Continue
					</Text>
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</TouchableWithoutFeedback>
	)
}
