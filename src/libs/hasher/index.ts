import * as bcrypt from 'bcrypt';
const saltRounds = 10;

export default class Hasher {
  public static async hash(string: string): Promise<string> {
    const salt = await bcrypt.genSalt(saltRounds);
    return await bcrypt.hash(string, salt);
  }
  public static async compare(string: string, hash: string): Promise<boolean> {
    return await bcrypt.compare(string, hash);
  }
}
