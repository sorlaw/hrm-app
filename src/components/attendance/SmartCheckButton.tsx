import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect } from "react";
import { Dimensions, Pressable, StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const BUTTON_SIZE = width * 0.45;

interface SmartCheckButtonProps {
  isCheckedIn: boolean;
  onPress: () => void;
}

export const SmartCheckButton = ({
  isCheckedIn,
  onPress,
}: SmartCheckButtonProps) => {
  const progress = useSharedValue(isCheckedIn ? 1 : 0);
  const scale = useSharedValue(1);

  useEffect(() => {
    progress.value = withSpring(isCheckedIn ? 1 : 0, {
      damping: 15,
      stiffness: 120,
    });
  }, [isCheckedIn]);

  const handlePressIn = () => {
    scale.value = withSpring(0.95);
  };
  const handlePressOut = () => {
    scale.value = withSpring(1);
    onPress();
  };

  const rContainerStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  const rBlueStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [1, 0]),
    zIndex: progress.value < 0.5 ? 2 : 0,
  }));

  const rRedStyle = useAnimatedStyle(() => ({
    opacity: interpolate(progress.value, [0, 1], [0, 1]),
    zIndex: progress.value > 0.5 ? 2 : 0,
  }));

  const rRingStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      progress.value,
      [0, 1],
      ["rgba(41, 182, 246, 0.3)", "rgba(239, 68, 68, 0.3)"]
    );
    const bgColor = interpolateColor(
      progress.value,
      [0, 1],
      ["rgba(41, 182, 246, 0.05)", "rgba(239, 68, 68, 0.05)"]
    );
    return { borderColor, backgroundColor: bgColor };
  });

  const rIconStyle = useAnimatedStyle(() => {
    const rotate = interpolate(progress.value, [0, 1], [0, 360]);
    return { transform: [{ rotate: `${rotate}deg` }] };
  });

  return (
    <Animated.View style={[styles.outerRing, rRingStyle]}>
      <View style={styles.innerRing}>
        <Pressable
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          style={styles.pressable}
        >
          <Animated.View style={[styles.touchableArea, rContainerStyle]}>
            <View
              style={[StyleSheet.absoluteFill, { backgroundColor: "#FFF" }]}
            />

            {/* Blue Layer */}
            <Animated.View style={[StyleSheet.absoluteFill, rBlueStyle]}>
              <LinearGradient
                colors={["#29B6F6", "#0288D1"]}
                style={styles.gradientButton}
              >
                <Animated.View style={rIconStyle}>
                  <FontAwesome5 name="fingerprint" size={42} color="#FFF" />
                </Animated.View>
                <Text style={styles.buttonMainText}>CHECK IN</Text>
                <Text style={styles.buttonSubText}>Masuk Kerja</Text>
              </LinearGradient>
            </Animated.View>

            {/* Red Layer */}
            <Animated.View style={[StyleSheet.absoluteFill, rRedStyle]}>
              <LinearGradient
                colors={["#FF7043", "#D84315"]}
                style={styles.gradientButton}
              >
                <Animated.View style={rIconStyle}>
                  <MaterialCommunityIcons
                    name="run-fast"
                    size={48}
                    color="#FFF"
                  />
                </Animated.View>
                <Text style={styles.buttonMainText}>CHECK OUT</Text>
                <Text style={styles.buttonSubText}>Pulang Kerja</Text>
              </LinearGradient>
            </Animated.View>
          </Animated.View>
        </Pressable>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  outerRing: {
    width: BUTTON_SIZE + 40,
    height: BUTTON_SIZE + 40,
    borderRadius: (BUTTON_SIZE + 40) / 2,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
  },
  innerRing: {
    width: BUTTON_SIZE + 12,
    height: BUTTON_SIZE + 12,
    borderRadius: (BUTTON_SIZE + 12) / 2,
    backgroundColor: "#FFF",
    alignItems: "center",
    justifyContent: "center",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
  },
  pressable: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  touchableArea: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    overflow: "hidden",
    position: "relative",
  },
  gradientButton: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonMainText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFF",
    letterSpacing: 1,
    marginTop: 8,
    textShadowColor: "rgba(0,0,0,0.2)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
  buttonSubText: {
    fontSize: 10,
    color: "rgba(255,255,255,0.9)",
    marginTop: 2,
    fontWeight: "600",
  },
});
