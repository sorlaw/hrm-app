import { Feather, Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker"; // <-- Import DatePicker
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/theme";

// Tipe Data Jenis Cuti
const LEAVE_TYPES = [
  { id: "annual", label: "Cuti Tahunan" },
  { id: "sick", label: "Sakit" },
  { id: "permission", label: "Izin Khusus" },
  { id: "unpaid", label: "Unpaid Leave" },
];

// Helper untuk format tanggal (Contoh: "12 Des 2025")
const formatDate = (date: Date) => {
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const FormCutiScreen = () => {
  const router = useRouter();

  // State Form
  const [selectedType, setSelectedType] = useState("annual");
  const [reason, setReason] = useState("");
  // Inisialisasi tanggal hari ini
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // State untuk Date Picker
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isPickingStart, setIsPickingStart] = useState(true); // Untuk tahu user sedang memilih tanggal mulai/selesai

  // --- HANDLERS ---

  // 1. Hitungan Hari Cuti (Sederhana)
  const getDuration = () => {
    // Hitung perbedaan hari, tambahkan 1 karena hari pertama juga dihitung
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  // 2. Handler Perubahan Tanggal
  const onChangeDate = (event: any, selectedDate?: Date) => {
    setShowDatePicker(false); // Tutup picker setelah memilih

    if (event.type === "set" && selectedDate) {
      if (isPickingStart) {
        setStartDate(selectedDate);
        // Jika start date > end date, reset end date sama dengan start date
        if (selectedDate > endDate) {
          setEndDate(selectedDate);
        }
      } else {
        // Jika end date < start date, jangan ganti, biarkan start date
        if (selectedDate >= startDate) {
          setEndDate(selectedDate);
        } else {
          alert("Tanggal selesai harus setelah tanggal mulai!");
          setEndDate(startDate); // Paksa End Date sama dengan Start Date
        }
      }
    }
  };

  // 3. Fungsi Tampil Date Picker
  const showPicker = (isStart: boolean) => {
    setIsPickingStart(isStart);
    setShowDatePicker(true);
  };

  // 4. Dummy Handler untuk Submit
  const handleSubmit = () => {
    if (!reason.trim()) {
      alert("Mohon isi alasan cuti Anda.");
      return;
    }
    // Logika kirim ke API disini
    console.log({
      selectedType,
      reason,
      startDate: startDate.toISOString(),
      endDate: endDate.toISOString(),
    });
    alert("Pengajuan Cuti Berhasil Dikirim!");
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* 1. HEADER (Back Button) */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Ajukan Cuti</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* 2. PILIH JENIS CUTI (Chips) */}
          <Text style={styles.label}>Jenis Cuti</Text>
          <View style={styles.chipsContainer}>
            {LEAVE_TYPES.map((type) => (
              <TouchableOpacity
                key={type.id}
                style={[
                  styles.chip,
                  selectedType === type.id && styles.activeChip,
                ]}
                onPress={() => setSelectedType(type.id)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedType === type.id && styles.activeChipText,
                  ]}
                >
                  {type.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* 3. PILIH TANGGAL (Date Picker Implementation) */}
          <Text style={styles.label}>Durasi Cuti</Text>
          <View style={styles.dateRow}>
            {/* Tanggal Mulai */}
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => showPicker(true)} // <-- Tampilkan Picker untuk Start Date
            >
              <View style={styles.iconWrapper}>
                <Feather name="calendar" size={18} color={COLORS.accent} />
              </View>
              <View>
                <Text style={styles.dateLabel}>Mulai</Text>
                <Text style={styles.dateValue}>{formatDate(startDate)}</Text>
                {/* <-- Tampilkan Start Date */}
              </View>
            </TouchableOpacity>

            <View style={styles.dateDivider} />

            {/* Tanggal Selesai */}
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => showPicker(false)} // <-- Tampilkan Picker untuk End Date
            >
              <View
                style={[styles.iconWrapper, { backgroundColor: "#FEE2E2" }]}
              >
                <Feather name="calendar" size={18} color={COLORS.danger} />
              </View>
              <View>
                <Text style={styles.dateLabel}>Sampai</Text>
                <Text style={styles.dateValue}>{formatDate(endDate)}</Text>
                {/* <-- Tampilkan End Date */}
              </View>
            </TouchableOpacity>
          </View>

          {/* Total Hari Badge */}
          <View style={styles.totalDaysContainer}>
            <Ionicons
              name="information-circle-outline"
              size={20}
              color={COLORS.textLight}
            />
            <Text style={styles.totalDaysText}>
              Total durasi pengajuan:{" "}
              <Text style={{ fontWeight: "bold", color: COLORS.primary }}>
                {getDuration()} Hari
              </Text>
            </Text>
          </View>

          {/* 4. ALASAN (Text Area) */}
          <Text style={styles.label}>Alasan Cuti</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Tuliskan alasan pengajuan cuti Anda..."
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
            value={reason}
            onChangeText={setReason}
            textAlignVertical="top"
          />

          {/* 5. UPLOAD FILE (Optional) */}
          <Text style={styles.label}>Lampiran (Opsional)</Text>
          <TouchableOpacity style={styles.uploadBox}>
            <Feather name="upload-cloud" size={32} color={COLORS.accent} />
            <Text style={styles.uploadText}>Upload Surat Dokter / Dokumen</Text>
            <Text style={styles.uploadSubText}>Maksimal 2MB (PDF/JPG)</Text>
          </TouchableOpacity>
        </ScrollView>

        {/* 6. SUBMIT BUTTON (Sticky Bottom) */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Kirim Pengajuan</Text>
            <Feather name="send" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* 7. DATE PICKER KOMPONEN */}
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={isPickingStart ? startDate : endDate} // Nilai default
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"} // iOS pakai spinner, Android pakai dialog
          onChange={onChangeDate}
          // Batasan tanggal
          minimumDate={isPickingStart ? new Date() : startDate} // Start Date min hari ini. End Date min Start Date.
        />
      )}
    </SafeAreaView>
  );
};

