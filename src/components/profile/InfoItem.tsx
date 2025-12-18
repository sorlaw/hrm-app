import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "../../constants/theme";

interface InfoItemProps {
  icon: string;
  label: string;
  value: string;
  isLast?: boolean;
}

export const InfoItem = ({
  icon,
  label,
  value,
  isLast = false,
}: InfoItemProps) => {
  return (
    <View>
      <View style={styles.infoItem}>
        <Feather
          name={icon as any}
          size={18}
          color={COLORS.textLight}
          style={{ width: 25 }}
        />
        <View style={styles.infoDetails}>
          <Text style={styles.infoLabel}>{label}</Text>
          <Text style={styles.infoValue}>{value}</Text>
        </View>
      </View>
      {!isLast && <View style={styles.divider} />}
    </View>
  );
};

const styles = StyleSheet.create({
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
  },
  infoDetails: {
    flex: 1,
    marginLeft: 10,
  },
  infoLabel: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  infoValue: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: "#F3F4F6",
    marginLeft: 35,
  },
});
