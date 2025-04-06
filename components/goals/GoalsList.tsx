import React from 'react'
import { FlatList, View, Text, StyleSheet, RefreshControl } from 'react-native'
import GoalItem from './GoalItem'

const GoalsList = ({ goals, onDeleteGoal, refreshing, onRefresh }) => {
    const updateGoal = async (nextPriorityGoal, newAmount, isCompleted) => {
        await db.runAsync(
            'UPDATE goals SET currentAmount = ?, completed = ? WHERE id = ?',
            [newAmount, isCompleted ? 1 : 0, nextPriorityGoal.id]
        )
    }

    if (goals.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>
                    No active goals. Add a new goal to start saving!
                </Text>
            </View>
        )
    }

    return (
        <FlatList
            data={goals}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
                <GoalItem item={item} onDeleteGoal={onDeleteGoal} />
            )}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
            refreshControl={
                <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    tintColor="#77cc6d"
                />
            }
        />
    )
}

const styles = StyleSheet.create({
    list: {
        paddingBottom: 80, // Extra space at bottom for FAB
    },
    emptyContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    emptyText: {
        fontSize: 16,
        color: '#77cc6d',
        textAlign: 'center',
    },
})

export default GoalsList
