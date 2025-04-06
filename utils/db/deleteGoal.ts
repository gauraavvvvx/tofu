import * as SQLite from 'expo-sqlite'
import { Goal } from './createGoal'
import { Alert } from 'react-native'
import { eventBus, EVENTS } from '../eventBus'

export async function deleteGoalFromDB(id: number): Promise<boolean> {
    try {
        const db = await SQLite.openDatabaseAsync('goals')

        // First, make sure the settings table exists
        await db.execAsync(`
            CREATE TABLE IF NOT EXISTS settings (
                key TEXT PRIMARY KEY,
                value TEXT
            )
        `)

        // Get the goal being deleted to extract its savings amount
        const goalToDelete = await db.getFirstAsync<Goal>(
            'SELECT * FROM goals WHERE id = ?',
            [id]
        )

        if (!goalToDelete) {
            console.log(`No goal found with id ${id}`)
            return false
        }

        let transferMessage = ''

        // If there are any savings, find the next highest priority goal to transfer to
        if (goalToDelete.currentAmount > 0) {
            // Find the next highest priority goal that's not this one
            const nextPriorityGoal = await db.getFirstAsync<Goal>(
                'SELECT * FROM goals WHERE id != ? AND completed = 0 ORDER BY priority DESC, id ASC LIMIT 1',
                [id]
            )

            if (nextPriorityGoal) {
                // Calculate new amount and check if goal will be completed
                const newAmount =
                    nextPriorityGoal.currentAmount + goalToDelete.currentAmount
                const isCompleted = newAmount >= nextPriorityGoal.targetAmount

                // Update the next priority goal with the additional savings and set completed if necessary
                await db.runAsync(
                    'UPDATE goals SET currentAmount = ?, completed = ? WHERE id = ?',
                    [newAmount, isCompleted ? 1 : 0, nextPriorityGoal.id]
                )

                transferMessage = `₹${goalToDelete.currentAmount} transferred to "${nextPriorityGoal.name}"`

                console.log(
                    `Transferred ₹${goalToDelete.currentAmount} from goal ${id} to goal ${nextPriorityGoal.id}`
                )

                // If the goal is now completed, show additional alert
                if (isCompleted) {
                    // Check if we have extra amount beyond the target
                    const extraAmount =
                        newAmount - nextPriorityGoal.targetAmount

                    // Create message for the primary alert
                    transferMessage = `₹${goalToDelete.currentAmount} transferred to "${nextPriorityGoal.name}" and completed it! 🎉`

                    // If there's extra beyond target amount, add to balance
                    if (extraAmount > 0) {
                        // Get current balance
                        const balanceStr = await db.getFirstAsync<{
                            value: string
                        }>('SELECT value FROM settings WHERE key = "balance"')

                        let currentBalance = 0
                        if (balanceStr && balanceStr.value) {
                            currentBalance = parseFloat(balanceStr.value)
                        }

                        // Add extra to balance
                        const newBalance = currentBalance + extraAmount

                        // Update or insert balance
                        await db.runAsync(
                            'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
                            ['balance', newBalance.toString()]
                        )

                        // Add extra amount info to transfer message
                        transferMessage += ` Extra ₹${extraAmount} added to your balance.`

                        // Publish balance updated event
                        eventBus.publish(EVENTS.BALANCE_UPDATED)
                    }
                }
            } else {
                // No other active goals, add to balance
                const balanceStr = await db.getFirstAsync<{ value: string }>(
                    'SELECT value FROM settings WHERE key = "balance"'
                )

                let currentBalance = 0
                if (balanceStr && balanceStr.value) {
                    currentBalance = parseFloat(balanceStr.value)
                }

                // Add to balance
                const newBalance = currentBalance + goalToDelete.currentAmount

                // Update or insert balance
                await db.runAsync(
                    'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
                    ['balance', newBalance.toString()]
                )

                transferMessage = `₹${goalToDelete.currentAmount} added to your balance`

                // Publish balance updated event
                eventBus.publish(EVENTS.BALANCE_UPDATED)

                console.log('No other goals found, added to balance instead')
            }
        }

        // Now delete the goal
        const result = await db.runAsync('DELETE FROM goals WHERE id = ?', [id])

        db.closeAsync()

        if (result.changes > 0) {
            console.log(`Goal with id ${id} deleted successfully`)

            // Show notification about transferred funds if applicable
            if (transferMessage) {
                Alert.alert(
                    'Goal Deleted',
                    `"${goalToDelete.name}" has been deleted. ${transferMessage}`,
                    [{ text: 'OK' }]
                )
            }

            // Notify the app that goals have been updated
            eventBus.publish(EVENTS.GOAL_UPDATED)

            return true
        } else {
            console.log(`No goal found with id ${id} or deletion failed`)
            return false
        }
    } catch (error) {
        console.error('Error deleting goal:', error)
        return false
    }
}
