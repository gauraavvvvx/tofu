import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
    StatusBar,
    SafeAreaView,
    KeyboardAvoidingView,
    ScrollView,
} from 'react-native'
import DateTimePicker from '@react-native-community/datetimepicker'
import { router } from 'expo-router'
import { Ionicons } from '@expo/vector-icons'

export default function PersonalDetails() {
    const [name, setName] = useState('')
    const [dob, setDob] = useState(new Date())
    const [phone, setPhone] = useState('')
    const [showDatePicker, setShowDatePicker] = useState(false)

    const onDateChange = (event: any, selectedDate?: Date) => {
        if (selectedDate) {
            setDob(selectedDate)
        }
        setShowDatePicker(Platform.OS === 'ios' ? true : false)
    }

    const handleSubmit = () => {
        console.log({ name, dob, phone })
        router.navigate('/(onboarding)/monthly_income')
    }

    const formatBirthDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0')
        const month = (date.getMonth() + 1).toString().padStart(2, '0')
        const year = date.getFullYear()
        return `${day}/${month}/${year}`
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: '#050f10' }}>
            <StatusBar barStyle="light-content" backgroundColor="#050f10" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={{ flex: 1 }}
            >
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <View
                        style={{
                            flex: 1,
                            padding: 24,
                            justifyContent: 'center',
                        }}
                    >
                        {/* Header */}
                        <View
                            style={{ marginBottom: 40, alignItems: 'center' }}
                        >
                            <Text
                                style={{
                                    fontSize: 28,
                                    fontWeight: '800',
                                    color: '#77cc6d',
                                    marginBottom: 8,
                                }}
                            >
                                Personal Details
                            </Text>
                            <Text
                                style={{
                                    color: '#a0a0a0',
                                    fontSize: 16,
                                    textAlign: 'center',
                                    paddingHorizontal: 16,
                                }}
                            >
                                We'd love to get to know you better!
                            </Text>
                        </View>

                        {/* Input Group */}
                        <View style={{ marginBottom: 32, gap: 20 }}>
                            {/* Full Name */}
                            <View>
                                <Text
                                    style={{
                                        color: '#ffffff',
                                        marginBottom: 8,
                                        fontWeight: '500',
                                    }}
                                >
                                    Full Name
                                </Text>
                                <View
                                    style={{
                                        backgroundColor:
                                            'rgba(255, 255, 255, 0.05)',
                                        borderRadius: 12,
                                        borderWidth: 1,
                                        borderColor: 'rgba(119, 204, 109, 0.2)',
                                        paddingHorizontal: 16,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 1 },
                                        shadowOpacity: 0.2,
                                        shadowRadius: 1.41,
                                        elevation: 2,
                                    }}
                                >
                                    <TextInput
                                        style={{ height: 50, color: '#ffffff' }}
                                        placeholder="John Doe"
                                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
                                        value={name}
                                        onChangeText={setName}
                                    />
                                </View>
                            </View>

                            {/* Date of Birth */}
                            <View>
                                <Text
                                    style={{
                                        color: '#ffffff',
                                        marginBottom: 8,
                                        fontWeight: '500',
                                    }}
                                >
                                    Date of Birth
                                </Text>
                                <TouchableOpacity
                                    onPress={() => setShowDatePicker(true)}
                                    style={{
                                        backgroundColor:
                                            'rgba(255, 255, 255, 0.05)',
                                        borderRadius: 12,
                                        borderWidth: 1,
                                        borderColor: 'rgba(119, 204, 109, 0.2)',
                                        paddingHorizontal: 16,
                                        height: 50,
                                        flexDirection: 'row',
                                        alignItems: 'center',
                                        justifyContent: 'space-between',
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 1 },
                                        shadowOpacity: 0.2,
                                        shadowRadius: 1.41,
                                        elevation: 2,
                                    }}
                                >
                                    <Text style={{ color: '#ffffff' }}>
                                        {formatBirthDate(dob)}
                                    </Text>
                                    <Ionicons
                                        name="calendar-outline"
                                        size={20}
                                        color="#77cc6d"
                                    />
                                </TouchableOpacity>
                            </View>

                            {/* Phone Number */}
                            <View>
                                <Text
                                    style={{
                                        color: '#ffffff',
                                        marginBottom: 8,
                                        fontWeight: '500',
                                    }}
                                >
                                    Phone Number
                                </Text>
                                <View
                                    style={{
                                        backgroundColor:
                                            'rgba(255, 255, 255, 0.05)',
                                        borderRadius: 12,
                                        borderWidth: 1,
                                        borderColor: 'rgba(119, 204, 109, 0.2)',
                                        paddingHorizontal: 16,
                                        shadowColor: '#000',
                                        shadowOffset: { width: 0, height: 1 },
                                        shadowOpacity: 0.2,
                                        shadowRadius: 1.41,
                                        elevation: 2,
                                    }}
                                >
                                    <TextInput
                                        style={{ height: 50, color: '#ffffff' }}
                                        placeholder="e.g. +1 234 567 8901"
                                        placeholderTextColor="rgba(255, 255, 255, 0.5)"
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
                            style={{
                                backgroundColor: '#77cc6d',
                                padding: 16,
                                borderRadius: 12,
                                shadowColor: '#77cc6d',
                                shadowOffset: { width: 0, height: 2 },
                                shadowOpacity: 0.3,
                                shadowRadius: 3,
                                elevation: 5,
                                marginVertical: 8,
                            }}
                        >
                            <Text
                                style={{
                                    color: '#050f10',
                                    textAlign: 'center',
                                    fontWeight: '600',
                                    fontSize: 18,
                                }}
                            >
                                Save & Continue
                            </Text>
                        </TouchableOpacity>

                        {/* Date Picker Modal */}
                        {showDatePicker && (
                            <DateTimePicker
                                testID="dateTimePicker"
                                value={dob}
                                mode="date"
                                display={
                                    Platform.OS === 'ios'
                                        ? 'spinner'
                                        : 'default'
                                }
                                onChange={onDateChange}
                                themeVariant="dark"
                                textColor="#ffffff"
                                style={{
                                    backgroundColor:
                                        Platform.OS === 'ios'
                                            ? '#050f10'
                                            : undefined,
                                }}
                            />
                        )}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}
