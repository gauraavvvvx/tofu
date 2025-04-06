import { useState, useRef } from 'react'
import {
    View,
    Text,
    FlatList,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
    TouchableWithoutFeedback,
    TouchableOpacity,
} from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import DateTimePicker from '@react-native-community/datetimepicker'
import { useRouter } from 'expo-router'
import React from 'react'

export default function RecurringPayment() {
    const router = useRouter()
    const [showForm, setShowForm] = useState(false)
    const [label, setLabel] = useState('')
    const [amount, setAmount] = useState('')
    const [recurringDate, setRecurringDate] = useState<Date | null>(null)
    const [payments, setPayments] = useState<
        { id: string; label: string; amount: string; date: string }[]
    >([])
    const [error, setError] = useState('')
    const [showDatePicker, setShowDatePicker] = useState(false)
    const inputRef = useRef(null)

    const handleAmountChange = (text: string) => {
        const numericText = text.replace(/[^0-9]/g, '')
        setAmount(numericText)
    }

    const handleCreate = () => {
        if (!label.trim() || !amount.trim() || !recurringDate) {
            setError('Please fill out all fields.')
            return
        }

        const formattedDate = recurringDate.toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'long',
        })

        const newPayment = {
            id: Date.now().toString(),
            label: label.trim(),
            amount: amount.trim(),
            date: formattedDate,
        }

        setPayments((prev) => [...prev, newPayment])
        setLabel('')
        setAmount('')
        setRecurringDate(null)
        setError('')
        setShowForm(false)
    }

    const handleDateChange = (_: any, selectedDate?: Date) => {
        if (selectedDate) {
            setRecurringDate(selectedDate)
        }
        setShowDatePicker(false)
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                className="flex-1 px-6 pt-12"
                style={{ backgroundColor: '#050f10' }}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View className="items-center mb-6">
                    <Text className="text-3xl font-bold text-[#77cc6d] mb-2">
                        Recurring Payments
                    </Text>
                    <Text className="text-gray-400 text-center">
                        Set up automatic bills or subscriptions
                    </Text>
                </View>

                {!showForm ? (
                    <Button
                        mode="contained"
                        onPress={() => {
                            setShowForm(true)
                            setTimeout(() => inputRef.current?.focus(), 100)
                        }}
                        className="mb-6"
                        buttonColor="#77cc6d"
                        labelStyle={{ fontWeight: 'bold', color: '#050f10' }}
                    >
                        Create Recurring Payment
                    </Button>
                ) : (
                    <View
                        className="w-full max-w-md rounded-2xl p-5 mb-8 self-center"
                        style={{ backgroundColor: '#0c1a1c' }}
                    >
                        <Text className="text-xl font-semibold text-center mb-4 text-[#77cc6d]">
                            New Recurring Payment
                        </Text>

                        <TextInput
                            ref={inputRef}
                            label="Payment Name"
                            value={label}
                            onChangeText={(text) => {
                                setLabel(text)
                                setError('')
                            }}
                            textColor="#ffffff"
                            mode="outlined"
                            theme={{
                                colors: {
                                    primary: '#77cc6d',
                                    text: '#ffffff',
                                    placeholder: '#999',
                                },
                            }}
                            style={{
                                backgroundColor: '#0c1a1c',
                                marginBottom: 16,
                            }}
                        />

                        <View
                            className="flex-row items-center border rounded-lg px-4 h-12 mb-4"
                            style={{ borderColor: '#1a2b2c' }}
                        >
                            <Text className="text-lg text-[#77cc6d] mr-2">
                                ₹
                            </Text>
                            <TextInput
                                value={amount}
                                onChangeText={handleAmountChange}
                                keyboardType="numeric"
                                placeholder="0"
                                placeholderTextColor="#999999"
                                mode="flat"
                                style={{
                                    flex: 1,
                                    height: '100%',
                                    color: '#ffffff',
                                    backgroundColor: 'transparent',
                                }}
                                textColor="#ffffff"
                                underlineColor="transparent"
                                activeUnderlineColor="transparent"
                            />
                        </View>

                        <TouchableOpacity
                            onPress={() => setShowDatePicker(true)}
                            className="border rounded-lg h-12 px-4 justify-center mb-4"
                            style={{ borderColor: '#1a2b2c' }}
                        >
                            <Text
                                className={`text-base ${recurringDate ? 'text-white' : 'text-gray-400'}`}
                            >
                                {recurringDate
                                    ? recurringDate.toLocaleDateString(
                                          'en-GB',
                                          {
                                              day: 'numeric',
                                              month: 'long',
                                          }
                                      )
                                    : 'Select recurring date'}
                            </Text>
                        </TouchableOpacity>

                        {error ? (
                            <Text className="text-[#c12121] text-sm mb-3 text-center">
                                {error}
                            </Text>
                        ) : null}

                        <View className="flex-row justify-between mt-2">
                            <Button
                                mode="outlined"
                                onPress={() => {
                                    setLabel('')
                                    setAmount('')
                                    setRecurringDate(null)
                                    setShowForm(false)
                                    setError('')
                                }}
                                textColor="#77cc6d"
                                style={{ borderColor: '#77cc6d' }}
                            >
                                Cancel
                            </Button>
                            <Button
                                mode="contained"
                                onPress={handleCreate}
                                buttonColor="#77cc6d"
                                labelStyle={{
                                    fontWeight: 'bold',
                                    color: '#050f10',
                                }}
                            >
                                Save
                            </Button>
                        </View>

                        {showDatePicker && (
                            <DateTimePicker
                                value={recurringDate || new Date()}
                                mode="date"
                                display="default"
                                onChange={handleDateChange}
                            />
                        )}
                    </View>
                )}

                {/* Display Saved Payments */}
                {payments.length > 0 ? (
                    <FlatList
                        data={payments}
                        keyExtractor={(item) => item.id}
                        className="w-full max-w-md self-center"
                        contentContainerStyle={{ paddingBottom: 40 }}
                        renderItem={({ item }) => (
                            <View
                                className="flex-row justify-between items-center px-4 py-3 mb-3 rounded-xl border"
                                style={{
                                    backgroundColor: '#0c1a1c',
                                    borderColor: '#1a2b2c',
                                }}
                            >
                                <View>
                                    <Text className="text-base font-semibold text-white">
                                        {item.label}
                                    </Text>
                                    <Text className="text-sm text-gray-400">
                                        {item.date}
                                    </Text>
                                </View>
                                <Text className="text-base text-[#77cc6d] font-bold">
                                    ₹{item.amount}
                                </Text>
                            </View>
                        )}
                    />
                ) : (
                    <View className="items-center mt-10">
                        <Text className="text-gray-500 text-sm">
                            No recurring payments yet.
                        </Text>
                    </View>
                )}

                {/* Back Navigation */}
                <View className="mt-10 mb-6 items-center">
                    <Button
                        mode="text"
                        onPress={() => router.navigate('/home-page')}
                        labelStyle={{ color: '#77cc6d' }}
                    >
                        ← Back to Home
                    </Button>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}
