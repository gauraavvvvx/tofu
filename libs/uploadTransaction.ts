import { Transaction } from '@/types/schemas'
import * as SQLite from 'expo-sqlite'

export async function uploadTransaction(transaction: Transaction) {
    const db = await SQLite.openDatabaseAsync('./db/transactions.db')

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
    await db.runAsync(
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
    await db.closeAsync()
    console.log('Transaction uploaded successfully')
    return true
}
