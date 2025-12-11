import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

// Imports
import { Header } from "@/src/components/attendance/Header";
import { COLORS } from "@/src/constants/theme";
import { ClockCard } from "../components/attendance/ClockCard";
import { HistorySection } from "../components/attendance/HistorySection";
import { SmartCheckButton } from "../components/attendance/SmartCheckButton";

const AttendanceScreen = () => {
  // --- Logic State ---
  const [isCheckedIn, setIsCheckedIn] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Timer Effect
  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const handleToggleAttendance = () => {
    setIsCheckedIn(!isCheckedIn);
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. Header (Title & Location) */}
        <Header />

        {/* 2. Clock Card (Time & Date) */}
        <ClockCard currentTime={currentTime} />

        {/* 3. Action Button (Check In/Out) */}
        <View style={styles.actionContainer}>
          <SmartCheckButton
            isCheckedIn={isCheckedIn}
            onPress={handleToggleAttendance}
          />
        </View>

        {/* 4. Timeline History */}
        <HistorySection isCheckedIn={isCheckedIn} />

        {/* Spacer untuk Bottom Tab */}
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
    padding: 24,
  },
  actionContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
});

export default AttendanceScreen;
