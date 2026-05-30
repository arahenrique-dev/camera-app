import React, { useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../navigation/types";

import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";

import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import {
  addFolder,
  setFolders,
  renameFolder,
} from "../redux/foldersSlice";

import {
  saveFolders,
  loadFolders,
} from "../services/storageService";

export default function FoldersScreen() {
  type Nav = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<Nav>();

  const dispatch = useDispatch();

  const folders = useSelector(
    (state: any) => state.folders.items
  );

  // Chargement initial
  useEffect(() => {
    initializeFolders();
  }, []);

  const initializeFolders = async () => {
    const savedFolders = await loadFolders();
    dispatch(setFolders(savedFolders));
  };

  // Créer un dossier
  const createFolder = async () => {
    const newFolder = {
      id: Date.now().toString(),
      name: `Dossier ${folders.length + 1}`,
    };

    const updatedFolders = [...folders, newFolder];

    await saveFolders(updatedFolders);
    dispatch(addFolder(newFolder));
  };

  // Renommer dossier
  const handleRenameFolder = (folder: any) => {
    Alert.prompt(
      "Renommer le dossier",
      "Entrez un nouveau nom",
      async (text) => {
        if (!text) return;

        const updated = folders.map((f: any) =>
          f.id === folder.id
            ? { ...f, name: text }
            : f
        );

        dispatch(renameFolder({ id: folder.id, name: text }));
        await saveFolders(updated);
      },
      "plain-text",
      folder.name
    );
  };

  return (
    <View style={{ flex: 1, backgroundColor: "#fff", padding: 20 }}>
      {/* Header + bouton création */}
      <TouchableOpacity
        onPress={createFolder}
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "black",
          padding: 14,
          borderRadius: 12,
          marginBottom: 20,
        }}
      >
        <Ionicons name="add" size={20} color="white" />
        <Text style={{ color: "white", marginLeft: 6 }}>
          Nouveau dossier
        </Text>
      </TouchableOpacity>

      {/* Liste dossiers */}
      <FlatList
        data={folders}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 10 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("FolderDetail", { folder: item })
            }
            onLongPress={() => handleRenameFolder(item)}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                padding: 18,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: "#ddd",
                backgroundColor: "#fafafa",
              }}
            >
              <Ionicons name="folder" size={22} color="black" />

              <Text style={{ marginLeft: 10, fontSize: 16 }}>
                {item.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}