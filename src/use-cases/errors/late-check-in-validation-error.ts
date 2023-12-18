export class LateCheckInValidationError extends Error {
  constructor() {
    super('The check-in can only be validates ultil 20 minutes of its creation')
  }
}
