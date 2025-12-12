import { Feather } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
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

// Kategori Izin
const PERMIT_TYPES = [
  { id: "sick", label: "Sakit", icon: "thermometer" },
  { id: "permit", label: "Izin Pribadi", icon: "user-check" },
];

const formatDate = (date: Date) => {
  return date.toLocaleDateString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const FormSakitScreen = () => {
  const router = useRouter();

  // State
  const [selectedType, setSelectedType] = useState("sick"); // 'sick' or 'permit'
  const [reason, setReason] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  // State Simulasi File Upload
  const [fileName, setFileName] = useState<string | null>(null);

  // Date Picker State
  const [showPicker, setShowPicker] = useState(false);
  const [pickingField, setPickingField] = useState<"start" | "end">("start");

  // --- LOGIC ---

  const getDuration = () => {
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
    return diffDays;
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (event.type === "set" && selectedDate) {
      if (pickingField === "start") {
        setStartDate(selectedDate);
        if (selectedDate > endDate) setEndDate(selectedDate);
      } else {
        if (selectedDate < startDate) {
          alert("Tanggal selesai tidak boleh kurang dari tanggal mulai");
          setEndDate(startDate);
        } else {
          setEndDate(selectedDate);
        }
      }
    }
  };

  const openPicker = (field: "start" | "end") => {
    setPickingField(field);
    setShowPicker(true);
  };

  // Simulasi Pick Document
  const handlePickDocument = () => {
    // Di real app, gunakan 'expo-document-picker'
    // Disini kita simulasi saja
    setFileName("surat_dokter_rizky.pdf");
  };

  const handleRemoveDocument = () => {
    setFileName(null);
  };

  const handleSubmit = () => {
    // Validasi Sederhana
    if (selectedType === "sick" && !fileName) {
      alert("Mohon lampirkan Surat Dokter untuk pengajuan Sakit.");
      return;
    }
    if (!reason.trim()) {
      alert("Mohon isi keterangan.");
      return;
    }

    console.log({
      type: selectedType,
      start: startDate,
      end: endDate,
      reason,
      attachment: fileName,
    });

    alert("Pengajuan Berhasil Dikirim!");
    router.back();
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Form Izin & Sakit</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* 1. KATEGORI (Big Cards Switcher) */}
          <View style={styles.typeContainer}>
            {PERMIT_TYPES.map((type) => {
              const isActive = selectedType === type.id;
              return (
                <TouchableOpacity
                  key={type.id}
                  style={[styles.typeCard, isActive && styles.activeTypeCard]}
                  onPress={() => setSelectedType(type.id)}
                >
                  <View
                    style={[
                      styles.iconCircle,
                      isActive && { backgroundColor: "rgba(255,255,255,0.2)" },
                    ]}
                  >
                    <Feather
                      name={type.icon as any}
                      size={24}
                      color={isActive ? "#FFF" : COLORS.textLight}
                    />
                  </View>
                  <Text
                    style={[
                      styles.typeText,
                      isActive && { color: "#FFF", fontWeight: "bold" },
                    ]}
                  >
                    {type.label}
                  </Text>
                  {isActive && (
                    <View style={styles.checkCircle}>
                      <Feather name="check" size={12} color={COLORS.accent} />
                    </View>
                  )}
                </TouchableOpacity>
              );
            })}
          </View>

          {/* 2. PILIH TANGGAL */}
          <Text style={styles.label}>Durasi Izin</Text>
          <View style={styles.dateRow}>
            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => openPicker("start")}
            >
              <View style={styles.iconWrapper}>
                <Feather name="calendar" size={18} color={COLORS.accent} />
              </View>
              <View>
                <Text style={styles.dateLabel}>Mulai</Text>
                <Text style={styles.dateValue}>{formatDate(startDate)}</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.dateDivider} />

            <TouchableOpacity
              style={styles.dateInput}
              onPress={() => openPicker("end")}
            >
              <View
                style={[styles.iconWrapper, { backgroundColor: "#FEE2E2" }]}
              >
                <Feather name="calendar" size={18} color={COLORS.danger} />
              </View>
              <View>
                <Text style={styles.dateLabel}>Sampai</Text>
                <Text style={styles.dateValue}>{formatDate(endDate)}</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Badge Total Hari */}
          <View style={styles.infoBox}>
            <Text style={styles.infoText}>
              Total Izin:{" "}
              <Text style={{ fontWeight: "bold" }}>{getDuration()} Hari</Text>
            </Text>
          </View>

          {/* 3. ALASAN */}
          <Text style={styles.label}>Keterangan</Text>
          <TextInput
            style={styles.textArea}
            placeholder={
              selectedType === "sick"
                ? "Jelaskan kondisi sakit Anda..."
                : "Jelaskan keperluan izin Anda..."
            }
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={3}
            value={reason}
            onChangeText={setReason}
            textAlignVertical="top"
          />

          {/* 4. UPLOAD BUKTI (UI Simulasi) */}
          <Text style={styles.label}>
            Lampiran{" "}
            {selectedType === "sick" && (
              <Text style={{ color: COLORS.danger }}>*</Text>
            )}
          </Text>

          {!fileName ? (
            // State: Belum ada file
            <TouchableOpacity
              style={styles.uploadBox}
              onPress={handlePickDocument}
            >
              <View style={styles.uploadIconCircle}>
                <Feather name="upload-cloud" size={24} color={COLORS.accent} />
              </View>
              <Text style={styles.uploadText}>
                {selectedType === "sick"
                  ? "Upload Surat Dokter"
                  : "Upload Dokumen Pendukung"}
              </Text>
              <Text style={styles.uploadSubText}>
                Tap untuk memilih file (PDF/JPG)
              </Text>
            </TouchableOpacity>
          ) : (
            // State: File Terpilih
            <View style={styles.fileCard}>
              <View style={styles.fileInfo}>
                <View
                  style={[styles.iconWrapper, { backgroundColor: "#E0F7FA" }]}
                >
                  <Feather name="file-text" size={20} color={COLORS.accent} />
                </View>
                <View>
                  <Text style={styles.fileName} numberOfLines={1}>
                    {fileName}
                  </Text>
                  <Text style={styles.fileSize}>1.2 MB • Siap diupload</Text>
                </View>
              </View>
              <TouchableOpacity onPress={handleRemoveDocument}>
                <Feather name="x-circle" size={24} color={COLORS.textLight} />
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>

        {/* FOOTER */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Kirim Pengajuan</Text>
            <Feather name="send" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Date Picker Component */}
      {showPicker && (
        <DateTimePicker
          value={pickingField === "start" ? startDate : endDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          minimumDate={pickingField === "end" ? startDate : undefined}
        />
      )}
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
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  headerTitle: { fontSize: 18, fontWeight: "bold", color: COLORS.primary },
  content: { padding: 20, paddingBottom: 100 },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 10,
    marginTop: 15,
  },

  // Type Switcher (Cards)
  typeContainer: { flexDirection: "row", gap: 15, marginBottom: 5 },
  typeCard: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    position: "relative",
  },
  activeTypeCard: {
    backgroundColor: COLORS.accent,
    borderColor: COLORS.accent,
  },
  iconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F3F4F6",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },
  typeText: { fontSize: 14, color: COLORS.text, fontWeight: "500" },
  checkCircle: {
    position: "absolute",
    top: 10,
    right: 10,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
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
  dateInput: { flexDirection: "row", alignItems: "center", gap: 10, flex: 1 },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#E0F2FE",
    alignItems: "center",
    justifyContent: "center",
  },
  dateLabel: { fontSize: 10, color: COLORS.textLight },
  dateValue: { fontSize: 14, fontWeight: "bold", color: COLORS.primary },
  dateDivider: {
    width: 1,
    height: 30,
    backgroundColor: "#E5E7EB",
    marginHorizontal: 15,
  },

  // Info Box
  infoBox: { marginTop: 10, alignItems: "flex-end" },
  infoText: { fontSize: 12, color: COLORS.textLight },

  // Input
  textArea: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    minHeight: 80,
    fontSize: 14,
    color: COLORS.text,
  },

  // Upload Area
  uploadBox: {
    borderWidth: 2,
    borderColor: "#E5E7EB",
    borderStyle: "dashed",
    borderRadius: 16,
    padding: 25,
    alignItems: "center",
    backgroundColor: "#FAFAFA",
  },
  uploadIconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#E0F2FE",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  uploadText: { fontSize: 14, fontWeight: "600", color: COLORS.text },
  uploadSubText: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },

  // File Card (Uploaded State)
  fileCard: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.accent, // Greenish or Accent border to show success
  },
  fileInfo: { flexDirection: "row", alignItems: "center", gap: 12 },
  fileName: {
    fontSize: 14,
    fontWeight: "600",
    color: COLORS.primary,
    maxWidth: 200,
  },
  fileSize: { fontSize: 12, color: COLORS.textLight },

  // Footer
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
    shadowOpacity: 0.2,
    elevation: 5,
  },
  submitText: { fontSize: 16, fontWeight: "bold", color: "#FFF" },
});

export default FormSakitScreen;
