import * as LocalAuthentication from "expo-local-authentication";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/theme";

// Import Komponen Modular
import { useRouter } from "expo-router";
import { InfoCard } from "../components/profile/InfoCard";
import { InfoItem } from "../components/profile/InfoItem";
import { LogoutButton } from "../components/profile/LogoutButton";
import { MenuListItem } from "../components/profile/MenuListItem";
import { ProfileHeader } from "../components/profile/ProfileHeader";

const ProfileScreen = () => {
  const router = useRouter();

  // State for Biometrics
  const [isBiometricSupported, setIsBiometricSupported] = useState(false);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(false);

  useEffect(() => {
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      const enrolled = await LocalAuthentication.isEnrolledAsync();
      setIsBiometricSupported(compatible && enrolled);
    })();
  }, []);

  const handleBiometricToggle = async () => {
    if (!isBiometricSupported) {
      Alert.alert("Tidak Didukung", "Perangkat ini tidak mendukung biometrik atau belum ada biometrik yang terdaftar.");
      return;
    }

    if (!isBiometricEnabled) {
      // Enabling: Verify identity first
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: "Verifikasi untuk mengaktifkan keamanan biometrik",
        fallbackLabel: "Gunakan Passcode",
      });

      if (result.success) {
        setIsBiometricEnabled(true);
        Alert.alert("Sukses", "Keamanan biometrik diaktifkan.");
        // TODO: Save preference to AsyncStorage/SecureStore here
      } else {
        // Canceled or failed
      }
    } else {
      // Disabling
      setIsBiometricEnabled(false);
      // TODO: Update preference in storage
    }
  };

  // Data Dummy Pengguna
  const userData = {
    name: "Putra Jangjaya",
    jobTitle: "Full Stack Developer",
    division: "Technology & IT",
    employeeId: "EMP-007",
    email: "putra.jangjaya@wifo.com",
    phone: "+62 812 XXXX 5678",
    joinDate: "10 Januari 2022",
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* 1. Header Profil */}
        <ProfileHeader user={userData} />

        {/* 2. Kartu Informasi Kontak */}
        <InfoCard title="Informasi Kontak & Dasar">
          <MenuListItem
            icon="edit"
            label="Ubah Informasi Kontak"
            onPress={() => router.push("/profile/edit")}
          />
          <View
            style={{ height: 1, backgroundColor: "#F3F4F6", marginVertical: 5 }}
          />
          <InfoItem icon="mail" label="Email Kantor" value={userData.email} />
          <InfoItem icon="phone" label="Nomor Telepon" value={userData.phone} />
          <InfoItem
            icon="calendar"
            label="Tanggal Gabung"
            value={userData.joinDate}
          />
          <InfoItem
            icon="map-pin"
            label="Alamat Tinggal"
            value="Jakarta Selatan, ID"
            isLast={true}
          />
        </InfoCard>

        {/* 3. Kartu Pengaturan */}
        <InfoCard title="Pengaturan Akun & Keamanan">
          <MenuListItem
            icon="lock"
            label="Ganti Kata Sandi"
            onPress={() => router.push("/profile/change-password")}
          />
          <MenuListItem
            icon="bell"
            label="Pengaturan Notifikasi"
            onPress={() => router.push("/profile/notifications")}
          />
          <MenuListItem
            icon="shield"
            label="Keamanan Biometrik (Face ID)"
            isToggle={true}
            toggleValue={isBiometricEnabled}
            onToggle={handleBiometricToggle}
            isLast={true}
          />
        </InfoCard>

        <InfoCard title="Dokumen & Keuangan">
          <MenuListItem
            icon="file-text"
            label="Slip Gaji"
            onPress={() => router.push("/slip-gaji")}
          />
          <MenuListItem
            icon="pie-chart"
            label="Laporan Pajak (SPT)"
            onPress={() => router.push("/profile/tax-report")}
            isLast={true}
          />
        </InfoCard>

        {/* 4. Tombol Logout */}
        <LogoutButton onPress={() => alert("Anda Berhasil Logout")} />

        {/* Spacer untuk Bottom Bar */}
        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  scrollContent: {
    padding: 20,
    paddingTop: 0,
  },
});

export default ProfileScreen;
