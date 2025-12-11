import { COLORS } from "@/src/constants/theme";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const QuickActionGrid = () => {
  return (
    <View>
      <Text style={styles.sectionTitle}>Menu Cepat</Text>
      <View style={styles.menuGrid}>
        <MenuButton icon="file-text" label="Slip Gaji" />
        <MenuButton icon="clock" label="Lembur" />
        <MenuButton icon="users" label="Tim Saya" />
        <MenuButton icon="briefcase" label="Dinas" />
      </View>
    </View>
  );
};

const MenuButton = ({ icon, label }: any) => (
  <TouchableOpacity style={styles.menuButton}>
    <View style={styles.menuIconContainer}>
      <Feather name={icon} size={24} color={COLORS.primary} />
    </View>
    <Text style={styles.menuLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 15,
  },
  menuGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 15,
  },
  menuButton: {
    width: "47%",
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 16,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOpacity: 0.03,
    marginBottom: 5,
  },
  menuIconContainer: {
    width: 50,
    height: 50,
    backgroundColor: COLORS.background,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.primary,
  },
});
