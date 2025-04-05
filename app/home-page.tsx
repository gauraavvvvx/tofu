import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import GoalsScreen from './goals';
import ProfilePage from './profile';

// Dummy placeholder screens
const ChartsRoute = () => <Text>Charts</Text>;
const HomeRoute = () => <Text>Home</Text>;
const HistoryRoute = () => <Text>History</Text>;

const MyComponent = () => {
	const [index, setIndex] = React.useState(2); // Center tab (Home)

	const [routes] = React.useState([
		{
			key: 'goals',
			title: 'Goals',
			focusedIcon: 'target',
			unfocusedIcon: 'target-variant',
		},
		{
			key: 'visualization',
			title: 'Charts',
			focusedIcon: 'chart-bar',
			unfocusedIcon: 'chart-bar',
		},
		{
			key: 'home',
			title: 'Home',
			focusedIcon: 'home-circle',
			unfocusedIcon: 'home-outline',
		},
		{
			key: 'history',
			title: 'History',
			focusedIcon: 'history',
			unfocusedIcon: 'history',
		},
		{
			key: 'profile',
			title: 'Profile',
			focusedIcon: 'account-circle',
			unfocusedIcon: 'account-circle-outline',
		},
	]);

	const renderScene = BottomNavigation.SceneMap({
		goals: GoalsScreen,
		visualization: ChartsRoute,
		home: HomeRoute,
		history: HistoryRoute,
		profile: ProfilePage,
	});

	const { width } = Dimensions.get('window');

	return (
		<View style={styles.container}>
			{/* Peeking Cat */}
			<Image
				source={require('../assets/images/peek-cat.gif')}
				style={[styles.catImage, { left: width / 2 - 35 }]} // Adjust 35 if image width changes
			/>

			<BottomNavigation
				navigationState={{ index, routes }}
				onIndexChange={setIndex}
				renderScene={renderScene}
			/>
		</View>
	);
};

export default MyComponent;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	catImage: {
		position: 'absolute',
		bottom: 50, // Adjust based on tab bar height
		width: 70,
		height: 70,
		zIndex: 10,
		resizeMode: 'contain',
	},
});
