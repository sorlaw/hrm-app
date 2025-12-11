import { COLORS } from "@/src/constants/theme";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

interface HistorySectionProps {
  isCheckedIn: boolean;
}

export const HistorySection = ({ isCheckedIn }: HistorySectionProps) => {
  return (
    <View style={styles.historySection}>
      <Text style={styles.sectionTitle}>Riwayat Hari Ini</Text>
      <View style={styles.timelineContainer}>
        {/* Item 1: Absen Masuk */}
        <TimelineItem
          time={isCheckedIn ? "08:00" : "--:--"}
          title="Absen Masuk"
          subtitle={isCheckedIn ? "Tepat Waktu" : "Belum melakukan absen"}
          status={isCheckedIn ? "success" : "neutral"}
          isLast={!isCheckedIn}
        />

        {/* Item 2: Absen Pulang (Muncul jika sudah Check In) */}
        {isCheckedIn && (
          <TimelineItem
            time="--:--"
            title="Absen Pulang"
            subtitle="Menunggu jadwal pulang"
            status="neutral"
            isLast={true}
          />
        )}
      </View>
    </View>
  );
};

// --- Sub-Component: TimelineItem ---
const TimelineItem = ({ time, title, subtitle, status, isLast }: any) => {
  let iconColor = COLORS.textLight;
  let iconName = "circle";

  if (status === "success") {
    iconColor = COLORS.success;
    iconName = "check-circle";
  } else if (status === "warning") {
    iconColor = "#F59E0B"; // Warning color
    iconName = "clock";
  }

  return (
    <View style={styles.timelineItem}>
      <View style={styles.timeColumn}>
        <Text
          style={[
            styles.timelineTime,
            status === "neutral" && { color: COLORS.textLight },
          ]}
        >
          {time}
        </Text>
      </View>
      <View style={styles.lineColumn}>
        <View
          style={[
            styles.dot,
            {
              backgroundColor: status === "neutral" ? "#E5E7EB" : "#FFF",
              borderColor: iconColor,
            },
          ]}
        >
          {status !== "neutral" && (
            <Feather name={iconName as any} size={12} color={iconColor} />
          )}
        </View>
        {!isLast && <View style={styles.line} />}
      </View>
      <View style={styles.contentColumn}>
        <Text
          style={[
            styles.timelineTitle,
            status === "neutral" && { color: COLORS.textLight },
          ]}
        >
          {title}
        </Text>
        <Text style={styles.timelineSubtitle}>{subtitle}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  historySection: { marginTop: 10 },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 20,
  },
  timelineContainer: { paddingLeft: 10 },
  timelineItem: { flexDirection: "row", minHeight: 70 },
  timeColumn: { width: 50, paddingTop: 2 },
  timelineTime: { fontSize: 12, fontWeight: "600", color: COLORS.primary },
  lineColumn: { alignItems: "center", width: 30, marginRight: 10 },
  dot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFF",
    zIndex: 1,
  },
  line: { flex: 1, width: 2, backgroundColor: "#E5E7EB", marginVertical: 4 },
  contentColumn: { flex: 1, paddingBottom: 20 },
  timelineTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 2,
  },
  timelineSubtitle: { fontSize: 12, color: COLORS.textLight },
});
