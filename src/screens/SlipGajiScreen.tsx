import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/theme";

// --- DATA DUMMY SLIP GAJI ---
const PAYSLIP_DATA = {
  earnings: [
    { id: "1", label: "Gaji Pokok", amount: 7500000 },
    { id: "2", label: "Tunjangan Jabatan", amount: 1500000 },
    { id: "3", label: "Tunjangan Makan", amount: 880000 },
    { id: "4", label: "Tunjangan Transport", amount: 440000 },
    { id: "5", label: "Lembur (10 Jam)", amount: 500000 },
  ],
  deductions: [
    { id: "6", label: "BPJS Kesehatan", amount: 150000 },
    { id: "7", label: "BPJS Ketenagakerjaan", amount: 200000 },
    { id: "8", label: "PPh 21", amount: 125000 },
    { id: "9", label: "Potongan Koperasi", amount: 100000 },
  ],
};

const SlipGajiScreen = () => {
  const router = useRouter();

  // State
  const [isHidden, setIsHidden] = useState(false); // Mode Sensor
  const [currentMonth, setCurrentMonth] = useState(new Date());

  // --- HELPERS ---

  // Format Rupiah
  const formatCurrency = (amount: number) => {
    return "Rp " + amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  // Hitung Total
  const totalEarnings = PAYSLIP_DATA.earnings.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
  const totalDeductions = PAYSLIP_DATA.deductions.reduce(
    (acc, curr) => acc + curr.amount,
    0
  );
  const netSalary = totalEarnings - totalDeductions;

  // Navigasi Bulan
  const changeMonth = (direction: -1 | 1) => {
    const newDate = new Date(currentMonth);
    newDate.setMonth(newDate.getMonth() + direction);
    setCurrentMonth(newDate);
  };

  const formattedMonth = currentMonth.toLocaleDateString("id-ID", {
    month: "long",
    year: "numeric",
  });

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
        <Text style={styles.headerTitle}>Slip Gaji</Text>
        <TouchableOpacity
          onPress={() => setIsHidden(!isHidden)}
          style={styles.iconButton}
        >
          <Feather
            name={isHidden ? "eye-off" : "eye"}
            size={24}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* 2. MONTH SELECTOR */}
        <View style={styles.monthSelector}>
          <TouchableOpacity
            onPress={() => changeMonth(-1)}
            style={styles.arrowBtn}
          >
            <Feather name="chevron-left" size={24} color={COLORS.textLight} />
          </TouchableOpacity>
          <View style={styles.monthInfo}>
            <Feather name="calendar" size={16} color={COLORS.primary} />
            <Text style={styles.monthText}>{formattedMonth}</Text>
          </View>
          <TouchableOpacity
            onPress={() => changeMonth(1)}
            style={styles.arrowBtn}
          >
            <Feather name="chevron-right" size={24} color={COLORS.textLight} />
          </TouchableOpacity>
        </View>

        {/* 3. MAIN CARD (NET PAY) */}
        <View style={styles.netCard}>
          <Text style={styles.netLabel}>Gaji Bersih (Take Home Pay)</Text>
          <Text style={styles.netAmount}>
            {isHidden ? "••••••••••" : formatCurrency(netSalary)}
          </Text>
          <View style={styles.statusBadge}>
            <Feather name="check-circle" size={14} color="#10B981" />
            <Text style={styles.statusText}>Lunas Dibayarkan</Text>
          </View>
        </View>

        {/* 4. DETAILS SECTION */}
        <View style={styles.detailContainer}>
          {/* PENERIMAAN */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Penerimaan</Text>
            <Feather name="arrow-down-left" size={20} color="#10B981" />
          </View>
          <View style={styles.sectionContent}>
            {PAYSLIP_DATA.earnings.map((item) => (
              <DetailRow
                key={item.id}
                label={item.label}
                value={item.amount}
                isHidden={isHidden}
                formatCurrency={formatCurrency}
              />
            ))}
            <View style={styles.divider} />
            <DetailRow
              label="Total Penerimaan"
              value={totalEarnings}
              isHidden={isHidden}
              isBold
              formatCurrency={formatCurrency}
              color="#10B981"
            />
          </View>

          <View style={{ height: 20 }} />

          {/* POTONGAN */}
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Potongan</Text>
            <Feather name="arrow-up-right" size={20} color={COLORS.danger} />
          </View>
          <View style={styles.sectionContent}>
            {PAYSLIP_DATA.deductions.map((item) => (
              <DetailRow
                key={item.id}
                label={item.label}
                value={item.amount}
                isHidden={isHidden}
                formatCurrency={formatCurrency}
              />
            ))}
            <View style={styles.divider} />
            <DetailRow
              label="Total Potongan"
              value={totalDeductions}
              isHidden={isHidden}
              isBold
              formatCurrency={formatCurrency}
              color={COLORS.danger}
            />
          </View>
        </View>

        {/* 5. FOOTER INFO */}
        <Text style={styles.disclaimer}>
          * Slip gaji ini dihasilkan secara otomatis oleh sistem. Jika terdapat
          kesalahan, mohon hubungi HRD.
        </Text>
      </ScrollView>

      {/* 6. DOWNLOAD BUTTON */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.downloadButton}
          onPress={() => alert("Mengunduh PDF...")}
        >
          <Feather name="download" size={20} color="#FFF" />
          <Text style={styles.downloadText}>Unduh Slip Gaji (PDF)</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

// --- SUB COMPONENT: DETAIL ROW ---
const DetailRow = ({
  label,
  value,
  isHidden,
  isBold,
  color,
  formatCurrency,
}: any) => (
  <View style={styles.row}>
    <Text
      style={[
        styles.rowLabel,
        isBold && { fontWeight: "bold", color: COLORS.primary },
      ]}
    >
      {label}
    </Text>
    <Text
      style={[
        styles.rowValue,
        isBold && { fontWeight: "bold" },
        color && { color: color },
      ]}
    >
      {isHidden ? "••••••" : formatCurrency(value)}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: COLORS.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: COLORS.background,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  iconButton: { padding: 8 },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.primary },
  content: { padding: 20, paddingBottom: 100 },

  // Month Selector
  monthSelector: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.card,
    padding: 10,
    borderRadius: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: "#F3F4F6",
  },
  arrowBtn: { padding: 10 },
  monthInfo: { flexDirection: "row", alignItems: "center", gap: 8 },
  monthText: { fontSize: 16, fontWeight: "bold", color: COLORS.primary },

  // Net Card (Hero)
  netCard: {
    backgroundColor: COLORS.primary,
    borderRadius: 20,
    padding: 25,
    alignItems: "center",
    marginBottom: 25,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  netLabel: { fontSize: 14, color: "#D1D5DB", marginBottom: 5 },
  netAmount: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFF",
    marginBottom: 15,
  },
  statusBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(16, 185, 129, 0.2)",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    gap: 5,
  },
  statusText: { fontSize: 12, color: "#6EE7B7", fontWeight: "bold" },

  // Sections
  detailContainer: { gap: 0 },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 5,
  },
  sectionTitle: { fontSize: 16, fontWeight: "bold", color: COLORS.primary },
  sectionContent: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    elevation: 2,
  },

  // Row
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
  },
  rowLabel: { fontSize: 14, color: COLORS.textLight, flex: 1 },
  rowValue: { fontSize: 14, color: COLORS.primary, fontWeight: "500" },
  divider: { height: 1, backgroundColor: "#E5E7EB", marginVertical: 10 },

  // Disclaimer
  disclaimer: {
    marginTop: 20,
    fontSize: 12,
    color: "#9CA3AF",
    fontStyle: "italic",
    textAlign: "center",
    lineHeight: 18,
  },

  // Footer
  footer: {
    padding: 20,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  downloadButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 16,
    gap: 10,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    elevation: 5,
  },
  downloadText: { fontSize: 16, fontWeight: "bold", color: "#FFF" },
});

export default SlipGajiScreen;
