import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type Folder = {
  id: string;
  name: string;
};

type FoldersState = {
  items: Folder[];
};

const initialState: FoldersState = {
  items: [],
};

const foldersSlice = createSlice({
  name: "folders",
  initialState,
  reducers: {
    // Remplace tous les dossiers (chargement storage)
    setFolders(state, action: PayloadAction<Folder[]>) {
      state.items = action.payload;
    },

    // Ajoute un nouveau dossier
    addFolder(state, action: PayloadAction<Folder>) {
      state.items.push(action.payload);
    },

    // Supprime un dossier
    deleteFolder(state, action: PayloadAction<string>) {
      state.items = state.items.filter(
        (folder) => folder.id !== action.payload
      );
    },

    // Renomme un dossier
    renameFolder(
      state,
      action: PayloadAction<{ id: string; name: string }>
    ) {
      const folder = state.items.find(
        (f) => f.id === action.payload.id
      );

      if (folder) {
        folder.name = action.payload.name.trim();
      }
    },
  },
});

export const {
  setFolders,
  addFolder,
  deleteFolder,
  renameFolder,
} = foldersSlice.actions;

export default foldersSlice.reducer;