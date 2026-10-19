import React, { useState, useRef } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

import { useTaskContext } from "../context/TaskContext";

const suggestions = [
  "🏃 Schedule 30m run at 6pm",
  "⚡ What's high priority?",
];

type Message = {
  id: string;
  text: string;
  sender: 'ai' | 'user';
  time: string;
};

export default function ChatScreen() {
  const [message, setMessage] = useState("");
  const { addTask } = useTaskContext();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Good day, Alex! You have 5 tasks planned for today. What would you like to adjust?",
      sender: "ai",
      time: "9:41 AM",
    }
  ]);
  const scrollViewRef = useRef<ScrollView>(null);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: message.trim(),
      sender: "user",
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");

    try {
      const response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/api/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMessage.text })
      });
      
      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();
      
      if (data.reply) {
        const aiResponse: Message = {
          id: (Date.now() + 1).toString(),
          text: data.reply,
          sender: "ai",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        setMessages((prev) => [...prev, aiResponse]);
      }
      
      if (data.tasksToCreate && Array.isArray(data.tasksToCreate)) {
        data.tasksToCreate.forEach((task: any) => {
          addTask({
            title: task.title,
            category: task.category || "Personal",
            time: task.time || "12:00",
            priority: task.priority || "MEDIUM",
            completed: false
          });
        });
      }
    } catch (error) {
      console.error("Chat API error", error);
      const errorMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I couldn't connect to the backend right now.",
        sender: "ai",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages((prev) => [...prev, errorMsg]);
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={styles.screen}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.assistantInfo}>
            <View style={styles.assistantIcon}>
              <Ionicons
                name="sparkles-outline"
                size={15}
                color="#FFFFFF"
              />
            </View>

            <View>
              <Text style={styles.assistantName}>
                Tempo Assistant
              </Text>

              <Text style={styles.assistantSubtitle}>
                Ask to add, adjust or mark tasks
              </Text>
            </View>
          </View>

          <View style={styles.activeBadge}>
            <View style={styles.activeDot} />
            <Text style={styles.activeText}>Active</Text>
          </View>
        </View>

        {/* CHAT */}
        <ScrollView
          style={styles.chat}
          contentContainerStyle={styles.chatContent}
          showsVerticalScrollIndicator={false}
          ref={scrollViewRef}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}
        >
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            
            return (
              <View 
                key={msg.id} 
                style={[styles.messageRow, isUser && styles.userMessageRow]}
              >
                {!isUser && (
                  <View style={styles.messageAvatar}>
                    <Text style={styles.avatarText}>T</Text>
                  </View>
                )}

                <View style={[styles.messageBubble, isUser && styles.userMessageBubble]}>
                  <Text style={[styles.messageText, isUser && styles.userMessageText]}>
                    {msg.text}
                  </Text>
                  <Text style={[styles.messageTime, isUser && styles.userMessageTime]}>
                    {msg.time}
                  </Text>
                </View>
              </View>
            );
          })}

          <View style={styles.spacer} />

          {/* SUGGESTED PROMPTS */}
          <Text style={styles.sectionLabel}>
            SUGGESTED PROMPTS
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.suggestions}
          >
            {suggestions.map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.suggestion}
                onPress={() => {
                  setMessage(item);
                }}
              >
                <Text style={styles.suggestionText}>
                  {item}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* INPUT */}
          <View style={styles.inputContainer}>
            <TextInput
              value={message}
              onChangeText={setMessage}
              placeholder="Ask Tempo to create, edit, or check tasks..."
              placeholderTextColor="#A3A5A9"
              style={styles.input}
              multiline
            />

            <TouchableOpacity
              style={styles.sendButton}
              onPress={sendMessage}
            >
              <Ionicons
                name="arrow-forward"
                size={16}
                color="#FFFFFF"
              />
            </TouchableOpacity>
          </View>
        </ScrollView>

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
              color="#85878B"
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
                size={20}
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
              name="chatbubble"
              size={17}
              color="#17191B"
            />

            <Text style={styles.navActive}>
              AI Assistant
            </Text>
          </TouchableOpacity>

          {/* PROFILE */}
          <TouchableOpacity
            style={styles.navItem}
            onPress={() =>  router.push("/profile")}
          >
            <Ionicons
              name="person-outline"
              size={17}
              color="#85878B"
            />

            <Text style={styles.navText}>
              Profile
            </Text>
          </TouchableOpacity>

        </View>
      </KeyboardAvoidingView>
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
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#EEEEEC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  assistantInfo: {
    flexDirection: "row",
    alignItems: "center",
  },

  assistantIcon: {
    width: 30,
    height: 30,
    borderRadius: 8,
    backgroundColor: "#17191B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  assistantName: {
    color: "#17191B",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: -0.2,
  },

  assistantSubtitle: {
    color: "#92959A",
    fontSize: 8,
    marginTop: 2,
  },

  activeBadge: {
    height: 22,
    paddingHorizontal: 8,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "#B7EED8",
    flexDirection: "row",
    alignItems: "center",
  },

  activeDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: "#21B779",
    marginRight: 4,
  },

  activeText: {
    color: "#21A66D",
    fontSize: 8,
    fontWeight: "500",
  },

  /* CHAT */

  chat: {
    flex: 1,
  },

  chatContent: {
    paddingHorizontal: 16,
    paddingTop: 14,
    paddingBottom: 12,
    flexGrow: 1,
  },

  messageRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  messageAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#17191B",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 9,
  },

  avatarText: {
    color: "#FFFFFF",
    fontSize: 10,
    fontWeight: "600",
  },

  messageBubble: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#E5E6E8",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    maxWidth: "88%",
  },

  messageText: {
    color: "#242629",
    fontSize: 10,
    lineHeight: 15,
    fontWeight: "400",
  },

  messageTime: {
    color: "#A2A4A8",
    fontSize: 7,
    marginTop: 7,
  },

  spacer: {
    flex: 1,
    minHeight: 150,
  },

  /* SUGGESTIONS */

  sectionLabel: {
    color: "#96989D",
    fontSize: 8,
    fontWeight: "600",
    letterSpacing: 0.45,
    marginBottom: 8,
  },

  suggestions: {
    gap: 7,
    paddingRight: 10,
  },

  suggestion: {
    height: 30,
    paddingHorizontal: 11,
    borderRadius: 9,
    borderWidth: 1,
    borderColor: "#E1E3E6",
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
  },

  suggestionText: {
    color: "#36383C",
    fontSize: 8,
    fontWeight: "500",
  },

  /* INPUT */

  inputContainer: {
    minHeight: 38,
    borderWidth: 1,
    borderColor: "#E0E2E5",
    borderRadius: 10,
    marginTop: 9,
    paddingLeft: 11,
    paddingRight: 5,
    flexDirection: "row",
    alignItems: "center",
  },

  input: {
    flex: 1,
    minHeight: 32,
    maxHeight: 70,
    color: "#242629",
    fontSize: 9,
    paddingVertical: 7,
  },

  sendButton: {
    width: 27,
    height: 27,
    borderRadius: 8,
    backgroundColor: "#17191B",
    alignItems: "center",
    justifyContent: "center",
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
    color: "#17191B",
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

  userMessageRow: {
    justifyContent: 'flex-end',
    marginTop: 10,
  },

  userMessageBubble: {
    backgroundColor: '#17191B',
    borderColor: '#17191B',
  },

  userMessageText: {
    color: '#FFFFFF',
  },

  userMessageTime: {
    color: '#92959A',
  },
});