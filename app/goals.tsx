import React, { useState, useEffect } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StatusBar } from 'expo-status-bar'
import GoalsList from '@/components/goals/GoalsList'
import GoalsModal from '@/components/goals/GoalsModal'
import { prioritiesOrder } from '../utils/priorities'
import { createGoal, Goal } from '../utils/db/createGoal'
import { fetchGoalsFromDB } from '../utils/db/fetchGoals'
import { deleteGoalFromDB } from '../utils/db/deleteGoal'
import { Ionicons } from '@expo/vector-icons'
import { eventBus, EVENTS } from '../utils/eventBus'

export default function GoalsScreen() {
    const [goals, setGoals] = useState([])
    const [modalVisible, setModalVisible] = useState(false)
    const [isStartDatePickerVisible, setStartDatePickerVisible] =
        useState(false)
    const [isEndDatePickerVisible, setEndDatePickerVisible] = useState(false)
    const [refreshing, setRefreshing] = useState(false)
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
            setRefreshing(true)
            const dbGoals = await fetchGoalsFromDB()
            const sortedGoals = dbGoals.sort((a, b) => b.priority - a.priority)
            setGoals(sortedGoals)
        } catch (error) {
            console.error('Error fetching goals:', error)
        } finally {
            setRefreshing(false)
        }
    }

    // Pull to refresh functionality - now handled by the FlatList directly
    const onRefresh = React.useCallback(() => {
        fetchGoals()
    }, [])

    useEffect(() => {
        fetchGoals()

        // Subscribe to GOAL_UPDATED events
        const unsubscribe = eventBus.subscribe(EVENTS.GOAL_UPDATED, () => {
            console.log('Goal updated event received, refreshing goals list')
            fetchGoals()
        })

        // Subscribe to TRANSACTION_CREATED events
        const unsubscribe2 = eventBus.subscribe(
            EVENTS.TRANSACTION_CREATED,
            () => {
                console.log(
                    'Transaction created event received, refreshing goals list'
                )
                fetchGoals()
            }
        )

        // Clean up subscriptions when component unmounts
        return () => {
            unsubscribe()
            unsubscribe2()
        }
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
            // Simply call the utility function and let it handle the transfers
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
        <SafeAreaView className="flex-1 bg-[#050f10]">
            <StatusBar style="light" />
            <View className="flex-1 p-4">
                <Text className="text-2xl font-bold text-white mb-4">
                    Goals
                </Text>

                {/* GoalsList with its own refreshing capability */}
                <GoalsList
                    goals={goals}
                    onDeleteGoal={deleteGoal}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                />

                {/* Refresh Button */}
                <TouchableOpacity
                    onPress={fetchGoals}
                    className="absolute right-5 bottom-24 w-[60px] h-[60px] bg-[#28272d] rounded-full justify-center items-center shadow-lg"
                    style={{
                        shadowColor: '#28272d',
                        shadowOffset: { width: 0, height: 2 },
                        shadowOpacity: 0.4,
                        shadowRadius: 3,
                        elevation: 5,
                    }}
                >
                    <Ionicons name="refresh" size={30} color="#fff" />
                </TouchableOpacity>

                {/* Add Goal Button */}
                <TouchableOpacity
                    onPress={() => setModalVisible(true)}
                    className="absolute right-5 bottom-5 w-[60px] h-[60px] bg-[#28272d] rounded-full justify-center items-center shadow-lg"
                    style={{
                        shadowColor: '#28272d',
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
