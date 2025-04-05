import { View } from 'react-native';
import { TextInput, Card } from 'react-native-paper'
import { useState } from 'react';
export default function OnboardingScreen() {
	const [text, setText] = useState("");
	return (
		// <Card className='flex flex-row w-full mt-12 items-center justify-center bg-slate-900'>
		// 	<Card.Content>:w
		//
		// 		<TextInput label={"Name"} mode='outlined' value={text} />
		// 	</Card.Content>
		// </Card>
		<View className='flex items-center justify-center'>
			<View className='flex flex-row items-center rounded-xl justify-center border-2 border-gray-300 shadow-sm mt-12 bg-white/35 w-4/5 h-3/4'>

			</View>
		</View>
	);
}

