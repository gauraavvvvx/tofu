import * as SQLite from 'expo-sqlite'

export type Goal = {
    id: number
    startDate: string
    endDate: string
    name: string
    targetAmount: number
    currentAmount: number
    priority: number
    completed: boolean
}

export async function createGoal(goal: Goal) {
    const db = await SQLite.openDatabaseAsync('goals')

    db.execAsync(`
        CREATE TABLE IF NOT EXISTS goals (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            startDate TEXT,
            endDate TEXT,
            name TEXT,
            targetAmount REAL,
            currentAmount REAL,
            priority INTEGER,
            completed BOOLEAN
        )`)

    const result = await db.runAsync(
        `
        INSERT INTO goals (startDate, endDate, name, targetAmount, currentAmount, priority, completed)
        VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [
            goal.startDate,
            goal.endDate,
            goal.name,
            goal.targetAmount,
            goal.currentAmount,
            goal.priority,
            goal.completed,
        ]
    )

    if (result.changes > 0) {
        console.log('Goal created successfully')
    } else {
        console.log('Failed to create goal')
    }
    db.closeAsync()
    return result
}
