import React, { useEffect } from "react";
import { View, FlatList, Image, Text, TouchableOpacity } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";

import { setPhotos } from "../redux/photosSlice";
import { loadPhotos } from "../services/storageService";

export default function GalleryScreen({ navigation }: any) {
  const dispatch = useDispatch();
  const photos = useSelector((state: any) => state.photos.items);

  // Chargement des photos sauvegardées
  const loadSavedPhotos = async () => {
    const data = await loadPhotos();
    dispatch(setPhotos(data));
  };

  useEffect(() => {
    loadSavedPhotos();
  }, []);

  // Empty state
  if (photos.length === 0) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <Ionicons name="images-outline" size={40} color="gray" />

        <Text style={{ marginTop: 10, color: "gray" }}>
          Aucune photo pour le moment
        </Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* Grid photos */}
      <FlatList
        data={photos}
        numColumns={3}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ gap: 2 }}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("PhotoDetail", {
                photo: item,
                fromFolder: false,
              })
            }
            style={{ flex: 1 / 3 }}
          >
            <Image
              source={{ uri: item.uri }}
              style={{
                width: "100%",
                aspectRatio: 1,
              }}
            />
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}