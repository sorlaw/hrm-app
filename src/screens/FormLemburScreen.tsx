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

// Tipe Lembur
const OVERTIME_TYPES = [
  { id: "after_shift", label: "Pulang Kerja" }, // Lembur biasa setelah jam kantor
  { id: "holiday", label: "Hari Libur" }, // Lembur Sabtu/Minggu/Merah
  { id: "pre_shift", label: "Awal Datang" }, // Datang lebih pagi
];

const FormLemburScreen = () => {
  const router = useRouter();

  // State Form
  const [selectedType, setSelectedType] = useState("after_shift");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());

  // Waktu Mulai (Default jam 17:00 / Pulang kantor)
  const [startTime, setStartTime] = useState(() => {
    const d = new Date();
    d.setHours(17, 0, 0, 0);
    return d;
  });

  // Waktu Selesai (Default jam 20:00)
  const [endTime, setEndTime] = useState(() => {
    const d = new Date();
    d.setHours(20, 0, 0, 0);
    return d;
  });

  // State Picker
  const [showPicker, setShowPicker] = useState(false);
  const [pickerMode, setPickerMode] = useState<"date" | "time">("date");
  const [activeTimeField, setActiveTimeField] = useState<"start" | "end">(
    "start"
  );

  // --- LOGIC HELPERS ---

  // 1. Format Tanggal & Jam
  const formatDate = (d: Date) =>
    d.toLocaleDateString("id-ID", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  const formatTime = (d: Date) =>
    d.toLocaleTimeString("id-ID", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

  // 2. Kalkulasi Durasi (Selisih Jam)
  const getDuration = () => {
    let diff = endTime.getTime() - startTime.getTime();
    if (diff < 0) return "0 Jam"; // Validasi jika jam selesai < jam mulai

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (minutes > 0) return `${hours} Jam ${minutes} Menit`;
    return `${hours} Jam`;
  };

  // 3. Handler Picker
  const handlePickerChange = (event: any, selectedValue?: Date) => {
    setShowPicker(false);
    if (event.type !== "set" || !selectedValue) return;

    if (pickerMode === "date") {
      setDate(selectedValue);
    } else {
      // Logic Time Picker
      // Kita perlu menggabungkan tanggal yang dipilih dengan jam yang baru dipilih
      // Agar kalkulasi timestamp akurat
      const newTime = new Date(selectedValue);

      if (activeTimeField === "start") {
        setStartTime(newTime);
        // Validasi: Jika start > end, geser end jadi 1 jam setelah start
        if (newTime > endTime) {
          const newEnd = new Date(newTime);
          newEnd.setHours(newEnd.getHours() + 1);
          setEndTime(newEnd);
        }
      } else {
        // Validasi End Time tidak boleh kurang dari Start Time
        if (newTime < startTime) {
          alert("Jam selesai tidak boleh lebih awal dari jam mulai!");
        } else {
          setEndTime(newTime);
        }
      }
    }
  };

  const openDatePicker = () => {
    setPickerMode("date");
    setShowPicker(true);
  };

  const openTimePicker = (field: "start" | "end") => {
    setPickerMode("time");
    setActiveTimeField(field);
    setShowPicker(true);
  };

  const handleSubmit = () => {
    console.log({
      type: selectedType,
      date: date.toISOString(),
      start: startTime.toISOString(),
      end: endTime.toISOString(),
      duration: getDuration(),
      description,
    });
    alert("Pengajuan Lembur Terkirim!");
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
          <Text style={styles.headerTitle}>Form Lembur</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* 1. KATEGORI LEMBUR */}
          <Text style={styles.label}>Kategori Lembur</Text>
          <View style={styles.chipsContainer}>
            {OVERTIME_TYPES.map((type) => (
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

          {/* 2. TANGGAL */}
          <Text style={styles.label}>Tanggal Lembur</Text>
          <TouchableOpacity style={styles.inputBox} onPress={openDatePicker}>
            <Feather name="calendar" size={20} color={COLORS.textLight} />
            <Text style={styles.inputText}>{formatDate(date)}</Text>
            <Feather name="chevron-down" size={20} color={COLORS.textLight} />
          </TouchableOpacity>

          {/* 3. JAM MULAI & SELESAI */}
          <View style={styles.rowContainer}>
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.label}>Mulai</Text>
              <TouchableOpacity
                style={styles.timeBox}
                onPress={() => openTimePicker("start")}
              >
                <Text style={styles.timeText}>{formatTime(startTime)}</Text>
              </TouchableOpacity>
            </View>

            <View style={{ justifyContent: "center", paddingTop: 25 }}>
              <Feather name="arrow-right" size={20} color={COLORS.textLight} />
            </View>

            <View style={{ flex: 1, marginLeft: 10 }}>
              <Text style={styles.label}>Selesai</Text>
              <TouchableOpacity
                style={[styles.timeBox, { borderColor: COLORS.primary }]}
                onPress={() => openTimePicker("end")}
              >
                <Text style={[styles.timeText, { color: COLORS.primary }]}>
                  {formatTime(endTime)}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* INFO DURASI */}
          <View style={styles.infoBox}>
            <Ionicons name="time" size={20} color={COLORS.accent} />
            <Text style={styles.infoText}>
              Total Durasi:{" "}
              <Text style={{ fontWeight: "bold", color: COLORS.primary }}>
                {getDuration()}
              </Text>
            </Text>
          </View>

          {/* 4. DESKRIPSI PEKERJAAN */}
          <Text style={styles.label}>Deskripsi Pekerjaan</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Jelaskan tugas yang dikerjakan..."
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
            value={description}
            onChangeText={setDescription}
            textAlignVertical="top"
          />
        </ScrollView>

        {/* FOOTER BUTTON */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitText}>Ajukan Lembur</Text>
            <Feather name="send" size={20} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* DATE/TIME PICKER */}
      {showPicker && (
        <DateTimePicker
          value={
            pickerMode === "date"
              ? date
              : activeTimeField === "start"
              ? startTime
              : endTime
          }
          mode={pickerMode}
          is24Hour={true}
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handlePickerChange}
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
    marginTop: 12,
  },

  // Chips
  chipsContainer: { flexDirection: "row", gap: 10, marginBottom: 5 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    backgroundColor: COLORS.card,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  activeChip: { backgroundColor: COLORS.accent, borderColor: COLORS.accent },
  chipText: { fontSize: 13, color: COLORS.text },
  activeChipText: { color: "#FFF", fontWeight: "600" },

  // Input Box (Date)
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 10,
  },
  inputText: {
    flex: 1,
    fontSize: 15,
    color: COLORS.primary,
    fontWeight: "500",
  },

  // Time Inputs
  rowContainer: { flexDirection: "row", justifyContent: "space-between" },
  timeBox: {
    backgroundColor: COLORS.card,
    padding: 15,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    alignItems: "center",
  },
  timeText: { fontSize: 18, fontWeight: "bold", color: COLORS.text },

  // Info Box
  infoBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#E0F2FE",
    padding: 12,
    borderRadius: 12,
    marginTop: 20,
    gap: 8,
  },
  infoText: { fontSize: 14, color: "#0284C7" },

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
    marginTop: 5,
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

export default FormLemburScreen;
