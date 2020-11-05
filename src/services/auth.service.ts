import crypto = require('crypto');

export class AuthService {
  hashGenerateIterations = 12000;
  cryptoLength = 128;
  cryptoAlg = 'sha512';

  generatePassword(salt, password): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.pbkdf2(
        password,
        salt,
        this.hashGenerateIterations,
        this.cryptoLength,
        this.cryptoAlg,
        (err, key) => {
          if (err) return reject(err);
          resolve(key.toString('hex'));
        },
      );
    });
  }

  generateSalt(): Promise<string> {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(this.cryptoLength, (err, buffer) => {
        if (err) return reject(err);
        resolve(buffer.toString('hex'));
      });
    });
  }

  async checkPassword(
    password: string,
    passwordHash: string,
    salt: string,
  ): Promise<boolean> {
    if (!password) return false;

    const hash = await this.generatePassword(salt, password);
    return hash === passwordHash;
  }

  async createPasswordHash(
    password,
  ): Promise<{ salt: string; passwordHash: string }> {
    const salt = await this.generateSalt();
    const passwordHash = await this.generatePassword(salt, password);
    return { salt, passwordHash };
  }
}
