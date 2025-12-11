import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/theme";

interface TaskTabsProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const TaskTabs = ({ activeTab, onTabChange }: TaskTabsProps) => {
  return (
    <View style={styles.tabContainer}>
      <TabButton
        label="To Do"
        isActive={activeTab === "To Do"}
        onPress={() => onTabChange("To Do")}
      />
      <TabButton
        label="On Going"
        isActive={activeTab === "In Progress"}
        onPress={() => onTabChange("In Progress")}
      />
      <TabButton
        label="Selesai"
        isActive={activeTab === "Completed"}
        onPress={() => onTabChange("Completed")}
      />
    </View>
  );
};

// Sub-komponen internal (hanya dipakai di sini)
const TabButton = ({ label, isActive, onPress }: any) => (
  <TouchableOpacity
    style={[styles.tabButton, isActive && styles.activeTabButton]}
    onPress={onPress}
  >
    <Text style={[styles.tabText, isActive && styles.activeTabText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  tabContainer: {
    flexDirection: "row",
    marginBottom: 20,
    gap: 10,
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "transparent",
  },
  activeTabButton: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabText: {
    fontSize: 14,
    color: COLORS.textLight,
    fontWeight: "600",
  },
  activeTabText: {
    color: "#FFF",
  },
});
