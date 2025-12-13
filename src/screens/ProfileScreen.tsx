import React from "react";
import { ScrollView, StyleSheet, View } from "react-native";
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
            onPress={() => console.log("Ganti Pass")}
          />
          <MenuListItem
            icon="bell"
            label="Pengaturan Notifikasi"
            onPress={() => console.log("Notif")}
          />
          <MenuListItem
            icon="shield"
            label="Keamanan Biometrik (Face ID)"
            isToggle={true}
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
            onPress={() => console.log("SPT")}
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
