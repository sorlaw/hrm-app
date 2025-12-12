import { Feather, Ionicons } from "@expo/vector-icons";
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

// Kategori Klaim
const CLAIM_CATEGORIES = [
  { id: "medical", label: "Kesehatan", icon: "activity", color: "#EF4444" },
  { id: "transport", label: "Transport", icon: "map-pin", color: "#3B82F6" },
  { id: "meal", label: "Makan", icon: "coffee", color: "#F59E0B" },
  { id: "other", label: "Lainnya", icon: "grid", color: "#6B7280" },
];

const formatDate = (date: Date) => {
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const FormKlaimScreen = () => {
  const router = useRouter();

  // State
  const [amount, setAmount] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("medical");
  const [date, setDate] = useState(new Date());
  const [description, setDescription] = useState("");
  const [attachment, setAttachment] = useState<string | null>(null); // Path gambar/file

  // Date Picker
  const [showPicker, setShowPicker] = useState(false);

  // --- LOGIC ---

  // Format Rupiah saat mengetik
  const handleAmountChange = (text: string) => {
    // Hapus karakter non-digit
    const cleanNum = text.replace(/[^0-9]/g, "");
    // Format ke ribuan (100.000)
    const formatted = cleanNum.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setAmount(formatted);
  };

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (event.type === "set" && selectedDate) {
      setDate(selectedDate);
    }
  };

  // Simulasi Ambil Gambar/File
  const handlePickAttachment = () => {
    // Di real app, gunakan expo-image-picker
    setAttachment("receipt_demo.jpg");
  };

  const handleSubmit = () => {
    if (!amount) {
      alert("Mohon isi nominal klaim.");
      return;
    }
    if (!attachment) {
      alert("Mohon lampirkan foto struk/bon.");
      return;
    }

    console.log({
      category: selectedCategory,
      amount: parseInt(amount.replace(/\./g, "")), // Bersihkan titik sebelum kirim ke API
      date,
      description,
      attachment,
    });

    alert("Klaim Berhasil Diajukan!");
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
          <Text style={styles.headerTitle}>Klaim Reimbursement</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* 1. INPUT NOMINAL (HERO) */}
          <Text style={styles.label}>Total Nominal</Text>
          <View style={styles.amountContainer}>
            <Text style={styles.currencyPrefix}>Rp</Text>
            <TextInput
              style={styles.amountInput}
              placeholder="0"
              keyboardType="numeric"
              value={amount}
              onChangeText={handleAmountChange}
              placeholderTextColor="#D1D5DB"
            />
          </View>

          {/* 2. KATEGORI GRID */}
          <Text style={styles.label}>Kategori Pengeluaran</Text>
          <View style={styles.gridContainer}>
            {CLAIM_CATEGORIES.map((cat) => {
              const isSelected = selectedCategory === cat.id;
              return (
                <TouchableOpacity
                  key={cat.id}
                  style={[
                    styles.categoryCard,
                    isSelected && styles.activeCategoryCard,
                  ]}
                  onPress={() => setSelectedCategory(cat.id)}
                >
                  <View
                    style={[
                      styles.iconCircle,
                      { backgroundColor: isSelected ? cat.color : "#F3F4F6" },
                    ]}
                  >
                    <Feather
                      name={cat.icon as any}
                      size={20}
                      color={isSelected ? "#FFF" : COLORS.textLight}
                    />
                  </View>
                  <Text
                    style={[
                      styles.categoryText,
                      isSelected && {
                        color: COLORS.primary,
                        fontWeight: "bold",
                      },
                    ]}
                  >
                    {cat.label}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* 3. TANGGAL TRANSAKSI */}
          <Text style={styles.label}>Tanggal Transaksi</Text>
          <TouchableOpacity
            style={styles.dateInput}
            onPress={() => setShowPicker(true)}
          >
            <View style={styles.iconWrapper}>
              <Feather name="calendar" size={18} color={COLORS.accent} />
            </View>
            <Text style={styles.dateValue}>{formatDate(date)}</Text>
            <Feather
              name="chevron-down"
              size={20}
              color={COLORS.textLight}
              style={{ marginLeft: "auto" }}
            />
          </TouchableOpacity>

          {/* 4. UPLOAD STRUK/BON */}
          <Text style={styles.label}>
            Bukti Transaksi <Text style={{ color: COLORS.danger }}>*</Text>
          </Text>

          {!attachment ? (
            <TouchableOpacity
              style={styles.uploadBox}
              onPress={handlePickAttachment}
            >
              <View style={styles.uploadIconCircle}>
                <Ionicons name="camera" size={28} color={COLORS.accent} />
              </View>
              <Text style={styles.uploadText}>Foto Struk / Upload File</Text>
              <Text style={styles.uploadSubText}>
                Pastikan nominal terlihat jelas
              </Text>
            </TouchableOpacity>
          ) : (
            // State: File Sudah Dipilih
            <View style={styles.attachmentCard}>
              <View style={styles.attachmentInfo}>
                <View style={styles.receiptIcon}>
                  <Feather name="image" size={24} color="#FFF" />
                </View>
                <View>
                  <Text style={styles.fileName}>{attachment}</Text>
                  <Text style={styles.fileStatus}>Berhasil diunggah</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => setAttachment(null)}
                style={styles.removeBtn}
              >
                <Feather name="trash-2" size={20} color={COLORS.danger} />
              </TouchableOpacity>
            </View>
          )}

          {/* 5. KETERANGAN */}
          <Text style={styles.label}>Catatan Tambahan</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Contoh: Makan siang meeting client..."
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={3}
            value={description}
            onChangeText={setDescription}
            textAlignVertical="top"
          />
        </ScrollView>

        {/* FOOTER */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Ajukan Klaim</Text>
            <Feather name="check-circle" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Date Picker */}
      {showPicker && (
        <DateTimePicker
          value={date}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          maximumDate={new Date()} // Tidak boleh klaim tanggal masa depan
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

  // Big Amount Input
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 25,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    // Shadow halus
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    elevation: 3,
  },
  currencyPrefix: {
    fontSize: 24,
    fontWeight: "bold",
    color: COLORS.textLight,
    marginRight: 10,
  },
  amountInput: {
    fontSize: 32,
    fontWeight: "bold",
    color: COLORS.primary,
    flex: 1,
    paddingVertical: 0,
    includeFontPadding: false,
    textAlignVertical: "center",
  },

  // Category Grid
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 10,
  },
  categoryCard: {
    width: "48%",
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    flexDirection: "row",
    gap: 10,
  },
  activeCategoryCard: {
    borderColor: COLORS.accent,
    backgroundColor: "#F0F9FF",
  },
  iconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryText: { fontSize: 13, color: COLORS.textLight, fontWeight: "500" },

  // Date Input
  dateInput: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 10,
  },
  iconWrapper: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#E0F2FE",
    alignItems: "center",
    justifyContent: "center",
  },
  dateValue: { fontSize: 14, fontWeight: "bold", color: COLORS.primary },

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
    backgroundColor: "#FEF3C7", // Yellowish bg
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  uploadText: { fontSize: 14, fontWeight: "600", color: COLORS.text },
  uploadSubText: { fontSize: 12, color: COLORS.textLight, marginTop: 2 },

  // Attachment Card (Success State)
  attachmentCard: {
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#10B981",
  },
  attachmentInfo: { flexDirection: "row", alignItems: "center", gap: 12 },
  receiptIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#10B981",
    alignItems: "center",
    justifyContent: "center",
  },
  fileName: { fontSize: 14, fontWeight: "bold", color: COLORS.primary },
  fileStatus: { fontSize: 12, color: "#10B981" },
  removeBtn: { padding: 8 },

  // Text Area
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

export default FormKlaimScreen;
