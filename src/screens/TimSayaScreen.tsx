import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useMemo, useState } from "react";
import {
  FlatList,
  Linking,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/theme";

// --- DUMMY DATA ---
const TEAM_DATA = [
  {
    id: "1",
    name: "Rizky Hasan",
    role: "Senior Frontend Dev",
    division: "Technology",
    status: "Present",
    phone: "08123456789",
    email: "rizky@wifo.com",
    avatar: null,
  },
  {
    id: "2",
    name: "Sarah Amalia",
    role: "UI/UX Designer",
    division: "Technology",
    status: "Remote",
    phone: "08129876543",
    email: "sarah@wifo.com",
    avatar: null,
  },
  {
    id: "3",
    name: "Budi Santoso",
    role: "Product Manager",
    division: "Product",
    status: "Leave",
    phone: "08198765432",
    email: "budi@wifo.com",
    avatar: null,
  },
  {
    id: "4",
    name: "Citra Dewi",
    role: "HR Specialist",
    division: "Human Resource",
    status: "Present",
    phone: "08156789012",
    email: "citra@wifo.com",
    avatar: null,
  },
  {
    id: "5",
    name: "Doni Pratama",
    role: "Backend Engineer",
    division: "Technology",
    status: "Sick",
    phone: "08134567890",
    email: "doni@wifo.com",
    avatar: null,
  },
  {
    id: "6",
    name: "Eka Putri",
    role: "QA Engineer",
    division: "Technology",
    status: "Present",
    phone: "08122334455",
    email: "eka@wifo.com",
    avatar: null,
  },
];

const TimSayaScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("All"); // 'All' or 'MyDivision'

  // Simulasi Divisi User yang sedang login
  const MY_DIVISION = "Technology";

  // --- LOGIC FILTER ---
  const filteredData = useMemo(() => {
    let data = TEAM_DATA;

    // 1. Filter Tab
    if (activeTab === "MyDivision") {
      data = data.filter((item) => item.division === MY_DIVISION);
    }

    // 2. Filter Search
    if (searchQuery) {
      const lowerQuery = searchQuery.toLowerCase();
      data = data.filter(
        (item) =>
          item.name.toLowerCase().includes(lowerQuery) ||
          item.role.toLowerCase().includes(lowerQuery)
      );
    }

    return data;
  }, [searchQuery, activeTab]);

  // --- ACTIONS ---
  const handleCall = (phone: string) => {
    // Di real device ini akan membuka dialer
    Linking.openURL(`tel:${phone}`);
  };

  const handleEmail = (email: string) => {
    Linking.openURL(`mailto:${email}`);
  };

  // Helper Status Color
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "Present":
        return { color: "#10B981", label: "WFO" };
      case "Remote":
        return { color: "#3B82F6", label: "WFH" };
      case "Leave":
        return { color: "#F59E0B", label: "Cuti" };
      case "Sick":
        return { color: "#EF4444", label: "Sakit" };
      default:
        return { color: "#9CA3AF", label: "Offline" };
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
        <Text style={styles.headerTitle}>Tim & Rekan</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        {/* 2. SEARCH BAR */}
        <View style={styles.searchContainer}>
          <Feather
            name="search"
            size={20}
            color={COLORS.textLight}
            style={{ marginRight: 10 }}
          />
          <TextInput
            style={styles.searchInput}
            placeholder="Cari nama atau posisi..."
            placeholderTextColor={COLORS.textLight}
            value={searchQuery}
            onChangeText={setSearchQuery}
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => setSearchQuery("")}>
              <Feather name="x-circle" size={18} color={COLORS.textLight} />
            </TouchableOpacity>
          )}
        </View>

        {/* 3. TABS */}
        <View style={styles.tabContainer}>
          <TabButton
            label="Semua Karyawan"
            isActive={activeTab === "All"}
            onPress={() => setActiveTab("All")}
          />
          <TabButton
            label={`Divisi Saya (${MY_DIVISION})`}
            isActive={activeTab === "MyDivision"}
            onPress={() => setActiveTab("MyDivision")}
          />
        </View>

        {/* 4. LIST KARYAWAN */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 100 }}
          ListEmptyComponent={
            <View style={styles.emptyState}>
              <Feather name="users" size={40} color={COLORS.textLight} />
              <Text style={styles.emptyText}>Tidak ditemukan</Text>
            </View>
          }
          renderItem={({ item }) => {
            const statusInfo = getStatusInfo(item.status);

            return (
              <View style={styles.card}>
                {/* Avatar & Info */}
                <View style={styles.cardMain}>
                  <View style={styles.avatarContainer}>
                    <Text style={styles.avatarText}>{item.name[0]}</Text>
                    {/* Status Dot */}
                    <View
                      style={[
                        styles.statusDot,
                        { backgroundColor: statusInfo.color },
                      ]}
                    />
                  </View>

                  <View style={styles.infoContainer}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Text style={styles.role}>{item.role}</Text>
                    <View style={styles.divisionRow}>
                      <Feather
                        name="briefcase"
                        size={12}
                        color={COLORS.textLight}
                      />
                      <Text style={styles.division}>{item.division}</Text>
                      <View
                        style={[
                          styles.statusBadge,
                          { backgroundColor: statusInfo.color + "15" },
                        ]}
                      >
                        <Text
                          style={[
                            styles.statusText,
                            { color: statusInfo.color },
                          ]}
                        >
                          {statusInfo.label}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>

                {/* Action Buttons (Call/Email) */}
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handleEmail(item.email)}
                  >
                    <Feather name="mail" size={18} color={COLORS.textLight} />
                  </TouchableOpacity>
                  <View style={styles.divider} />
                  <TouchableOpacity
                    style={styles.actionBtn}
                    onPress={() => handleCall(item.phone)}
                  >
                    <Feather name="phone" size={18} color={COLORS.textLight} />
                  </TouchableOpacity>
                  <View style={styles.divider} />
                  <TouchableOpacity style={styles.actionBtn}>
                    <Feather
                      name="message-circle"
                      size={18}
                      color={COLORS.textLight}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            );
          }}
        />
      </View>
    </SafeAreaView>
  );
};

