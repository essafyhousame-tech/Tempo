import React, { useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

export default function ProfileScreen() {
  const [reminderEnabled, setReminderEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.safe}>
      <View style={styles.screen}>

        {/* HEADER */}
        <View style={styles.header}>
          <Text style={styles.title}>
            Profile & Settings
          </Text>
        </View>

        <View style={styles.divider} />

        {/* CONTENT */}
        <View style={styles.content}>

          {/* PROFILE CARD */}
          <View style={styles.profileCard}>

            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                AC
              </Text>
            </View>

            <View style={styles.profileInfo}>
              <Text style={styles.name}>
                Alex Chen
              </Text>

              <Text style={styles.email}>
                alex.chen@example.com
              </Text>

              <View style={styles.planBadge}>
                <Text style={styles.planText}>
                  Pro Plan • Student / Freelancer
                </Text>
              </View>
            </View>

          </View>

          {/* BASIC SETTINGS */}
          <Text style={styles.sectionTitle}>
            BASIC SETTINGS
          </Text>

          <View style={styles.settingsCard}>

            {/* REMINDER */}
            <TouchableOpacity
              style={styles.settingRow}
              activeOpacity={0.8}
              onPress={() =>
                setReminderEnabled(!reminderEnabled)
              }
            >
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>
                  Daily Planning Reminder
                </Text>

                <Text style={styles.settingSubtitle}>
                  Receive morning overview at 8:00 AM
                </Text>
              </View>

              <View
                style={[
                  styles.checkbox,
                  reminderEnabled && styles.checkboxActive,
                ]}
              >
                {reminderEnabled && (
                  <Ionicons
                    name="checkmark"
                    size={17}
                    color="#FFFFFF"
                  />
                )}
              </View>
            </TouchableOpacity>

            {/* AI MODE */}
            <TouchableOpacity
              style={styles.settingRow}
              activeOpacity={0.8}
            >
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>
                  AI Concierge Mode
                </Text>

                <Text style={styles.settingSubtitle}>
                  Calm, direct schedule suggestions
                </Text>
              </View>

              <View style={styles.valueBadge}>
                <Text style={styles.valueText}>
                  Concise
                </Text>
              </View>
            </TouchableOpacity>

            {/* PRIORITY */}
            <TouchableOpacity
              style={styles.settingRow}
              activeOpacity={0.8}
            >
              <View style={styles.settingText}>
                <Text style={styles.settingTitle}>
                  Default Task Priority
                </Text>

                <Text style={styles.settingSubtitle}>
                  Preset priority level for new tasks
                </Text>
              </View>

              <View style={styles.priorityBadge}>
                <Text style={styles.priorityText}>
                  Medium
                </Text>
              </View>
            </TouchableOpacity>

          </View>

          {/* LOGOUT */}
          <TouchableOpacity
            style={styles.logoutButton}
            activeOpacity={0.8}
          >
            <Ionicons
              name="log-out-outline"
              size={17}
              color="#F12C2C"
            />

            <Text style={styles.logoutText}>
              Log Out
            </Text>
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
              size={17}
              color="#A3A5A8"
            />

            <Text style={styles.navText}>
              Home
            </Text>
          </TouchableOpacity>

          {/* ADD TASK */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() => router.push("/add-task")}
          >
            <View style={styles.addCircle}>
              <Ionicons
                name="add"
                size={17}
                color="#FFFFFF"
              />
            </View>

            <Text style={styles.navText}>
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
              color="#A3A5A8"
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
              color="#17191B"
            />

            <Text style={styles.navActive}>
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
    backgroundColor: "#F8F8F6",
  },

  screen: {
    flex: 1,
    backgroundColor: "#F8F8F6",
  },

  /* HEADER */

  header: {
    height: 95,
    paddingHorizontal: 30,
    justifyContent: "flex-end",
    paddingBottom: 22,
  },

  title: {
    color: "#202125",
    fontSize: 27,
    fontWeight: "700",
    letterSpacing: -0.8,
  },

  divider: {
    height: 1,
    backgroundColor: "#E8E8E5",
    marginHorizontal: 30,
  },

  /* CONTENT */

  content: {
    flex: 1,
    paddingHorizontal: 30,
    paddingTop: 30,
  },

  /* PROFILE */

  profileCard: {
    minHeight: 139,
    borderWidth: 1,
    borderColor: "#E5E3DE",
    borderRadius: 23,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 22,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: "#1D1E21",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
    letterSpacing: -0.5,
  },

  profileInfo: {
    flex: 1,
  },

  name: {
    color: "#202125",
    fontSize: 20,
    fontWeight: "700",
    letterSpacing: -0.4,
  },

  email: {
    color: "#77797D",
    fontSize: 16,
    marginTop: 2,
  },

  planBadge: {
    alignSelf: "flex-start",
    marginTop: 7,
    paddingHorizontal: 12,
    height: 27,
    borderRadius: 9,
    backgroundColor: "#F0F0ED",
    justifyContent: "center",
  },

  planText: {
    color: "#53555A",
    fontSize: 13,
    fontWeight: "600",
  },

  /* SETTINGS */

  sectionTitle: {
    color: "#A0A1A3",
    fontSize: 17,
    fontWeight: "600",
    marginTop: 32,
    marginBottom: 13,
    marginLeft: 5,
    letterSpacing: 0.2,
  },

  settingsCard: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E5E3DE",
    borderRadius: 23,
    overflow: "hidden",
  },

  settingRow: {
    minHeight: 91,
    paddingHorizontal: 21,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  settingRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: "#ECEBE8",
  },

  settingText: {
    flex: 1,
    paddingRight: 15,
  },

  settingTitle: {
    color: "#25262A",
    fontSize: 17,
    fontWeight: "600",
    letterSpacing: -0.2,
  },

  settingSubtitle: {
    color: "#999B9E",
    fontSize: 15,
    marginTop: 2,
  },

  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 3,
    borderWidth: 1,
    borderColor: "#D8D9DB",
    alignItems: "center",
    justifyContent: "center",
  },

  checkboxActive: {
    backgroundColor: "#242528",
    borderColor: "#242528",
  },

  valueBadge: {
    minWidth: 96,
    height: 36,
    paddingHorizontal: 13,
    borderRadius: 12,
    backgroundColor: "#F1F1EE",
    alignItems: "center",
    justifyContent: "center",
  },

  valueText: {
    color: "#5E6064",
    fontSize: 16,
    fontWeight: "600",
  },

  priorityBadge: {
    minWidth: 96,
    height: 36,
    paddingHorizontal: 13,
    borderRadius: 12,
    backgroundColor: "#FFF7E6",
    alignItems: "center",
    justifyContent: "center",
  },

  priorityText: {
    color: "#C6650A",
    fontSize: 16,
    fontWeight: "600",
  },

  /* LOGOUT */

  logoutButton: {
    height: 63,
    borderWidth: 1,
    borderColor: "#FFB7B7",
    borderRadius: 17,
    marginTop: 55,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 10,
    backgroundColor: "#FFFFFF",
  },

  logoutText: {
    color: "#F12C2C",
    fontSize: 19,
    fontWeight: "500",
  },

  /* BOTTOM NAV */

  bottomNav: {
    height: 96,
    borderTopWidth: 1,
    borderTopColor: "#E5E4E1",
    backgroundColor: "#FFFFFF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 12,
  },

  navItem: {
    width: 82,
    height: 86,
    alignItems: "center",
    justifyContent: "center",
  },

  navText: {
    color: "#A3A5A8",
    fontSize: 12,
    fontWeight: "500",
    marginTop: 6,
  },

  navActive: {
    color: "#1c1d1e",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 6,
  },

  addCircle: {
    width: 43,
    height: 43,
    borderRadius: 22,
    backgroundColor: "#17191B",
    alignItems: "center",
    justifyContent: "center",
  },
});