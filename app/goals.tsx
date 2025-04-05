import React, { useState, useEffect } from 'react'
import { View, Text, Button } from 'react-native'
import GoalsList from '@/components/goals/GoalsList'
import GoalsModal from '@/components/goals/GoalsModal'
import { prioritiesOrder } from '../utils/priorities'

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

    // Fetch goals from database (mocked here)
    const fetchGoals = async () => {
        const fetchedGoals = [
            {
                id: '1',
                name: 'Buy a car',
                start_date: '2025-04-01',
                end_date: '2025-12-31',
                goal_amount: 10000,
                amount_saved: 2000,
                priority: 'VERY_HIGH',
            },
            {
                id: '2',
                name: 'Vacation',
                start_date: '2025-06-01',
                end_date: '2025-08-31',
                goal_amount: 5000,
                amount_saved: 1000,
                priority: 'HIGH',
            },
        ]

        const sortedGoals = fetchedGoals.sort(
            (a, b) => prioritiesOrder[b.priority] - prioritiesOrder[a.priority]
        )
        setGoals(sortedGoals)
    }

    useEffect(() => {
        fetchGoals()
    }, [])

    const addGoal = () => {
        console.log('Adding goal:', newGoal)
        fetchGoals()
        setModalVisible(false)
    }

    const deleteGoal = (id) => {
        console.log('Deleting goal:', id)
        fetchGoals()
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
