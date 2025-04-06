import React, { useState } from 'react'
import {
	View,
	Text,
	TextInput,
	TouchableOpacity,
	Platform,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { router } from 'expo-router'
import * as SQLite from 'expo-sqlite'
import { CalendarDays, User, Phone } from 'lucide-react-native'

export default function PersonalDetails() {
	const [name, setName] = useState('')
	const [dob, setDob] = useState(new Date())
	const [phone, setPhone] = useState('')
	const [showDatePicker, setShowDatePicker] = useState(false)

	const onDateChange = (_: any, selectedDate?: Date) => {
		if (selectedDate) setDob(selectedDate)
		setShowDatePicker(false)
	}

	const handleSubmit = async () => {
		const db = await SQLite.openDatabaseAsync('app.db')
		await db.execAsync(`
			PRAGMA journal_mode = WAL;
			CREATE TABLE IF NOT EXISTS user (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				name TEXT NOT NULL,
				phone TEXT NOT NULL,
				dateOfBirth TEXT NOT NULL
			);
		`)
		await db.runAsync(
			`INSERT INTO user (name, phone, dateOfBirth) VALUES (?, ?, ?);`,
			[name, phone, dob.toISOString()]
		)
		await db.closeAsync()
		router.navigate('/(onboarding)/monthly_income')
	}

	return (
		<View className="flex-1 bg-[#050f10] px-6 py-10 justify-center">
			{/* Header */}
			<View className="mb-10 items-center">
				<Text className="text-3xl font-extrabold text-[#77cc6d] mb-1">
					Personal Details
				</Text>
				<Text className="text-gray-400 text-base text-center px-4">
					We’d love to get to know you better!
				</Text>
			</View>

			{/* Input Fields */}
			<View className="space-y-6">
				{/* Full Name */}
				<View>
					<Text className="text-gray-300 mb-2 font-medium">
						Full Name
					</Text>
					<View className="flex-row items-center bg-white rounded-xl px-4 shadow-sm border border-gray-200">
						<User size={20} color="#77cc6d" className="mr-2" />
						<TextInput
							className="h-12 flex-1 text-gray-700"
							placeholder="John Doe"
							placeholderTextColor="#9CA3AF"
							value={name}
							onChangeText={setName}
						/>
					</View>
				</View>

				{/* Date of Birth */}
				<View>
					<Text className="text-gray-300 mb-2 font-medium">
						Date of Birth
					</Text>
					<TouchableOpacity
						onPress={() => setShowDatePicker(true)}
						className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 h-12 shadow-sm"
					>
						<CalendarDays size={20} color="#77cc6d" />
						<Text className="text-gray-700 ml-3">
							{dob.toLocaleDateString()}
						</Text>
					</TouchableOpacity>
				</View>

				{/* Phone Number */}
				<View>
					<Text className="text-gray-300 mb-2 font-medium">
						Phone Number
					</Text>
					<View className="flex-row items-center bg-white border border-gray-200 rounded-xl px-4 shadow-sm">
						<Phone size={20} color="#77cc6d" />
						<TextInput
							className="h-12 flex-1 text-gray-700 ml-3"
							placeholder="e.g. +1 234 567 8901"
							placeholderTextColor="#9CA3AF"
							value={phone}
							onChangeText={setPhone}
							keyboardType="phone-pad"
						/>
					</View>
				</View>
			</View>

			{/* Submit Button */}
			<TouchableOpacity
				onPress={handleSubmit}
				className="bg-[#77cc6d] mt-10 py-4 rounded-xl shadow-md active:bg-green-600"
			>
				<Text className="text-white text-center font-semibold text-lg tracking-wide">
					Save & Continue
				</Text>
			</TouchableOpacity>

			{/* Date Picker Modal */}
			{showDatePicker && (
				<DateTimePicker
					value={dob}
					mode="date"
					display={Platform.OS === 'ios' ? 'spinner' : 'default'}
					onChange={onDateChange}
					maximumDate={new Date()}
				/>
			)}
		</View>
	)
}
