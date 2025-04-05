import React from 'react'
import { Text, TouchableOpacity } from 'react-native'

const getPriorityColor = (priority) => {
    switch (priority) {
        case 'VERY_HIGH':
            return 'bg-red-500' // Red for VERY_HIGH priority
        case 'HIGH':
            return 'bg-orange-500' // Orange for HIGH priority
        case 'MODERATE':
            return 'bg-yellow-500' // Yellow for MODERATE priority
        case 'LOW':
            return 'bg-green-500' // Green for LOW priority
        default:
            return 'bg-gray-200' // Default gray background
    }
}

const GoalItem = ({ item, onDeleteGoal }) => {
    return (
        <TouchableOpacity
            className={`p-4 mb-3 rounded-lg ${getPriorityColor(item.priority)} shadow`}
            onLongPress={() => onDeleteGoal(item.id)}
        >
            <Text className="text-lg font-semibold text-white">
                {item.name}
            </Text>
            <Text className="text-sm text-white">
                Priority: {item.priority}
            </Text>
        </TouchableOpacity>
    )
}

export default GoalItem
