import { Feather } from "@expo/vector-icons";
import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/theme";

interface MenuListItemProps {
  icon: string;
  label: string;
  onPress?: () => void;
  isToggle?: boolean;
  isLast?: boolean; // Opsional jika ingin styling tambahan
}

export const MenuListItem = ({
  icon,
  label,
  onPress,
  isToggle = false,
}: MenuListItemProps) => {
  const [isEnabled, setIsEnabled] = useState(true);

  return (
    <TouchableOpacity
      style={styles.menuListItem}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Feather
        name={icon as any}
        size={20}
        color={COLORS.primary}
        style={{ width: 25 }}
      />
      <Text style={styles.menuLabelText}>{label}</Text>

      {isToggle ? (
        <TouchableOpacity onPress={() => setIsEnabled(!isEnabled)}>
          <View
            style={[
              styles.toggleBackground,
              isEnabled
                ? { backgroundColor: COLORS.accent }
                : { backgroundColor: "#E5E7EB" },
            ]}
          >
            <View
              style={[
                styles.toggleCircle,
                isEnabled ? styles.toggleActive : styles.toggleInactive,
              ]}
            />
          </View>
        </TouchableOpacity>
      ) : (
        <Feather name="chevron-right" size={20} color="#D1D5DB" />
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  menuListItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
    justifyContent: "space-between",
  },
  menuLabelText: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
    color: COLORS.primary,
  },
  toggleBackground: {
    width: 45,
    height: 25,
    borderRadius: 25,
    justifyContent: "center",
    paddingHorizontal: 3,
  },
  toggleCircle: {
    width: 19,
    height: 19,
    borderRadius: 10,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 3,
  },
  toggleActive: {
    transform: [{ translateX: 20 }],
  },
  toggleInactive: {
    transform: [{ translateX: 0 }],
  },
});
