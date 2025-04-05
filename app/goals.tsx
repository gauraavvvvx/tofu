import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import GoalsList from '@/components/goals/GoalsList'
import GoalsModal from '@/components/goals/GoalsModal'
import { prioritiesOrder } from '../utils/priorities'
import { createGoal, Goal } from '../utils/db/createGoal'
import { fetchGoalsFromDB } from '../utils/db/fetchGoals'
import { deleteGoalFromDB } from '../utils/db/deleteGoal'

export default function GoalsScreen() {
    const [goals, setGoals] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [isStartDatePickerVisible, setStartDatePickerVisible] =
        useState(false)
    const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false)

    const [newGoal, setNewGoal] = useState({
        name: '',
        start_date: '',
        end_date: '',
        goal_amount: '',
        amount_saved: '',
        priority: 'MODERATE',
    })

    // Fetch goals from database
    const fetchGoals = async () => {
        try {
            const dbGoals = await fetchGoalsFromDB()
            const sortedGoals = dbGoals.sort((a, b) => b.priority - a.priority)
            setGoals(sortedGoals)
        } catch (error) {
            console.error('Error fetching goals:', error)
        }
    }

    useEffect(() => {
        fetchGoals()
    }, [])

    const addGoal = async () => {
        // Map newGoal state to the Goal type required by createGoal
        const goal: Goal = {
            id: 0, // placeholder, as the DB auto-increments the ID
            startDate: newGoal.start_date,
            endDate: newGoal.end_date,
            name: newGoal.name,
            targetAmount: parseFloat(newGoal.goal_amount) || 0,
            currentAmount: parseFloat(newGoal.amount_saved) || 0,
            priority: prioritiesOrder[newGoal.priority],
            completed: false,
        }
        console.log('Adding goal:', goal)
        await createGoal(goal)
        fetchGoals()
        setModalVisible(false)
    }

    const deleteGoal = async (id) => {
        try {
            console.log('Deleting goal:', id)
            const success = await deleteGoalFromDB(id)
            if (success) {
                // Refresh the goals list after successful deletion
                fetchGoals()
            }
        } catch (error) {
            console.error('Error deleting goal:', error)
        }
    }

    const handleStartDateConfirm = (date) => {
        setNewGoal({ ...newGoal, start_date: date.toISOString().split('T')[0] })
        setStartDatePickerVisible(false)
    }

    const handleEndDateConfirm = (date) => {
        setNewGoal({ ...newGoal, end_date: date.toISOString().split('T')[0] })
        setEndDatePickerVisible(false)
    }

    return (
        <View className="flex-1 bg-gray-100 p-4">
            <Text className="text-center text-xl font-bold mb-4">Goals</Text>

            {/* Goals List */}
            <GoalsList goals={goals} onDeleteGoal={deleteGoal} />

            {/* Add Goal Button */}
            <Button title="Add Goal" onPress={() => setModalVisible(true)} />

            {/* Modal */}
            {modalVisible && (
                <GoalsModal
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    newGoal={newGoal}
                    setNewGoal={setNewGoal}
                    isStartDatePickerVisible={isStartDatePickerVisible}
                    setStartDatePickerVisible={setStartDatePickerVisible}
                    isEndDatePickerVisible={isEndDatePickerVisible}
                    setEndDatePickerVisible={setEndDatePickerVisible}
                    handleStartDateConfirm={handleStartDateConfirm}
                    handleEndDateConfirm={handleEndDateConfirm}
                    addGoal={addGoal}
                />
            )}
        </View>
    )
}
