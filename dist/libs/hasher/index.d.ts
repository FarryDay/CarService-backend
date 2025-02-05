export default class Hasher {
    static hash(string: string): Promise<string>;
    static compare(string: string, hash: string): Promise<boolean>;
}
