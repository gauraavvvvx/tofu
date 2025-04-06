import * as SQLite from 'expo-sqlite'
import { Storage } from 'expo-sqlite/kv-store'
import { updateGoalWithSavings } from '../utils/db/updateGoalWithSavings'
import { eventBus, EVENTS } from '../utils/eventBus'

export type Transaction = {
    timestamp: string
    amount: number
    date: string
    category: string
    savings: number
    roundedAmount: number
    transactedTo: string
}

export async function uploadTransaction(transaction: Transaction) {
    try {
        const db = await SQLite.openDatabaseAsync('transactions')

        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS transactions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                timestamp TEXT,
                amount REAL,
                date TEXT,
                category TEXT,
                savings REAL,
                roundedAmount REAL,
                transactedTo TEXT
            )
        `)

        const result = await db.runAsync(
            `INSERT INTO transactions 
            (timestamp, amount, date, category, savings, roundedAmount, transactedTo) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [
                transaction.timestamp,
                transaction.amount,
                transaction.date,
                transaction.category,
                transaction.savings,
                transaction.roundedAmount,
                transaction.transactedTo,
            ]
        )

        // Update total savings in AsyncStorage (this appears to be existing functionality)
        let temp = await Storage.getItem('savings')
        temp = temp != 'NaN' && temp != null ? JSON.parse(temp) : 0
        const newSavings = temp + transaction.savings
        await Storage.setItem('savings', JSON.stringify(newSavings))

        // Add the saved amount to the highest priority goal
        if (transaction.savings > 0) {
            await updateGoalWithSavings(transaction.savings, () => {
                // Use the callback approach to publish the event after goal is updated
                eventBus.publish(EVENTS.GOAL_UPDATED)
            })
        }

        // Emit an event after transaction upload - CHANGED emit TO publish
        eventBus.publish(EVENTS.TRANSACTION_CREATED)

        await db.closeAsync()
        console.log('Transaction uploaded successfully')
        return true
    } catch (error) {
        console.error('Error uploading transaction:', error)
        return false
    }
}
