import React from 'react'
import { FlatList, View, Text, StyleSheet } from 'react-native'
import GoalItem from './GoalItem'

const GoalsList = ({ goals, onDeleteGoal }) => {
    if (goals.length === 0) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>No goals yet. Add your first goal!</Text>
            </View>
        );
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
        color: '#7c8a93',
        fontSize: 16,
        textAlign: 'center',
    }
});

export default GoalsList
