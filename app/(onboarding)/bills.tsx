import { useState } from 'react'
import { View, Text, FlatList } from 'react-native'
import { TextInput, Button } from 'react-native-paper'

export default function RecurringPayment() {
    const [showForm, setShowForm] = useState(false)
    const [label, setLabel] = useState('')
    const [amount, setAmount] = useState('')
    const [payments, setPayments] = useState([])

    const handleAmountChange = (text) => {
        const numericText = text.replace(/[^0-9]/g, '')
        setAmount(numericText)
    }

    const handleCreate = () => {
        if (label && amount) {
            const newPayment = { id: Date.now().toString(), label, amount }
            setPayments((prev) => [...prev, newPayment])

            // Reset form
            setLabel('')
            setAmount('')
            setShowForm(false)
        }
    }

    return (
        <View className="flex-1 items-center bg-orange-100 p-4">
            <Text className="text-2xl font-bold mb-4">Recurring Payments</Text>

            {!showForm ? (
                <Button mode="contained" onPress={() => setShowForm(true)}>
                    Create Recurring Payment
                </Button>
            ) : (
                <View className="w-full max-w-sm bg-white rounded-xl p-4 shadow mb-6">
                    <Text className="text-lg font-semibold text-center mb-4">
                        New Recurring Payment
                    </Text>

                    <TextInput
                        label="Name (e.g. Rent)"
                        value={label}
                        onChangeText={setLabel}
                        mode="outlined"
                        className="mb-4"
                    />

                    <View className="flex-row items-center border border-gray-300 rounded-md px-2 h-12 mb-4">
                        <Text className="text-lg text-gray-700 mr-2">₦</Text>
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

                    <View className="flex-row justify-between mt-2">
                        <Button
                            mode="outlined"
                            onPress={() => setShowForm(false)}
                        >
                            Cancel
                        </Button>
                        <Button mode="contained" onPress={handleCreate}>
                            Save
                        </Button>
                    </View>
                </View>
            )}

            {/* Display Saved Payments */}
            {payments.length > 0 && (
                <FlatList
                    data={payments}
                    keyExtractor={(item) => item.id}
                    className="w-full max-w-sm"
                    renderItem={({ item }) => (
                        <View className="flex-row justify-between items-center bg-white px-4 py-3 mb-2 rounded-md shadow">
                            <Text className="text-base font-medium">
                                {item.label}
                            </Text>
                            <Text className="text-base text-gray-700">
                            ₹{item.amount}
                            </Text>
                        </View>
                    )}
                />
            )}
        </View>
    )
}
