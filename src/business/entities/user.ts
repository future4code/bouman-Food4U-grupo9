export class User {
  constructor(
    private id: string,
    private email: string,
    private passwordEncrypted: string
  ) {}

  public getEmail(): string {
    return this.email;
  }

  public getPasswordEncrypted(): string {
    return this.passwordEncrypted;
  }

  public setPasswordEncrypted(name: string): void {
    this.passwordEncrypted = name;
  }

  public getId(): string {
    return this.id;
  }
}