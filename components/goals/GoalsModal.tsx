import React from 'react'
import {
    View,
    Text,
    Button,
    TextInput,
    Modal,
    TouchableOpacity,
} from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Picker } from '@react-native-picker/picker'

const GoalsModal = ({
    modalVisible,
    setModalVisible,
    newGoal,
    setNewGoal,
    isStartDatePickerVisible,
    setStartDatePickerVisible,
    isEndDatePickerVisible,
    setEndDatePickerVisible,
    handleStartDateConfirm,
    handleEndDateConfirm,
    addGoal,
}) => {
    return (
        <Modal
            visible={modalVisible}
            transparent={false}
            animationType="slide"
            onRequestClose={() => setModalVisible(false)}
            statusBarTranslucent={true}
        >
            <View className="flex-1 justify-center items-center bg-white">
                {/* Increased width to w-full with padding-x for margins */}
                <View className="w-full px-4 max-w-lg bg-white rounded-lg p-6 shadow-lg border-2 border-gray-300">
                    <Text className="text-xl font-bold mb-4 text-center">
                        Add New Goal
                    </Text>
                    <TextInput
                        className="border border-gray-300 rounded-lg px-3 py-2 mb-3"
                        placeholder="Goal Name"
                        value={newGoal.name}
                        onChangeText={(text) =>
                            setNewGoal({ ...newGoal, name: text })
                        }
                    />
                    <TextInput
                        className="border border-gray-300 rounded-lg px-3 py-2 mb-3"
                        placeholder="Goal Amount"
                        keyboardType="numeric"
                        value={newGoal.goal_amount}
                        onChangeText={(text) =>
                            setNewGoal({ ...newGoal, goal_amount: text })
                        }
                    />
                    <TouchableOpacity
                        onPress={() => setStartDatePickerVisible(true)}
                        className="border border-gray-300 rounded-lg px-3 py-2 mb-3"
                    >
                        <Text className="text-center text-blue-500">
                            Start Date: {newGoal.start_date || 'Select'}
                        </Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isStartDatePickerVisible}
                        mode="date"
                        onConfirm={handleStartDateConfirm}
                        onCancel={() => setStartDatePickerVisible(false)}
                    />
                    <TouchableOpacity
                        onPress={() => setEndDatePickerVisible(true)}
                        className="border border-gray-300 rounded-lg px-3 py-2 mb-3"
                    >
                        <Text className="text-center text-blue-500">
                            End Date: {newGoal.end_date || 'Select'}
                        </Text>
                    </TouchableOpacity>
                    <DateTimePickerModal
                        isVisible={isEndDatePickerVisible}
                        mode="date"
                        onConfirm={handleEndDateConfirm}
                        onCancel={() => setEndDatePickerVisible(false)}
                    />
                    <View className="border border-gray-300 rounded-lg px-3 py-2 mb-3">
                        <Picker
                            selectedValue={newGoal.priority}
                            onValueChange={(value) =>
                                setNewGoal({ ...newGoal, priority: value })
                            }
                            mode="dropdown"
                        >
                            <Picker.Item label="Very High" value="VERY_HIGH" />
                            <Picker.Item label="High" value="HIGH" />
                            <Picker.Item label="Moderate" value="MODERATE" />
                            <Picker.Item label="Low" value="LOW" />
                        </Picker>
                    </View>
                    <View className="flex-row justify-between mt-4">
                        <TouchableOpacity
                            onPress={() => setModalVisible(false)}
                            className="bg-red-500 py-2 px-4 rounded-lg w-5/12"
                        >
                            <Text className="text-white text-center">
                                Cancel
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={addGoal}
                            className="bg-blue-500 py-2 px-4 rounded-lg w-5/12"
                        >
                            <Text className="text-white text-center">
                                Add Goal
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default GoalsModal
