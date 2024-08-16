
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