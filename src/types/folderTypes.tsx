export interface FoldersTypeState {
  dots: Dots[];
  loading: string;
  err: string | unknown | null;
  totalSize: number;
  userMemory: number;
  logout: boolean;
  dragAndDrop: boolean;
  allFiles: FetchFilesUserRes[];
  deletedFiles: FetchDeletedFiles[];
  createFolderModal: boolean;
  createFolder: CreateFolder;
  folders: FolderType[];
  foldersShowMore: FoldersShowMoreType[];
  folderName: string;
  recoverItem: RecoverItemType[];
  renameModal: boolean;
  renameObj: RenameObjType;
  colorForFolder: string;
  createSubfolderModal: boolean;
  createSubfolder: CreateSubfolderType;
  foldersForPagckage: string[];
  filesForPackage: FilesForPackageType[];
  movedObjForFetch: any;
  renameFolderModal: boolean;
  renameFolder: RenameFolder;
  colorFolder: ColorFolderType;
}

export interface ColorFolderType {
  name: string;
  newColor: string;
}

export interface RenameFolder {
  oldName: string;
  newName: string;
}

export interface Dots {
  name: string;
  image: any;
  color?: string[];
}
export interface AmountDataType {
  totalSize: number;
  userMemory: number;
}
export interface FetchFilesUserRes {
  filename: string;
  filePath: string;
  size: string;
  lastModified: DateType;
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
export interface FetchDeletedFiles extends FetchFilesUserRes {}

export interface DateType {
  day: string;
  time: string;
}

export interface FetchDelFiles {
  username?: string;
  deletedFiles?: DeleteFiles[];
  delFile?: DeleteFiles[];
}

export interface DeleteFiles {
  filename: string;
  filePath: string;
}
export interface CreateFolder {
  name: string;
  color: string;
}

export interface FolderType {
  name: string;
  color: string;
  size: string;
  filesNumber: string;
}

export interface FoldersShowMoreType {
  name: string;
  color: string;
  size: string;
  filesNumber: string;
}

export interface RecoverType {
  filename: string;
  filePath: string;
}
export interface RecoverItemType {
  filename: string;
  filePath: string;
}
export interface RenameObjType {
  oldFileName?: string;
  filepath?: string;
  newFileName: string;
}
export interface CreateSubfolderType {
  folderPath: string;
  name: string;
}
// DELETE

export interface DeleteTypeState {
  files: DeleteSelectedFiles[];
  loading: string;
  err: null | string;
}
export interface RecoverFilesType extends DeleteSelectedFiles {}
export interface DeleteSelectedFiles {
  filename: string;
  filePath: string;
}