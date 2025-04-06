import React from 'react'
import {
	View,
	Text,
	TextInput,
	Modal,
	TouchableOpacity,
	StyleSheet,
	TouchableWithoutFeedback,
} from 'react-native'
import DateTimePickerModal from 'react-native-modal-datetime-picker'
import { Picker } from '@react-native-picker/picker'
import { Ionicons } from '@expo/vector-icons'

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
			animationType="slide"
			transparent={true}
			visible={modalVisible}
			onRequestClose={() => setModalVisible(false)}
			statusBarTranslucent={true}
		>
			<TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
				<View style={styles.modalOverlay}>
					<TouchableWithoutFeedback>
						<View style={styles.modalContent}>
							<Text style={styles.modalTitle}>Add New Goal</Text>

							<TextInput
								placeholder="Goal Name"
								placeholderTextColor="#7c8a93"
								value={newGoal.name}
								onChangeText={(text) =>
									setNewGoal({ ...newGoal, name: text })
								}
								style={styles.input}
							/>

							<TextInput
								placeholder="Goal Amount (₹)"
								placeholderTextColor="#7c8a93"
								keyboardType="numeric"
								value={newGoal.goal_amount}
								onChangeText={(text) =>
									setNewGoal({ ...newGoal, goal_amount: text })
								}
								style={styles.input}
							/>

							<TouchableOpacity
								onPress={() => setStartDatePickerVisible(true)}
								style={styles.dateButton}
							>
								<Text style={styles.dateButtonText}>
									Start Date: {newGoal.start_date || 'Select'}
								</Text>
								<Ionicons name="calendar-outline" size={20} color="#77cc6d" />
							</TouchableOpacity>

							<DateTimePickerModal
								isVisible={isStartDatePickerVisible}
								mode="date"
								onConfirm={handleStartDateConfirm}
								onCancel={() => setStartDatePickerVisible(false)}
								themeVariant="dark"
							/>

							<TouchableOpacity
								onPress={() => setEndDatePickerVisible(true)}
								style={styles.dateButton}
							>
								<Text style={styles.dateButtonText}>
									End Date: {newGoal.end_date || 'Select'}
								</Text>
								<Ionicons name="calendar-outline" size={20} color="#77cc6d" />
							</TouchableOpacity>

							<DateTimePickerModal
								isVisible={isEndDatePickerVisible}
								mode="date"
								onConfirm={handleEndDateConfirm}
								onCancel={() => setEndDatePickerVisible(false)}
								themeVariant="dark"
							/>

							<View style={styles.pickerContainer}>
								<Text style={styles.pickerLabel}>Priority:</Text>
								<Picker
									selectedValue={newGoal.priority}
									onValueChange={(value) =>
										setNewGoal({ ...newGoal, priority: value })
									}

									mode="dropdown"
									style={styles.picker}
									dropdownIconColor="#77cc6d"
								>
									<Picker.Item label="Low" value="LOW" color="#000" />
									<Picker.Item label="Moderate" value="MODERATE" color="#000" />
									<Picker.Item label="High" value="HIGH" color="#000" />
									<Picker.Item label="Very High" value="VERY_HIGH" color="#000" />
								</Picker>
							</View>

							<View style={styles.buttonContainer}>
								<TouchableOpacity
									onPress={() => setModalVisible(false)}
									style={[styles.button, styles.cancelButton]}
								>
									<Text style={styles.buttonText}>
										Cancel
									</Text>
								</TouchableOpacity>

								<TouchableOpacity
									onPress={addGoal}
									style={[styles.button, styles.addButton]}
								>
									<Text style={styles.buttonText}>
										Add Goal
									</Text>
								</TouchableOpacity>
							</View>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	)
}

const styles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		backgroundColor: 'rgba(5, 15, 16, 0.7)',
		justifyContent: 'center',
		alignItems: 'center',
	},
	modalContent: {
		width: '90%',
		backgroundColor: '#0a1e20',
		borderRadius: 16,
		padding: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
		borderWidth: 1,
		borderColor: '#77cc6d20',
	},
	modalTitle: {
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 20,
		color: '#77cc6d',
		textAlign: 'center',
	},
	input: {
		backgroundColor: '#071518',
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
		color: '#fff',
		borderWidth: 1,
		borderColor: '#77cc6d20',
	},
	dateButton: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: '#071518',
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
		borderWidth: 1,
		borderColor: '#77cc6d20',
	},
	dateButtonText: {
		color: '#fff',
	},
	pickerContainer: {
		marginBottom: 16,
	},
	pickerLabel: {
		color: '#000',
		marginBottom: 8,
	},
	picker: {
		backgroundColor: '#071518',
		color: '#fff',
		borderRadius: 8,
		borderWidth: 1,
		borderColor: '#77cc6d20',
	},
	buttonContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginTop: 10,
	},
	button: {
		flex: 1,
		padding: 14,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
	},
	cancelButton: {
		backgroundColor: '#1f2e30',
		marginRight: 8,
	},
	addButton: {
		backgroundColor: '#77cc6d',
		marginLeft: 8,
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
	},
});

export default GoalsModal
