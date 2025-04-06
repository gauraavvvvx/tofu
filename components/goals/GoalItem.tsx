import React from 'react'
import { Text, TouchableOpacity, Alert, View, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

// Update this function to handle numeric priority values
const getPriorityColor = (priority) => {
    // Check if priority is a number from the database
    if (typeof priority === 'number') {
        switch (priority) {
            case 4: // VERY_HIGH
                return '#c12121' // using the negative color for very high priority
            case 3: // HIGH
                return '#e06666'
            case 2: // MODERATE
                return '#f1c232'
            case 1: // LOW
                return '#77cc6d' // using the positive color for low priority
            default:
                return '#7c8a93'
        }
    }
    // Handle string values for backwards compatibility
    switch (priority) {
        case 'VERY_HIGH':
            return '#c12121'
        case 'HIGH':
            return '#e06666'
        case 'MODERATE':
            return '#f1c232'
        case 'LOW':
            return '#77cc6d'
        default:
            return '#7c8a93'
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

    // Calculate progress percentage
    const progressPercentage = (item.currentAmount / item.targetAmount) * 100 || 0
    const priorityColor = getPriorityColor(item.priority)

    return (
        <TouchableOpacity 
            style={styles.container}
            onLongPress={handleLongPress}
            activeOpacity={0.7}
        >
            <View style={styles.header}>
                <Text style={styles.title}>{item.name}</Text>
                <View style={[styles.priorityBadge, { backgroundColor: priorityColor }]}>
                    <Text style={styles.priorityText}>
                        {typeof item.priority === 'number'
                            ? getPriorityText(item.priority)
                            : item.priority}
                    </Text>
                </View>
            </View>
            
            <View style={styles.amounts}>
                <Text style={styles.amountText}>
                    Goal: <Text style={styles.amountValue}>₹{item.targetAmount.toLocaleString()}</Text>
                </Text>
                <Text style={styles.amountText}>
                    Saved: <Text style={styles.amountValue}>₹{(item.currentAmount || 0).toLocaleString()}</Text>
                </Text>
            </View>

            <View style={styles.progressContainer}>
                <View style={styles.progressBackground}>
                    <View 
                        style={[
                            styles.progressBar, 
                            { 
                                width: `${Math.min(progressPercentage, 100)}%`,
                                backgroundColor: progressPercentage >= 100 ? '#77cc6d' : '#4a90e2'
                            }
                        ]} 
                    />
                </View>
                <Text style={styles.progressText}>{progressPercentage.toFixed(1)}%</Text>
            </View>

            <View style={styles.footer}>
                <Text style={styles.dateText}>
                    {item.startDate} - {item.endDate}
                </Text>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#0a1e20',
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        borderWidth: 1,
        borderColor: '#77cc6d20',
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 12,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#fff',
        flex: 1,
    },
    priorityBadge: {
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 12,
    },
    priorityText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold',
    },
    amounts: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 12,
    },
    amountText: {
        color: '#7c8a93',
        fontSize: 14,
    },
    amountValue: {
        color: '#fff',
        fontWeight: '600',
    },
    progressContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    progressBackground: {
        flex: 1,
        height: 8,
        backgroundColor: '#071518',
        borderRadius: 4,
        marginRight: 10,
        overflow: 'hidden',
    },
    progressBar: {
        height: '100%',
        borderRadius: 4,
    },
    progressText: {
        color: '#77cc6d',
        fontSize: 14,
        fontWeight: 'bold',
        width: 45,
        textAlign: 'right',
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        marginTop: 4,
    },
    dateText: {
        color: '#7c8a93',
        fontSize: 12,
    }
});

export default GoalItem
