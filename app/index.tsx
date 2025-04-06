import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import '../global.css'
import { Link, useRouter } from 'expo-router'
import { checkIfUserExists } from '@/utils/checkIfUserExists'
import { BottomNavigation } from 'react-native-paper'
import GoalsScreen from './goals'
import HomePage from '@/pages/HomePage'
import ProfilePage from './profile'
const ChartsRoute = () => <Text>Charts</Text>
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
    const [index, setIndex] = React.useState(2) // Center tab (Home)
    const [routes] = React.useState([
        {
            key: 'goals',
            title: 'Goals',
            focusedIcon: 'target',
            unfocusedIcon: 'target-variant',
        },
        {
            key: 'visualization',
            title: 'Charts',
            focusedIcon: 'chart-bar',
            unfocusedIcon: 'chart-bar',
        },
        {
            key: 'home',
            title: 'Home',
            focusedIcon: 'home-circle',
            unfocusedIcon: 'home-outline',
        },
        {
            key: 'history',
            title: 'History',
            focusedIcon: 'history',
            unfocusedIcon: 'history',
        },
        {
            key: 'profile',
            title: 'Profile',
            focusedIcon: 'account-circle',
            unfocusedIcon: 'account-circle-outline',
        },
    ])

    const renderScene = BottomNavigation.SceneMap({
        goals: GoalsScreen,
        visualization: ChartsRoute,
        home: HomePage,
        history: HistoryRoute,
        profile: ProfilePage,
    })
    if (isLoading) {
        return (
            <View>
                <Text className="text-center text-2xl font-bold text-orange-600 mt-6">
                    Loading...
                </Text>
                <Text className="text-base text-gray-600 text-center">
                    Pet a cat to reduce loading time
                </Text>
            </View>
        )
    } else {
        return (
            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
            />
        )
    }
}
