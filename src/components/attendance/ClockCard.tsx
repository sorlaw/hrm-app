import { COLORS } from "@/src/constants/theme";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface ClockCardProps {
  currentTime: Date;
}

export const ClockCard = ({ currentTime }: ClockCardProps) => {
  return (
    <View style={styles.clockCard}>
      <Text style={styles.timeText}>
        {currentTime.toLocaleTimeString("id-ID", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })}
      </Text>
      <Text style={styles.dateText}>
        {currentTime.toLocaleDateString("id-ID", {
          weekday: "long",
          year: "numeric",
          month: "short",
          day: "numeric",
        })}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  clockCard: {
    alignItems: "center",
    marginBottom: 40,
  },
  timeText: {
    fontSize: 48,
    fontWeight: "bold",
    color: COLORS.primary,
    fontVariant: ["tabular-nums"],
  },
  dateText: {
    fontSize: 14,
    color: COLORS.textLight,
    marginTop: -5,
  },
});
