import * as SQLite from 'expo-sqlite'

export type UserProfileDetails = {
    name: string
    dob: string
    phone: string
    monthlyIncome: string
}

export async function uploadUserProfileDetails(details: UserProfileDetails) {
    const db = await SQLite.openDatabaseAsync('userProfile')

    db.execAsync(`
        CREATE TABLE IF NOT EXISTS userProfile (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT,
            dob TEXT,
            phone TEXT,
            monthlyIncome TEXT,
            )`)
    const result = await db.runAsync(
        `
        INSERT INTO userProfile (name, dob, phone, monthlyIncome)
        VALUES (?, ?, ?, ?)`,
        [details.name, details.dob, details.phone, details.monthlyIncome]
    )
    if (result.changes > 0) {
        console.log('User profile details uploaded successfully')
    } else {
        console.log('Failed to upload user profile details')
    }
    db.closeAsync()
    return result
}
