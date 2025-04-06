import { Text, View, Image, StyleSheet } from 'react-native'
import '../global.css'
import { useRouter } from 'expo-router'
import { checkIfUserExists } from '@/utils/checkIfUserExists'
import { BottomNavigation } from 'react-native-paper'
import React, { useState, useEffect } from 'react'
import GoalsScreen from './goals'
import HomePage from '@/pages/HomePage'
import ProfilePage from './profile'
import ChartScreen from './(onboarding)/viz'

const HistoryRoute = () => <Text>History</Text>

export default function Index() {
	const router = useRouter()
	const [isLoading, setIsLoading] = useState(true)

	useEffect(() => {
		checkIfUserExists().then((userExists) => {
			if (userExists) {
				setIsLoading(false)
			} else {
				router.push('/(onboarding)')
			}
		})
	}, [])

	const [index, setIndex] = useState(2)
	const [routes] = useState([
		{ key: 'goals', title: 'Goals', focusedIcon: 'target', unfocusedIcon: 'target-variant' },
		{ key: 'visualization', title: 'Charts', focusedIcon: 'chart-bar', unfocusedIcon: 'chart-bar' },
		{ key: 'home', title: 'Home', focusedIcon: 'home-circle', unfocusedIcon: 'home-outline' },
		{ key: 'history', title: 'History', focusedIcon: 'history', unfocusedIcon: 'history' },
		{ key: 'profile', title: 'Profile', focusedIcon: 'account-circle', unfocusedIcon: 'account-circle-outline' },
	])

	const renderScene = BottomNavigation.SceneMap({
		goals: GoalsScreen,
		visualization: ChartScreen,
		home: HomePage,
		history: HistoryRoute,
		profile: ProfilePage,
	})

	if (isLoading) {
		return (
			<View className="flex-1 justify-center items-center bg-[#050f10]">
				<Text className="text-2xl font-bold text-orange-500 mb-2">Loading...</Text>
				<Text className="text-base text-gray-400">Pet a cat to reduce loading time 🐾</Text>
			</View>
		)
	}

	return (
		<View className="flex-1 h-40 bg-[#050f10]">
			{/* Cat floating above bottom nav */}
			<Image
				source={require('../assets/images/peek-cat.gif')}
				style={styles.peekCat}
			/>

			<BottomNavigation
				navigationState={{ index, routes }}
				onIndexChange={setIndex}
				renderScene={renderScene}
				barStyle={{ backgroundColor: '#ffffff' }}
			/>
		</View>
	)
}

const styles = StyleSheet.create({
	peekCat: {
		position: 'absolute',
		bottom: 46, // Adjust based on height of bottom nav bar
		alignSelf: 'center',
		width: 120,
		height: 100,
		zIndex: 20,
		resizeMode: 'center',
	},
})
