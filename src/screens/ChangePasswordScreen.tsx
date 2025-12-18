import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/theme";

const ChangePasswordScreen = () => {
  const router = useRouter();

  // State Input
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");

  // State Visibility Toggle
  const [secureOld, setSecureOld] = useState(true);
  const [secureNew, setSecureNew] = useState(true);

  const handleSubmit = () => {
    if (newPass !== confirmPass) {
      alert("Konfirmasi password tidak cocok!");
      return;
    }
    if (newPass.length < 6) {
      alert("Password minimal 6 karakter");
      return;
    }
    console.log("Password changed");
    alert("Password berhasil diubah!");
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
          <Text style={styles.headerTitle}>Ganti Kata Sandi</Text>
          <View style={{ width: 40 }} />
        </View>

        <View style={styles.content}>
          <Text style={styles.desc}>
            Demi keamanan, buat password yang kuat dengan kombinasi huruf dan
            angka.
          </Text>

          <PasswordInput
            label="Password Lama"
            value={oldPass}
            onChangeText={setOldPass}
            isSecure={secureOld}
            toggleSecure={() => setSecureOld(!secureOld)}
          />

          <View style={{ height: 10 }} />

          <PasswordInput
            label="Password Baru"
            value={newPass}
            onChangeText={setNewPass}
            isSecure={secureNew}
            toggleSecure={() => setSecureNew(!secureNew)}
          />

          <PasswordInput
            label="Konfirmasi Password Baru"
            value={confirmPass}
            onChangeText={setConfirmPass}
            isSecure={secureNew} // Ikut toggle new pass
            toggleSecure={() => setSecureNew(!secureNew)}
          />
        </View>

        <View style={styles.footer}>
          <TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
            <Text style={styles.submitText}>Update Password</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// Komponen Input Password Reusable
const PasswordInput = ({
  label,
  value,
  onChangeText,
  isSecure,
  toggleSecure,
}: any) => (
  <View style={styles.inputGroup}>
    <Text style={styles.label}>{label}</Text>
    <View style={styles.inputWrapper}>
      <Feather name="lock" size={20} color={COLORS.textLight} />
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={isSecure}
        placeholder="********"
      />
      <TouchableOpacity onPress={toggleSecure}>
        <Feather
          name={isSecure ? "eye-off" : "eye"}
          size={20}
          color={COLORS.textLight}
        />
      </TouchableOpacity>
    </View>
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
    backgroundColor: "#FFF",
  },
  backButton: { padding: 8, borderRadius: 12, backgroundColor: "#F3F4F6" },
  headerTitle: { fontSize: 16, fontWeight: "bold", color: COLORS.primary },

  content: { padding: 20, flex: 1 },
  desc: {
    fontSize: 13,
    color: COLORS.textLight,
    marginBottom: 25,
    lineHeight: 20,
  },

  inputGroup: { marginBottom: 20 },
  label: {
    fontSize: 12,
    fontWeight: "600",
    color: COLORS.primary,
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 50,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    gap: 10,
  },
  input: { flex: 1, fontSize: 14, color: COLORS.text },

  footer: { padding: 20 },
  submitBtn: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 16,
    alignItems: "center",
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    elevation: 4,
  },
  submitText: { color: "#FFF", fontWeight: "bold", fontSize: 16 },
});

export default ChangePasswordScreen;
