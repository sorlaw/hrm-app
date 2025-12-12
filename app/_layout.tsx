import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          // 👇 INI KUNCINYA: Mengaktifkan animasi native iOS/Android
          animation: "default",
          // 👇 Agar user bisa swipe-back (geser dari kiri layar) di iOS
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="(tabs)" />

        {/* Opsional: Khusus Form, biasanya lebih enak pakai animasi Modal (Slide dari bawah) */}
        <Stack.Screen
          name="form-lembur"
          options={{
            presentation: "modal", // atau 'card' jika ingin slide dari samping
            animation: "slide_from_bottom",
          }}
        />

        <Stack.Screen name="form-cuti" options={{ presentation: "modal" }} />
        <Stack.Screen name="form-sakit" options={{ presentation: "modal" }} />
        <Stack.Screen name="form-klaim" options={{ presentation: "modal" }} />

        {/* Untuk halaman biasa (bukan form), biarkan ikut default (slide samping) */}
        <Stack.Screen name="lembur" />
      </Stack>
    </GestureHandlerRootView>
  );
}
