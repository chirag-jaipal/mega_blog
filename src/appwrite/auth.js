import conf from "../config/config";
import { Client, Account, ID } from "appwrite";

export class AuthService {
  client = new Client();
  account;

  constructor() {
    this.client
      .setEndpoint(conf.appwriteEndpoint)
      .setProject(conf.appwriteProjectId);

    this.account = new Account(this.client);
  }

  async createUserAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create({
        userId: ID.unique(),
        email,
        password,
        name,
      });

      if (userAccount) {
        return this.loginUser({ email, password });
      } else {
        return userAccount;
      }
    } catch (err) {
      throw err;
    }
  }

  async loginUser({ email, password }) {
    try {
      return await this.account.createEmailPasswordSession({
        email,
        password,
      });
    } catch (err) {
      throw err;
    }
  }

  async getCurrentUser() {
    try {
      return await this.account.get();
    } catch (err) {
      throw err;
    }
  }

  async logoutUser() {
    try {
      await this.account.deleteSessions();
    } catch (err) {
      throw err;
    }
  }
}

const authService = new AuthService();

export default authService;
