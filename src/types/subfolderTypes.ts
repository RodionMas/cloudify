export interface SubfolderState {
  subfolderModal: boolean;
  renameSubfolder: RenameSubfolderType;
  loading: string,
  err: string | null,
  subfoldersForPackage: string[];
  subfilesForPackage: FilesForPackageType[];
  subfoldersURL: string;
}
export interface RenameSubfolderType {
  oldName: string;
  newName: string;
}
export interface FilesForPackageType {
  filename: string;
  size: string;
  lastModified: {
    day: string;
  };
  customFolderName?: string;
  filePath: string;
  color: string;
}
export interface LastModifyType {
  day: string;
  time: string;
}