// ... (MenuButton dan Styles tetap sama)
const MenuButton = ({ icon, label, color, onPress }: any) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={[styles.iconBox, { backgroundColor: color + "15" }]}>
      <Feather name={icon} size={28} color={color} />
    </View>
    <Text style={styles.menuLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
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
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 10,
    marginTop: 10,
  },

  // Chips
  chipsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginBottom: 15,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  activeChip: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  chipText: {
    fontSize: 13,
    color: COLORS.text,
  },
  activeChipText: {
    color: "#FFF",
    fontWeight: "600",
  },
  menuItem: {
    width: "45%",
    alignItems: "center",
    marginBottom: 25,
  },
  iconBox: {
    width: 65,
    height: 65,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },

  // Date Row
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    flex: 1,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#E0F2FE", // Light Cyan
    alignItems: "center",
    justifyContent: "center",
  },
  dateLabel: {
    fontSize: 10,
    color: COLORS.textLight,
  },
  dateValue: {
    fontSize: 14,
    fontWeight: "bold",
    color: COLORS.primary,
  },
  dateDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 15,
  },
  totalDaysContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 10,
    marginBottom: 15,
    paddingHorizontal: 5,
  },
  totalDaysText: {
    fontSize: 13,
    color: COLORS.textLight,
  },

  // Input & Upload
  textArea: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    minHeight: 100,
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 10,
  },
  uploadBox: {
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    borderRadius: 16,
    padding: 30,
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    marginTop: 5,
  },
  uploadText: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.text,
    marginTop: 10,
  },
  uploadSubText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 4,
  },

  // Footer Button
  footer: {
    padding: 20,
    backgroundColor: COLORS.background,
    borderTopWidth: 1,
    borderTopColor: "#E5E7EB",
  },
  submitButton: {
    backgroundColor: COLORS.primary,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    borderRadius: 16,
    gap: 10,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 5,
  },
  submitText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
});

export default FormCutiScreen;
