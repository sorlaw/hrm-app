import { Feather, MaterialCommunityIcons } from "@expo/vector-icons";
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

// Opsi Transportasi
const TRANSPORT_MODES = [
  { id: "plane", label: "Pesawat", icon: "airplane" },
  { id: "train", label: "Kereta", icon: "train" },
  { id: "car", label: "Mobil Dinas", icon: "car" },
  { id: "bus", label: "Bus/Travel", icon: "bus" },
];

const formatDate = (date: Date) => {
  return date.toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const FormDinasScreen = () => {
  const router = useRouter();

  // State
  const [destination, setDestination] = useState("");
  const [purpose, setPurpose] = useState("");
  const [selectedTransport, setSelectedTransport] = useState("plane");
  const [cashAdvance, setCashAdvance] = useState("");

  // Date State
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [pickingField, setPickingField] = useState<"start" | "end">("start");

  // --- LOGIC ---

  const handleCashAdvanceChange = (text: string) => {
    const cleanNum = text.replace(/[^0-9]/g, "");
    const formatted = cleanNum.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
    setCashAdvance(formatted);
  };

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
          alert("Tanggal pulang tidak boleh sebelum tanggal berangkat");
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

  const handleSubmit = () => {
    if (!destination || !purpose) {
      alert("Mohon lengkapi tujuan dan keperluan dinas.");
      return;
    }

    console.log({
      destination,
      transport: selectedTransport,
      start: startDate,
      end: endDate,
      cashAdvance: cashAdvance ? parseInt(cashAdvance.replace(/\./g, "")) : 0,
      purpose,
    });

    alert("Pengajuan Dinas Berhasil!");
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
          <Text style={styles.headerTitle}>Perjalanan Dinas</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* 1. TUJUAN (DESTINATION) */}
          <Text style={styles.label}>Kota Tujuan</Text>
          <View style={styles.inputWrapper}>
            <Feather name="map-pin" size={20} color={COLORS.accent} />
            <TextInput
              style={styles.textInput}
              placeholder="Contoh: Surabaya, Jawa Timur"
              placeholderTextColor={COLORS.textLight}
              value={destination}
              onChangeText={setDestination}
            />
          </View>

          {/* 2. TRANSPORTASI */}
          <Text style={styles.label}>Mode Transportasi</Text>
          <View style={styles.transportGrid}>
            {TRANSPORT_MODES.map((mode) => (
              <TouchableOpacity
                key={mode.id}
                style={[
                  styles.transportCard,
                  selectedTransport === mode.id && styles.activeTransport,
                ]}
                onPress={() => setSelectedTransport(mode.id)}
              >
                <MaterialCommunityIcons
                  name={mode.icon as any}
                  size={28}
                  color={
                    selectedTransport === mode.id ? "#FFF" : COLORS.textLight
                  }
                />
                <Text
                  style={[
                    styles.transportLabel,
                    selectedTransport === mode.id && {
                      color: "#FFF",
                      fontWeight: "bold",
                    },
                  ]}
                >
                  {mode.label}
                </Text>
                {selectedTransport === mode.id && (
                  <View style={styles.checkIcon}>
                    <Feather name="check-circle" size={16} color="#FFF" />
                  </View>
                )}
              </TouchableOpacity>
            ))}
          </View>

          {/* 3. TANGGAL */}
          <Text style={styles.label}>
            Jadwal Perjalanan ({getDuration()} Hari)
          </Text>
          <View style={styles.dateRow}>
            <TouchableOpacity
              style={styles.dateBox}
              onPress={() => openPicker("start")}
            >
              <Text style={styles.dateLabel}>Berangkat</Text>
              <View style={styles.dateValueRow}>
                <Feather name="calendar" size={16} color={COLORS.primary} />
                <Text style={styles.dateValue}>{formatDate(startDate)}</Text>
              </View>
            </TouchableOpacity>

            <Feather name="arrow-right" size={20} color={COLORS.textLight} />

            <TouchableOpacity
              style={styles.dateBox}
              onPress={() => openPicker("end")}
            >
              <Text style={styles.dateLabel}>Pulang</Text>
              <View style={styles.dateValueRow}>
                <Feather name="calendar" size={16} color={COLORS.primary} />
                <Text style={styles.dateValue}>{formatDate(endDate)}</Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* 4. CASH ADVANCE (UANG MUKA) */}
          <Text style={styles.label}>Cash Advance (Opsional)</Text>
          <View style={styles.inputWrapper}>
            <Text style={styles.currencyPrefix}>Rp</Text>
            <TextInput
              style={[styles.textInput, { fontWeight: "bold" }]}
              placeholder="0"
              placeholderTextColor={COLORS.textLight}
              keyboardType="numeric"
              value={cashAdvance}
              onChangeText={handleCashAdvanceChange}
            />
          </View>
          <Text style={styles.hintText}>
            Dana operasional awal yang dibutuhkan.
          </Text>

          {/* 5. KEPERLUAN */}
          <Text style={styles.label}>Keperluan Dinas</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Jelaskan agenda atau tujuan perjalanan..."
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
            value={purpose}
            onChangeText={setPurpose}
            textAlignVertical="top"
          />
        </ScrollView>

        {/* FOOTER */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Ajukan SPPD</Text>
            <Feather name="send" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Date Picker */}
      {showPicker && (
        <DateTimePicker
          value={pickingField === "start" ? startDate : endDate}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          minimumDate={pickingField === "end" ? startDate : new Date()}
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
    marginBottom: 8,
    marginTop: 15,
  },

  // Inputs
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    borderRadius: 16,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    height: 50,
  },
  textInput: { flex: 1, marginLeft: 10, fontSize: 14, color: COLORS.text },
  currencyPrefix: { fontSize: 14, fontWeight: "bold", color: COLORS.textLight },
  hintText: {
    fontSize: 12,
    color: COLORS.textLight,
    marginTop: 5,
    marginLeft: 5,
  },

  // Transport Grid
  transportGrid: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  transportCard: {
    width: "48%",
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
    position: "relative",
    gap: 8,
  },
  activeTransport: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  transportLabel: { fontSize: 13, color: COLORS.text, fontWeight: "500" },
  checkIcon: { position: "absolute", top: 8, right: 8 },

  // Date Row
  dateRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 5,
  },
  dateBox: {
    flex: 1,
    backgroundColor: COLORS.card,
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "flex-start",
  },
  dateLabel: { fontSize: 10, color: COLORS.textLight, marginBottom: 4 },
  dateValueRow: { flexDirection: "row", alignItems: "center", gap: 6 },
  dateValue: { fontSize: 14, fontWeight: "bold", color: COLORS.primary },

  // Text Area
  textArea: {
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    minHeight: 100,
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

export default FormDinasScreen;
