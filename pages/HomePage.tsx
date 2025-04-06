import { useRouter } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Text, View } from 'react-native'
import { Button } from 'react-native-paper'
import { Storage } from 'expo-sqlite/kv-store'
import { deleteUserData } from '@/utils/db/deleteData'
import { fetchAllUserTransactions } from '@/utils/db/fetchAllUserTransactions'
import { SQLiteRunResult } from 'expo-sqlite'
function HomePage() {
    const router = useRouter()
    const [reload, setReload] = React.useState(false)
    const [savings, setSavings] = React.useState(Storage.getItemSync('savings'))
    const [transactions, setTransactions] = useState<SQLiteRunResult>()
    useEffect(() => {
        setSavings(Storage.getItemSync('savings'))
        console.log('Savings:', savings)
        fetchAllUserTransactions().then((transactions) => {
            setTransactions(transactions)
            console.log('Transactions:', transactions)
        })
    }, [reload])

    return (
        <View>
            <Button
                onPress={() => {
                    setReload(!reload)
                }}
            >
                Reload
            </Button>
            <Button
                onPress={() => {
                    router.push('/payments/scanner')
                }}
            >
                Pay
            </Button>
            <View className="w-full flex items-center justify-center">
                <Text>{savings}</Text>
            </View>
            <Button onPress={deleteUserData}>
                <Text>Delete All Data</Text>
            </Button>
            <View>
                <Text>{JSON.stringify(transactions)}</Text>
            </View>
        </View>
    )
}

export default HomePage
