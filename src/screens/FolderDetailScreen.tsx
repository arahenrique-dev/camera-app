import React from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";

import { RootStackParamList } from "../navigation/types";

export default function FolderDetailScreen({ route }: any) {
  const { folder } = route.params;

  type Nav = NativeStackNavigationProp<RootStackParamList>;
  const navigation = useNavigation<Nav>();

  // Photos filtrées par dossier
  const photos = useSelector((state: any) =>
    state.photos.items.filter(
      (p: any) => p.folderId === folder.id
    )
  );

  return (
    <View style={{ flex: 1, padding: 10, backgroundColor: "#fff" }}>
      {/* Header simple */}
      <View style={{ flexDirection: "row", alignItems: "center", marginBottom: 15 }}>
        <Ionicons name="folder" size={22} color="black" />
        <Text style={{ fontSize: 20, marginLeft: 8, fontWeight: "600" }}>
          {folder.name}
        </Text>
      </View>

      {/* Empty state */}
      {photos.length === 0 ? (
        <View style={{ marginTop: 40, alignItems: "center" }}>
          <Ionicons name="images-outline" size={40} color="gray" />
          <Text style={{ marginTop: 10, color: "gray" }}>
            Aucun média dans ce dossier
          </Text>
        </View>
      ) : (
        <FlatList
          data={photos}
          numColumns={3}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ gap: 4 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("PhotoDetail", {
                  photo: item,
                  fromFolder: true,
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
      )}
    </View>
  );
}