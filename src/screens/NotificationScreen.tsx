import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/theme";

// --- TIPE DATA ---
type NotificationType = "success" | "info" | "warning" | "error";

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  date: string;
  type: NotificationType;
  isRead: boolean;
}

// --- DUMMY DATA ---
const INITIAL_DATA: NotificationItem[] = [
  {
    id: "1",
    title: "Cuti Disetujui",
    message:
      "Pengajuan cuti tahunan Anda untuk tgl 20-22 Des telah disetujui oleh Pak Budi.",
    date: "Baru saja",
    type: "success",
    isRead: false,
  },
  {
    id: "2",
    title: "Slip Gaji Tersedia",
    message: "Slip gaji periode Desember 2025 sudah dapat diunduh.",
    date: "2 Jam yang lalu",
    type: "info",
    isRead: false,
  },
  {
    id: "3",
    title: "Lupa Absen Pulang?",
    message: "Sistem mendeteksi Anda belum melakukan clock-out kemarin.",
    date: "Kemarin",
    type: "warning",
    isRead: true,
  },
  {
    id: "4",
    title: "Pengajuan Lembur Ditolak",
    message: "Lembur tgl 10 Des ditolak. Alasan: Tidak ada urgensi projek.",
    date: "Kemarin",
    type: "error",
    isRead: true,
  },
  {
    id: "5",
    title: "Maintenance Sistem",
    message:
      "Aplikasi tidak dapat diakses pada hari Sabtu pukul 01:00 - 03:00 WIB.",
    date: "2 Hari yang lalu",
    type: "info",
    isRead: true,
  },
];

const NotificationScreen = () => {
  const router = useRouter();
  const [notifications, setNotifications] =
    useState<NotificationItem[]>(INITIAL_DATA);

  // Fungsi Tandai Semua Dibaca
  const markAllAsRead = () => {
    const updated = notifications.map((item) => ({ ...item, isRead: true }));
    setNotifications(updated);
  };

  // Fungsi Klik Item (Tandai satu dibaca)
  const handlePressItem = (id: string) => {
    const updated = notifications.map((item) =>
      item.id === id ? { ...item, isRead: true } : item
    );
    setNotifications(updated);
    // Disini bisa tambah navigasi detail jika perlu
  };

  // Helper Ikon & Warna
  const getIconInfo = (type: NotificationType) => {
    switch (type) {
      case "success":
        return { icon: "check-circle", color: "#10B981", bg: "#ECFDF5" };
      case "info":
        return { icon: "info", color: "#3B82F6", bg: "#EFF6FF" };
      case "warning":
        return { icon: "alert-triangle", color: "#F59E0B", bg: "#FFFBEB" };
      case "error":
        return { icon: "x-circle", color: "#EF4444", bg: "#FEF2F2" };
      default:
        return { icon: "bell", color: COLORS.textLight, bg: "#F3F4F6" };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* 1. HEADER */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notifikasi</Text>
        <TouchableOpacity onPress={markAllAsRead}>
          <Text style={styles.readAllText}>Baca Semua</Text>
        </TouchableOpacity>
      </View>

      {/* 2. LIST NOTIFIKASI */}
      <FlatList
        data={notifications}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Feather name="bell-off" size={40} color={COLORS.textLight} />
            <Text style={styles.emptyText}>Belum ada notifikasi</Text>
          </View>
        }
        renderItem={({ item }) => {
          const { icon, color, bg } = getIconInfo(item.type);
          return (
            <TouchableOpacity
              style={[styles.card, !item.isRead && styles.unreadCard]}
              onPress={() => handlePressItem(item.id)}
              activeOpacity={0.7}
            >
              {/* Ikon Kiri */}
              <View style={[styles.iconBox, { backgroundColor: bg }]}>
                <Feather name={icon as any} size={20} color={color} />
              </View>

              {/* Konten Teks */}
              <View style={styles.contentBox}>
                <View style={styles.rowTop}>
                  <Text
                    style={[styles.title, !item.isRead && styles.unreadTitle]}
                  >
                    {item.title}
                  </Text>
                  <Text style={styles.date}>{item.date}</Text>
                </View>
                <Text style={styles.message} numberOfLines={2}>
                  {item.message}
                </Text>
              </View>

              {/* Dot Merah (Jika belum dibaca) */}
              {!item.isRead && <View style={styles.redDot} />}
            </TouchableOpacity>
          );
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.background,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.primary },
  readAllText: { fontSize: 12, color: COLORS.accent, fontWeight: "600" },

  listContent: { padding: 20 },

  // Card Styles
  card: {
    flexDirection: "row",
    padding: 16,
    marginBottom: 12,
    borderRadius: 16,
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#F3F4F6",
    alignItems: "flex-start",
  },
  unreadCard: {
    backgroundColor: "#F0F9FF", // Light Blue tint for unread
    borderColor: "#BAE6FD",
  },

  iconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },
  contentBox: { flex: 1 },
  rowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 4,
    alignItems: "flex-start",
    paddingRight: 15,
  },

  title: {
    fontSize: 14,
    color: COLORS.primary,
    fontWeight: "600",
    flex: 1,
    marginRight: 10,
  },
  unreadTitle: { fontWeight: "bold", color: "#000" },

  date: { fontSize: 11, color: COLORS.textLight, marginTop: 2, flexShrink: 0 },
  message: { fontSize: 13, color: COLORS.text, lineHeight: 18 },

  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.danger,
    position: "absolute",
    top: 16, // Sesuaikan dengan padding card
    right: 16,
  },

  // Empty State
  emptyState: { alignItems: "center", marginTop: 100, gap: 10 },
  emptyText: { color: COLORS.textLight, fontSize: 14 },
});

export default NotificationScreen;
