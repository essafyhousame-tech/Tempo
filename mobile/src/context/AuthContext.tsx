import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";

type User = {
  id: string;
  name: string;
  email: string;
};

type AuthContextType = {
  user: User | null;
  token: string | null;
  login: (token: string, user: User) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadToken();
  }, []);

  const loadToken = async () => {
    try {
      const storedToken = await AsyncStorage.getItem("tempo_token");
      const storedUser = await AsyncStorage.getItem("tempo_user");
      
      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } else {
        // If no token, redirect to login
        router.replace("/login");
      }
    } catch (e) {
      console.error("Failed to load token", e);
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (newToken: string, newUser: User) => {
    try {
      await AsyncStorage.setItem("tempo_token", newToken);
      await AsyncStorage.setItem("tempo_user", JSON.stringify(newUser));
      setToken(newToken);
      setUser(newUser);
      router.replace("/");
    } catch (e) {
      console.error("Failed to save token", e);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("tempo_token");
      await AsyncStorage.removeItem("tempo_user");
      setToken(null);
      setUser(null);
      router.replace("/login");
    } catch (e) {
      console.error("Failed to clear token", e);
    }
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
