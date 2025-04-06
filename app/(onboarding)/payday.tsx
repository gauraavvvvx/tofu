import React, { useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Storage } from 'expo-sqlite/kv-store'
import { useRouter } from 'expo-router'
import * as Updates from 'expo-updates'

export default function Payday() {
    const [payday, setPayday] = useState<Date | null>(null)
    const [error, setError] = useState('')
    const [showDatePicker, setShowDatePicker] = useState(false)
    const router = useRouter()
    const handleSubmit = async () => {
        if (!payday) {
            setError('Please select a payday.')
            return
        }

        try {
            // Store the payday in key-value storage
            await Storage.setItem('payday', payday.toISOString())
            console.log('Payday saved:', payday.toISOString())

            // Navigate to the next onboarding screen
            await Updates.reloadAsync()
            // Replace with the actual next route
        } catch (err) {
            console.error('Error saving payday:', err)
            setError('Failed to save payday. Please try again.')
        }
    }

    const handleDateChange = (_: any, selectedDate?: Date) => {
        if (selectedDate) {
            setPayday(selectedDate)
            setError('')
        }
        setShowDatePicker(false)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                className="flex-1 bg-orange-50 px-6 pt-12"
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                {/* Header */}
                <View className="items-center mb-6">
                    <Text className="text-3xl font-bold text-gray-800 mb-2">
                        Payday
                    </Text>
                    <Text className="text-gray-600 text-center">
                        Select the date of the month you get paid
                    </Text>
                </View>

                {/* Date Picker */}
                <View className="w-full max-w-md bg-white rounded-2xl p-5 shadow-md self-center">
                    <Text className="text-lg font-medium text-gray-800 mb-4">
                        Select Payday
                    </Text>
                    <TouchableOpacity
                        onPress={() => setShowDatePicker(true)}
                        className="border border-gray-300 rounded-lg h-12 px-4 justify-center"
                    >
                        <Text
                            className={`text-base ${
                                payday ? 'text-gray-800' : 'text-gray-400'
                            }`}
                        >
                            {payday
                                ? payday.toLocaleDateString('en-GB', {
                                      day: 'numeric',
                                      month: 'long',
                                  })
                                : 'Select a date'}
                        </Text>
                    </TouchableOpacity>
                    {error ? (
                        <Text className="text-red-500 text-sm mt-2">
                            {error}
                        </Text>
                    ) : null}
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
                        value={payday || new Date()}
                        mode="date"
                        display="default"
                        onChange={handleDateChange}
                    />
                )}
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}
