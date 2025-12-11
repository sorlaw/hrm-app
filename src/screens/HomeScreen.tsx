import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Import komponen yang sudah kita pecah
import { COLORS } from "@/src/constants/theme";
import { AttendanceCard } from "../components/home/AttendanceCard";
import { Header } from "../components/home/Header";
import { QuickActionGrid } from "../components/home/QuickActionGrid";
import { StatsOverview } from "../components/home/StatsOverview";

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. Header Section */}
        <Header name="Jeka" role="Full Stack Developer" />

        {/* 2. Hero Card (Gauge & Time) */}
        <AttendanceCard />

        {/* 3. Stats Rows */}
        <StatsOverview />

        {/* 4. Menu Grid */}
        <QuickActionGrid />

        {/* Spacer agar tidak tertutup bottom tab */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 20,
  },
});

export default HomeScreen;
