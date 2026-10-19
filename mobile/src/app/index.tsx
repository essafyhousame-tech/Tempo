import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTaskContext } from "../context/TaskContext";

export default function HomeScreen() {
  const { tasks, toggleTask } = useTaskContext();

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.content}
        >
          {/* HEADER */}
          <View style={styles.header}>
            <View style={styles.brand}>
              <View style={styles.logo}>
                <Text style={styles.logoText}>T</Text>
              </View>

              <View>
                <Text style={styles.brandName}>Tempo</Text>
                <Text style={styles.brandSubtitle}>Daily Rhythm</Text>
              </View>
            </View>

            <View style={styles.today}>
              <Text style={styles.todayLabel}>TODAY</Text>
              <Text style={styles.todayDate}>Thu, Sep 17</Text>
            </View>
          </View>

          {/* DAY FLOW */}
          <View style={styles.flowCard}>
            <View style={styles.flowTop}>
              <View>
                <Text style={styles.flowLabel}>DAY FLOW</Text>
                <Text style={styles.flowText}>{completedCount} of {totalCount} tasks completed</Text>
              </View>

              <TouchableOpacity
                style={styles.askAi}
                onPress={() => router.push("/chat")}
              >
                <Ionicons
                  name="sparkles-outline"
                  size={13}
                  color="#17191B"
                />
                <Text style={styles.askAiText}>Ask AI</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.progressBackground}>
              <View style={[styles.progressFill, { width: `${progressPercent}%` }]} />
            </View>
          </View>

          {/* TASKS */}
          <View style={styles.tasksHeader}>
            <Text style={styles.sectionTitle}>Today's Tasks</Text>

            <TouchableOpacity
              onPress={() => router.push("/add-task")}
            >
              <Text style={styles.viewAll}>View all</Text>
            </TouchableOpacity>
          </View>

          {tasks.map((task) => (
            <View style={styles.taskCard} key={task.title}>
              <TouchableOpacity
                style={[
                  styles.checkbox,
                  task.completed && styles.checkboxCompleted,
                ]}
                onPress={() => toggleTask(task.id || task.title, task.completed)}
                activeOpacity={0.7}
              >
                {task.completed && (
                  <Ionicons
                    name="checkmark"
                    size={13}
                    color="#FFFFFF"
                  />
                )}
              </TouchableOpacity>

              <View style={styles.taskInfo}>
                <Text
                  style={[
                    styles.taskTitle,
                    task.completed && styles.completedTitle,
                  ]}
                >
                  {task.title}
                </Text>

                <Text style={styles.taskMeta}>
                  {task.category} • {task.time}
                </Text>
              </View>

              <Text
                style={[
                  styles.priority,
                  task.priority === "HIGH" && styles.high,
                  task.priority === "MEDIUM" && styles.medium,
                  task.priority === "LOW" && styles.low,
                ]}
              >
                {task.priority}
              </Text>
            </View>
          ))}

          {/* AI CARD */}
          <TouchableOpacity
            style={styles.aiCard}
            onPress={() => router.push("/chat")}
          >
            <View style={styles.aiIcon}>
              <Ionicons
                name="sparkles-outline"
                size={17}
                color="#FFFFFF"
              />
            </View>

            <View style={styles.aiTextContainer}>
              <Text style={styles.aiTitle}>
                Need to adjust your afternoon flow?
              </Text>

              <Text style={styles.aiSubtitle}>
                Tap to tell Tempo AI assistant
              </Text>
            </View>

            <Ionicons
              name="chevron-forward"
              size={17}
              color="#8C8E92"
            />
          </TouchableOpacity>
        </ScrollView>

        {/* BOTTOM NAVIGATION */}
        <View style={styles.bottomNav}>
          {/* HOME */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/")}
          >
            <Ionicons
              name="home"
              size={18}
              color="#17191B"
            />
            <Text style={styles.navActive}>Home</Text>
          </TouchableOpacity>

          {/* ADD TASK */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/add-task")}
          >
            <View style={styles.addCircle}>
              <Ionicons
                name="add"
                size={20}
                color="#FFFFFF"
              />
            </View>

            <Text style={styles.navText}>Add Task</Text>
          </TouchableOpacity>

          {/* AI */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/chat")}
          >
            <Ionicons
              name="chatbubble-outline"
              size={18}
              color="#85878B"
            />
            <Text style={styles.navText}>AI Assistant</Text>
          </TouchableOpacity>

          {/* PROFILE */}
          <TouchableOpacity 
          style={styles.navItem}
          onPress={() => router.push("/profile")}
          >
            <Ionicons
              name="person-outline"
              size={18}
              color="#85878B"
            />
            <Text style={styles.navText}>Profile</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 20,
  },

  header: {
    height: 72,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  brand: {
    flexDirection: "row",
    alignItems: "center",
  },

  logo: {
    width: 32,
    height: 32,
    borderRadius: 9,
    backgroundColor: "#17191B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  logoText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  brandName: {
    color: "#17191B",
    fontSize: 15,
    fontWeight: "700",
  },

  brandSubtitle: {
    color: "#999B9F",
    fontSize: 8,
    marginTop: 2,
  },

  today: {
    alignItems: "flex-end",
  },

  todayLabel: {
    color: "#999B9F",
    fontSize: 7,
    fontWeight: "600",
  },

  todayDate: {
    color: "#303236",
    fontSize: 9,
    marginTop: 3,
  },

  flowCard: {
    borderWidth: 1,
    borderColor: "#E6E7E8",
    borderRadius: 12,
    padding: 13,
    marginBottom: 20,
  },

  flowTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  flowLabel: {
    color: "#999B9F",
    fontSize: 7,
    fontWeight: "600",
    letterSpacing: 0.5,
  },

  flowText: {
    color: "#303236",
    fontSize: 10,
    fontWeight: "600",
    marginTop: 5,
  },

  askAi: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  askAiText: {
    color: "#303236",
    fontSize: 8,
    fontWeight: "600",
  },

  progressBackground: {
    height: 5,
    borderRadius: 3,
    backgroundColor: "#E9EAEB",
    marginTop: 12,
    overflow: "hidden",
  },

  progressFill: {
    width: "40%",
    height: "100%",
    borderRadius: 3,
    backgroundColor: "#17191B",
  },

  tasksHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 9,
  },

  sectionTitle: {
    color: "#17191B",
    fontSize: 14,
    fontWeight: "700",
  },

  viewAll: {
    color: "#85878B",
    fontSize: 8,
  },

  taskCard: {
    minHeight: 57,
    borderWidth: 1,
    borderColor: "#E7E8E9",
    borderRadius: 11,
    paddingHorizontal: 11,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 6,
    borderWidth: 1,
    borderColor: "#C8CACD",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  checkboxCompleted: {
    backgroundColor: "#17191B",
    borderColor: "#17191B",
  },

  taskInfo: {
    flex: 1,
  },

  taskTitle: {
    color: "#27292C",
    fontSize: 10,
    fontWeight: "600",
  },

  completedTitle: {
    textDecorationLine: "line-through",
    color: "#85878B",
  },

  taskMeta: {
    color: "#999B9F",
    fontSize: 8,
    marginTop: 4,
  },

  priority: {
    fontSize: 7,
    fontWeight: "700",
  },

  high: {
    color: "#D45D5D",
  },

  medium: {
    color: "#C99332",
  },

  low: {
    color: "#55A27B",
  },

  aiCard: {
    minHeight: 62,
    borderRadius: 12,
    backgroundColor: "#F5F5F3",
    paddingHorizontal: 12,
    marginTop: 7,
    flexDirection: "row",
    alignItems: "center",
  },

  aiIcon: {
    width: 29,
    height: 29,
    borderRadius: 9,
    backgroundColor: "#17191B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  aiTextContainer: {
    flex: 1,
  },

  aiTitle: {
    color: "#303236",
    fontSize: 9,
    fontWeight: "600",
  },

  aiSubtitle: {
    color: "#999B9F",
    fontSize: 7,
    marginTop: 4,
  },

  bottomNav: {
    height: 66,
    borderTopWidth: 1,
    borderTopColor: "#EEEEEC",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 7,
    flexShrink: 0,
  },

  navItem: {
    width: 70,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },

  addCircle: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: "#17191B",
    alignItems: "center",
    justifyContent: "center",
  },

  navText: {
    color: "#85878B",
    fontSize: 7,
    marginTop: 4,
  },

  navActive: {
    color: "#17191B",
    fontSize: 7,
    fontWeight: "600",
    marginTop: 4,
  },
});