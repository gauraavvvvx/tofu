import React, { useState, useEffect } from 'react'
import {
	View,
	Text,
	TextInput,
	Platform,
	UIManager,
	Image,
} from 'react-native'
import { Button } from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
import {
	User,
	CalendarDays,
	Wallet,
	Pencil,
	Save,
	DollarSign,
} from 'lucide-react-native'
import { deleteUserData } from '@/utils/db/deleteData'
import { Storage } from 'expo-sqlite/kv-store'
import { fetchGoalsFromDB } from '@/utils/db/fetchGoals'
import { useIsFocused } from '@react-navigation/native'

if (Platform.OS === 'android') {
	UIManager.setLayoutAnimationEnabledExperimental &&
		UIManager.setLayoutAnimationEnabledExperimental(true)
}

const priorityMap = {
	'very high': 4,
	high: 3,
	moderate: 2,
	low: 1,
}

export default function ProfilePage() {
	const isFocused = useIsFocused()
	const [editMode, setEditMode] = useState(false)
	const [name, setName] = useState('Jane Doe')
	const [dob, setDob] = useState('1994-06-15')
	const [balance, setBalance] = useState(0)
	const [savings, setSavings] = useState(0)
	const [goal, setGoal] = useState(0)

	const toggleEdit = () => setEditMode(!editMode)

	const fetchTopGoal = async () => {
		try {
			const goals = await fetchGoalsFromDB()
			const activeGoals = goals.filter(g => !g.completed)
			if (activeGoals.length > 0) {
				const sorted = activeGoals.sort(
					(a, b) =>
						priorityMap[b.priority.toLowerCase()] -
						priorityMap[a.priority.toLowerCase()]
				)
				setGoal(sorted[0].targetAmount)
			} else {
				setGoal(0)
			}
		} catch (err) {
			console.error('Failed to fetch goal:', err)
		}
	}

	useEffect(() => {
		const savingsStored = Storage.getItemSync('savings')
		const balanceStored = Storage.getItemSync('accountBalance')

		setSavings(savingsStored ? parseFloat(savingsStored) : 0)
		setBalance(balanceStored ? parseFloat(balanceStored) : 0)
	}, [])

	useEffect(() => {
		if (isFocused) {
			fetchTopGoal()
		}
	}, [isFocused])

	const catImages = {
		angry: require('../assets/images/PuffleAngry.webp'),
		diss: require('../assets/images/PuffleDiss.webp'),
		neutral: require('../assets/images/PuffleNeutral.webp'),
		happy: require('../assets/images/PuffleHappy1.webp'),
		amazing: require('../assets/images/PuffleHappy2.webp'),
	}

	const satisfaction = goal > 0 ? (savings / goal) * 100 : 0

	let mood: keyof typeof catImages = 'neutral'
	if (satisfaction < 20) mood = 'diss'
	else if (satisfaction < 50) mood = 'angry'
	else if (satisfaction < 75) mood = 'neutral'
	else if (satisfaction < 95) mood = 'happy'
	else mood = 'amazing'

	const calculateAge = (dobStr: string) => {
		const birthDate = new Date(dobStr)
		const today = new Date()
		let age = today.getFullYear() - birthDate.getFullYear()
		const m = today.getMonth() - birthDate.getMonth()
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--
		return age
	}

	return (
		<View className="flex-1 bg-[#050f10] px-6 py-8">
			<Animatable.View
				animation="fadeInDown"
				duration={600}
				className="items-center mb-6"
			>
				<User size={48} color="#77cc6d" />
				<Text className="text-3xl font-bold text-white mt-2 mb-12">
					My Profile
				</Text>
			</Animatable.View>

			<Animatable.View animation="fadeInUp" duration={700} delay={200}>
				{editMode ? (
					<>
						<Text className="text-[#77cc6d] mb-1">Name</Text>
						<TextInput
							value={name}
							onChangeText={setName}
							className="bg-white px-4 py-2 mb-4 rounded border border-gray-200"
						/>

						<Text className="text-[#77cc6d] mb-1">
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
							buttonColor="#77cc6d"
							className="mt-2"
						>
							Save
						</Button>
					</>
				) : (
					<>
						<Button
							onPress={async () => {
								await deleteUserData()
								await fetchTopGoal()
							}}
						>
							Delete Account
						</Button>

						<View className="flex-row items-center justify-center mb-4 space-x-2">
							<User size={20} color="#77cc6d" />
							<Text className="text-xl px-4 text-white font-semibold">
								{name}
							</Text>
						</View>

						<View className="flex-row items-center mb-2 justify-center space-x-2">
							<CalendarDays size={20} color="#77cc6d" />
							<Text className="text-[#ccc] px-4 text-lg">
								DOB: {dob} ({calculateAge(dob)} yrs)
							</Text>
						</View>

						<View className="flex-row items-center mb-4 justify-center space-x-2">
							<Wallet size={20} color="#77cc6d" />
							<Text className="text-lg px-4 text-white">
								Balance: ${balance.toFixed(2)}
							</Text>
						</View>

						<View className="flex-row items-center mb-4 justify-center space-x-2">
							<DollarSign size={20} color="#77cc6d" />
							<Text className="text-lg px-4 text-[#77cc6d]">
								Savings: ${savings.toFixed(2)}
							</Text>
						</View>

						<View className="flex-row items-center mb-4 justify-center space-x-2">
							<DollarSign size={20} color="#77cc6d" />
							<Text className="text-lg px-4 text-[#ccc]">
								Goal: ${goal.toFixed(2)}
							</Text>
						</View>

						<Button
							mode="outlined"
							icon={() => <Pencil size={16} color="#77cc6d" />}
							onPress={toggleEdit}
							textColor="#77cc6d"
							className="border-[#77cc6d] mt-2"
						>
							Edit Info
						</Button>
					</>
				)}
			</Animatable.View>

			<View className="h-40 items-center justify-center mt-8">
				<Image
					source={catImages[mood]}
					style={{
						width: 120,
						height: 120,
						resizeMode: 'contain',
					}}
				/>
				<Text className="mt-4 text-white text-sm">
					Puffle is currently{' '}
					<Text className="font-bold text-[#77cc6d]">
						{mood.charAt(0).toUpperCase() + mood.slice(1)}
					</Text>
				</Text>
			</View>
		</View>
	)
}
