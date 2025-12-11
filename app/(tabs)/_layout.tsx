import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";

// Pastikan path ini sesuai dengan lokasi Anda menyimpan file AnimatedTabBar
// Misalnya: src/components/navigation/AnimatedTabBar
import { AnimatedTabBar } from "@/src/components/navigation/AnimatedTabBar";

export default function TabLayout() {
  return (
    <Tabs
      tabBar={(props) => <AnimatedTabBar {...props} />}
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true, // Sembunyikan tab saat keyboard muncul
        tabBarShowLabel: false, // Label disembunyikan sesuai snippet awal Anda
      }}
    >
      {/* 1. HOME */}
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home" size={size ?? 24} color={color} />
          ),
        }}
      />

      {/* 2. ATTENDANCE */}
      <Tabs.Screen
        name="attendance"
        options={{
          title: "Attendance",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="time-outline" size={size ?? 24} color={color} />
          ),
        }}
      />

      {/* 3. CREATE (+) - Slot Tengah */}
      {/* Kita set null di sini karena Icon (+) Besar sudah dirender otomatis oleh AnimatedTabBar (FAB) */}
      <Tabs.Screen
        name="create"
        options={{
          title: "Create",
          tabBarIcon: () => null,
        }}
      />

      {/* 4. TASKS */}
      <Tabs.Screen
        name="tasks"
        options={{
          title: "Tasks",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="list-outline" size={size ?? 24} color={color} />
          ),
        }}
      />

      {/* 5. PROFILE */}
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="person" size={size ?? 24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
