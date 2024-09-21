export class InvalidUserCredentialsError extends Error {
  constructor() {
    super('Invalid credentials.')
  }
}
