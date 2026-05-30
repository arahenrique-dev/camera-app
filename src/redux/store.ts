import { configureStore } from "@reduxjs/toolkit";

import photosReducer from "./photosSlice";
import foldersReducer from "./foldersSlice";

// Store global de l'application
export const store = configureStore({
  reducer: {
    photos: photosReducer,
    folders: foldersReducer,
  },

  // Middleware Redux Toolkit
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

// Types globaux du store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;