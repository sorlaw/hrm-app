import { Ionicons } from "@expo/vector-icons";
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

// Gunakan path relative yang aman
import QuickActionModal from "../shared/QuickActionModal";

const BAR_HEIGHT = 70;
const BOTTOM_MARGIN = 20;
const PILL_RADIUS = 35;
const FAB_SIZE = 64;
const BUBBLE_SIZE = 45;

export const AnimatedTabBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  const insets = useSafeAreaInsets();
  const [measures, setMeasures] = useState<Record<number, number>>({});
  const [isModalVisible, setModalVisible] = useState(false);

  const isCreateTabFocused = state.routeNames[state.index] === "create";

  // --- ANIMASI BUBBLE ---
  const bubbleOpacity = useSharedValue(0);
  const bubbleTranslateX = useSharedValue(0);

  useEffect(() => {
    if (isCreateTabFocused) {
      bubbleOpacity.value = withTiming(0);
    } else {
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

  const handleFabPress = async () => {
    // console.log("FAB Pressed"); // Uncomment untuk debug di logcat
    await Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setModalVisible(true);
  };

  return (
    // FIX 1: Hapus pointerEvents="box-none" di root container agar event touch stabil
    // FIX 2: Tambahkan zIndex tinggi agar floating di atas konten screen
    <View
      style={[styles.rootContainer, { bottom: insets.bottom + BOTTOM_MARGIN }]}
    >
      {/* 1. BACKGROUND PILL */}
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
          <Animated.View style={[styles.activeBubble, animatedBubbleStyle]} />

          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;
            const isCreate = route.name === "create";

            if (isCreate) {
              return <View key={route.key} style={styles.tabSpacer} />;
            }

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

            const onLayout = (e: LayoutChangeEvent) => {
              const { x, width } = e.nativeEvent.layout;
              setMeasures((prev) => ({
                ...prev,
                [index]: x + width / 2 - BUBBLE_SIZE / 2,
              }));
            };

            const IconComponent = options.tabBarIcon;

            return (
              <TouchableOpacity
                key={route.key}
                onLayout={onLayout}
                onPress={onPress}
                style={styles.tabItem}
                activeOpacity={0.7}
              >
                {IconComponent && (
                  <IconComponent
                    focused={isFocused}
                    color={isFocused ? "#FFF" : "#9aa0a6"}
                    size={24}
                  />
                )}
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* 3. FAB BUTTON (Tombol Tengah) */}
      {/* FIX 3: Container FAB harus punya zIndex lebih tinggi dari Pill */}
      {/* FIX 4: elevation tinggi untuk Android */}
      <View style={styles.fabContainer}>
        <Pressable
          onPress={handleFabPress}
          // FIX 5: Area sentuh diperluas
          hitSlop={{ top: 15, bottom: 15, left: 15, right: 15 }}
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

      {/* 4. MODAL */}
      <QuickActionModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
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
    zIndex: 100, // Pastikan di atas konten scrollview
  },
  pillContainer: {
    width: "100%",
    height: BAR_HEIGHT,
    borderRadius: PILL_RADIUS,
    overflow: "hidden",
    // Shadow standar
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5, // Elevation rendah agar FAB bisa di atasnya
    backgroundColor: "transparent", // Penting
  },
  pillSolidBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(26,27,31,0.95)",
    zIndex: -1,
  },
  tabRow: {
    flexDirection: "row",
    height: "100%",
    alignItems: "center",
  },
  tabItem: {
    flex: 1,
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },
  tabSpacer: {
    flex: 1,
    pointerEvents: "none",
  },
  activeBubble: {
    position: "absolute",
    width: BUBBLE_SIZE,
    height: BUBBLE_SIZE,
    borderRadius: BUBBLE_SIZE / 2,
    backgroundColor: "rgba(255,255,255,0.1)",
    zIndex: 1,
  },
  // --- FAB STYLES YANG DIPERBAIKI ---
  fabContainer: {
    position: "absolute",
    // Mengangkat FAB agar setengahnya keluar dari pill
    bottom: BAR_HEIGHT / 2 - FAB_SIZE / 2 + 5,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 999, // Super tinggi agar selalu menang klik
    elevation: 10, // Android: Lebih tinggi dari pillContainer (5)
  },
  fabButton: {
    width: FAB_SIZE,
    height: FAB_SIZE,
    borderRadius: FAB_SIZE / 2,
    shadowColor: "#00a2e4",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 10, // Android shadow
  },
  fabGradient: {
    width: "100%",
    height: "100%",
    borderRadius: FAB_SIZE / 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 4,
    borderColor: "#1a1a1a", // Border gelap agar menyatu dengan background
  },
});
