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
import { Storage } from 'expo-sqlite/kv-store'
import React from 'react'
import * as Updates from 'expo-updates'
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

        // Reset form
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

    const handleSubmit = async () => {
        if (payments.length === 0) {
            setError('Please add at least one recurring payment.')
            return
        }
        // Save payments to local storage or database
        Storage.setItem('recurringPayments', JSON.stringify(payments))
            .then(() => {
                console.log('Recurring payments saved:', payments)
            })
            .catch((error) => {
                console.error('Error saving recurring payments:', error)
            })
        // Navigate to the next page or perform any other action
        await Updates.reloadAsync()
    }

    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <KeyboardAvoidingView
                className="flex-1 bg-orange-50 px-6 pt-12"
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
            >
                <View className="items-center mb-6">
                    <Text className="text-3xl font-bold text-gray-800 mb-2">
                        Recurring Payments
                    </Text>
                    <Text className="text-gray-600 text-center">
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
                        buttonColor="#fb923c"
                    >
                        Create Recurring Payment
                    </Button>
                ) : (
                    <View className="w-full max-w-md bg-white rounded-2xl p-5 shadow-md mb-8 self-center">
                        <Text className="text-xl font-semibold text-center mb-4 text-gray-800">
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
                            mode="outlined"
                        />

                        <View className="flex-row items-center pt-4 border border-gray-300 rounded-lg px-4 h-12 mb-4">
                            <Text className="text-lg text-gray-700 mr-2">
                                $
                            </Text>
                            <TextInput
                                value={amount}
                                onChangeText={handleAmountChange}
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

                        <TouchableOpacity
                            onPress={() => setShowDatePicker(true)}
                            className="border border-gray-300 rounded-lg h-12 px-4 justify-center mb-4"
                        >
                            <Text
                                className={`text-base ${
                                    recurringDate
                                        ? 'text-gray-800'
                                        : 'text-gray-400'
                                }`}
                            >
                                {recurringDate
                                    ? recurringDate.toLocaleDateString(
                                          'en-GB',
                                          {
                                              day: 'numeric',
                                              month: 'long',
                                          }
                                      )
                                    : 'Select recurring day and month'}
                            </Text>
                        </TouchableOpacity>

                        {error ? (
                            <Text className="text-red-500 text-sm mb-3 text-center">
                                {error}
                            </Text>
                        ) : null}

                        <View className="flex-row justify-between">
                            <Button
                                mode="outlined"
                                onPress={() => {
                                    setLabel('')
                                    setAmount('')
                                    setRecurringDate(null)
                                    setShowForm(false)
                                    setError('')
                                }}
                            >
                                Cancel
                            </Button>
                            <Button mode="contained" onPress={handleCreate}>
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
                            <View className="flex-row justify-between items-center bg-white px-4 py-3 mb-3 rounded-xl shadow-sm border border-gray-200">
                                <View>
                                    <Text className="text-base font-semibold text-gray-800">
                                        {item.label}
                                    </Text>
                                    <Text className="text-sm text-gray-500">
                                        {item.date}
                                    </Text>
                                </View>
                                <Text className="text-base text-gray-700">
                                    ₦{item.amount}
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

                {/* Submit Button */}
                <View className="mt-10">
                    <Button
                        mode="contained"
                        onPress={handleSubmit}
                        buttonColor="#fb923c"
                    >
                        Submit
                    </Button>
                </View>
            </KeyboardAvoidingView>
        </TouchableWithoutFeedback>
    )
}
