import { View, Text, ScrollView } from 'react-native'
import { PieChart, LineChart } from 'react-native-gifted-charts'

export default function ChartScreen() {
    const pieData = [
        { value: 50, color: '#FFA500', label: 'Rent' },
        { value: 80, color: '#FF6347', label: 'Food' },
        { value: 40, color: '#90EE90', label: 'Utilities' },
        { value: 95, color: '#87CEEB', label: 'Savings' },
    ]

    const amount_spent = [
        0, 20, 18, 40, 36, 60, 54, 85, 35, 10, 20, 11, 50, 100, 45,
    ]

    const labels = [
        '1',
        '2',
        '3',
        '4',
        '5',
        '6',
        '7',
        '8',
        '9',
        '10',
        '11',
        '12',
        '13',
        '14',
    ]

    const lineData = amount_spent.map((value, index) => ({
        value,
        dataPointText: value.toString(),
        label: labels[index],
    }))

    // const lineData = [
    //     { value: 0, dataPointText: '0', label: '1' },
    //     { value: 20, dataPointText: '20' , label: '2'},
    //     { value: 18, dataPointText: '18', label: '3' },
    //     { value: 40, dataPointText: '40', label: '4' },
    //     { value: 36, dataPointText: '36' , label: '5'},
    //     { value: 60, dataPointText: '60' , label: '6'},
    //     { value: 54, dataPointText: '54' , label: '7'},
    //     { value: 85, dataPointText: '85' , label: '8'},
    //     { value: 50, dataPointText: '50' , label: '9'},
    //     { value: 30, dataPointText: '30' , label: '10'},

    // ]

    // const lineData2 = [
    //     { value: 0, dataPointText: '0' },
    //     { value: 10, dataPointText: '10' },
    //     { value: 8, dataPointText: '8' },
    //     { value: 58, dataPointText: '58' },
    //     { value: 56, dataPointText: '56' },
    //     { value: 78, dataPointText: '78' },
    //     { value: 74, dataPointText: '74' },
    //     { value: 98, dataPointText: '98' },
    // ]

    const amount_saved = [0, 10, 8, 58, 56, 78, 74, 98, 100, 87, 27, 40, 13, 55]

    const lineData2 = amount_saved.map((value, index) => ({
        value,
        dataPointText: value.toString(),
        label: labels[index],
    }))
    return (
        <ScrollView
            className="flex-1 bg-white"
            contentContainerStyle={{ alignItems: 'center', padding: 16 }}
        >
            <Text className="text-xl font-bold mb-4">Monthly Spending</Text>
            <PieChart
                data={pieData}
                showText
                textColor="black"
                radius={150}
                textSize={20}
                focusOnPress
                showValuesAsLabels
                xAxisLabelTextStyle={{ color: 'black', fontSize: 12 }}
                showTextBackground
                textBackgroundRadius={26}
            />
            {/* this is for pichart xaxis  */}
            <View className="mt-4">
                {pieData.map((item, index) => (
                    <View
                        key={index}
                        className="flex-row items-center space-x-2 mt-2"
                    >
                        <View
                            style={{
                                width: 15,
                                height: 15,
                                backgroundColor: item.color,
                                borderRadius: 4,
                            }}
                        />
                        <Text>{item.label}</Text>
                    </View>
                ))}
            </View>

            <Text className="text-xl font-bold mb-4">Daily Spending</Text>
            <LineChart
                initialSpacing={0}
                isAnimated
                data={lineData}
                spacing={50}
                thickness={5}
                textFontSize={15}
                hideRules
                hideYAxisText
                yAxisColor="#0BA5A4"
                showVerticalLines
                verticalLinesColor="rgba(14,164,164,0.5)"
                xAxisColor="#0BA5A4"
                color="#0BA5A4"
            />

            <Text className="text-xl font-bold mb-4">
                Savings against Spending
            </Text>
            <LineChart
                data={lineData}
                data2={lineData2}
                height={250}
                showVerticalLines
                spacing={44}
                initialSpacing={0}
                color1="skyblue"
                color2="orange"
                textColor1="green"
                dataPointsHeight={6}
                dataPointsWidth={6}
                dataPointsColor1="blue"
                dataPointsColor2="red"
                textShiftY={-2}
                textShiftX={-5}
                textFontSize={13}
            />

            <View className="flex-row justify-center space-x-4 mt-4">
                <View className="flex-row items-center space-x-2">
                    <View
                        style={{
                            width: 15,
                            height: 3,
                            backgroundColor: 'skyblue',
                        }}
                    />
                    <Text>Income</Text>
                </View>
                <View className="flex-row items-center space-x-2">
                    <View
                        style={{
                            width: 15,
                            height: 3,
                            backgroundColor: 'orange',
                        }}
                    />
                    <Text>Expenses</Text>
                </View>
            </View>
        </ScrollView>
    )
}
