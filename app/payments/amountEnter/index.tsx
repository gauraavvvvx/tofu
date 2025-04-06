import { useLocalSearchParams, useRouter } from 'expo-router'
import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TextInput,
    Button,
    Linking,
    Alert,
    StyleSheet,
    AppState,
    AppStateStatus,
} from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { uploadTransaction } from '@/libs/uploadTransaction'

const UPIPaymentScreen = () => {
    const route = useRouter()
    const params = useLocalSearchParams()

    const [upiId, setUpiId] = useState('')
    const [name, setName] = useState('')
    const [amount, setAmount] = useState('')
    const [error, setError] = useState('')
    const [roundedAmount, setRoundedAmount] = useState(0)
    const [selectedCategory, setSelectedCategory] = useState('Groceries') // Default category
    const [customCategory, setCustomCategory] = useState('') // For custom category input
    const [appState, setAppState] = useState(AppState.currentState)

    const categories = [
        'Groceries',
        'Utilities',
        'Entertainment',
        'Dining',
        'Others',
    ]

    useEffect(() => {
        const parseUPIURI = (uri: string) => {
            const pattern = /upi:\/\/pay\?.*?pa=([^&]+).*?pn=([^&]+)/i
            const match = uri.match(pattern)

            if (!match) {
                setError('Invalid UPI QR Code')
                return
            }

            setUpiId(decodeURIComponent(match[1]))
            setName(decodeURIComponent(match[2]))
        }

        if (params?.upiUri) {
            const upiUri = Array.isArray(params.upiUri)
                ? params.upiUri[0]
                : params.upiUri
            parseUPIURI(upiUri)
        }

        // Listen for app state changes
        const handleAppStateChange = (nextAppState: string) => {
            if (
                appState.match(/inactive|background/) &&
                nextAppState === 'active'
            ) {
                // App has come back to the foreground
                uploadTransaction({
                    timestamp: new Date().toISOString(),
                    amount: parseFloat(amount),
                    date: new Date().toISOString(),
                    category:
                        selectedCategory === 'Others'
                            ? customCategory
                            : selectedCategory,
                    savings: roundedAmount - parseFloat(amount),
                    roundedAmount: roundedAmount,
                    transactedTo: upiId,
                })
                    .then(() => {
                        Alert.alert(
                            'Transaction Uploaded',
                            'Your transaction has been recorded successfully.'
                        )
                    })
                    .catch((error) => {
                        console.error('Error uploading transaction:', error)
                    })
                Alert.alert(
                    'Congratulations',
                    `you just saved ₹${(roundedAmount - parseFloat(amount)).toFixed(2)}!`
                )
            }
            setAppState(nextAppState as AppStateStatus)
        }

        const subscription = AppState.addEventListener(
            'change',
            handleAppStateChange
        )

        return () => {
            subscription.remove()
        }
    }, [appState])

    const handlePayment = async () => {
        if (!amount) {
            Alert.alert('Error', 'Please enter a valid amount')
            return
        }

        const paymentUri = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(name)}&am=${amount}`

        try {
            const supported = await Linking.canOpenURL(paymentUri)
            if (supported) {
                await Linking.openURL(paymentUri)
            } else {
                Alert.alert('Error', 'No UPI apps installed')
            }
        } catch (error: any) {
            Alert.alert('Payment Failed', error.message)
        }
    }

    if (error) {
        return (
            <View style={{ padding: 20 }}>
                <Text style={{ color: 'red' }}>{error}</Text>
            </View>
        )
    }

    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 18, marginBottom: 10 }}>
                Pay to: {name}
            </Text>
            <Text style={{ marginBottom: 20 }}>UPI ID: {upiId}</Text>

            {amount && roundedAmount > 0 && (
                <View style={styles.savingsContainer}>
                    <Text style={styles.savingsText}>
                        You are paying{' '}
                        <Text style={styles.highlight}>₹{roundedAmount}</Text>{' '}
                        and saving{' '}
                        <Text style={styles.highlight}>
                            ₹{(roundedAmount - parseFloat(amount)).toFixed(2)}
                        </Text>
                        !
                    </Text>
                </View>
            )}

            <TextInput
                style={styles.input}
                placeholder="Enter amount (₹)"
                keyboardType="numeric"
                value={amount}
                onChangeText={(e) => {
                    setAmount(e)
                    setRoundedAmount(Math.ceil(parseFloat(e) / 10) * 10)
                }}
            />

            <Text style={{ marginBottom: 10 }}>Select a category:</Text>
            <Picker
                selectedValue={selectedCategory}
                onValueChange={(itemValue) => setSelectedCategory(itemValue)}
                style={styles.picker}
            >
                {categories.map((category) => (
                    <Picker.Item
                        key={category}
                        label={category}
                        value={category}
                    />
                ))}
            </Picker>

            {/* Show custom category input if "Others" is selected */}
            {selectedCategory === 'Others' && (
                <TextInput
                    style={styles.input}
                    placeholder="Enter custom category"
                    value={customCategory}
                    onChangeText={setCustomCategory}
                />
            )}

            <Button
                title={`Pay ₹${roundedAmount || '0'}`}
                onPress={handlePayment}
                disabled={!amount}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        padding: 8,
    },
    savingsContainer: {
        backgroundColor: '#e0f7fa',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
    },
    savingsText: {
        fontSize: 16,
        textAlign: 'center',
    },
    highlight: {
        fontWeight: 'bold',
        color: '#00796b',
    },
    picker: {
        height: 50,
        marginBottom: 20,
    },
})

export default UPIPaymentScreen
