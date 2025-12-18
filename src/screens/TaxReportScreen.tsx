import { Feather } from "@expo/vector-icons";
import * as LocalAuthentication from "expo-local-authentication";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/theme";

// Dummy Data Riwayat Pajak
const TAX_HISTORY = [
    {
        id: "1",
        year: "2024",
        docType: "Form 1721 A1",
        status: "Tersedia",
        date: "15 Jan 2025",
    },
    {
        id: "2",
        year: "2023",
        docType: "Form 1721 A1",
        status: "Sudah Lapor",
        date: "20 Jan 2024",
    },
    {
        id: "3",
        year: "2022",
        docType: "Form 1721 A1",
        status: "Sudah Lapor",
        date: "18 Jan 2023",
    },
];

const TaxReportScreen = () => {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        checkBiometrics();
    }, []);

    const checkBiometrics = async () => {
        const hasHardware = await LocalAuthentication.hasHardwareAsync();
        const isEnrolled = await LocalAuthentication.isEnrolledAsync();

        if (hasHardware && isEnrolled) {
            const result = await LocalAuthentication.authenticateAsync({
                promptMessage: "Verifikasi untuk melihat Laporan Pajak",
                fallbackLabel: "Gunakan Passcode",
            });

            if (result.success) {
                setIsAuthenticated(true);
            } else {
                Alert.alert("Akses Ditolak", "Verifikasi gagal/dibatalkan.", [
                    { text: "Kembali", onPress: () => router.back() }
                ]);
            }
        } else {
            // If no biometrics, allow access (or block depends on requirements)
            // For now, allow access if no security hardware
            setIsAuthenticated(true);
        }
    };

    const handleDownload = (year: string) => {
        Alert.alert(
            "Unduh Dokumen",
            `Sedang mengunduh Bukti Potong 1721 A1 Tahun ${year}...`,
            [{ text: "OK" }]
        );
    };

    if (!isAuthenticated) {
        return (
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                        <Feather name="arrow-left" size={24} color={COLORS.primary} />
                    </TouchableOpacity>
                    <Text style={styles.headerTitle}>Laporan Pajak (SPT)</Text>
                    <View style={{ width: 40 }} />
                </View>
                <View style={[styles.content, { alignItems: 'center', justifyContent: 'center' }]}>
                    <Text>Memverifikasi akses...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
                    <Feather name="arrow-left" size={24} color={COLORS.primary} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Laporan Pajak (SPT)</Text>
                <TouchableOpacity onPress={() => alert("Info Bantuan")} style={styles.backBtn}>
                    <Feather name="help-circle" size={24} color={COLORS.primary} />
                </TouchableOpacity>
            </View>

            <View style={styles.content}>

                {/* 1. KARTU INFORMASI PAJAK */}
                <View style={styles.taxCard}>
                    <View style={styles.cardHeader}>
                        <Text style={styles.cardLabel}>Nomor Pokok Wajib Pajak (NPWP)</Text>
                        <Feather name="credit-card" size={18} color="#FFF" opacity={0.8} />
                    </View>
                    <Text style={styles.npwpText}>09.254.321.4-405.000</Text>

                    <View style={styles.divider} />

                    <View style={styles.cardRow}>
                        <View>
                            <Text style={styles.cardLabel}>Status PTKP</Text>
                            <Text style={styles.cardValue}>K/0 (Menikah, 0 Anak)</Text>
                        </View>
                        <View>
                            <Text style={styles.cardLabel}>EFIN</Text>
                            <Text style={styles.cardValue}>1234567890</Text>
                        </View>
                    </View>
                </View>

                {/* 2. DAFTAR BUKTI POTONG */}
                <Text style={styles.sectionTitle}>Bukti Potong (1721 A1)</Text>
                <FlatList
                    data={TAX_HISTORY}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 20 }}
                    renderItem={({ item }) => (
                        <View style={styles.itemCard}>
                            {/* Icon File */}
                            <View style={styles.iconBox}>
                                <Feather name="file-text" size={24} color={COLORS.primary} />
                            </View>

                            {/* Info */}
                            <View style={{ flex: 1 }}>
                                <Text style={styles.yearText}>Tahun Pajak {item.year}</Text>
                                <Text style={styles.docType}>{item.docType} • {item.date}</Text>
                                <View style={[
                                    styles.statusBadge,
                                    item.status === "Sudah Lapor" ? styles.bgSuccess : styles.bgInfo
                                ]}>
                                    <Text style={[
                                        styles.statusText,
                                        item.status === "Sudah Lapor" ? styles.textSuccess : styles.textInfo
                                    ]}>{item.status}</Text>
                                </View>
                            </View>

                            {/* Download Btn */}
                            <TouchableOpacity
                                style={styles.downloadBtn}
                                onPress={() => handleDownload(item.year)}
                            >
                                <Feather name="download-cloud" size={20} color={COLORS.textLight} />
                            </TouchableOpacity>
                        </View>
                    )}
                />

                {/* INFO DJP ONLINE */}
                <View style={styles.infoBox}>
                    <Feather name="info" size={18} color="#1E40AF" />
                    <Text style={styles.infoText}>
                        Gunakan EFIN dan dokumen di atas untuk pelaporan SPT Tahunan melalui situs <Text style={{ fontWeight: 'bold' }}>DJP Online</Text>.
                    </Text>
                </View>

            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: COLORS.background },
    header: {
        flexDirection: "row", alignItems: "center", justifyContent: "space-between",
        paddingHorizontal: 20, paddingVertical: 15, backgroundColor: "#FFF",
        borderBottomWidth: 1, borderBottomColor: "#F3F4F6",
    },
    backBtn: { padding: 8 },
    headerTitle: { fontSize: 16, fontWeight: "bold", color: COLORS.primary },
    content: { flex: 1, padding: 20 },

    // Tax Card Styles
    taxCard: {
        backgroundColor: COLORS.primary, borderRadius: 16, padding: 20, marginBottom: 25,
        shadowColor: COLORS.primary, shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3, elevation: 5
    },
    cardHeader: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 5 },
    cardLabel: { fontSize: 11, color: '#E0E7FF', marginBottom: 4 },
    npwpText: { fontSize: 20, fontWeight: 'bold', color: '#FFF', letterSpacing: 1 },
    divider: { height: 1, backgroundColor: '#FFFFFF30', marginVertical: 15 },
    cardRow: { flexDirection: 'row', justifyContent: 'space-between' },
    cardValue: { fontSize: 14, fontWeight: 'bold', color: '#FFF' },

    // List Styles
    sectionTitle: { fontSize: 16, fontWeight: 'bold', color: COLORS.primary, marginBottom: 15 },
    itemCard: {
        flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFF',
        padding: 16, borderRadius: 16, marginBottom: 12,
        borderWidth: 1, borderColor: '#F3F4F6', gap: 15
    },
    iconBox: {
        width: 48, height: 48, borderRadius: 12, backgroundColor: '#EFF6FF',
        alignItems: 'center', justifyContent: 'center'
    },
    yearText: { fontSize: 14, fontWeight: 'bold', color: COLORS.text, marginBottom: 2 },
    docType: { fontSize: 12, color: COLORS.textLight, marginBottom: 6 },

    // Status Badges
    statusBadge: { paddingHorizontal: 8, paddingVertical: 2, borderRadius: 6, alignSelf: 'flex-start' },
    bgSuccess: { backgroundColor: '#ECFDF5' },
    bgInfo: { backgroundColor: '#EFF6FF' },
    statusText: { fontSize: 10, fontWeight: 'bold' },
    textSuccess: { color: '#059669' },
    textInfo: { color: '#2563EB' },

    downloadBtn: { padding: 8 },

    // Info Box
    infoBox: {
        flexDirection: 'row', alignItems: 'flex-start', gap: 10,
        backgroundColor: '#DBEAFE', padding: 15, borderRadius: 12, marginTop: 10
    },
    infoText: { flex: 1, fontSize: 12, color: '#1E3A8A', lineHeight: 18 }
});

export default TaxReportScreen;