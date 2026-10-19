import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import { useTaskContext } from "../context/TaskContext";

const categories = ["Work", "Study", "Health", "Personal", "Shopping"];
const priorities = ["Low", "Medium", "High"];

export default function AddTaskScreen() {
  const { addTask } = useTaskContext();

  const [category, setCategory] = useState("Work");
  const [priority, setPriority] = useState("Medium");
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("17/09/2026");
  const [time, setTime] = useState("14:00");

  const handleSave = () => {
    if (!title.trim()) {
      Alert.alert("Missing Title", "Please enter a task title.");
      return;
    }

    addTask({
      title: title.trim(),
      category,
      time,
      priority: priority.toUpperCase(),
      completed: false,
    });

    router.push("/");
  };

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>Add New Task</Text>

          <TouchableOpacity onPress={() => router.back()}>
            <Text style={styles.cancel}>Cancel</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.divider} />

        {/* CONTENT */}
        <View style={styles.content}>

          {/* TASK TITLE */}
          <Text style={styles.label}>TASK TITLE</Text>

          <TextInput
            value={title}
            onChangeText={setTitle}
            placeholder="e.g., Study for Economics exam"
            placeholderTextColor="#A5A8AE"
            style={styles.input}
          />

          {/* CATEGORY */}
          <Text style={[styles.label, styles.categoryLabel]}>
            CATEGORY
          </Text>

          <View style={styles.categoryContainer}>
            {categories.map((item) => {
              const selected = category === item;

              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => setCategory(item)}
                  style={[
                    styles.categoryButton,
                    selected && styles.categorySelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.categoryText,
                      selected && styles.categorySelectedText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* DATE / TIME */}
          <View style={styles.dateTimeRow}>

            <View style={styles.fieldHalf}>
              <Text style={styles.label}>DATE</Text>

              <View style={styles.inputWithIcon}>
                <TextInput
                  value={date}
                  onChangeText={setDate}
                  style={[styles.fieldText, { padding: 0, margin: 0, minWidth: 70 }]}
                />

                <Ionicons
                  name="calendar-outline"
                  size={14}
                  color="#70747A"
                />
              </View>
            </View>

            <View style={styles.fieldHalf}>
              <Text style={styles.label}>TIME</Text>

              <View style={styles.inputWithIcon}>
                <TextInput
                  value={time}
                  onChangeText={setTime}
                  style={[styles.fieldText, { padding: 0, margin: 0, minWidth: 50 }]}
                />

                <Ionicons
                  name="time-outline"
                  size={14}
                  color="#70747A"
                />
              </View>
            </View>

          </View>

          {/* PRIORITY */}
          <Text style={[styles.label, styles.priorityLabel]}>
            PRIORITY
          </Text>

          <View style={styles.priorityContainer}>
            {priorities.map((item) => {
              const selected = priority === item;

              return (
                <TouchableOpacity
                  key={item}
                  onPress={() => setPriority(item)}
                  style={[
                    styles.priorityButton,
                    selected && styles.prioritySelected,
                  ]}
                >
                  <Text
                    style={[
                      styles.priorityText,
                      selected && styles.prioritySelectedText,
                    ]}
                  >
                    {item}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>

          {/* SAVE */}
          <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
            <Ionicons
              name="arrow-forward"
              size={15}
              color="#FFFFFF"
            />

            <Text style={styles.saveText}>Save Task</Text>
          </TouchableOpacity>

        </View>

        {/* BOTTOM NAV */}
        <View style={styles.bottomNav}>

          {/* HOME */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/")}
          >
            <Ionicons
              name="home-outline"
              size={18}
              color="#777A80"
            />

            <Text style={styles.navText}>
              Home
            </Text>
          </TouchableOpacity>

          {/* ADD TASK */}
          <TouchableOpacity
            style={styles.navItem}
          >
            <View style={styles.addCircle}>
              <Ionicons
                name="add"
                size={22}
                color="#FFFFFF"
              />
            </View>

            <Text style={styles.navActive}>
              Add Task
            </Text>
          </TouchableOpacity>

          {/* AI ASSISTANT */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/chat")}
          >
            <Ionicons
              name="chatbubble-outline"
              size={17}
              color="#777A80"
            />

            <Text style={styles.navText}>
              AI Assistant
            </Text>
          </TouchableOpacity>

          {/* PROFILE */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/profile")}
          >
            <Ionicons
              name="person-outline"
              size={17}
              color="#777A80"
            />

            <Text style={styles.navText}>
              Profile
            </Text>
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

  /* HEADER */

  header: {
    height: 67,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  title: {
    color: "#17181A",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: -0.35,
  },

  cancel: {
    color: "#74777C",
    fontSize: 10,
    fontWeight: "500",
  },

  divider: {
    height: 1,
    backgroundColor: "#EEEEEC",
  },

  /* CONTENT */

  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 17,
    paddingBottom: 20,
  },

  label: {
    color: "#85888D",
    fontSize: 8,
    fontWeight: "600",
    letterSpacing: 0.45,
    marginBottom: 8,
  },

  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#E3E5E8",
    borderRadius: 11,
    paddingHorizontal: 13,
    color: "#252629",
    fontSize: 10,
    backgroundColor: "#FFFFFF",
  },

  categoryLabel: {
    marginTop: 19,
  },

  categoryContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 7,
    width: "100%",
  },

  categoryButton: {
    height: 28,
    paddingHorizontal: 16,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: "#E0E2E5",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  categorySelected: {
    backgroundColor: "#17181A",
    borderColor: "#17181A",
  },

  categoryText: {
    color: "#303236",
    fontSize: 9,
    fontWeight: "500",
  },

  categorySelectedText: {
    color: "#FFFFFF",
  },

  /* DATE / TIME */

  dateTimeRow: {
    flexDirection: "row",
    gap: 11,
    marginTop: 19,
  },

  fieldHalf: {
    flex: 1,
  },

  inputWithIcon: {
    height: 39,
    borderWidth: 1,
    borderColor: "#E3E5E8",
    borderRadius: 11,
    paddingHorizontal: 11,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  fieldText: {
    color: "#34363A",
    fontSize: 9,
    fontWeight: "500",
  },

  /* PRIORITY */

  priorityLabel: {
    marginTop: 19,
  },

  priorityContainer: {
    flexDirection: "row",
    gap: 9,
  },

  priorityButton: {
    flex: 1,
    height: 34,
    borderRadius: 11,
    borderWidth: 1,
    borderColor: "#E2E4E7",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#FFFFFF",
  },

  prioritySelected: {
    borderColor: "#F18A25",
    backgroundColor: "#FFFFFF",
  },

  priorityText: {
    color: "#303236",
    fontSize: 9,
    fontWeight: "500",
  },

  prioritySelectedText: {
    color: "#D96E0C",
    fontWeight: "600",
  },

  /* SAVE */

  saveButton: {
    height: 40,
    marginTop: 28,
    borderRadius: 11,
    backgroundColor: "#17191B",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 7,
  },

  saveText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },

  /* BOTTOM NAV */

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

  navText: {
    color: "#85878B",
    fontSize: 7,
    marginTop: 4,
  },

  navActive: {
    color: "#17181A",
    fontSize: 7,
    fontWeight: "600",
    marginTop: 4,
  },

  addCircle: {
    width: 25,
    height: 25,
    borderRadius: 13,
    backgroundColor: "#17191B",
    alignItems: "center",
    justifyContent: "center",
  },
});