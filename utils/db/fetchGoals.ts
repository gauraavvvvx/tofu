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

        // Query only active (not completed) goals
        const result = await db.getAllAsync<Goal>(
            'SELECT * FROM goals WHERE completed = 0'
        )

        db.closeAsync()
        return result
    } catch (error) {
        console.error('Database error:', error)
        return []
    }
}

// Add a new function to fetch completed goals (for history/stats)
export async function fetchCompletedGoalsFromDB(): Promise<Goal[]> {
    try {
        const db = await SQLite.openDatabaseAsync('goals')

        // Query only completed goals
        const result = await db.getAllAsync<Goal>(
            'SELECT * FROM goals WHERE completed = 1'
        )

        db.closeAsync()
        return result
    } catch (error) {
        console.error('Database error:', error)
        return []
    }
}
