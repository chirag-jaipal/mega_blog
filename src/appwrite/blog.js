import conf from "../config.js";
import { Client, TablesDB } from "appwrite";

export class BlogService {
  client = new Client();
  tablesDB;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteProjectId);

    this.tablesDB = new TablesDB(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      return await this.tablesDB.createRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
          userId,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async updatePost(slug, { title, content, featuredImage, status }) {
    try {
      return await this.tablesDB.updateRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
        data: {
          title,
          content,
          featuredImage,
          status,
        },
      });
    } catch (err) {
      throw err;
    }
  }

  async deletePost(slug) {
    try {
      await this.tablesDB.deleteRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
      });

      return true;
    } catch (err) {
      console.error("Error deleting post:", err);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.tablesDB.getRow({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        rowId: slug,
      });
    } catch (err) {
      throw err;
    }
  }

  async listPosts(queries = [Query.equal("status", "active")]) {
    try {
      return await this.tablesDB.listRows({
        databaseId: conf.appwriteDatabaseId,
        tableId: conf.appwriteTableId,
        queries: queries,
      });
    } catch (err) {
      throw err;
    }
  }
}

const blogService = new BlogService();

export default blogService;
