export interface SubfolderState {
  subfolderModal: boolean;
  renameSubfolder: RenameSubfolderType;
  loading: string,
  err: string | null,
}
export interface RenameSubfolderType {
  oldName: string;
  newName: string;
}
