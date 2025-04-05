import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PaymentScanner() {
  const [permission, requestPermission] = useCameraPermissions();
  const [isProcessing, setIsProcessing] = useState(false); // State to prevent multiple scans
  const router = useRouter();

  if (!permission) {
    // Camera permissions are still loading.
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleBarcodeScanned = (event: { data: string }) => {
    if (isProcessing) return; // Prevent multiple scans
    setIsProcessing(true); // Set processing to true to block further scans

    router.push({
      pathname: "/payments/amountEnter",
      params: { upiUri: event.data },
    });

    // Optionally reset `isProcessing` after navigation is complete
    setTimeout(() => setIsProcessing(false), 2000); // Adjust timeout as needed
  };

  return (
    <View className="flex flex-1 justify-center">
      <CameraView
        className="flex flex-1 h-[500px] w-full"
        facing={"back"}
        barcodeScannerSettings={{
          barcodeTypes: ["qr"],
        }}
        onBarcodeScanned={handleBarcodeScanned}
      >
        <View className="h-[300px]" />
      </CameraView>
      <View className="flex flex-row justify-center items-center mt-5 w-full">
        <TouchableOpacity
          className="bg-red-400 rounded-lg p-4"
          onPress={() => router.back()}
        >
          <Text className="text-white text-lg">Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'transparent',
    margin: 64,
  },
  button: {
    flex: 1,
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});