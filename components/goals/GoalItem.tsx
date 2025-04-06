import React from 'react'
import { Text, TouchableOpacity, Alert, View } from 'react-native'

// Update to handle numeric priority values with decimal places
const getPriorityColor = (priority) => {
    // For calculated priority values (decimals)
    if (typeof priority === 'number') {
        if (priority >= 4) return 'bg-red-500' // Very High (4+)
        if (priority >= 3) return 'bg-orange-500' // High (3-4)
        if (priority >= 2) return 'bg-yellow-500' // Moderate (2-3)
        if (priority >= 1) return 'bg-green-500' // Low (1-2)
        return 'bg-gray-200' // Default
    }

    // Legacy support for string values
    switch (priority) {
        case 'VERY_HIGH':
            return 'bg-red-500'
        case 'HIGH':
            return 'bg-orange-500'
        case 'MODERATE':
            return 'bg-yellow-500'
        case 'LOW':
            return 'bg-green-500'
        default:
            return 'bg-gray-200'
    }
}

// Format date strings for display (YYYY-MM-DD to DD/MM/YYYY)
const formatDate = (dateStr) => {
    if (!dateStr) return 'Not set'
    const parts = dateStr.split('-')
    if (parts.length !== 3) return dateStr
    return `${parts[2]}/${parts[1]}/${parts[0]}`
}

// Calculate days remaining until deadline
const calculateDaysRemaining = (endDate) => {
    if (!endDate) return 'No deadline'
    const deadline = new Date(endDate)
    const today = new Date()
    const timeDiff = deadline.getTime() - today.getTime()
    const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24))
    return daysDiff > 0 ? `${daysDiff} days left` : 'Past due'
}

const GoalItem = ({ item, onDeleteGoal }) => {
    // Convert numeric priority to text for display
    const getPriorityText = (priorityNum) => {
        if (priorityNum >= 4) return 'Very High'
        if (priorityNum >= 3) return 'High'
        if (priorityNum >= 2) return 'Moderate'
        if (priorityNum >= 1) return 'Low'
        return 'Unknown'
    }

    const handleLongPress = () => {
        Alert.alert(
            'Delete Goal',
            `Are you sure you want to delete "${item.name}"?`,
            [
                { text: 'Cancel', style: 'cancel' },
                {
                    text: 'Delete',
                    onPress: () => onDeleteGoal(item.id),
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        )
    }

    // Get dates from the item (handling property name differences)
    const startDate = item.startDate || item.start_date
    const endDate = item.endDate || item.end_date
    const daysRemaining = calculateDaysRemaining(endDate)

    // Get user priority and calculated priority
    const userPriority =
        item.userPriority ||
        (typeof item.priority === 'number'
            ? Math.floor(item.priority)
            : item.priority)
    const calculatedPriority =
        typeof item.priority === 'number' ? item.priority.toFixed(2) : 'N/A'

    return (
        <TouchableOpacity
            className={`p-4 mb-3 rounded-lg ${getPriorityColor(item.priority)} shadow`}
            onLongPress={handleLongPress}
        >
            <Text className="text-lg font-semibold text-white">
                {item.name}
            </Text>
            <View className="flex-row justify-between">
                <Text className="text-sm text-white">
                    Priority: {getPriorityText(item.priority)} (
                    {calculatedPriority})
                </Text>
                <Text className="text-sm text-white font-bold">
                    {daysRemaining}
                </Text>
            </View>
            <Text className="text-sm text-white">
                Goal: ₹{item.targetAmount || item.goal_amount} | Current: ₹
                {item.currentAmount || item.amount_saved || 0}
            </Text>
            <Text className="text-sm text-white mt-1">
                Start: {formatDate(startDate)} | End: {formatDate(endDate)}
            </Text>
        </TouchableOpacity>
    )
}

export default GoalItem
