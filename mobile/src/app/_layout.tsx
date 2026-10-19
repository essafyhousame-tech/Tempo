import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { TaskProvider } from "../context/TaskContext";
import { AuthProvider } from "../context/AuthContext";

export default function RootLayout() {
  return (
    <AuthProvider>
      <TaskProvider>
        <StatusBar style="dark" />
        <Stack 
          screenOptions={{
            headerShown: false,
            animation: "none",
          }}
        >
          <Stack.Screen name="index" />
          <Stack.Screen name="login" options={{ animation: "fade" }} />
          <Stack.Screen name="register" options={{ animation: "fade" }} />
        </Stack>
      </TaskProvider>
    </AuthProvider>
  );
}