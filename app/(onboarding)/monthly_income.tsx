import { View, Text } from 'react-native'
import { TextInput } from 'react-native-paper'
import { useState } from 'react'

export default function OnboardingScreen() {
    const [value, setValue] = useState('')

    const handleChange = (text) => {
        const numericText = text.replace(/[^0-9]/g, '')
        setValue(numericText)
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
        </View>
    )
}
