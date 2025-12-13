import { Feather } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/theme";

type TaskStatus = "To Do" | "In Progress" | "Completed";

const DetailTugasScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  const item = {
    title: params.title || "Judul Tugas",
    project: params.project || "Project",
    deadline: params.deadline || "-",
    priority: params.priority || "Medium",
    status: (params.status as TaskStatus) || "To Do",
    progress: params.progress ? parseInt(params.progress as string) : 0,
    description: "Deskripsi tugas...",
    type: params.type || "personal",
    assigner: params.assigner || "Saya Sendiri",
  };

  const [status, setStatus] = useState<TaskStatus>(item.status);
  const [currentProgress, setCurrentProgress] = useState(item.progress);

  // --- LOGIC OPSIONAL MENU (TITIK TIGA) ---
  const handleOptionPress = () => {
    Alert.alert("Opsi Tugas", "Pilih aksi untuk tugas ini:", [
      { text: "Edit Tugas", onPress: () => console.log("Edit Triggered") },
      { text: "Hapus", onPress: () => router.back(), style: "destructive" },
      { text: "Batal", style: "cancel" },
    ]);
  };

  // --- LOGIC SLIDER ---
  const handleSliderChange = (value: number) => {
    const intValue = Math.floor(value);
    setCurrentProgress(intValue);

    if (intValue === 0) {
      if (status !== "To Do") setStatus("To Do");
    } else if (intValue === 100) {
      if (status !== "Completed") setStatus("Completed");
    } else {
      if (status !== "In Progress") setStatus("In Progress");
    }
  };

  // Logic Tombol Utama
  const handleMainAction = () => {
    if (status === "To Do") {
      setStatus("In Progress");
      setCurrentProgress(25);
    } else if (status === "In Progress") {
      setStatus("Completed");
      setCurrentProgress(100);
    } else {
      setStatus("In Progress");
      setCurrentProgress(80);
    }
  };

  // --- HELPERS WARNA ---
  const getStatusColor = (s: string) => {
    switch (s) {
      case "Completed":
        return COLORS.success;
      case "In Progress":
        return "#3B82F6";
      default:
        return COLORS.textLight;
    }
  };

  const getPriorityColor = (p: string) => {
    switch (p) {
      case "High":
        return "#EF4444";
      case "Medium":
        return "#F59E0B";
      default:
        return "#10B981";
    }
  };

  const btnConfig = (() => {
    switch (status) {
      case "To Do":
        return {
          label: "Mulai Kerjakan",
          icon: "play-circle",
          bg: COLORS.primary,
          text: "#FFF",
        };
      case "In Progress":
        return {
          label: "Tandai Selesai",
          icon: "check-circle",
          bg: COLORS.success,
          text: "#FFF",
        };
      case "Completed":
        return {
          label: "Buka Kembali",
          icon: "rotate-ccw",
          bg: "#F3F4F6",
          text: COLORS.text,
        };
    }
  })();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.iconBtn}>
          <Feather name="arrow-left" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Detail Tugas</Text>

        {/* SUDAH DIPERBAIKI: Menambahkan onPress */}
        <TouchableOpacity style={styles.iconBtn} onPress={handleOptionPress}>
          <Feather name="more-vertical" size={24} color={COLORS.primary} />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Title & Meta Grid */}
        <View style={styles.titleSection}>
          <View style={styles.projectTag}>
            <Feather
              name="briefcase"
              size={12}
              color={COLORS.text}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.projectText}>{item.project}</Text>
          </View>
          <Text style={styles.title}>{item.title}</Text>
        </View>

        <View style={styles.metaGrid}>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Prioritas</Text>
            <View
              style={[
                styles.badge,
                {
                  backgroundColor:
                    getPriorityColor(item.priority as string) + "20",
                },
              ]}
            >
              <Text
                style={[
                  styles.badgeText,
                  { color: getPriorityColor(item.priority as string) },
                ]}
              >
                {item.priority}
              </Text>
            </View>
          </View>
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Status</Text>
            <Text
              style={[styles.statusText, { color: getStatusColor(status) }]}
            >
              {status}
            </Text>
          </View>
        </View>

        {/* BAGIAN SLIDER */}
        <View style={styles.section}>
          <View style={styles.rowBetween}>
            <Text style={styles.sectionTitle}>Progress Pekerjaan</Text>
            <Text
              style={[
                styles.progressPercent,
                { color: getStatusColor(status) },
              ]}
            >
              {currentProgress}%
            </Text>
          </View>

          <View style={styles.sliderContainer}>
            <Slider
              style={{ width: "100%", height: 40 }}
              minimumValue={0}
              maximumValue={100}
              step={1}
              value={currentProgress}
              onValueChange={handleSliderChange}
              minimumTrackTintColor={getStatusColor(status)}
              maximumTrackTintColor="#E5E7EB"
              thumbTintColor={getStatusColor(status)}
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>0%</Text>
              <Text style={styles.sliderLabelText}>50%</Text>
              <Text style={styles.sliderLabelText}>100%</Text>
            </View>
          </View>

          <Text style={styles.hintText}>
            {currentProgress === 100
              ? "🎉 Pekerjaan selesai!"
              : "Geser slider untuk update progress harianmu."}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Deskripsi</Text>
          <Text style={styles.descText}>{item.description}</Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity
          style={[styles.actionBtn, { backgroundColor: btnConfig.bg }]}
          onPress={handleMainAction}
        >
          <Feather
            name={btnConfig.icon as any}
            size={20}
            color={btnConfig.text}
          />
          <Text style={[styles.actionBtnText, { color: btnConfig.text }]}>
            {btnConfig.label}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.background,
  },
  iconBtn: { padding: 8 },
  headerTitle: { fontSize: 16, fontWeight: "bold", color: COLORS.primary },
  content: { padding: 20 },
  titleSection: { marginBottom: 25 },
  projectTag: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#F3F4F6",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
    marginBottom: 12,
  },
  projectText: { fontSize: 12, fontWeight: "600", color: COLORS.text },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: COLORS.primary,
    lineHeight: 30,
  },
  metaGrid: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: "#FFF",
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  metaItem: { alignItems: "flex-start", flex: 1 },
  metaLabel: { fontSize: 11, color: COLORS.textLight, marginBottom: 6 },
  badge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  badgeText: { fontSize: 11, fontWeight: "bold" },
  statusText: { fontSize: 12, fontWeight: "bold" },
  section: { marginBottom: 25 },
  rowBetween: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: COLORS.primary,
    marginBottom: 10,
  },
  progressPercent: { fontSize: 18, fontWeight: "bold" },
  descText: { fontSize: 14, color: COLORS.text, lineHeight: 24 },
  sliderContainer: {
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  sliderLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
    marginTop: -5,
  },
  sliderLabelText: { fontSize: 10, color: COLORS.textLight, fontWeight: "600" },
  hintText: {
    marginTop: 10,
    fontSize: 12,
    color: COLORS.textLight,
    fontStyle: "italic",
    textAlign: "center",
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    backgroundColor: "#FFF",
  },
  actionBtn: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 16,
    gap: 10,
  },
  actionBtnText: { fontSize: 16, fontWeight: "bold" },
});

export default DetailTugasScreen;
