import { View, Text, TouchableOpacity } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useState } from 'react'
import { router } from 'expo-router'
import React from 'react'
import Storage from 'expo-sqlite/kv-store'

export default function OnboardingScreen() {
    const [value, setValue] = useState('')

    const handleChange = (text: string) => {
        const numericText = text.replace(/[^0-9]/g, '')
        setValue(numericText)
    }
    function handleSubmit() {
        Storage.setItem('monthlyIncome', value)
        console.log('Monthly income saved:', value)
        router.navigate('/bills')
    }
    return (
        <View className="flex-1 justify-center items-center bg-orange-100">
            <Text className="text-center mb-4 text-lg">
                Enter your expected monthly Income
            </Text>

            {/* Wrapper with currency symbol and input side-by-side */}
            <View className="flex-row items-center border border-gray-300 rounded-md bg-white w-56 h-12 px-2">
                <Text className="text-lg mr-2 text-gray-700">₹</Text>
                <TextInput
                    value={value}
                    onChangeText={handleChange}
                    keyboardType="numeric"
                    placeholder="0"
                    mode="flat"
                    style={{
                        flex: 1,
                        height: '100%',
                        backgroundColor: 'transparent',
                    }}
                    contentStyle={{ textAlignVertical: 'center' }}
                />
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
        </View>
    )
}
