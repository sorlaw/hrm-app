import { Feather } from "@expo/vector-icons";
import { useRouter } from "expo-router";
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
}

const QuickActionModal: React.FC<QuickActionModalProps> = ({
  visible,
  onClose,
}) => {
  const router = useRouter();
  const [showModal, setShowModal] = useState(visible);

  // Kita gunakan Value biasa, tanpa logika reset yang aneh-aneh
  const panY = useRef(new Animated.Value(height)).current;

  useEffect(() => {
    if (visible) {
      setShowModal(true);
      // Animasi Simpel & Klasik
      Animated.spring(panY, {
        toValue: 0,
        useNativeDriver: true,
        bounciness: 4,
      }).start();
    } else {
      Animated.timing(panY, {
        toValue: height,
        duration: 250,
        useNativeDriver: true,
      }).start(() => setShowModal(false));
    }
  }, [visible]);

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 0,
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) panY.setValue(gestureState.dy);
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 150) {
          onClose();
        } else {
          Animated.spring(panY, {
            toValue: 0,
            useNativeDriver: true,
            bounciness: 4,
          }).start();
        }
      },
    })
  ).current;

  const handlePress = (target: string) => {
    onClose();
    if (target === "FormCuti") router.push("/form-cuti");
    else if (target === "Lembur") router.push("/form-lembur");
    else if (target === "Sakit") router.push("/form-sakit");
    else if (target === "Klaim")
      router.push("/form-klaim"); // <-- Tambahkan ini
    else console.log("Fitur: " + target);
  };

  if (!showModal) return null;

  return (
    <Modal
      transparent={true}
      visible={showModal}
      onRequestClose={onClose}
      animationType="none" // Kita handle animasi sendiri
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <TouchableWithoutFeedback onPress={onClose}>
          <View style={styles.backdrop} />
        </TouchableWithoutFeedback>

        <Animated.View
          style={[styles.modalContent, { transform: [{ translateY: panY }] }]}
          {...panResponder.panHandlers}
        >
          <View style={styles.dragHandle} />

          <Text style={styles.title}>Buat Pengajuan Baru</Text>
          <Text style={styles.subtitle}>
            Pilih jenis pengajuan yang ingin Anda buat
          </Text>

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
              onPress={() => handlePress("Lembur")}
            />
            <MenuButton
              icon="activity"
              label="Sakit/Izin"
              color="#EF4444"
              onPress={() => handlePress("Sakit")}
            />
            <MenuButton
              icon="dollar-sign"
              label="Klaim"
              color="#10B981"
              onPress={() => handlePress("Klaim")}
            />
          </View>

          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Feather name="x" size={24} color="#6B7280" />
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

// ... (Komponen MenuButton & Styles SAMA PERSIS seperti sebelumnya)
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
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    zIndex: -1,
  },
  modalContent: {
    backgroundColor: "white",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 24,
    paddingBottom: 40,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 20,
    width: "100%",
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    marginBottom: 20,
    marginTop: -5,
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
    width: 65,
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
