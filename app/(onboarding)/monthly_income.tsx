import { View, Text, TouchableOpacity } from 'react-native'
import { TextInput } from 'react-native-paper'
import { useState } from 'react'
import { router } from 'expo-router'
import React from 'react'

export default function OnboardingScreen() {
    const [value, setValue] = useState('')
    const [focused, setFocused] = useState(false)

    const handleChange = (text: string) => {
        const numericText = text.replace(/[^0-9]/g, '')
        setValue(numericText)
    }

    const handleSubmit = () => {
        router.navigate('/bills')
    }

    return (
        <View className="flex-1 justify-center items-center bg-[#050f10] px-4">
            <Text className="text-center mb-6 text-xl font-bold text-[#77cc6d]">
                What's your monthly income?
            </Text>

            {/* Input Wrapper */}
            <View
                className={`flex-row items-center rounded-xl w-64 h-14 px-4 ${
                    focused ? 'border-[#77cc6d]' : 'border-[#1a2b2c]'
                }`}
                style={{
                    borderWidth: 1.5,
                    backgroundColor: '#ffffff',
                }}
            >
                <Text className="text-xl mr-2 text-[#77cc6d]">₹</Text>
                <TextInput
                    value={value}
                    onChangeText={handleChange}
                    onFocus={() => setFocused(true)}
                    onBlur={() => setFocused(false)}
                    keyboardType="numeric"
                    placeholder="0"
                    placeholderTextColor="#999999"
                    mode="flat"
                    style={{
                        flex: 1,
                        height: '100%',
                        color: '#ffffff',
                        backgroundColor: 'transparent',
                        fontSize: 18,
                    }}
                    underlineColor="transparent"
                    activeUnderlineColor="transparent"
                    selectionColor="#ffffff"
                />
            </View>

            {/* Submit Button */}
            <TouchableOpacity
                onPress={handleSubmit}
                className="mt-10 w-64 py-4 bg-[#77cc6d] rounded-xl shadow-lg"
            >
                <Text className="text-[#ffffff] text-center font-bold text-lg">
                    Save & Continue
                </Text>
            </TouchableOpacity>
        </View>
    )
}
