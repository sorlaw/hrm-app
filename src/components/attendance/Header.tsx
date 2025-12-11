import { COLORS } from "@/src/constants/theme";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

export const Header = () => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Absensi</Text>
      <View style={styles.locationBadge}>
        <Feather name="map-pin" size={14} color={COLORS.accent} />
        <Text style={styles.locationText}>Kantor Pusat (WIFO)</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  locationBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 191, 255, 0.1)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 6,
  },
  locationText: {
    fontSize: 12,
    color: COLORS.accent,
    fontWeight: "600",
  },
});
