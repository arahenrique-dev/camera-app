import React, { useEffect, useRef, useState } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as FileSystem from "expo-file-system/legacy";
import { useDispatch } from "react-redux";
import { Ionicons } from "@expo/vector-icons";

import { addPhoto } from "../redux/photosSlice";
import { savePhotos, loadPhotos } from "../services/storageService";

export default function CameraScreen() {
  const cameraRef = useRef<CameraView | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const dispatch = useDispatch();

  // Demande permission caméra au montage
  useEffect(() => {
    if (!permission) return;
    if (!permission.granted) requestPermission();
  }, [permission]);

  // Loading permission
  if (!permission) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Chargement caméra...</Text>
      </View>
    );
  }

  // Permission refusée
  if (!permission.granted) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center", padding: 20 }}>
        <Ionicons name="camera-outline" size={40} color="black" />

        <Text style={{ marginTop: 10, fontSize: 16, textAlign: "center" }}>
          Autorisation caméra requise
        </Text>

        <TouchableOpacity
          onPress={requestPermission}
          style={{
            marginTop: 15,
            padding: 12,
            backgroundColor: "black",
            borderRadius: 10,
          }}
        >
          <Text style={{ color: "white" }}>Autoriser</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Prendre une photo
  const takePhoto = async () => {
    if (!cameraRef.current) return;

    const photo = await cameraRef.current.takePictureAsync();

    const fileName = photo.uri.split("/").pop();
    const newPath = FileSystem.documentDirectory ? FileSystem.documentDirectory + fileName : "";

    await FileSystem.copyAsync({
      from: photo.uri,
      to: newPath,
    });

    const newPhoto = {
      id: Date.now().toString(),
      uri: newPath,
      createdAt: Date.now(),
      folderId: null,
    };

    const existingPhotos = await loadPhotos();
    const updatedPhotos = [newPhoto, ...existingPhotos];

    await savePhotos(updatedPhotos);

    dispatch(addPhoto(newPhoto));
  };

  return (
    <View style={{ flex: 1 }}>
      {/* Camera preview */}
      <CameraView ref={cameraRef} style={{ flex: 1 }} facing="back" />

      {/* Bottom controls */}
      <View
        style={{
          position: "absolute",
          bottom: 40,
          width: "100%",
          alignItems: "center",
        }}
      >
        {/* Button capture */}
        <TouchableOpacity
          onPress={takePhoto}
          style={{
            width: 75,
            height: 75,
            borderRadius: 40,
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Ionicons name="camera" size={30} color="black" />
        </TouchableOpacity>

        {/* Hint text */}
        <Text style={{ marginTop: 10, color: "white" }}>
          Appuie pour prendre une photo
        </Text>
      </View>
    </View>
  );
}