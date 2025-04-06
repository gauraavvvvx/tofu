import * as React from 'react'
import { BottomNavigation, Text, useTheme } from 'react-native-paper'
import { View, Image, StyleSheet, Dimensions, StatusBar } from 'react-native'
import GoalsScreen from './goals'
import ProfilePage from './profile'

// Expanded color palette based on provided scheme
const COLORS = {
    background: '#050f10',
    positive: '#77cc6d',
    negative: '#c12121',
    accent: '#4a9e82', // Complementary teal for accents
    textPrimary: '#ffffff',
    textSecondary: '#b2c5c8',
    surface: '#0a1e20', // Slightly lighter than background for cards
    border: '#1a3034', // Subtle border color
    inactive: '#4c5e60', // Muted color for inactive elements
}

// Dummy placeholder screens with styled content
const ChartsRoute = () => (
    <View style={styles.screenContainer}>
        <Text style={styles.screenTitle}>Charts</Text>
    </View>
)

const HomeRoute = () => (
    <View style={styles.screenContainer}>
        <Text style={styles.screenTitle}>Home</Text>
    </View>
)

const HistoryRoute = () => (
    <View style={styles.screenContainer}>
        <Text style={styles.screenTitle}>History</Text>
    </View>
)

const MyComponent = () => {
    const [index, setIndex] = React.useState(2) // Center tab (Home)
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
    ])

    const renderScene = BottomNavigation.SceneMap({
        goals: GoalsScreen,
        visualization: ChartsRoute,
        home: HomeRoute,
        history: HistoryRoute,
        profile: ProfilePage,
    })

    const { width } = Dimensions.get('window')

    // Custom theme for BottomNavigation
    const theme = {
        colors: {
            primary: COLORS.positive,
            background: COLORS.background,
            surface: COLORS.surface,
            text: COLORS.textPrimary,
            disabled: COLORS.inactive,
            placeholder: COLORS.textSecondary,
            backdrop: COLORS.background,
        },
    }

    return (
        <View style={styles.container}>
            <StatusBar
                backgroundColor={COLORS.background}
                barStyle="light-content"
            />

            {/* Peeking Cat */}
            <Image
                source={require('../assets/images/peek-cat.gif')}
                style={[styles.catImage, { left: width / 2 - 35 }]} // Adjust 35 if image width changes
            />

            <BottomNavigation
                navigationState={{ index, routes }}
                onIndexChange={setIndex}
                renderScene={renderScene}
                barStyle={styles.bottomBar}
                activeColor={COLORS.positive}
                inactiveColor={COLORS.inactive}
                shifting={true}
                theme={theme}
                sceneAnimationEnabled={true}
            />
        </View>
    )
}

export default MyComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.background,
    },
    catImage: {
        position: 'absolute',
        bottom: 50, // Adjust based on tab bar height
        width: 70,
        height: 70,
        zIndex: 10,
        resizeMode: 'contain',
    },
    bottomBar: {
        backgroundColor: COLORS.surface,
        borderTopWidth: 1,
        borderTopColor: COLORS.border,
        elevation: 8,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
    },
    screenContainer: {
        flex: 1,
        backgroundColor: COLORS.background,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    screenTitle: {
        color: COLORS.textPrimary,
        fontSize: 28,
        fontWeight: 'bold',
    },
})
