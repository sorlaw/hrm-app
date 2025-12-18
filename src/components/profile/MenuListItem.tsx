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
  toggleValue?: boolean;
  onToggle?: () => void;
}

export const MenuListItem = ({
  icon,
  label,
  onPress,
  isToggle = false,
  toggleValue,
  onToggle,
}: MenuListItemProps) => {
  const [internalEnabled, setInternalEnabled] = useState(true);

  // Use controlled value if provided, otherwise internal state
  const isEnabled = toggleValue !== undefined ? toggleValue : internalEnabled;

  const handleToggle = () => {
    if (onToggle) {
      onToggle();
    } else {
      setInternalEnabled(!internalEnabled);
    }
  };

  return (
    <TouchableOpacity
      style={styles.menuListItem}
      onPress={isToggle ? handleToggle : onPress}
      activeOpacity={0.7}
      disabled={isToggle} // If it's a toggle item, the whole row click behavior might be different or same.
    // Usually in iOS settings, clicking row toggles it or does nothing.
    // Let's keep it simple: specific touchable for toggle, or whole row?
    // The code had `onPress` on parent TOuchableOpacity.
    // If isToggle, parent onPress triggers toggle logic?
    // Existing code: `onPress={onPress}`. If isToggle is true, `onPress` might be undefined.
    // Let's enable the parent to handle tap if it's not just a toggle switch.
    // But here, let's assume if isToggle, we want to toggle.
    >
      <Feather
        name={icon as any}
        size={20}
        color={COLORS.primary}
        style={{ width: 25 }}
      />
      <Text style={styles.menuLabelText}>{label}</Text>

      {isToggle ? (
        <TouchableOpacity onPress={handleToggle}>
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
