import * as SQLite from 'expo-sqlite'

export async function checkIfUserExists() {
    const db = await SQLite.openDatabaseAsync('./db/user.db')

    await db.execAsync(`
        PRAGMA journal_mode = WAL;
        CREATE TABLE IF NOT EXISTS user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            phone TEXT NOT NULL,
            dateOfBirth TEXT NOT NULL
        );
    `)

    const result = await db.getFirstAsync('SELECT * FROM user LIMIT 1')
    console.log(result)
    await db.closeAsync()

    return result != null
}
