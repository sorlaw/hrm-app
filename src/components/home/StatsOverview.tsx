import { COLORS } from "@/src/constants/theme";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const StatsOverview = () => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Overview Cuti</Text>
      <View style={styles.statsRow}>
        <StatCard
          label="Cuti Tahunan"
          value="12"
          unit="Hari"
          icon="calendar"
          color={COLORS.indigo}
        />
        <StatCard
          label="Cuti Sakit"
          value="3"
          unit="Hari"
          icon="activity"
          color={COLORS.danger}
        />
      </View>
    </View>
  );
};

const StatCard = ({ label, value, unit, icon, color }: any) => (
  <View style={styles.statCard}>
    <View style={[styles.iconBox, { backgroundColor: color + "20" }]}>
      <Feather name={icon} size={20} color={color} />
    </View>
    <View>
      <Text style={styles.statValue}>
        {value} <Text style={styles.statUnit}>{unit}</Text>
      </Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 15,
  },
  statsRow: {
    flexDirection: "row",
    gap: 15,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.03,
  },
  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  statUnit: {
    fontSize: 12,
    fontWeight: "normal",
    color: COLORS.textLight,
  },
  statLabel: {
    fontSize: 12,
    color: COLORS.textLight,
  },
});
