import AsyncStorage from "@react-native-async-storage/async-storage";

const PHOTOS_KEY = "PHOTOS";
const FOLDERS_KEY = "FOLDERS";

// 🔹 Photos
export const savePhotos = async (photos: any[]) => {
  try {
    await AsyncStorage.setItem(PHOTOS_KEY, JSON.stringify(photos));
  } catch (error) {
    console.log("Erreur savePhotos:", error);
  }
};

export const loadPhotos = async () => {
  try {
    const data = await AsyncStorage.getItem(PHOTOS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Erreur loadPhotos:", error);
    return [];
  }
};

// 🔹 Dossiers
export const saveFolders = async (folders: any[]) => {
  try {
    await AsyncStorage.setItem(FOLDERS_KEY, JSON.stringify(folders));
  } catch (error) {
    console.log("Erreur saveFolders:", error);
  }
};

export const loadFolders = async () => {
  try {
    const data = await AsyncStorage.getItem(FOLDERS_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.log("Erreur loadFolders:", error);
    return [];
  }
};