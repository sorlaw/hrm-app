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

const PRIORITIES = ["High", "Medium", "Low"];

const FormTambahTugasScreen = () => {
  const router = useRouter();

  // State Form
  const [title, setTitle] = useState("");
  const [project, setProject] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [desc, setDesc] = useState("");

  // State Date
  const [deadline, setDeadline] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  const handleDateChange = (event: any, selectedDate?: Date) => {
    setShowPicker(false);
    if (selectedDate) {
      setDeadline(selectedDate);
    }
  };

  const handleSubmit = () => {
    if (!title) {
      alert("Mohon isi judul tugas");
      return;
    }
    // Simulasi Submit
    console.log({ title, project, priority, deadline, desc });
    alert("Tugas berhasil ditambahkan!");
    router.back();
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
            <Feather name="x" size={24} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Tambah Tugas Baru</Text>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          {/* 1. JUDUL TUGAS */}
          <Text style={styles.label}>Judul Tugas</Text>
          <View style={styles.inputWrapper}>
            <TextInput
              style={styles.textInput}
              placeholder="Contoh: Fix Bug Login Screen"
              placeholderTextColor={COLORS.textLight}
              value={title}
              onChangeText={setTitle}
            />
          </View>

          {/* 2. NAMA PROYEK */}
          <Text style={styles.label}>Nama Proyek / Kategori</Text>
          <View style={styles.inputWrapper}>
            <Feather
              name="briefcase"
              size={18}
              color={COLORS.textLight}
              style={{ marginRight: 10 }}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Contoh: Mobile App Revamp"
              placeholderTextColor={COLORS.textLight}
              value={project}
              onChangeText={setProject}
            />
          </View>

          {/* 3. DEADLINE & PRIORITAS (Row) */}
          <View style={styles.row}>
            {/* Deadline Input */}
            <View style={{ flex: 1, marginRight: 10 }}>
              <Text style={styles.label}>Deadline</Text>
              <TouchableOpacity
                style={styles.dateBox}
                onPress={() => setShowPicker(true)}
              >
                <Feather name="calendar" size={18} color={COLORS.primary} />
                <Text style={styles.dateText}>
                  {deadline.toLocaleDateString("id-ID", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* 4. PRIORITAS SELECTOR */}
          <Text style={styles.label}>Prioritas</Text>
          <View style={styles.priorityContainer}>
            {PRIORITIES.map((p) => {
              const isSelected = priority === p;
              const color = getPriorityColor(p);
              return (
                <TouchableOpacity
                  key={p}
                  style={[
                    styles.priorityChip,
                    isSelected
                      ? { backgroundColor: color, borderColor: color }
                      : { borderColor: "#E5E7EB" },
                  ]}
                  onPress={() => setPriority(p)}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      isSelected
                        ? { color: "#FFF" }
                        : { color: COLORS.textLight },
                    ]}
                  >
                    {p}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* 5. DESKRIPSI */}
          <Text style={styles.label}>Catatan (Opsional)</Text>
          <TextInput
            style={styles.textArea}
            placeholder="Tambahkan detail tugas..."
            placeholderTextColor={COLORS.textLight}
            multiline
            numberOfLines={4}
            value={desc}
            onChangeText={setDesc}
            textAlignVertical="top"
          />
        </ScrollView>

        {/* FOOTER BUTTON */}
        <View style={styles.footer}>
          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Feather name="check" size={20} color="#FFF" />
            <Text style={styles.submitText}>Simpan Tugas</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

      {/* Date Picker Component */}
      {showPicker && (
        <DateTimePicker
          value={deadline}
          mode="date"
          display={Platform.OS === "ios" ? "spinner" : "default"}
          onChange={handleDateChange}
          minimumDate={new Date()}
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
    borderBottomWidth: 1,
    borderBottomColor: "#F3F4F6",
  },
  backButton: { padding: 8 },
  headerTitle: { fontSize: 16, fontWeight: "bold", color: COLORS.primary },
  content: { padding: 20 },

  label: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 8,
    marginTop: 15,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    height: 50,
  },
  textInput: { flex: 1, fontSize: 14, color: COLORS.text },

  row: { flexDirection: "row", alignItems: "center" },
  dateBox: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },
  dateText: { fontSize: 14, color: COLORS.text, fontWeight: "500" },

  // Priority Chips
  priorityContainer: { flexDirection: "row", gap: 10 },
  priorityChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    backgroundColor: "#FFF",
  },
  priorityText: { fontSize: 13, fontWeight: "600" },

  textArea: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    minHeight: 100,
    fontSize: 14,
    color: COLORS.text,
  },

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

export default FormTambahTugasScreen;
