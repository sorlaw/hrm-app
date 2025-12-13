import { Stack } from "expo-router";
import { GestureHandlerRootView } from "react-native-gesture-handler";

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "default",
          gestureEnabled: true,
        }}
      >
        <Stack.Screen name="(tabs)" />

        {/* --- FORM (MODAL STYLE: Slide dari Bawah) --- */}
        <Stack.Screen
          name="form-lembur"
          options={{ presentation: "modal", animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="form-cuti"
          options={{ presentation: "modal", animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="form-sakit"
          options={{ presentation: "modal", animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="form-klaim"
          options={{ presentation: "modal", animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="form-dinas"
          options={{ presentation: "modal", animation: "slide_from_bottom" }}
        />
        <Stack.Screen
          name="form-tugas"
          options={{ presentation: "modal", animation: "slide_from_bottom" }}
        />

        {/* --- DETAIL SCREEN (CARD STYLE: Slide dari Samping) --- */}
        <Stack.Screen
          name="lembur"
          options={{ animation: "slide_from_right" }}
        />

        {/* 👇 TAMBAHKAN INI: Slip Gaji */}
        <Stack.Screen
          name="slip-gaji"
          options={{
            animation: "slide_from_right", // Masuk dari kanan, terasa lebih natural untuk menu detail
          }}
        />
        <Stack.Screen
          name="tim-saya"
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="notifikasi"
          options={{ animation: "slide_from_right" }}
        />
        <Stack.Screen
          name="detail-tugas"
          options={{ animation: "slide_from_right" }}
        />
      </Stack>
    </GestureHandlerRootView>
  );
}
