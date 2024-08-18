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
  lastModified: LastModifyType;
  name: string;
  size: string;
}
export interface LastModifyType {
  day: string;
  time: string;
}