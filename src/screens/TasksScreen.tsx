import React, { useState } from "react";
import { Alert, FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/theme";

// Import Komponen Modular
import { useRouter } from "expo-router";
import { EmptyState } from "../components/tasks/EmptyState";
import { Header } from "../components/tasks/Header";
import { TaskCard } from "../components/tasks/TaskCard";
import { TaskTabs } from "../components/tasks/TaskTabs";

// Data Dummy (Bisa dipindah ke file terpisah jika mau)
const TASKS_DATA = [
  {
    id: "1",
    title: "Perbaikan Bug Login Page",
    project: "HR Mobile App",
    deadline: "Hari ini, 17:00",
    priority: "High",
    status: "In Progress",
    progress: 75,
    type: "assigned", // 👈 Tugas dari Bos
    assigner: "Pak Budi (CTO)", // 👈 Yang nyuruh
    description: "Tolong perbaiki bug login Android 13 secepatnya.",
  },
  {
    id: "2",
    title: "Riset Library Maps Baru",
    project: "R&D",
    deadline: "Jumat Nanti",
    priority: "Medium",
    status: "To Do",
    progress: 0,
    type: "personal", // 👈 Tugas Inisiatif Sendiri
    assigner: "Saya Sendiri",
    description: "Cari alternatif Google Maps yang lebih murah.",
  },
  {
    id: "3",
    title: "Siapkan Materi Presentasi Q3",
    project: "Management",
    deadline: "Besok, 09:00",
    priority: "High",
    status: "To Do",
    progress: 0,
    type: "assigned",
    assigner: "Bu Siska (VP)",
    description: "Slide presentasi harus sudah siap sebelum meeting pagi.",
  },
  {
    id: "4",
    title: "Upload Bukti Reimbursement",
    project: "Admin",
    deadline: "Selesai",
    priority: "Low",
    status: "Completed",
    progress: 100,
    type: "personal",
    assigner: "Saya Sendiri",
    description: "Jangan lupa upload struk makan siang bareng klien.",
  },
];

const TasksScreen = () => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("To Do");

  // Logic Filter
  const getFilteredTasks = () => {
    // Filter Tab Status
    let filtered = TASKS_DATA;
    if (activeTab === "Completed") {
      filtered = TASKS_DATA.filter((task) => task.status === "Completed");
    } else if (activeTab === "In Progress") {
      filtered = TASKS_DATA.filter((task) => task.status === "In Progress");
    } else {
      filtered = TASKS_DATA.filter((task) => task.status === "To Do");
    }
    return filtered;
  };

  const filteredData = getFilteredTasks();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        {/* Header */}
        <Header
          taskCount={filteredData.length}
          onAddPress={() => router.push("/form-tugas")}
        />

        {/* Tabs */}
        <TaskTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* List */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState />}
          renderItem={({ item }) => (
            <TaskCard
              item={item}
              onPress={() => {
                // Kirim data type & assigner ke detail
                router.push({
                  pathname: "/detail-tugas",
                  params: {
                    title: item.title,
                    project: item.project,
                    deadline: item.deadline,
                    priority: item.priority,
                    status: item.status,
                    progress: item.progress,
                    description: item.description,
                    type: item.type, // 👈 Kirim Type
                    assigner: item.assigner, // 👈 Kirim Nama Bos
                  },
                });
              }}
              onOptionPress={() => {
                Alert.alert("Opsi Tugas", `Pilih aksi untuk "${item.title}"`, [
                  {
                    text: "Edit",
                    onPress: () => console.log("Edit " + item.id),
                  },
                  {
                    text: "Hapus",
                    onPress: () => console.log("Hapus " + item.id),
                    style: "destructive",
                  },
                  { text: "Batal", style: "cancel" },
                ]);
              }}
            />
          )}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 20, // Padding global untuk screen ini
    paddingTop: 10,
  },
  listContent: {
    paddingBottom: 100, // Spacer untuk bottom nav
  },
});

export default TasksScreen;
