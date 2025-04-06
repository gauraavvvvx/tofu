import * as SQLite from 'expo-sqlite'
import { Goal } from './createGoal'
import { Alert } from 'react-native'
import { eventBus, EVENTS } from '../eventBus'

/**
 * Updates the highest priority goal with the saved amount from a transaction
 * @param savedAmount - The amount saved from the transaction
 * @param onGoalUpdated - Optional callback that runs after a goal is updated
 * @returns True if successful, false otherwise
 */
export async function updateGoalWithSavings(
    savedAmount: number,
    onGoalUpdated?: () => void
): Promise<boolean> {
    try {
        if (savedAmount <= 0) return true // Nothing to add

        const db = await SQLite.openDatabaseAsync('goals')

        // Get highest priority active (not completed) goal
        const highestPriorityGoal = await db.getFirstAsync<Goal>(
            'SELECT * FROM goals WHERE completed = 0 ORDER BY priority DESC, id ASC LIMIT 1'
        )

        if (!highestPriorityGoal) {
            console.log('No active goals found to add savings to')
            return false
        }

        // Update the goal with the saved amount
        const newAmount = highestPriorityGoal.currentAmount + savedAmount

        // Check if goal is now complete
        const isCompleted = newAmount >= highestPriorityGoal.targetAmount

        // Update goal in database
        await db.runAsync(
            'UPDATE goals SET currentAmount = ?, completed = ? WHERE id = ?',
            [newAmount, isCompleted ? 1 : 0, highestPriorityGoal.id]
        )

        // If goal is completed, show alert and add to balance
        if (isCompleted) {
            // Get how much over the target we are
            const extraAmount = newAmount - highestPriorityGoal.targetAmount

            // Alert user about goal completion
            Alert.alert(
                'Goal Achieved! 🎉',
                `Congratulations! You've completed your "${highestPriorityGoal.name}" goal!`,
                [{ text: 'Great!' }]
            )

            // Add extra amount to user balance if any
            if (extraAmount > 0) {
                // Get current balance
                const balanceStr = await db.getFirstAsync<{ value: string }>(
                    'SELECT value FROM settings WHERE key = "balance"'
                )

                let currentBalance = 0
                if (balanceStr && balanceStr.value) {
                    currentBalance = parseFloat(balanceStr.value)
                }

                // Add extra to balance
                const newBalance = currentBalance + extraAmount

                // Create settings table if it doesn't exist
                await db.execAsync(`
                    CREATE TABLE IF NOT EXISTS settings (
                        key TEXT PRIMARY KEY,
                        value TEXT
                    )
                `)

                // Update or insert balance
                await db.runAsync(
                    'INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)',
                    ['balance', newBalance.toString()]
                )

                // Publish the balance updated event
                eventBus.publish(EVENTS.BALANCE_UPDATED)
            }
        }

        db.closeAsync()

        console.log(
            `Added ₹${savedAmount} to goal "${highestPriorityGoal.name}"`
        )
        console.log(
            `Current progress: ₹${newAmount} / ₹${highestPriorityGoal.targetAmount}`
        )

        // Always publish the goal updated event
        eventBus.publish(EVENTS.GOAL_UPDATED)

        // Call the callback if provided
        if (onGoalUpdated) {
            onGoalUpdated()
        }

        return true
    } catch (error) {
        console.error('Error updating goal with savings:', error)
        return false
    }
}
