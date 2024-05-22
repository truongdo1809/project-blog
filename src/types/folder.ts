export interface Folder {
  index: any;
  createdAt: string;
  deletedAt: string | null;
  files: [];
  id: number;
  name: string;
  parentFolder: number | null;
  updatedAt: string | null;
  userId: number;
  folders:Folder[]
}
