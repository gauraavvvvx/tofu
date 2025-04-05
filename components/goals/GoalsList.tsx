import React from 'react'
import { FlatList } from 'react-native'
import GoalItem from './GoalItem'

const GoalsList = ({ goals, onDeleteGoal }) => {
    return (
        <FlatList
            data={goals}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <GoalItem item={item} onDeleteGoal={onDeleteGoal} />
            )}
        />
    )
}

export default GoalsList
