import Ionicons from "@expo/vector-icons/Ionicons";
import { BottomTabBarProps } from "@react-navigation/bottom-tabs";
import { BlurView } from "expo-blur";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import {
  LayoutChangeEvent,
  Platform,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import QuickActionModal from "../shared/QuickActionModal"; // Pastikan path benar

// --- KONFIGURASI UKURAN ---
const BAR_HEIGHT = 70;
const BOTTOM_MARGIN = 20;
const PILL_RADIUS = 35;
const FAB_SIZE = 64; // Ukuran tombol plus
const BUBBLE_SIZE = 45; // Ukuran highlight background tab aktif

export const AnimatedTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const [measures, setMeasures] = useState<Record<number, number>>({});
  const [isModalVisible, setModalVisible] = useState(false);

  // Cek apakah tab aktif adalah "create" (tombol tengah)
  const isCreateTabFocused = state.routeNames[state.index] === "create";

  // --- ANIMASI BUBBLE BACKGROUND ---
  const bubbleOpacity = useSharedValue(0);
  const bubbleTranslateX = useSharedValue(0);

  useEffect(() => {
    // Jika tab aktif adalah create, sembunyikan bubble
    if (isCreateTabFocused) {
      bubbleOpacity.value = withTiming(0);
    } else {
      // Pindahkan bubble ke posisi tab yang aktif
      const targetX = measures[state.index];
      if (targetX !== undefined) {
        bubbleTranslateX.value = withSpring(targetX, {
          damping: 15,
          stiffness: 200,
        });
        bubbleOpacity.value = withTiming(1);
      }
    }
  }, [state.index, measures, isCreateTabFocused]);

  const animatedBubbleStyle = useAnimatedStyle(() => ({
    opacity: bubbleOpacity.value,
    transform: [{ translateX: bubbleTranslateX.value }],
  }));

  // --- HANDLER TOMBOL TENGAH (FAB) ---
  const handleFabPress = async () => {
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setModalVisible(true);
  };

  return (
    <View
      style={[styles.rootContainer, { bottom: insets.bottom + BOTTOM_MARGIN }]}
    >
      {/* 1. BACKGROUND PILL (Blur / Solid) */}
      <View style={styles.pillContainer}>
        {Platform.OS === "ios" ? (
          <BlurView
            intensity={30}
            tint="dark"
            style={StyleSheet.absoluteFill}
          />
        ) : null}
        <View style={styles.pillSolidBackground} />

        {/* 2. ROW OF TABS */}
        <View style={styles.tabRow}>
          {/* Animated Bubble Background (Absolute in Row) */}
          <Animated.View style={[styles.activeBubble, animatedBubbleStyle]} />

          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;
            const isCreate = route.name === "create";

            // Jika ini slot untuk tombol tengah, render Spacer kosong
            if (isCreate) {
              return <View key={route.key} style={styles.tabSpacer} />;
            }

            // Handler Tab Biasa
            const onPress = () => {
              const event = navigation.emit({
                type: "tabPress",
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                navigation.navigate(route.name);
              }
            };

            // Ukur posisi X untuk animasi bubble
            const onLayout = (e: LayoutChangeEvent) => {
              const { x, width } = e.nativeEvent.layout;
              // Simpan posisi tengah tab relatif terhadap row
              setMeasures((prev) => ({
                ...prev,
                [index]: x + width / 2 - BUBBLE_SIZE / 2,
              }));
            };

            return (
              <TouchableOpacity
                key={route.key}
                onLayout={onLayout}
                onPress={onPress}
                style={styles.tabItem}
                activeOpacity={0.7}
              >
                <Ionicons
                  name={
                    isFocused
                      ? (options.tabBarIcon as any)?.({
                          focused: true,
                          color: "",
                        })?.props?.name
                      : (options.tabBarIcon as any)?.({
                          focused: false,
                          color: "",
                        })?.props?.name || "square"
                  }
                  size={24}
                  color={isFocused ? "#FFF" : "#9aa0a6"}
                />
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* 3. FLOATING ACTION BUTTON (FAB) - Di luar Pill agar lebih besar */}
      <View style={styles.fabContainer}>
        <Pressable
          onPress={handleFabPress}
          style={({ pressed }) => [
            styles.fabButton,
            pressed && { transform: [{ scale: 0.95 }] },
          ]}
        >
          <LinearGradient
            colors={["#00a2e4", "#2bd3ff"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.fabGradient}
          >
            <Ionicons name="add" size={32} color="#FFF" />
          </LinearGradient>
        </Pressable>
      </View>

      {/* 4. MODAL COMPONENT */}
      <QuickActionModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        navigation={navigation}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rootContainer: {
    position: "absolute",
    left: 20,
    right: 20,
    alignItems: "center",
    justifyContent: "center",
    // Hindari SafeAreaView disini agar posisi absolute lebih presisi
  },

  // --- PILL STYLES ---
  pillContainer: {
    width: "100%",
    height: BAR_HEIGHT,
    borderRadius: PILL_RADIUS,
    overflow: "hidden", // Penting untuk BlurView
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  pillSolidBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(26,27,31,0.95)", // Warna gelap solid/transparan
    zIndex: -1,
  },
  tabRow: {
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
  },

  // --- TAB ITEMS ---
  tabItem: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  tabSpacer: {
    flex: 1, // Mengambil ruang kosong di tengah untuk FAB
    pointerEvents: "none",
  },

  // --- BUBBLE INDICATOR ---
  activeBubble: {
    position: "absolute",
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    borderRadius: BUBBLE_SIZE / 2,
    backgroundColor: "rgba(255,255,255,0.1)", // Highlight halus
    zIndex: 1,
  },

  // --- FAB STYLES ---
  fabContainer: {
    position: "absolute",
    bottom: BAR_HEIGHT / 2 - FAB_SIZE / 2 + 5, // Mengangkat FAB sedikit ke atas (offset)
    alignItems: "center",
    justifyContent: "center",
    zIndex: 10,
  },
  fabButton: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    shadowColor: "#00a2e4",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  fabGradient: {
    width: "100%",
    height: "100%",
    borderRadius: FAB_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#1a1a1a", // Border gelap agar menyatu dengan background (opsional)
  },
});
