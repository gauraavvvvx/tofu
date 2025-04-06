import React, { useState } from 'react'
import {
    View,
    Text,
    TextInput,
    Platform,
    UIManager,
    TouchableOpacity,
} from 'react-native'
import { Button } from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
import { User, CalendarDays, Wallet, Pencil, Save } from 'lucide-react-native'

if (Platform.OS === 'android') {
    UIManager.setLayoutAnimationEnabledExperimental &&
        UIManager.setLayoutAnimationEnabledExperimental(true)
}

export default function ProfilePage() {
    const [editMode, setEditMode] = useState(false)
    const [name, setName] = useState('Jane Doe')
    const [dob, setDob] = useState('1994-06-15')
    const [balance, setBalance] = useState('$ 12,430')

    const toggleEdit = () => {
        setEditMode(!editMode)
    }

    const calculateAge = (dobStr: string) => {
        const birthDate = new Date(dobStr)
        const today = new Date()
        let age = today.getFullYear() - birthDate.getFullYear()
        const m = today.getMonth() - birthDate.getMonth()
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
            age--
        }
        return age
    }

    return (
        <View className="flex-1 bg-orange-50 px-6 py-8">
            <Animatable.View
                animation="fadeInDown"
                duration={600}
                className="items-center mb-6"
            >
                <User size={48} color="#f97316" />
                <Text className="text-3xl font-bold text-gray-800 mt-2 mb-12">
                    My Profile
                </Text>
            </Animatable.View>

            <Animatable.View animation="fadeInUp" duration={700} delay={200}>
                {editMode ? (
                    <>
                        <Text className="text-gray-700 mb-1">Name</Text>
                        <TextInput
                            value={name}
                            onChangeText={setName}
                            className="bg-white px-4 py-2 mb-4 rounded border border-gray-200"
                        />

                        <Text className="text-gray-700 mb-1">
                            Date of Birth
                        </Text>
                        <TextInput
                            value={dob}
                            onChangeText={setDob}
                            placeholder="YYYY-MM-DD"
                            className="bg-white px-4 py-2 mb-4 rounded border border-gray-200"
                        />

                        <Button
                            mode="contained"
                            icon={() => <Save size={16} color="#fff" />}
                            onPress={toggleEdit}
                            buttonColor="#f97316"
                            className="mt-2"
                        >
                            Save
                        </Button>
                    </>
                ) : (
                    <>
                        <View className="flex-row  items-center justify-center mb-4 space-x-2">
                            <User size={20} color="#444" />
                            <Text className="text-xl px-4 text-gray-800 font-semibold">
                                {name}
                            </Text>
                        </View>

                        <View className="flex-row items-center mb-2 justify-center space-x-2">
                            <CalendarDays size={20} color="#444" />
                            <Text className="text-gray-700 px-4 text-lg">
                                DOB: {dob}
                            </Text>
                        </View>

                        <View className="flex-row items-center mb-4 justify-center space-x-2">
                            <Wallet size={20} color="#444" />
                            <Text className="text-lg px-4 text-gray-700">
                                Balance: {balance}
                            </Text>
                        </View>

                        <Button
                            mode="outlined"
                            icon={() => <Pencil size={16} />}
                            onPress={toggleEdit}
                            className="mt-2"
                        >
                            Edit Info
                        </Button>
                    </>
                )}
            </Animatable.View>
        </View>
    )
}
