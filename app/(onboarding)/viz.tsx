import React, { useEffect, useState } from 'react'
import { ScrollView, Text, View, Dimensions } from 'react-native'
import Plotly from 'react-native-plotly'
import { fetchAllUserTransactions } from '@/utils/db/fetchAllUserTransactions'
import { type Transaction } from '@/libs/uploadTransaction'
import { PieChart, LineChart } from 'lucide-react-native'
import { WebView } from 'react-native-webview' // Required for Plotly

export default function ChartScreen() {
	const [transactions, setTransactions] = useState<Transaction[]>([])
	const screenWidth = Dimensions.get('window').width

	useEffect(() => {
		const fetchData = async () => {
			const data = await fetchAllUserTransactions()
			setTransactions(data)
		}
		fetchData()
	}, [])

	// Add explicit height for chart containers
	const chartContainerStyle = {
		height: 300,
		width: screenWidth - 32,
		backgroundColor: '#050f10',
		marginVertical: 16
	}

	const pieData = [
		{
			labels: ['Rent', 'Food', 'Utilities', 'Savings'],
			values: [50, 80, 40, 95],
			type: 'pie',
			marker: {
				colors: ['#FFA500', '#c12121', '#90EE90', '#77cc6d'],
			},
			textinfo: 'label+percent',
			insidetextorientation: 'radial',
			textfont: { color: '#FFFFFF' }, // Add text color
			hoverinfo: 'label+percent'
		},
	]

	const pieLayout = {
		...chartContainerStyle,
		margin: { t: 40, b: 40 },
		paper_bgcolor: '#050f10',
		font: { color: '#FFFFFF' }, // Global text color
		legend: {
			orientation: 'h',
			x: 0.035,
			font: { color: '#fff' },
		},
	}

	const amountSpent = [0, 20, 18, 40, 36, 60, 54, 85, 35, 10, 20, 11, 50, 100, 45]
	const amountSaved = [0, 10, 8, 58, 56, 78, 74, 98, 100, 87, 27, 40, 13, 55]
	const labels = Array.from({ length: amountSpent.length }, (_, i) => `${i + 1}`)

	const dailySpendingData = [
		{
			x: labels,
			y: amountSpent,
			type: 'scatter',
			mode: 'lines+markers+text',
			name: 'Spending',
			line: { color: '#c12121', width: 3 },
			marker: { size: 6 },
			text: amountSpent.map(String),
			textposition: 'top center',
			textfont: { color: '#FFFFFF' },
		},
	]

	const dailySpendingLayout = {
		...chartContainerStyle,
		paper_bgcolor: '#050f10',
		plot_bgcolor: '#050f10',
		xaxis: {
			title: 'Day',
			tickfont: { color: '#77cc6d' },
		},
		yaxis: {
			title: 'Amount',
			tickfont: { color: '#77cc6d' },
		},
		margin: { t: 0, b: 20, l: 50, r: 20 },
		font: { color: '#FFFFFF' },
	}

	const lineData = [
		{
			x: labels,
			y: amountSpent,
			type: 'scatter',
			mode: 'lines+markers+text',
			name: 'Expenses',
			text: amountSpent.map(String),
			textposition: 'top center',
			line: { color: '#c12121' },
			textfont: { color: '#FFFFFF' },
		},
		{
			x: labels,
			y: amountSaved,
			type: 'scatter',
			mode: 'lines+markers+text',
			name: 'Savings',
			text: amountSaved.map(String),
			textposition: 'top center',
			line: { color: '#77cc6d' },
			textfont: { color: '#FFFFFF' },
		},
	]

	const lineLayout = {
		height: 400,
		width: screenWidth - 32,
		paper_bgcolor: '#050f10',
		plot_bgcolor: '#050f10',
		xaxis: {
			title: 'Days',
			tickfont: { color: '#77cc6d' },
			showgrid: false,
		},
		yaxis: {
			title: 'Amount',
			tickfont: { color: '#77cc6d' },
			showgrid: true,
		},
		legend: {
			x: 0,
			y: -0.2,
			orientation: 'h',
			font: { color: '#fff' },
		},
		margin: { t: 20, b: 80 },
		font: { color: '#FFFFFF' },
	}

	const config = {
		displayModeBar: false,
		staticPlot: false // Enable interactive mode
	}

	return (
		<ScrollView
			className="flex-1 bg-[#050f10]"
			contentContainerStyle={{ alignItems: 'center', padding: 16 }}
		>
			{/* Pie Chart Section */}
			<View className="items-center mb-6">
				<PieChart size={36} color="#77cc6d" />
				<Text className="text-2xl text-white font-bold mt-2 mb-4">
					Monthly Spending
				</Text>
			</View>
			<View style={chartContainerStyle}>
				<Plotly
					data={pieData}
					layout={pieLayout}
					config={config}
				/>
			</View>

			{/* Daily Spending Chart Section */}
			<View className="items-center my-8">
				<LineChart size={36} color="#77cc6d" />
				<Text className="text-2xl text-white font-bold mt-2 mb-4">
					Daily Spending
				</Text>
				<View style={chartContainerStyle}>
					<Plotly
						data={dailySpendingData}
						layout={dailySpendingLayout}
						config={config}
					/>
				</View>
			</View>

			{/* Daily Spending vs Savings Chart Section */}
			<View className="items-center my-8">
				<Text className="text-2xl text-white font-bold mt-2 mb-4">
					Daily Spending vs Savings
				</Text>
				<View style={{ height: 400, width: screenWidth - 32 }}>
					<Plotly
						data={lineData}
						layout={lineLayout}
						config={config}
					/>
				</View>
			</View>
		</ScrollView>
	)
}
