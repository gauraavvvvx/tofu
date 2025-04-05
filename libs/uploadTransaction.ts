import { Transaction } from '@/types/transaction';
import * as SQLite from 'expo-sqlite';


export async function uploadTransaction(transaction: Transaction) {

    const db = await SQLite.openDatabaseAsync('transactions.db');

    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            timestamp TEXT NOT NULL,
            amount REAL NOT NULL,
            date TEXT NOT NULL,
            category TEXT NOT NULL,
            description TEXT NOT NULL,
            to TEXT NOT NULL
        );
        `)
    await db.runAsync(`
        INSERT INTO transactions (timestamp, amount, date, category, description, to)
        VALUES (?, ?, ?, ?, ?, ?);
        `, [
            transaction.timestamp,
            transaction.amount,
            transaction.date,
            transaction.category,
            transaction.description,
            transaction.to
        ]);
    await db.closeAsync();
    console.log('Transaction uploaded successfully');
    return true;



}
