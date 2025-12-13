import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/theme";

interface TaskItem {
  id: string;
  title: string;
  project: string;
  deadline: string;
  priority: string;
  status: string;
  progress: number;
}

interface TaskCardProps {
  item: TaskItem;
  onPress: () => void; // Klik Kartu (Ke Detail)
  onOptionPress: () => void; // Klik Titik Tiga (Ke Menu Edit/Hapus)
}

export const TaskCard = ({ item, onPress, onOptionPress }: TaskCardProps) => {
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "#EF4444";
      case "Medium":
        return "#F59E0B";
      default:
        return "#10B981";
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      activeOpacity={0.8}
      onPress={onPress} // <-- Navigasi ke Detail
    >
      {/* HEADER: Project, Priority, & Option Menu */}
      <View style={styles.cardHeader}>
        {/* Grup Kiri: Project & Priority */}
        <View style={styles.headerLeft}>
          <View style={styles.projectTag}>
            <Text style={styles.projectText}>{item.project}</Text>
          </View>
          <View
            style={[
              styles.priorityBadge,
              { backgroundColor: getPriorityColor(item.priority) + "20" },
            ]}
          >
            <Text
              style={[
                styles.priorityText,
                { color: getPriorityColor(item.priority) },
              ]}
            >
              {item.priority}
            </Text>
          </View>
        </View>

        {/* Grup Kanan: Tombol Titik Tiga */}
        <TouchableOpacity style={styles.optionBtn} onPress={onOptionPress}>
          <Feather name="more-vertical" size={20} color={COLORS.textLight} />
        </TouchableOpacity>
      </View>

      {/* Title */}
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>

      {/* Footer */}
      <View style={styles.footer}>
        <View style={styles.dateRow}>
          <Feather name="clock" size={14} color={COLORS.textLight} />
          <Text style={styles.dateText}>{item.deadline}</Text>
        </View>

        {item.status !== "Completed" ? (
          <Text style={styles.progressText}>{item.progress}%</Text>
        ) : (
          <Feather name="check-circle" size={18} color={COLORS.success} />
        )}
      </View>

      {/* Progress Bar */}
      <View style={styles.progressBarBg}>
        <View
          style={[
            styles.progressBarFill,
            {
              width: `${item.progress}%`,
              backgroundColor:
                item.progress === 100 ? COLORS.success : COLORS.primary,
            },
          ]}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#F3F4F6",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
    flex: 1,
    flexWrap: "wrap",
  },
  projectTag: {
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  projectText: { fontSize: 11, color: COLORS.text, fontWeight: "600" },
  priorityBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 8 },
  priorityText: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
  },

  // Style Tombol Titik Tiga
  optionBtn: {
    padding: 4,
    marginRight: -8,
    marginTop: -4, // Agar area sentuh enak tapi posisi pas
  },

  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 15,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  dateRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  dateText: { fontSize: 12, color: COLORS.textLight },
  progressText: { fontSize: 12, fontWeight: "bold", color: COLORS.primary },
  progressBarBg: {
    height: 6,
    backgroundColor: "#F3F4F6",
    borderRadius: 3,
    overflow: "hidden",
  },
  progressBarFill: { height: "100%", borderRadius: 3 },
});
