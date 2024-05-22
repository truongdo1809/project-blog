import { Folder } from "~/types/folder";

export function convertFlatToTreeFolders(flatFolders: Folder[]): Folder[] {
  const folderMap: { [id: number]: Folder } = {};
  const rootFolders: Folder[] = [];

    // Tạo một bản đồ để lưu trữ comment theo id
  flatFolders.forEach((folder) => {
    folder.folders = [];
    folderMap[folder.id] = folder;
  });
    // Xây dựng cây comment


  flatFolders.forEach(folder => {
    if (folder.parentFolder !== null) {
      const getFolder = folderMap[folder.parentFolder];
      if (getFolder) {
        getFolder.folders.push(folder);
      } else {
          // Trường hợp không tìm thấy comment cha, coi comment hiện tại là comment gốc
        rootFolders.push(folder);
      }
    } else {
        // Nếu comment không có parentComment, coi là comment gốc
      rootFolders.push(folder);
    }
  });

  return rootFolders;
}
