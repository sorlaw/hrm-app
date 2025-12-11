import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/theme";

export const EmptyState = () => {
  return (
    <View style={styles.emptyState}>
      <Feather name="check-circle" size={48} color="#D1D5DB" />
      <Text style={styles.emptyText}>Tidak ada tugas di sini</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  emptyState: {
    alignItems: "center",
    marginTop: 50,
  },
  emptyText: {
    marginTop: 10,
    color: COLORS.textLight,
  },
});
