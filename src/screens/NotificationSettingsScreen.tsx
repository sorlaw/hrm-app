import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/theme";

const NotificationSettingsScreen = () => {
    const router = useRouter();

    // State Toggle Notifikasi
    const [notifGaji, setNotifGaji] = useState(true);
    const [notifAbsen, setNotifAbsen] = useState(true);
    const [notifApproval, setNotifApproval] = useState(true);

    const [notifNews, setNotifNews] = useState(false);
    const [notifReminder, setNotifReminder] = useState(true);
    const [emailNotif, setEmailNotif] = useState(true);

    return (
        <SafeAreaView style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Feather name="arrow-left" size={24} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Notifikasi</Text>
                <View style={{ width: 40 }} />
            </View>

            <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
                <Text style={styles.desc}>
                    Atur preferensi notifikasi yang ingin Anda terima di perangkat ini.
                </Text>

                {/* SECTION 1: UTAMA */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Aktivitas Utama</Text>
                    <View style={styles.card}>
                        <NotificationItem
                            label="Slip Gaji Tersedia"
                            desc="Info saat slip gaji bulanan sudah rilis."
                            value={notifGaji}
                            onValueChange={setNotifGaji}
                            icon="dollar-sign"
                            color="#10B981" // Green
                        />
                        <Divider />
                        <NotificationItem
                            label="Pengingat Absensi"
                            desc="Notifikasi jam masuk dan pulang kerja."
                            value={notifAbsen}
                            onValueChange={setNotifAbsen}
                            icon="clock"
                            color="#F59E0B" // Orange
                        />
                        <Divider />
                        <NotificationItem
                            label="Status Pengajuan (Cuti/Lembur)"
                            desc="Info persetujuan dari atasan."
                            value={notifApproval}
                            onValueChange={setNotifApproval}
                            icon="check-square"
                            color="#3B82F6" // Blue
                        />
                    </View>
                </View>

                {/* SECTION 2: LAINNYA */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Info & Berita</Text>
                    <View style={styles.card}>
                        <NotificationItem
                            label="Berita Perusahaan"
                            desc="Update pengumuman dan acara kantor."
                            value={notifNews}
                            onValueChange={setNotifNews}
                            icon="info"
                            color="#8B5CF6" // Purple
                        />
                        <Divider />
                        <NotificationItem
                            label="Reminder Tugas"
                            desc="Peringatan deadline tugas harian."
                            value={notifReminder}
                            onValueChange={setNotifReminder}
                            icon="bell"
                            color="#EF4444" // Red
                        />
                    </View>
                </View>

                {/* SECTION 3: EMAIL */}
                <View style={styles.section}>
                    <Text style={styles.sectionTitle}>Saluran Lain</Text>
                    <View style={styles.card}>
                        <NotificationItem
                            label="Notifikasi via Email"
                            desc="Kirim salinan notifikasi penting ke email."
                            value={emailNotif}
                            onValueChange={setEmailNotif}
                            icon="mail"
                            color="#6B7280" // Gray
                        />
                    </View>
                </View>

            </ScrollView>
        </SafeAreaView>
    );
};

// Komponen Item Notifikasi Reusable
const NotificationItem = ({ label, desc, value, onValueChange, icon, color }: any) => (
    <View style={styles.itemRow}>
        <View style={styles.rowLeft}>
            {/* Icon Circle */}
            <View style={[styles.iconBox, { backgroundColor: color + "15" }]}>
                <Feather name={icon} size={20} color={color} />
            </View>
            {/* Text */}
            <View style={styles.textWrapper}>
                <Text style={styles.label}>{label}</Text>
                <Text style={styles.descText}>{desc}</Text>
            </View>
        </View>

        {/* Switch Toggle */}
        <Switch
            trackColor={{ false: "#E5E7EB", true: COLORS.primary }}
            thumbColor={value ? "#FFF" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={onValueChange}
            value={value}
        />
    </View>
);

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        paddingHorizontal: 20, paddingVertical: 15, backgroundColor: "#FFF",
        borderBottomWidth: 1, borderBottomColor: "#F3F4F6",
    },
    backBtn: { padding: 8 },
    headerTitle: { fontSize: 16, fontWeight: "bold", color: COLORS.primary },

    content: { padding: 20 },
    desc: { fontSize: 13, color: COLORS.textLight, marginBottom: 20, lineHeight: 20 },

    section: { marginBottom: 25 },
    sectionTitle: { fontSize: 14, fontWeight: "bold", color: COLORS.textLight, marginBottom: 10, marginLeft: 5 },
    card: {
        backgroundColor: "#FFF", borderRadius: 16, padding: 5,
        borderWidth: 1, borderColor: "#F3F4F6", overflow: 'hidden'
    },

    // Item Styles
    itemRow: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        padding: 15,
    },
    rowLeft: { flexDirection: "row", alignItems: "center", flex: 1, paddingRight: 10 },
    iconBox: {
        width: 40, height: 40, borderRadius: 20,
        alignItems: "center", justifyContent: "center", marginRight: 12
    },
    textWrapper: { flex: 1 },
    label: { fontSize: 14, fontWeight: "600", color: COLORS.text, marginBottom: 2 },
    descText: { fontSize: 11, color: COLORS.textLight, lineHeight: 16 },

    divider: { height: 1, backgroundColor: "#F3F4F6", marginLeft: 65 }, // Indent divider agar rapi
});

export default NotificationSettingsScreen;