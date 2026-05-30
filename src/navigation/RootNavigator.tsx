import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import CameraScreen from "../screens/CameraScreen";
import GalleryScreen from "../screens/GalleryScreen";
import FoldersScreen from "../screens/FoldersScreen";
import PhotoDetailScreen from "../screens/PhotoDetailScreen";
import FolderDetailScreen from "../screens/FolderDetailScreen";

import { RootStackParamList } from "./types";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator<RootStackParamList>();

// Navigation principale (onglets)
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "#000",
        tabBarLabelStyle: { fontSize: 12 },
        
      }}
    >
      <Tab.Screen name="Camera" component={CameraScreen} options={{ title: "Caméra" }} />
      <Tab.Screen name="Gallery" component={GalleryScreen} options={{ title: "Galerie" }} />
      <Tab.Screen name="Folders" component={FoldersScreen} options={{ title: "Dossiers" }} />
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: "#000" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "600" },
          
        }}
      >
        <Stack.Screen
          name="MainTabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="PhotoDetail"
          component={PhotoDetailScreen}
          options={{
            title: "Photo",
          }}
        />

        <Stack.Screen
          name="FolderDetail"
          component={FolderDetailScreen}
          options={{
            title: "Dossier",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}