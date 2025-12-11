import { COLORS } from "@/src/constants/theme";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { Dimensions, StyleSheet, Text, View } from "react-native";
import SemiCircleGauge from "../shared/SemiCircleGauge";
// Pastikan path import SemiCircleGauge sesuai dengan lokasi file Anda

const { width } = Dimensions.get("window");

export const AttendanceCard = () => {
  return (
    <View style={styles.attendanceCard}>
      <View style={styles.attendanceHeader}>
        <Text style={styles.cardTitle}>Kehadiran Hari Ini</Text>
        <View style={styles.statusBadge}>
          <View style={styles.dot} />
          <Text style={styles.statusText}>Working</Text>
        </View>
      </View>

      <View style={styles.gaugeContainer}>
        <SemiCircleGauge
          score={6.5}
          maxScore={9}
          radius={width * 0.35}
          strokeWidth={25}
          color={COLORS.accent}
          bgColor="#E5E7EB"
          textColor={COLORS.primary}
        />
        <View style={styles.gaugeTextOverlay}>
          <Text style={styles.timerText}>06:30</Text>
          <Text style={styles.timerLabel}>Jam Kerja</Text>
        </View>
      </View>

      <View style={styles.checkInRow}>
        <TimeInfo
          label="Masuk"
          time="08:00 AM"
          icon="arrow-up-right"
          color={COLORS.success}
        />
        <View style={styles.dividerVertical} />
        <TimeInfo
          label="Pulang"
          time="--:-- PM"
          icon="arrow-down-left"
          color={COLORS.textLight}
        />
      </View>
    </View>
  );
};

// Komponen kecil internal untuk baris waktu (Masuk/Pulang)
const TimeInfo = ({ label, time, icon, color }: any) => (
  <View style={styles.timeInfo}>
    <Feather name={icon} size={18} color={color} />
    <View>
      <Text style={styles.timeLabel}>{label}</Text>
      <Text style={styles.timeValue}>{time}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  attendanceCard: {
    backgroundColor: COLORS.card,
    borderRadius: 24,
    padding: 20,
    alignItems: "center",
    marginBottom: 24,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
  },
  attendanceHeader: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: COLORS.primary,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F2FE",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: COLORS.accent,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    fontWeight: "600",
    color: "#0284C7",
  },
  gaugeContainer: {
    marginVertical: 10,
    alignItems: "center",
    justifyContent: "center",
    height: 150,
  },
  gaugeTextOverlay: {
    position: "absolute",
    top: 90,
    alignItems: "center",
  },
  timerText: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  timerLabel: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  checkInRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    marginTop: 10,
    paddingTop: 15,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
  },
  timeInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  dividerVertical: {
    width: 1,
    height: "100%",
    backgroundColor: "#F3F4F6",
  },
  timeLabel: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  timeValue: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
  },
});
