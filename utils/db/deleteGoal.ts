import * as SQLite from 'expo-sqlite'
import { Goal } from './createGoal'

export async function deleteGoalFromDB(id: number): Promise<boolean> {
    try {
        const db = await SQLite.openDatabaseAsync('goals')

        // First, get the goal being deleted to extract its savings amount
        const goalToDelete = await db.getFirstAsync<Goal>(
            'SELECT * FROM goals WHERE id = ?',
            [id]
        )

        if (!goalToDelete) {
            console.log(`No goal found with id ${id}`)
            return false
        }

        // If there are any savings, find the next highest priority goal to transfer to
        if (goalToDelete.currentAmount > 0) {
            // Find the next highest priority goal that's not this one
            const nextPriorityGoal = await db.getFirstAsync<Goal>(
                'SELECT * FROM goals WHERE id != ? ORDER BY priority DESC, id ASC LIMIT 1',
                [id]
            )

            if (nextPriorityGoal) {
                // Update the next priority goal with the additional savings
                const newAmount =
                    nextPriorityGoal.currentAmount + goalToDelete.currentAmount
                await db.runAsync(
                    'UPDATE goals SET currentAmount = ? WHERE id = ?',
                    [newAmount, nextPriorityGoal.id]
                )

                console.log(
                    `Transferred ₹${goalToDelete.currentAmount} from goal ${id} to goal ${nextPriorityGoal.id}`
                )
            } else {
                console.log('No other goals found to transfer savings to')
            }
        }

        // Now delete the goal
        const result = await db.runAsync('DELETE FROM goals WHERE id = ?', [id])

        db.closeAsync()

        if (result.changes > 0) {
            console.log(`Goal with id ${id} deleted successfully`)
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
