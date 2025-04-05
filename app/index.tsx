import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import '../global.css'
import { Link, useRouter } from 'expo-router'
import { checkIfUserExists } from '@/utils/checkIfUserExists'

export default function Index() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    useEffect(() => {
        checkIfUserExists().then((userExists) => {
            console.log('User exists:', userExists)
            if (!userExists) {
                router.replace('/(onboarding)')
            } else {
                setIsLoading(false)
            }
        })
    }, [])
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
            <View>
                <Text>hello there this is the home Page</Text>
            </View>
        )
    }
}
