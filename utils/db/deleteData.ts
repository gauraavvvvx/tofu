// Delete all user data and reset the app
import * as SQLite from 'expo-sqlite'
import { Storage } from 'expo-sqlite/kv-store'
import { createGoal } from './createGoal'
import * as Updates from 'expo-updates'
export async function deleteUserData() {
    await SQLite.deleteDatabaseAsync('app.db')
    await SQLite.deleteDatabaseAsync('goals')
    console.log('deleted database')

    // Reset app state
    Storage.setItem('savings', '0')
    Storage.setItem('monthlyIncome', '0')
    Storage.setItem('recurringPayments', '[]')
    try {
        // Reload the app
        await Updates.reloadAsync()
        console.log('App reloaded successfully')
    } catch (error) {
        alert(`Failed to reload app: ${error.message}`)
    }
}
