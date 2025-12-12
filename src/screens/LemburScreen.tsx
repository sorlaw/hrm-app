import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  FlatList,
  Modal,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/theme";

const { height } = Dimensions.get("window");

// --- INTERFACES ---
interface OvertimeItem {
  id: string;
  date: string;
  duration: string;
  type: string;
  status: "Pending" | "Approved" | "Rejected";
  desc: string;
}

const OVERTIME_HISTORY: OvertimeItem[] = [
  {
    id: "1",
    date: "10 Des 2025",
    duration: "3 Jam",
    type: "Pulang Kerja",
    status: "Pending",
    desc: "Fixing bug critical",
  },
  {
    id: "2",
    date: "08 Des 2025",
    duration: "2 Jam",
    type: "Pulang Kerja",
    status: "Approved",
    desc: "Meeting klien US",
  },
  {
    id: "3",
    date: "01 Des 2025",
    duration: "5 Jam",
    type: "Hari Libur",
    status: "Rejected",
    desc: "Support deploy",
  },
  {
    id: "4",
    date: "28 Nov 2025",
    duration: "1 Jam",
    type: "Awal Datang",
    status: "Approved",
    desc: "Persiapan materi",
  },
];

const LemburScreen = () => {
  const router = useRouter();
  const [filterStatus, setFilterStatus] = useState("Semua");
  const [showFilterModal, setShowFilterModal] = useState(false);

  // Optimasi Filter
  const filteredData = useMemo(() => {
    if (filterStatus === "Semua") return OVERTIME_HISTORY;
    return OVERTIME_HISTORY.filter((item) => item.status === filterStatus);
  }, [filterStatus]);

  const handleSelectFilter = (status: string) => {
    setFilterStatus(status);
    setShowFilterModal(false);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Approved":
        return COLORS.success;
      case "Pending":
        return "#F59E0B";
      case "Rejected":
        return COLORS.danger;
      default:
        return COLORS.textLight;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <Feather name="arrow-left" size={24} color={COLORS.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lembur Saya</Text>
        <TouchableOpacity
          style={[
            styles.filterButton,
            filterStatus !== "Semua" && styles.activeFilterBtn,
          ]}
          onPress={() => setShowFilterModal(true)}
        >
          <Feather
            name="filter"
            size={24}
            color={filterStatus !== "Semua" ? "#FFF" : COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        {/* STATS */}
        <View style={styles.statsCard}>
          <View>
            <Text style={styles.statsLabel}>Total Lembur (Desember)</Text>
            <Text style={styles.statsValue}>
              11 <Text style={styles.statsUnit}>Jam</Text>
            </Text>
          </View>
          <View style={styles.statsIcon}>
            <Feather name="clock" size={24} color="#FFF" />
          </View>
        </View>

        {/* LIST HEADER */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Riwayat {filterStatus !== "Semua" ? `(${filterStatus})` : ""}
          </Text>
          {filterStatus !== "Semua" && (
            <TouchableOpacity onPress={() => setFilterStatus("Semua")}>
              <Text style={styles.seeAllText}>Reset Filter</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* LIST */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Feather name="inbox" size={40} color={COLORS.textLight} />
              <Text style={styles.emptyText}>
                Tidak ada data {filterStatus}
              </Text>
            </View>
          }
          renderItem={({ item }) => (
            <View style={styles.historyCard}>
              <View style={styles.cardRow}>
                <Text style={styles.historyDate}>{item.date}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    { backgroundColor: getStatusColor(item.status) + "15" },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      { color: getStatusColor(item.status) },
                    ]}
                  >
                    {item.status}
                  </Text>
                </View>
              </View>
              <View style={styles.cardContent}>
                <View style={styles.infoColumn}>
                  <Text style={styles.label}>Tipe</Text>
                  <Text style={styles.value}>{item.type}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.infoColumn}>
                  <Text style={styles.label}>Durasi</Text>
                  <Text style={styles.value}>{item.duration}</Text>
                </View>
              </View>
              <Text style={styles.descText} numberOfLines={1}>
                {item.desc}
              </Text>
            </View>
          )}
        />
      </View>

      <TouchableOpacity
        style={styles.fab}
        onPress={() => router.push("/form-lembur")}
      >
        <Feather name="plus" size={24} color="#FFF" />
        <Text style={styles.fabText}>Ajukan Lembur</Text>
      </TouchableOpacity>

      {/* --- SMOOTH FILTER MODAL --- */}
      <FilterModal
        visible={showFilterModal}
        onClose={() => setShowFilterModal(false)}
        currentFilter={filterStatus}
        onSelect={handleSelectFilter}
      />
    </SafeAreaView>
  );
};

// --- KOMPONEN FILTER MODAL (SMOOTH ANIMATION) ---
const FilterModal = ({ visible, onClose, currentFilter, onSelect }: any) => {
  const [showModal, setShowModal] = useState(visible);
  const panY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      Animated.spring(panY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 4,
      }).start();
    } else {
      Animated.timing(panY, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setShowModal(false));
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 0,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 150) onClose();
        else
          Animated.spring(panY, { toValue: 0, useNativeDriver: true }).start();
      },
    })
  ).current;

  if (!showModal) return null;

  return (
    <Modal
      transparent
      visible={showModal}
      onRequestClose={onClose}
      animationType="none"
      statusBarTranslucent
    >
      <View style={styles.modalOverlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>
        <Animated.View
          style={[
            styles.bottomSheetContent,
            { transform: [{ translateY: panY }] },
          ]}
          {...panResponder.panHandlers}
        >
          <View style={styles.dragHandle} />
          <Text style={styles.modalTitle}>Filter Status Pengajuan</Text>

          {["Semua", "Pending", "Approved", "Rejected"].map((status) => (
            <TouchableOpacity
              key={status}
              style={[
                styles.filterOption,
                currentFilter === status && styles.activeOption,
              ]}
              onPress={() => onSelect(status)}
            >
              <Text
                style={[
                  styles.filterOptionText,
                  currentFilter === status && {
                    color: COLORS.accent,
                    fontWeight: "bold",
                  },
                ]}
              >
                {status === "Semua" ? "Tampilkan Semua" : status}
              </Text>
              {currentFilter === status && (
                <Feather name="check" size={20} color={COLORS.accent} />
              )}
            </TouchableOpacity>
          ))}
          <View style={{ height: 20 }} />
        </Animated.View>
      </View>
    </Modal>
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
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  filterButton: { padding: 8, borderRadius: 12 },
  activeFilterBtn: { backgroundColor: COLORS.primary },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.primary },
  content: { flex: 1, paddingHorizontal: 20 },

  // Stats
  statsCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 25,
    marginTop: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    elevation: 8,
  },
  statsLabel: { color: "#9CA3AF", fontSize: 12, marginBottom: 5 },
  statsValue: { color: "#FFF", fontSize: 32, fontWeight: "bold" },
  statsUnit: { fontSize: 16, fontWeight: "normal", color: "#D1D5DB" },
  statsIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "rgba(255,255,255,0.1)",
    alignItems: "center",
    justifyContent: "center",
  },

  // List
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: COLORS.primary },
  seeAllText: { fontSize: 12, color: COLORS.accent, fontWeight: "600" },
  historyCard: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  cardRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 12,
  },
  historyDate: { fontSize: 14, fontWeight: "bold", color: COLORS.primary },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 6 },
  statusText: { fontSize: 10, fontWeight: "bold", textTransform: "uppercase" },
  cardContent: {
    flexDirection: "row",
    backgroundColor: "#F9FAFB",
    borderRadius: 10,
    padding: 10,
    marginBottom: 10,
  },
  infoColumn: { flex: 1 },
  divider: { width: 1, backgroundColor: "#E5E7EB", marginHorizontal: 10 },
  label: { fontSize: 10, color: COLORS.textLight, marginBottom: 2 },
  value: { fontSize: 13, fontWeight: "600", color: COLORS.text },
  descText: { fontSize: 12, color: COLORS.textLight, fontStyle: "italic" },
  emptyState: { alignItems: "center", marginTop: 50, gap: 10 },
  emptyText: { color: COLORS.textLight, fontSize: 14 },

  // FAB
  fab: {
    position: "absolute",
    bottom: 30,
    right: 20,
    left: 20,
    backgroundColor: COLORS.primary,
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    elevation: 10,
  },
  fabText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },

  // Modal Styles (Updated for Animation)
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  backdrop: { ...StyleSheet.absoluteFillObject },
  bottomSheetContent: {
    backgroundColor: "#FFF",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 24,
    elevation: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    alignSelf: "center",
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
    color: COLORS.primary,
  },
  filterOption: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  activeOption: {
    backgroundColor: "#F0F9FF",
    marginHorizontal: -24,
    paddingHorizontal: 24,
  },
  filterOptionText: { fontSize: 16, color: COLORS.text },
});

export default LemburScreen;