// --- SUB COMPONENTS ---
const TabButton = ({ label, isActive, onPress }: any) => (
  <TouchableOpacity
    style={[styles.tabBtn, isActive && styles.activeTabBtn]}
    onPress={onPress}
  >
    <Text style={[styles.tabText, isActive && styles.activeTabText]}>
      {label}
    </Text>
  </TouchableOpacity>
);

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
  headerTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.primary },
  content: { flex: 1, paddingHorizontal: 20 },

  // Search
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  searchInput: { flex: 1, fontSize: 14, color: COLORS.text },

  // Tabs
  tabContainer: { flexDirection: "row", gap: 10, marginBottom: 20 },
  tabBtn: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  activeTabBtn: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  tabText: { fontSize: 13, color: COLORS.textLight, fontWeight: "500" },
  activeTabText: { color: "#FFF" },

  // Card
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  cardMain: { flexDirection: "row", alignItems: "center", marginBottom: 15 },
  avatarContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E0F2FE",
    alignItems: "center",
    justifyContent: "center",
    position: "relative",
  },
  avatarText: { fontSize: 20, fontWeight: "bold", color: COLORS.accent },
  statusDot: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 2,
    borderColor: "#FFF",
  },
  infoContainer: { flex: 1, marginLeft: 15 },
  name: { fontSize: 16, fontWeight: "bold", color: COLORS.primary },
  role: { fontSize: 13, color: COLORS.textLight, marginBottom: 4 },
  divisionRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  division: { fontSize: 12, color: COLORS.textLight },
  statusBadge: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    marginLeft: 5,
  },
  statusText: { fontSize: 10, fontWeight: "bold" },

  // Actions
  actionRow: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderTopColor: "#F3F4F6",
    paddingTop: 12,
    justifyContent: "space-around",
  },
  actionBtn: { paddingHorizontal: 20 },
  divider: { width: 1, height: "100%", backgroundColor: "#F3F4F6" },

  // Empty
  emptyState: { alignItems: "center", marginTop: 50, gap: 10 },
  emptyText: { color: COLORS.textLight },
});

export default TimSayaScreen;
