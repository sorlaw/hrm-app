import { COLORS } from "@/src/constants/theme";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

interface HeaderProps {
  name: string;
  role: string;
}

export const Header = ({ name, role }: HeaderProps) => {
  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.greeting}>Halo, {name} 👋</Text>
        <Text style={styles.subGreeting}>{role}</Text>
      </View>
      <TouchableOpacity style={styles.notifButton}>
        <Ionicons
          name="notifications-outline"
          size={24}
          color={COLORS.primary}
        />
        <View style={styles.badge} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 24,
  },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  subGreeting: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  notifButton: {
    padding: 10,
    backgroundColor: COLORS.card,
    borderRadius: 12,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  badge: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "red",
    borderWidth: 1,
    borderColor: COLORS.card,
  },
});
