export type Photo = {
  id: string;
  uri: string;
  createdAt: number;
  folderId: string | null;
};

export type Folder = {
  id: string;
  name: string;
};

export type RootStackParamList = {
  MainTabs: undefined;

  PhotoDetail: {
    photo: Photo;
    fromFolder: boolean;
  };

  FolderDetail: {
    folder: Folder;
  };
};