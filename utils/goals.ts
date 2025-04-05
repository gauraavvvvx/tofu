const addGoal = async () => {
    console.log('Goal added:', newGoal)
    setModalVisible(false)
    // Refresh goals list logic here
}

const deleteGoal = async (goalId) => {
    console.log('Goal deleted:', goalId)
    // Refresh goals list logic here
}
const updateGoal = async (goalId, updatedGoal) => {
    console.log('Goal updated:', goalId, updatedGoal)
}
