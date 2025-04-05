import * as React from 'react';
import { BottomNavigation, Text } from 'react-native-paper';
import GoalsScreen from './goals';
const ChartsRoute = () => <Text>Charts</Text>;
const HomeRoute = () => <Text>Home</Text>;
const HistoryRoute = () => <Text>History</Text>;
const ProfileRoute = () => <Text>Profile</Text>;

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
		profile: ProfileRoute,
	});

	return (
		<BottomNavigation
			navigationState={{ index, routes }}
			onIndexChange={setIndex}
			renderScene={renderScene}
		/>
	);
};

export default MyComponent;
