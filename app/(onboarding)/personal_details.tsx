import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, Platform } from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { router } from 'expo-router'
import * as SQLite from 'expo-sqlite'

export default function PersonalDetails() {
    const [name, setName] = useState('')
    const [dob, setDob] = useState(new Date())
    const [phone, setPhone] = useState('')
    const [showDatePicker, setShowDatePicker] = useState(false)

    const onDateChange = (event: any, selectedDate?: Date) => {
        if (selectedDate) {
            setDob(selectedDate)
        }
        setShowDatePicker(false)
    }

    const handleSubmit = async () => {
        console.log('Submitting user details...')
        const db = await SQLite.openDatabaseAsync('./db/user.db')
        console.log('Database opened successfully')
        await db.execAsync(`
			PRAGMA journal_mode = WAL;
			CREATE TABLE IF NOT EXISTS user (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				name TEXT NOT NULL,
				phone TEXT NOT NULL,
				dateOfBirth TEXT NOT NULL
			);
		`)
        console.log('Table created successfully')
        console.log(`inserting: ${name}, ${phone}, ${dob.toISOString()}`)

        const result = await db.runAsync(
            `
			INSERT INTO user (name, phone, dateOfBirth)
			VALUES (?, ?, ?);
		`,
            [name, phone, dob.toISOString()]
        )
        console.log('User details inserted successfully')
        console.log(result)
        await db.closeAsync()

        console.log(`User details saved: ${name}, ${phone}, ${dob.toISOString()}
					`)
        router.navigate('/(onboarding)/monthly_income') // or router.push('/next')
    }

    return (
        <View className="flex-1 bg-orange-50 px-6 py-10 justify-center">
            {/* Header */}
            <View className="mb-10 items-center">
                <Text className="text-3xl font-extrabold text-gray-900 mb-1">
                    Personal Details
                </Text>
                <Text className="text-gray-600 text-base text-center px-4">
                    We’d love to get to know you better!
                </Text>
            </View>

            {/* Input Group */}
            <View className="space-y-6">
                {/* Full Name */}
                <View>
                    <Text className="text-gray-800 mb-2 font-medium">
                        Full Name
                    </Text>
                    <View className="bg-white border border-gray-300 rounded-xl px-4 shadow-sm">
                        <TextInput
                            className="h-12 text-gray-700"
                            placeholder="John Doe"
                            placeholderTextColor="#9CA3AF"
                            value={name}
                            onChangeText={setName}
                        />
                    </View>
                </View>

                {/* Date of Birth */}
                <View>
                    <Text className="text-gray-800 mb-2 font-medium">
                        Date of Birth
                    </Text>
                    <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        className="bg-white border border-gray-300 rounded-xl px-4 h-12 justify-center shadow-sm"
                    >
                        <Text className="text-gray-700">
                            {dob.toLocaleDateString()}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Phone Number */}
                <View>
                    <Text className="text-gray-800 mb-2 font-medium">
                        Phone Number
                    </Text>
                    <View className="bg-white border border-gray-300 rounded-xl px-4 shadow-sm">
                        <TextInput
                            className="h-12 text-gray-700"
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
                className="bg-orange-500 mt-10 py-4 rounded-xl shadow-md active:bg-orange-600"
            >
                <Text className="text-white text-center font-semibold text-lg tracking-wide">
                    Save & Continue
                </Text>
            </TouchableOpacity>

            {/* Date Picker Modal */}
            {showDatePicker && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={dob}
                    mode="date"
                    display="default"
                    onChange={onDateChange}
                />
            )}
        </View>
    )
}
