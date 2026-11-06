import conf from "../config.js";
import { Client, Storage, ID } from "appwrite";

export class FileService {
  client = new Client();
  storage;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteProjectId);

    this.storage = new Storage(this.client);
  }

  async uploadFile(file) {
    try {
      return await this.storage.createFile({
        bucketId: conf.appwriteBucketId,
        fileId: ID.unique(),
        file,
      });
    } catch (err) {
      throw err;
    }
  }

  async deleteFile(fileId) {
    try {
      await this.storage.deleteFile({
        bucketId: conf.appwriteBucketId,
        fileId,
      });

      return true;
    } catch (err) {
      console.error("Error deleting file:", err);
      return false;
    }
  }

  getFilePreview(fileId) {
    return this.storage.getFilePreview({
      bucketId: conf.appwriteBucketId,
      fileId,
    });
  }
}

const fileService = new FileService();

export default fileService;
