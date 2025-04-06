import { Transaction } from '@/types/schemas'
import * as SQLite from 'expo-sqlite'
import { Storage } from 'expo-sqlite/kv-store'
export async function uploadTransaction(transaction: Transaction) {
    const db = await SQLite.openDatabaseAsync('app.db')

    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT NOT NULL,
            date TEXT NOT NULL,
            category TEXT NOT NULL,
            amount REAL NOT NULL,
            savings REAL NOT NULL,
            roundedAmount REAL NOT NULL,
            transactedTo TEXT NOT NULL
        );
        `)
    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS savings (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            savings REAL NOT NULL
        );
        `)

    const result = await db.runAsync(
        `
        INSERT INTO transactions (timestamp, amount, date, category, transactedTo, savings, roundedAmount)
        VALUES (?, ?, ?, ?, ?, ?, ?);
        `,
        [
            transaction.timestamp,
            transaction.amount,
            transaction.date,
            transaction.category,
            transaction.transactedTo,
            transaction.savings,
            transaction.roundedAmount,
        ]
    )
    console.log('this is the result', result)
    let temp = Storage.getItemSync('savings')
    temp = temp != 'NaN' || temp != null ? JSON.parse(temp) : 0
    const newSavings = temp + transaction.savings
    Storage.setItemSync('savings', JSON.stringify(newSavings))
    await db.closeAsync()
    console.log('Transaction uploaded successfully')
    return true
}
