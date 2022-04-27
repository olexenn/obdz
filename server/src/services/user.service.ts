import * as argon from "argon2";
import { getConnection } from "typeorm";
import { User } from "../entities/user.model";
import Tokens from "../interfaces/tokens.interface";
import { FileService } from "./files.service";
import TokenService from "./token.service";

class UserService {
  private userRepository = getConnection().getRepository(User);
  private tokenService = new TokenService();
  private fileService = new FileService();

  /**
   * Save new user to db
   * @param {string} username
   * @param {string} password
   * @param {string} firstName
   * @param {string} lastName
   * @param {Express.Multer.File} profilePicture: file of pfp
   * @param {string} role: role of user
   * @returns {Tokens} tokens: jwt auth tokens
   */
  async addUser(
    username: string,
    password: string,
    firstName: string,
    lastName: string,
    profilePicture?: Express.Multer.File,
    role?: string
  ): Promise<User> {
    const isExist = await this.userRepository.findOne({
      where: { username: username },
    });
    if (isExist) return null;

    const hash = await argon.hash(password);
    const user = new User();
    user.username = username;
    user.password = hash;
    user.firstName = firstName;
    user.lastName = lastName;
    if (profilePicture)
      user.profilePicture = this.fileService.createFile(profilePicture);
    user.role = role ? role : "user";

    const createdUser = await this.userRepository.save(user);
    return createdUser;
  }

  /**
   * fetch all users from db
   * @returns all users with role "user"
   */
  async getAllUsers(): Promise<User[]> {
    const users = await this.userRepository.find({ where: { role: "user" } });
    users.map((user) => {
      user.profilePicture
        ? (user.profilePicture = `http://localhost:3001/pfp/${user.profilePicture}`)
        : (user.profilePicture = "");
    });
    return users;
  }

  /**
   * Login user
   * @param {User} user: user object
   * @param {string} password: password to check
   * @returns {Tokens} tokens: jwt auth tokens;
   */
  async loginUser(user: User, password: string): Promise<Tokens | null> {
    const isVerified = await argon.verify(user.password, password);
    if (!isVerified) return null;
    const tokens = this.tokenService.generateTokens(user);
    await this.tokenService.saveToken(user, tokens.refreshToken);
    return tokens;
  }

  // TODO: remove this piece of shit
  async saveSuperUser(): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { role: "admin" },
    });
    if (!user) {
      const hash = await argon.hash("admin");
      const newUser = new User();
      newUser.username = "admin";
      newUser.password = hash;
      newUser.firstName = "admin";
      newUser.lastName = "admin";
      newUser.role = "admin";
      return await this.userRepository.save(newUser);
    }
    return user;
  }

  /**
   * Find user by its username
   * @param {string} username username
   * @returns {User} user
   */
  async getUser(username: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    return user;
  }

  /**
   * Find user by his access token
   * @param {string} token: access jwt token
   * @returns {User} user: user object
   */
  async findUserByToken(token: string): Promise<User> {
    const userData = this.tokenService.validateAccessToken(token);
    const user = await this.userRepository.findOne({
      where: { id: userData.sub },
    });
    user.profilePicture
      ? (user.profilePicture = `http://localhost:3001/pfp/${user.profilePicture}`)
      : (user.profilePicture = "");
    return user;
  }

  /**
   * Update user's profile picture
   * @param user user object
   * @param pfp profile picture file
   * @returns updated user
   */
  async updatePfp(user: User, pfp: Express.Multer.File): Promise<User> {
    const file = this.fileService.createFile(pfp);
    user.profilePicture = file;
    return await this.userRepository.save(user);
  }

  /**
   * Refresh Jwt Tokens
   * @param {string} token: refresh token
   * @returns {Tokens} tokens: jwt auth tokens
   */
  async refresh(token: string): Promise<Tokens> {
    const userData = this.tokenService.validateRefreshToken(token);
    const tokFromDb = await this.tokenService.findToken(token);

    if (!userData || !tokFromDb) return null;

    const user = await this.userRepository.findOne({
      where: { id: userData.sub },
    });
    const tokens = this.tokenService.generateTokens(user);

    console.log(tokens);

    if (!tokens) return null;

    await this.tokenService.saveToken(user, tokens.refreshToken);
    return tokens;
  }
}

export default UserService;
