import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS } from "../constants/theme";

// Import Komponen Modular
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
  },
  {
    id: "2",
    title: "Meeting Review Q3",
    project: "Internal Management",
    deadline: "Besok, 10:00",
    priority: "Medium",
    status: "To Do",
    progress: 0,
  },
  {
    id: "3",
    title: "Update Dokumentasi API",
    project: "Backend Service",
    deadline: "15 Des 2025",
    priority: "Low",
    status: "To Do",
    progress: 0,
  },
  {
    id: "4",
    title: "Desain Mockup Dashboard",
    project: "Client Project A",
    deadline: "Selesai",
    priority: "High",
    status: "Completed",
    progress: 100,
  },
];

const TasksScreen = () => {
  const [activeTab, setActiveTab] = useState("To Do");

  // Logic Filter
  const getFilteredTasks = () => {
    if (activeTab === "Completed") {
      return TASKS_DATA.filter((task) => task.status === "Completed");
    } else if (activeTab === "In Progress") {
      return TASKS_DATA.filter((task) => task.status === "In Progress");
    }
    return TASKS_DATA.filter((task) => task.status === "To Do");
  };

  const filteredData = getFilteredTasks();

  return (
    <SafeAreaView style={styles.container}>
      {/* Container utama dengan padding horizontal */}
      <View style={styles.contentContainer}>
        {/* 1. Header */}
        <Header
          taskCount={filteredData.length}
          onAddPress={() => console.log("Tambah Tugas")}
        />

        {/* 2. Tabs */}
        <TaskTabs activeTab={activeTab} onTabChange={setActiveTab} />

        {/* 3. Task List */}
        <FlatList
          data={filteredData}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={<EmptyState />}
          renderItem={({ item }) => <TaskCard item={item} />}
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
