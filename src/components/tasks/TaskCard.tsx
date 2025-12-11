import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { COLORS } from "../../constants/theme";

// Warna khusus priority (bisa dipindah ke theme.ts jika mau)
const PRIORITY_COLORS = {
  High: "#EF4444", // Merah
  Medium: "#F59E0B", // Kuning
  Low: "#10B981", // Hijau
};

interface TaskItem {
  id: string;
  title: string;
  project: string;
  deadline: string;
  priority: string;
  status: string;
  progress: number;
}

export const TaskCard = ({ item }: { item: TaskItem }) => {
  const getPriorityColor = (priority: string) => {
    return (
      PRIORITY_COLORS[priority as keyof typeof PRIORITY_COLORS] ||
      COLORS.textLight
    );
  };

  const priorityColor = getPriorityColor(item.priority);

  return (
    <View style={styles.taskCard}>
      {/* Header Kartu: Priority & Menu */}
      <View style={styles.cardHeader}>
        <View
          style={[
            styles.priorityBadge,
            { backgroundColor: priorityColor + "15" },
          ]}
        >
          <Text style={[styles.priorityText, { color: priorityColor }]}>
            {item.priority} Priority
          </Text>
        </View>
        <TouchableOpacity>
          <Feather name="more-horizontal" size={20} color={COLORS.textLight} />
        </TouchableOpacity>
      </View>

      {/* Judul & Deskripsi */}
      <Text style={styles.taskTitle}>{item.title}</Text>
      <Text style={styles.projectLabel}>{item.project}</Text>

      {/* Progress Bar (Hanya untuk In Progress) */}
      {item.status === "In Progress" && (
        <View style={styles.progressContainer}>
          <View style={styles.progressBarBg}>
            <View
              style={[styles.progressBarFill, { width: `${item.progress}%` }]}
            />
          </View>
          <Text style={styles.progressText}>{item.progress}%</Text>
        </View>
      )}

      {/* Footer: Deadline & Team */}
      <View style={styles.cardFooter}>
        <View style={styles.deadlineInfo}>
          <Feather name="clock" size={14} color={COLORS.textLight} />
          <Text style={styles.deadlineText}>{item.deadline}</Text>
        </View>

        {/* Avatar Tim (Dummy) */}
        <View style={styles.avatarGroup}>
          <View style={[styles.avatar, { backgroundColor: "#FFCCBC" }]}>
            <Text style={styles.avatarText}>R</Text>
          </View>
          <View
            style={[
              styles.avatar,
              { backgroundColor: "#C5CAE9", marginLeft: -10 },
            ]}
          >
            <Text style={styles.avatarText}>A</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  taskCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  priorityText: {
    fontSize: 10,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 4,
  },
  projectLabel: {
    fontSize: 12,
    color: COLORS.textLight,
    marginBottom: 12,
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 15,
  },
  progressBarBg: {
    flex: 1,
    height: 6,
    backgroundColor: "#F3F4F6",
    borderRadius: 3,
  },
  progressBarFill: {
    height: "100%",
    backgroundColor: COLORS.accent,
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    fontWeight: "bold",
    color: COLORS.accent,
  },
  cardFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 12,
  },
  deadlineInfo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  deadlineText: {
    fontSize: 12,
    color: COLORS.textLight,
  },
  avatarGroup: {
    flexDirection: "row",
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFF",
  },
  avatarText: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#333",
  },
});
