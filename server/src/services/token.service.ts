import * as jwt from "jsonwebtoken";
import { DeleteResult, getConnection } from "typeorm";
import { Token } from "../entities/token.model";
import { User } from "../entities/user.model";
import Tokens from "../interfaces/tokens.interface";

class TokenService {
  private tokenRepository = getConnection().getRepository(Token);
  private secret = process.env.JWT_SECRET;

  /**
   * Verify accessToken
   * @param {string} token: jwt accessToken
   * @returns jwt payload
   */
  validateAccessToken(token: string): string | jwt.JwtPayload | null {
    try {
      const userData = jwt.verify(token, this.secret);
      return userData;
    } catch (e) {
      return null;
    }
  }

  /**
   * Verify refreshToken
   * @param {string} token: jwt refreshToken
   * @returns jwt payload
   */
  validateRefreshToken(token: string): string | jwt.JwtPayload | null {
    try {
      const userData = jwt.verify(token, this.secret);
      return userData;
    } catch (e) {
      return null;
    }
  }

  /**
   * Save token to db
   * @param {User} user: user
   * @param {string} token: refreshToken
   * @returns refreshToken
   */
  async saveToken(user: User, token: string): Promise<Token> {
    const tokenData = await this.tokenRepository.findOne({
      where: { user: user },
    });

    if (tokenData) {
      tokenData.refreshToken = token;
      return this.tokenRepository.save(tokenData);
    }

    const tok = await this.tokenRepository.save({
      refreshToken: token,
      user: user,
    });

    return tok;
  }

  /**
   * Delete token from db
   * @param {string} token: token to remove
   * @returns result of deletion
   */
  async removeToken(token: string): Promise<DeleteResult> {
    const deleteResult = await this.tokenRepository.delete(token);
    return deleteResult;
  }

  /**
   * Find token in db
   * @param {string} token: token to find
   * @returns token info
   */
  async findToken(token: string): Promise<Token> {
    const tok = await this.tokenRepository.findOne({
      where: { refreshToken: token },
    });
    return tok;
  }

  /**
   * Generate tokens
   * @param {User} user: user's info for token
   * @returns access and refresh tokens
   */
  generateTokens(user: User): Tokens {
    const payload = {
      sub: user.id,
      exp: Date.now() + 60 * 60,
      username: user.username,
      role: user.role,
    };

    const accessToken = jwt.sign(JSON.stringify(payload), this.secret);
    const refreshToken = jwt.sign(JSON.stringify(payload), this.secret);

    return {
      accessToken,
      refreshToken,
    };
  }
}

export default TokenService;
