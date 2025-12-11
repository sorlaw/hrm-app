import { Feather } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Modal,
  PanResponder,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";

const { height } = Dimensions.get("window");

interface QuickActionModalProps {
  visible: boolean;
  onClose: () => void;
  navigation: any;
}

const QuickActionModal: React.FC<QuickActionModalProps> = ({
  visible,
  onClose,
  navigation,
}) => {
  // State lokal untuk menjaga Modal tetap render selama animasi keluar berjalan
  const [showModal, setShowModal] = useState(visible);

  // Animated Value untuk posisi Y (Naik/Turun)
  const panY = useRef(new Animated.Value(height)).current;

  // --- 1. LOGIKA ANIMASI BUKA/TUTUP ---
  useEffect(() => {
    if (visible) {
      setShowModal(true);
      // Animasi Masuk (Slide Up)
      Animated.spring(panY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 4, // Sedikit membal agar smooth
      }).start();
    } else {
      // Animasi Keluar (Slide Down)
      Animated.timing(panY, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setShowModal(false));
    }
  }, [visible]);

  // --- 2. LOGIKA GESTURE (SWIPE DOWN) ---
  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        // Hanya aktifkan gesture jika ditarik ke bawah (dy > 0)
        return gestureState.dy > 0;
      },
      onPanResponderMove: (_, gestureState) => {
        // Jika ditarik ke bawah, update posisi modal mengikuti jari
        if (gestureState.dy > 0) {
          panY.setValue(gestureState.dy);
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        // Jika ditarik lebih dari 150px, tutup modal
        if (gestureState.dy > 150) {
          onClose(); // Panggil fungsi close dari parent
        } else {
          // Jika kurang, kembalikan ke posisi semula (Snap Back)
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 4,
          }).start();
        }
      },
    })
  ).current;

  // Fungsi Helper Navigasi
  const handlePress = (screenName: string) => {
    onClose();
    // navigation.navigate(screenName);
    console.log(`Navigasi ke: ${screenName}`);
  };

  // Jangan render apa-apa jika state lokal false
  if (!showModal) return null;

  return (
    <Modal
      transparent={true}
      visible={showModal}
      onRequestClose={onClose}
      animationType="fade" // Kita pakai 'fade' untuk backdrop saja, konten kita animasi sendiri
      statusBarTranslucent={true} // FIX: Agar overlay menutupi status bar
    >
      <View style={styles.overlay}>
        {/* Backdrop: Klik di area gelap untuk menutup */}
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        {/* Konten Modal yang bisa digeser (Animated View + PanResponder) */}
        <Animated.View
          style={[styles.modalContent, { transform: [{ translateY: panY }] }]}
          {...panResponder.panHandlers} // Pasang gesture handler di sini
        >
          {/* Handle Bar (Indikator Geser) */}
          <View style={styles.dragHandle} />

          <Text style={styles.title}>Buat Pengajuan Baru</Text>
          <Text style={styles.subtitle}>
            Pilih jenis pengajuan yang ingin Anda buat
          </Text>

          {/* Grid Menu */}
          <View style={styles.gridContainer}>
            <MenuButton
              icon="calendar"
              label="Cuti"
              color="#6366F1"
              onPress={() => handlePress("FormCuti")}
            />
            <MenuButton
              icon="clock"
              label="Lembur"
              color="#F59E0B"
              onPress={() => handlePress("FormLembur")}
            />
            <MenuButton
              icon="activity"
              label="Sakit/Izin"
              color="#EF4444"
              onPress={() => handlePress("FormSakit")}
            />
            <MenuButton
              icon="dollar-sign"
              label="Klaim"
              color="#10B981"
              onPress={() => handlePress("FormKlaim")}
            />
          </View>

          {/* Tombol Tutup (X) */}
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x" size={24} color="#6B7280" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

// Komponen Kecil MenuButton (Tetap sama)
const MenuButton = ({ icon, label, color, onPress }: any) => (
  <TouchableOpacity style={styles.menuItem} onPress={onPress}>
    <View style={[styles.iconBox, { backgroundColor: color + "15" }]}>
      <Feather name={icon} size={28} color={color} />
    </View>
    <Text style={styles.menuLabel}>{label}</Text>
  </TouchableOpacity>
);

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)", // Gelap Transparan
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject, // Mengisi seluruh layar termasuk belakang modal
    zIndex: -1,
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingBottom: 40,
    alignItems: "center",

    // Shadow agar terlihat menumpuk
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    marginBottom: 20,
    marginTop: -5, // Sedikit naik
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: "#9CA3AF",
    marginBottom: 30,
    textAlign: "center",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  menuItem: {
    width: "45%",
    alignItems: "center",
    marginBottom: 25,
  },
  iconBox: {
    width: 65, // Diperbesar sedikit
    height: 65,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  menuLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
  },
  closeButton: {
    marginTop: 10,
    padding: 12,
    backgroundColor: "#F3F4F6",
    borderRadius: 50,
  },
});

export default QuickActionModal;
