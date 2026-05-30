import * as FileSystem from "expo-file-system/legacy";

// Charge les fichiers présents dans le dossier local
export const getAllPhotos = async () => {
  const dir = FileSystem.documentDirectory;

  if (!dir) return [];

  const files = await FileSystem.readDirectoryAsync(dir);

  // Photos simples basées uniquement sur le filesystem
  return files.map((file) => ({
    id: file,
    uri: dir + file,
  }));
};