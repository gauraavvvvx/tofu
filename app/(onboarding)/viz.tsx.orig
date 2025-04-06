import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import Plotly from 'react-native-plotly'

export default function ChartScreen() {
    // Pie chart data
    const pieData = [
        {
            labels: ['Rent', 'Food', 'Utilities', 'Savings'],
            values: [50, 80, 40, 95],
            type: 'pie',
            marker: {
                colors: ['#FFA500', '#FF6347', '#90EE90', '#87CEEB'],
            },
            textinfo: 'label+percent',
            insidetextorientation: 'radial',
        },
    ]

    // Line chart data
    const amountSpent = [
        0, 20, 18, 40, 36, 60, 54, 85, 35, 10, 20, 11, 50, 100, 45,
    ]
    const amountSaved = [0, 10, 8, 58, 56, 78, 74, 98, 100, 87, 27, 40, 13, 55]
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
        '15',
    ]

    const lineData = [
        {
            x: labels,
            y: amountSpent,
            type: 'scatter',
            mode: 'lines+markers+text',
            name: 'Expenses',
            text: amountSpent.map(String),
            textposition: 'top center',
            line: { color: '#0BA5A4' },
        },
        {
            x: labels,
            y: amountSaved,
            type: 'scatter',
            mode: 'lines+markers+text',
            name: 'Savings',
            text: amountSaved.map(String),
            textposition: 'top center',
            line: { color: 'orange' },
        },
    ]

    const dailySpendingData = [
        {
            x: labels,
            y: amountSpent,
            type: 'scatter',
            mode: 'lines+markers+text',
            name: 'Spending',
            line: { color: '#0BA5A4', width: 3 },
            marker: { size: 6 },
            text: amountSpent.map((v) => v.toString()),
            textposition: 'top center',
        },
    ]

    const dailySpendingLayout = {
        dragmode: false,
        autosize: false,
        height: 300,
        width: 600,
        xaxis: {
            title: 'Day',
            tickfont: { color: '#333' },
        },
        yaxis: {
            title: 'Amount',
            tickfont: { color: '#333' },
        },
        margin: { t: 0, b: 20, l: 50, r: 20 },
    }

    const plotlyConfig = {
        displayModeBar: false,
        scrollZoom: false,
        staticPlot: true,
    }

    const pieLayout = {
        height: 300,
        width: 500,
        margin: { t: 40, b: 40 },
        legend: {
            orientation: 'h',
            x: 0.035,
        },
    }

    const lineLayout = {
        height: 400,
        width: 700,
        dragmode: false,
        xaxis: {
            title: 'Days',
            showgrid: false,
            tickfont: { color: '#333' },
        },
        yaxis: {
            title: 'Amount',
            showgrid: true,
        },
        legend: {
            x: 0,
            y: -0.2,
            orientation: 'h',
        },
        margin: { t: 20, b: 80 },
    }

    const config = {
        scrollZoom: false,
        displayModeBar: false,
    }

    return (
        <ScrollView
            className="flex-1 bg-white"
            contentContainerStyle={{ alignItems: 'center', padding: 16 }}
        >
            <Text className="text-xl font-bold mb-4">Monthly Spending</Text>
            <Plotly
                data={pieData}
                layout={pieLayout}
                config={config}
                style={{ height: 300, width: 500 }}
            />

            <View className="flex-1 items-center justify-center bg-white">
                <Text className="text-xl font-bold mb-4">Daily Spending</Text>
                <Plotly
                    data={dailySpendingData}
                    layout={dailySpendingLayout}
                    config={plotlyConfig}
                    style={{ height: 300, width: 350 }}
                />
            </View>

            <Text className="text-xl font-bold my-4">
                Daily Spending against Savings
            </Text>
            <Plotly
                data={lineData}
                layout={lineLayout}
                config={config}
                style={{ height: 400, width: 350 }}
            />
        </ScrollView>
    )
}
