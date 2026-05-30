import React from "react";
import { View, Image, TouchableOpacity, Text } from "react-native";
import * as FileSystem from "expo-file-system/legacy";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { deletePhoto, setPhotos } from "../redux/photosSlice";
import { savePhotos } from "../services/storageService";

export default function PhotoDetailScreen({ route, navigation }: any) {
  const { photo, fromFolder } = route.params;

  const dispatch = useDispatch();
  const photos = useSelector((state: any) => state.photos.items);
  const folders = useSelector((state: any) => state.folders.items);

  const [showFolders, setShowFolders] = React.useState(false);

  // Supprimer photo (fichier + state)
  const handleDelete = async () => {
    try {
      await FileSystem.deleteAsync(photo.uri);

      const updatedPhotos = photos.filter(
        (p: any) => p.id !== photo.id
      );

      dispatch(deletePhoto(photo.id));
      await savePhotos(updatedPhotos);

      navigation.goBack();
    } catch (error) {
      console.log("Delete error:", error);
    }
  };

  // Déplacer vers dossier
  const moveToFolder = async (folderId: string) => {
    const updatedPhotos = photos.map((p: any) =>
      p.id === photo.id ? { ...p, folderId } : p
    );

    dispatch(setPhotos(updatedPhotos));
    await savePhotos(updatedPhotos);

    setShowFolders(false);
    navigation.goBack();
  };

  // Retirer du dossier
  const removeFromFolder = async () => {
    const updatedPhotos = photos.map((p: any) =>
      p.id === photo.id ? { ...p, folderId: null } : p
    );

    dispatch(setPhotos(updatedPhotos));
    await savePhotos(updatedPhotos);

    navigation.goBack();
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {/* Image */}
      <Image
        source={{ uri: photo.uri }}
        style={{ flex: 1 }}
        resizeMode="contain"
      />

      {/* Bottom actions */}
      <View
        style={{
          position: "absolute",
          bottom: 40,
          width: "100%",
          flexDirection: "row",
          justifyContent: "space-around",
          paddingHorizontal: 15,
        }}
      >
        {/* Move or remove */}
        {!fromFolder ? (
          <TouchableOpacity
            onPress={() => setShowFolders(!showFolders)}
            style={{
              flex: 1,
              backgroundColor: "#333",
              marginRight: 8,
              padding: 14,
              borderRadius: 12,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Ionicons name="folder-outline" size={18} color="white" />
            <Text style={{ color: "white", marginLeft: 6 }}>
              Déplacer
            </Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={removeFromFolder}
            style={{
              flex: 1,
              backgroundColor: "#333",
              marginRight: 8,
              padding: 14,
              borderRadius: 12,
              alignItems: "center",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Ionicons name="remove-circle-outline" size={18} color="white" />
            <Text style={{ color: "white", marginLeft: 6 }}>
              Retirer
            </Text>
          </TouchableOpacity>
        )}

        {/* Delete */}
        <TouchableOpacity
          onPress={handleDelete}
          style={{
            flex: 1,
            backgroundColor: "red",
            marginLeft: 8,
            padding: 14,
            borderRadius: 12,
            alignItems: "center",
            flexDirection: "row",
            justifyContent: "center",
          }}
        >
          <Ionicons name="trash-outline" size={18} color="white" />
          <Text style={{ color: "white", marginLeft: 6 }}>
            Supprimer
          </Text>
        </TouchableOpacity>
      </View>

      {/* Folder picker overlay */}
      {showFolders && (
        <View
          style={{
            position: "absolute",
            bottom: 120,
            width: "100%",
            backgroundColor: "#111",
            padding: 16,
            borderRadius: 15,
          }}
        >
          <Text style={{ color: "white", marginBottom: 10 }}>
            Choisir un dossier
          </Text>

          {folders.map((folder: any) => (
            <TouchableOpacity
              key={folder.id}
              onPress={() => moveToFolder(folder.id)}
              style={{
                padding: 12,
                backgroundColor: "#333",
                marginBottom: 8,
                borderRadius: 8,
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Ionicons name="folder" size={18} color="white" />
              <Text style={{ color: "white", marginLeft: 8 }}>
                {folder.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}