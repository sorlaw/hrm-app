// FILE: app/_layout.tsx
import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler"; // 1. Import ini

export default function RootLayout() {
  return (
    // 2. Bungkus App dengan ini dan kasih style flex: 1
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" />
        {/* Route lain seperti form-cuti */}
        <Stack.Screen
          name="form-cuti"
          options={{ presentation: "modal", title: "Ajukan Cuti" }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
