import * as jwt from 'jsonwebtoken';
import { ITokenData } from './tokenizer';

export class Tokenizer {
  static secret: jwt.Secret;

  constructor() {}

  /**
   * Create a JWToken using received user data
   *
   * @param {IUser} user
   */
  public static createToken(
    content: string | object | Buffer,
    secret: jwt.Secret,
    options?: jwt.SignOptions,
  ): ITokenData {
    Tokenizer.secret = secret;
    let tokenData: ITokenData = {
      token: '',
      expiresIn: false,
    };
    try {
      tokenData.token = jwt.sign(content, Tokenizer.secret, options);
      tokenData.expiresIn = (options && options.expiresIn) || false;
      return tokenData;
    } catch (error) {
      throw error;
    }
  }

  /**
   * Check if token is signed with our secret key
   *
   * @param token
   */
  private static async validateToken(token: string) {
    try {
      //Check signature
      const VERIFICATIONRESPONSE: any = jwt.verify(token, Tokenizer.secret);
      return VERIFICATIONRESPONSE;
    } catch (error) {
      ///Return wrong token error
      throw error;
    }
  }

  /**
   * Return authorization cookie with token
   *
   * @param {ITokenData} tokenData
   */
  public static createCookie(token: string, expiresIn?: ITokenData['expiresIn']) {
    let cookie = `Authorization=${token}; HttpOnly;`;
    if (expiresIn) {
      cookie = `${cookie} Max-Age=${expiresIn}`;
    }
    return cookie;
  }
}
