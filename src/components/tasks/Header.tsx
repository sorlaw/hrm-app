import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/theme";

interface HeaderProps {
  taskCount: number;
  onAddPress?: () => void;
}

export const Header = ({ taskCount, onAddPress }: HeaderProps) => {
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.headerTitle}>Tugas Saya</Text>
        <Text style={styles.headerSubtitle}>
          {taskCount} Tugas menunggu penyelesaian
        </Text>
      </View>
      <TouchableOpacity style={styles.addButton} onPress={onAddPress}>
        <Feather name="plus" size={24} color="#FFF" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textLight,
  },
  addButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 12,
    elevation: 2,
  },
});
