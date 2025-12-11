import React from "react";
import Svg, { Path } from "react-native-svg";

interface SemiCircleGaugeProps {
  score: number;
  maxScore?: number;
  radius?: number;
  strokeWidth?: number;
  color?: string;
  bgColor?: string;
  textColor?: string;
}

const SemiCircleGauge: React.FC<SemiCircleGaugeProps> = ({
  score = 50,
  maxScore = 100,
  radius = 100,
  strokeWidth = 20,
  color = "#4CAF50",
  bgColor = "#E0E0E0",
  textColor = "#000",
}) => {
  // --- Helpers Matematika ---

  // Mengubah koordinat polar (sudut) ke kartesius (x,y)
  const polarToCartesian = (
    centerX: number,
    centerY: number,
    r: number,
    angleInDegrees: number
  ) => {
    // Kurangi 180 derajat agar gauge mulai dari kiri (jam 9)
    const angleInRadians = ((angleInDegrees - 180) * Math.PI) / 180.0;

    return {
      x: centerX + r * Math.cos(angleInRadians),
      y: centerY + r * Math.sin(angleInRadians),
    };
  };

  // Membuat string path untuk SVG Arc
  const describeArc = (
    x: number,
    y: number,
    r: number,
    startAngle: number,
    endAngle: number
  ): string => {
    const start = polarToCartesian(x, y, r, endAngle);
    const end = polarToCartesian(x, y, r, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M",
      start.x,
      start.y,
      "A",
      r,
      r,
      0,
      largeArcFlag,
      0,
      end.x,
      end.y,
    ].join(" ");
  };

  // --- Logika Render ---

  // Clamp score agar 0 <= score <= maxScore
  const clampedScore = Math.min(Math.max(score, 0), maxScore);

  // Hitung sudut akhir berdasarkan persentase (Max 180 derajat)
  const scoreAngle = (clampedScore / maxScore) * 180;

  // Dimensi Canvas
  const width = radius * 2;
  const height = radius; // Setengah lingkaran + ketebalan garis

  const cx = radius;
  const cy = radius;

  return (
    <Svg width={width} height={height}>
      {/* Background Track (Abu-abu) */}
      <Path
        d={describeArc(cx, cy, radius - strokeWidth / 2, 0, 180)}
        stroke={bgColor}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
      />

      {/* Progress Arc (Berwarna) */}
      <Path
        d={describeArc(cx, cy, radius - strokeWidth / 2, 0, scoreAngle)}
        stroke={color}
        strokeWidth={strokeWidth}
        fill="none"
        strokeLinecap="round"
      />
    </Svg>
  );
};

export default SemiCircleGauge;
