import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/theme";

interface UserData {
  name: string;
  jobTitle: string;
  employeeId: string;
}

interface ProfileHeaderProps {
  user: UserData;
}

export const ProfileHeader = ({ user }: ProfileHeaderProps) => {
  // Ambil inisial nama (Misal "Putra Jangjaya" -> "P J")
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join(" ")
    .toUpperCase();

  return (
    <View style={styles.profileHeader}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>{initials}</Text>
      </View>
      <Text style={styles.nameText}>{user.name}</Text>
      <Text style={styles.jobTitleText}>
        {user.jobTitle} - {user.employeeId}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  profileHeader: {
    alignItems: "center",
    paddingVertical: 30,
    marginBottom: 10,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: "#E0F7FA",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    borderWidth: 3,
    borderColor: COLORS.accent,
  },
  avatarText: {
    fontSize: 30,
    fontWeight: "bold",
    color: COLORS.accent,
  },
  nameText: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  jobTitleText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: 4,
  },
});
