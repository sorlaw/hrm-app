import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { COLORS } from "../../constants/theme";

interface LogoutButtonProps {
  onPress: () => void;
}

export const LogoutButton = ({ onPress }: LogoutButtonProps) => {
  return (
    <TouchableOpacity style={styles.logoutButton} onPress={onPress}>
      <Feather name="log-out" size={20} color={COLORS.danger} />
      <Text style={styles.logoutText}>Keluar Akun</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FEE2E2", // Light Red
    padding: 15,
    borderRadius: 16,
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.danger,
  },
});
