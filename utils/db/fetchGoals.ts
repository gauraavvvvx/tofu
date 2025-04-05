import * as SQLite from 'expo-sqlite'
import { Goal } from './createGoal'

export async function fetchGoalsFromDB(): Promise<Goal[]> {
    try {
        const db = await SQLite.openDatabaseAsync('goals')

        // Create the table if it doesn't exist
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS goals (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                startDate TEXT,
                endDate TEXT,
                name TEXT,
                targetAmount REAL,
                currentAmount REAL,
                priority INTEGER,
                completed BOOLEAN
            )
        `)

        // Query the goals
        const result = await db.getAllAsync<Goal>('SELECT * FROM goals')

        db.closeAsync()
        return result
    } catch (error) {
        console.error('Database error:', error)
        return []
    }
}
