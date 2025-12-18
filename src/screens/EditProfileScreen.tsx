import { Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
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
  View
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/theme";

const EditProfileScreen = () => {
  const router = useRouter();

  // State Dummy Data (Pre-filled)
  const [phone, setPhone] = useState("+62 812 XXXX 5678");
  const [address, setAddress] = useState("Jakarta Selatan, ID");
  const [email] = useState("putra.jangjaya@wifo.com"); // Read only

  const handleSave = () => {
    // Simulasi simpan ke API
    console.log({ phone, address });
    alert("Profil berhasil diperbarui!");
    router.back();
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBackground}>
        <LinearGradient
          colors={[COLORS.primary, "#2d2d2d"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={StyleSheet.absoluteFill}
        />
      </View>

      <SafeAreaView style={styles.safeArea}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <Feather name="arrow-left" size={24} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Edit Profil</Text>
          <View style={{ width: 40 }} />
        </View>

        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
        >
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {/* Avatar Section */}
            <View style={styles.avatarContainer}>
              <View style={styles.avatarWrapper}>
                <View style={styles.avatarPlaceholder}>
                  <Feather name="user" size={48} color={COLORS.primary} />
                </View>
                <TouchableOpacity style={styles.cameraButton} activeOpacity={0.8}>
                  <Feather name="camera" size={18} color="#FFF" />
                </TouchableOpacity>
              </View>
              <Text style={styles.changePhotoText}>Ketuk untuk ubah foto</Text>
            </View>

            {/* Form Section */}
            <View style={styles.formContainer}>
              <Text style={styles.sectionTitle}>Informasi Akun</Text>

              <InputGroup
                label="Email Kantor"
                value={email}
                editable={false}
                icon="mail"
              />

              <InputGroup
                label="Divisi"
                value="Technology & IT"
                editable={false}
                icon="briefcase"
              />

              <View style={styles.divider} />

              <Text style={styles.sectionTitle}>Informasi Pribadi</Text>

              <InputGroup
                label="Nomor Telepon"
                value={phone}
                onChangeText={setPhone}
                placeholder="Masukan nomor telepon"
                icon="phone"
                keyboardType="phone-pad"
              />

              <InputGroup
                label="Alamat Domisili"
                value={address}
                onChangeText={setAddress}
                placeholder="Masukan alamat lengkap"
                icon="map-pin"
                multiline
              />
            </View>
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity
              style={styles.saveButton}
              onPress={handleSave}
              activeOpacity={0.8}
            >
              <Text style={styles.saveText}>Simpan Perubahan</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

// Modern Input Component
const InputGroup = ({
  label,
  value,
  onChangeText,
  editable = true,
  multiline = false,
  placeholder,
  icon,
  keyboardType
}: any) => {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          multiline && styles.inputContainerMultiline,
          isFocused && styles.inputContainerFocused,
          !editable && styles.inputContainerDisabled
        ]}
      >
        <Feather
          name={icon}
          size={20}
          color={isFocused ? COLORS.indigo : COLORS.textLight}
          style={styles.inputIcon}
        />
        <TextInput
          style={[
            styles.input,
            multiline && styles.inputMultiline,
            !editable && styles.inputDisabled
          ]}
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          multiline={multiline}
          placeholder={placeholder}
          placeholderTextColor={COLORS.textLight}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          keyboardType={keyboardType}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  headerBackground: {
    height: 180,
    width: '100%',
    position: 'absolute',
    top: 0,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    overflow: 'hidden',
  },
  safeArea: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
  },
  backButton: {
    padding: 8,
    borderRadius: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#FFF",
  },
  content: {
    padding: 24,
    paddingTop: 10,
  },

  // Avatar Styles
  avatarContainer: {
    alignItems: "center",
    marginBottom: 32,
  },
  avatarWrapper: {
    position: 'relative',
    marginBottom: 12,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFF',

    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.indigo,
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFF',
  },
  changePhotoText: {
    fontSize: 14,
    fontWeight: "500",
    color: COLORS.textLight,
  },

  // Form Styles
  formContainer: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 24,
    paddingTop: 28,
    // Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.05,
    shadowRadius: 20,
    elevation: 2,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: COLORS.text,
    marginBottom: 20,
  },
  divider: {
    height: 1,
    backgroundColor: '#F3F4F6',
    marginVertical: 24,
  },

  // Input Styles
  inputGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: COLORS.text,
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9FAFB",
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: "#F3F4F6",
    paddingHorizontal: 16,
    height: 56,
  },
  inputContainerMultiline: {
    height: 120,
    alignItems: 'flex-start',
    paddingVertical: 16,
  },
  inputContainerFocused: {
    borderColor: COLORS.indigo,
    backgroundColor: '#FFF',
    // Shadow for focus
    shadowColor: COLORS.indigo,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  inputContainerDisabled: {
    backgroundColor: '#F3F4F6',
    borderColor: 'transparent',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: COLORS.text,
    fontWeight: "500",
  },
  inputMultiline: {
    height: '100%',
    textAlignVertical: 'top',
  },
  inputDisabled: {
    color: COLORS.textLight,
  },

  // Footer Styles
  footer: {
    padding: 24,
    paddingTop: 0,
  },
  saveButton: {
    backgroundColor: COLORS.primary,
    height: 56,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    // Shadow
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 16,
    elevation: 8,
  },
  saveText: {
    color: "#FFF",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default EditProfileScreen;
