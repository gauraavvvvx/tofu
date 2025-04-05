import React, { useState } from 'react'
import { Text, TouchableOpacity, Alert, View } from 'react-native'

// Update this function to handle numeric priority values
const getPriorityColor = (priority) => {
    // Check if priority is a number from the database
    if (typeof priority === 'number') {
        switch (priority) {
            case 4: // VERY_HIGH
                return 'bg-red-500'
            case 3: // HIGH
                return 'bg-orange-500'
            case 2: // MODERATE
                return 'bg-yellow-500'
            case 1: // LOW
                return 'bg-green-500'
            default:
                return 'bg-gray-200'
        }
    }

    // Handle string values for backwards compatibility
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

// Update this component to display priority as text
const GoalItem = ({ item, onDeleteGoal }) => {
    // Convert numeric priority back to text for display
    const getPriorityText = (priorityNum) => {
        switch (priorityNum) {
            case 4:
                return 'Very High'
            case 3:
                return 'High'
            case 2:
                return 'Moderate'
            case 1:
                return 'Low'
            default:
                return 'Unknown'
        }
    }

    const handleLongPress = () => {
        Alert.alert(
            'Delete Goal',
            `Are you sure you want to delete "${item.name}"?`,
            [
                {
                    text: 'Cancel',
                    style: 'cancel',
                },
                {
                    text: 'Delete',
                    onPress: () => onDeleteGoal(item.id),
                    style: 'destructive',
                },
            ],
            { cancelable: true }
        )
    }

    return (
        <TouchableOpacity
            className={`p-4 mb-3 rounded-lg ${getPriorityColor(item.priority)} shadow`}
            onLongPress={handleLongPress}
        >
            <Text className="text-lg font-semibold text-white">
                {item.name}
            </Text>
            <Text className="text-sm text-white">
                Priority:{' '}
                {typeof item.priority === 'number'
                    ? getPriorityText(item.priority)
                    : item.priority}
            </Text>
            <Text className="text-sm text-white">
                Goal: ₹{item.targetAmount} | Current: ₹{item.currentAmount || 0}
            </Text>
        </TouchableOpacity>
    )
}

export default GoalItem
