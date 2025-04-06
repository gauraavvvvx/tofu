import React, { useState, useEffect } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    StatusBar,
    SafeAreaView,
    ScrollView,
} from 'react-native'
import GoalsList from '@/components/goals/GoalsList'
import GoalsModal from '@/components/goals/GoalsModal'
import { prioritiesOrder } from '../utils/priorities'
import { createGoal, Goal } from '../utils/db/createGoal'
import { fetchGoalsFromDB } from '../utils/db/fetchGoals'
import { deleteGoalFromDB } from '../utils/db/deleteGoal'
import { Ionicons } from '@expo/vector-icons'

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
        <SafeAreaView style={{ flex: 1, backgroundColor: '#050f10' }}>
            <StatusBar barStyle="light-content" backgroundColor="#050f10" />
            <View style={{ flex: 1, padding: 16 }}>
                <Text
                    style={{
                        fontSize: 24,
                        fontWeight: 'bold',
                        color: '#fff',
                        marginBottom: 16,
                    }}
                >
                    Goals
                </Text>

                {/* Goals List */}
                <ScrollView style={{ flex: 1 }}>
                    <GoalsList goals={goals} onDeleteGoal={deleteGoal} />
                </ScrollView>

                {/* Add Goal Button */}
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    style={{
                        backgroundColor: '#77cc6d',
                        borderRadius: 50,
                        width: 60,
                        height: 60,
                        justifyContent: 'center',
                        alignItems: 'center',
                        position: 'absolute',
                        right: 20,
                        bottom: 20,
                        shadowColor: '#77cc6d',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.4,
                        shadowRadius: 3,
                        elevation: 5,
                    }}
                >
                    <Ionicons name="add" size={30} color="#fff" />
                </TouchableOpacity>

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
        </SafeAreaView>
    )
}
