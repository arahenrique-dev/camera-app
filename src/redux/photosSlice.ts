import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Photo = {
  id: string;
  uri: string;
  createdAt: number;
  folderId: string | null;
};

type PhotosState = {
  items: Photo[];
};

const initialState: PhotosState = {
  items: [],
};

const photosSlice = createSlice({
  name: "photos",
  initialState,
  reducers: {
    // Remplace toutes les photos (chargement storage)
    setPhotos(state, action: PayloadAction<Photo[]>) {
      state.items = action.payload;
    },

    // Ajoute une photo en haut de la galerie
    addPhoto(state, action: PayloadAction<Photo>) {
      state.items.unshift(action.payload);
    },

    // Supprime une photo
    deletePhoto(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (photo) => photo.id !== action.payload
      );
    },

    // Assigne une photo à un dossier
    movePhotoToFolder(
      state,
      action: PayloadAction<{ photoId: string; folderId: string | null }>
    ) {
      const photo = state.items.find(
        (p) => p.id === action.payload.photoId
      );

      if (photo) {
        photo.folderId = action.payload.folderId;
      }
    },

    // Optionnel: reset d’un dossier (utile si delete folder)
    removePhotosFromFolder(state, action: PayloadAction<string>) {
      state.items.forEach((photo) => {
        if (photo.folderId === action.payload) {
          photo.folderId = null;
        }
      });
    },
  },
});

export const {
  setPhotos,
  addPhoto,
  deletePhoto,
  movePhotoToFolder,
  removePhotosFromFolder,
} = photosSlice.actions;

export default photosSlice.reducer;