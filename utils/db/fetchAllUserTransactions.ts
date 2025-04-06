// fetch all the user transactions
import * as SQLite from 'expo-sqlite'

export async function fetchAllUserTransactions() {
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
    const result = await db.getAllAsync('SELECT * FROM transactions')
    await db.closeAsync()
    return result
}
