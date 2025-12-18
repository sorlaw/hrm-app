# 📱 HRM App

<div align="center">

![Platform](https://img.shields.io/badge/Platform-iOS%20%7C%20Android-blue?style=for-the-badge&logo=react)
![Expo](https://img.shields.io/badge/Expo-54.0.0-000020?style=for-the-badge&logo=expo)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript)
![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)

**A modern, efficient Human Resource Management solution built with React Native and Expo.**

[Features](#-features) • [Tech Stack](#-tech-stack) • [Getting Started](#-getting-started) • [Installation](#-installation)

</div>

---

## 📖 Overview

**HRM App** is a comprehensive mobile application designed to streamline HR processes for employees and managers. From attendance tracking to payroll management, it provides a seamless user experience with a robust set of features to manage daily work life efficiently.

## ✨ Features

Based on a modular and scalable architecture, the app currently supports:

### 👤 Profile & Personal Data
- **Profile Management**: View and edit personal details securely.
- **Biometric Security**: Protect sensitive modules like Tax Reports and Payslips using FaceID/TouchID.
- **Tax Reporting**: Dedicated screen for viewing and managing tax-related documents.

### 📅 Attendance & Leave
- **Digital Attendance**: Easy check-in and check-out functionality.
- **Leave Management**: Submit and track leave requests (`FormCutiScreen`).
- **Overtime & Sick Leave**: Specialized forms for overtime submission (`FormLemburScreen`) and sick leave reporting (`FormSakitScreen`).

### 💼 Work Management
- **Task Tracking**: Assign, view, and manage daily tasks (`TasksScreen`, `DetailTugasScreen`).
- **Team Overview**: Managers can view their team's status (`TimSayaScreen`).
- **Reimbursement & Claims**: Submit business expense claims easily (`FormKlaimScreen`, `FormDinasScreen`).
- **Payslips**: Secure access to monthly payslips (`SlipGajiScreen`).

## 🛠 Tech Stack

Built with cutting-edge mobile technologies:

- **Framework**: [React Native](https://reactnative.dev/) (0.81.5) with [Expo SDK 54](https://expo.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Routing**: [Expo Router](https://docs.expo.dev/router/introduction/) (v6)
- **UI/UX**: 
  - `react-native-reanimated` for smooth animations
  - `react-native-svg` & `@expo/vector-icons` for crisp iconography
  - `expo-blur` & `expo-linear-gradient` for modern aesthetics
- **Security**: `expo-local-authentication` for biometric access
- **Code Quality**: ESLint, Prettier

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed:
- [Node.js](https://nodejs.org/) (LTS recommended)
- [npm](https://www.npmjs.com/) or [Bun](https://bun.sh/)
- [Expo Go](https://expo.dev/client) app on your physical device or an Android/iOS Simulator.

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/hrm-app.git
   cd hrm-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Start the development server**
   ```bash
   npx expo start
   ```

## 📱 Project Structure

```
hrm-app/
├── app/                 # Expo Router file-based routing
├── assets/              # Images, fonts, and icons
├── src/
│   ├── components/      # Reusable UI components
│   ├── constants/       # App-wide constants (colors, layout)
│   ├── screens/         # Screen implementations (logic & UI)
│   ├── services/        # API services (if applicable)
│   └── utils/           # Helper functions
├── package.json         # Dependencies and scripts
├── app.json             # Expo configuration
└── tsconfig.json        # TypeScript configuration
```

## 🤝 Contributing

Contributions are welcome! Please fork the repository and submit a pull request for any enhancements or bug fixes.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.
